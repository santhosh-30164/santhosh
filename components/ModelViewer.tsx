
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { X, Box, Crosshair, Loader2, AlertTriangle, Upload, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModelViewerProps {
  modelUrl?: string;
  modelName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, modelName, isOpen, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Handle local file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalFileUrl(url);
      setLoading(true);
      setError(null);
      setDebugInfo('Using manually selected file');
    }
  };

  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    // Reset states
    setLoading(true);
    if (!localFileUrl) {
        setError(null);
        setUsingFallback(false);
        setDebugInfo('Initializing loader...');
    }

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(4, 3, 4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.enableZoom = true;
    controls.minDistance = 1;
    controls.maxDistance = 20;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 4); 
    scene.add(ambientLight);
    
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 4);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x00ff9d, 2);
    backLight.position.set(-5, 0, -5);
    scene.add(backLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x00ff9d, 0x1e293b);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Procedural Fallback Drone
    const createProceduralDrone = () => {
      while(modelGroup.children.length > 0){ 
          modelGroup.remove(modelGroup.children[0]); 
      }

      const material = new THREE.MeshStandardMaterial({ 
        color: 0x00ff9d, 
        wireframe: true,
        emissive: 0x003320,
        emissiveIntensity: 0.5
      });

      // Simple drone shape
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.3, 0.6), material);
      modelGroup.add(body);

      const armGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.5);
      const arm1 = new THREE.Mesh(armGeo, material);
      arm1.rotation.y = Math.PI / 4;
      arm1.rotation.z = Math.PI / 2;
      modelGroup.add(arm1);

      const arm2 = new THREE.Mesh(armGeo, material);
      arm2.rotation.y = -Math.PI / 4;
      arm2.rotation.z = Math.PI / 2;
      modelGroup.add(arm2);

      // Rotors
      const rotorPositions = [{ x: 0.8, z: 0.8 }, { x: -0.8, z: 0.8 }, { x: 0.8, z: -0.8 }, { x: -0.8, z: -0.8 }];
      rotorPositions.forEach(pos => {
        const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.2), material);
        motor.position.set(pos.x, 0.1, pos.z);
        modelGroup.add(motor);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 0.1), new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true }));
        blade.position.set(pos.x, 0.25, pos.z);
        modelGroup.add(blade);
        blade.userData = { isRotor: true };
      });

      setUsingFallback(true);
    };

    // Helper to wrap GLTFLoader in a Promise
    const loadGLTF = (url: string): Promise<THREE.Group> => {
      const loader = new GLTFLoader();
      return new Promise((resolve, reject) => {
        loader.load(
          url, 
          (gltf) => resolve(gltf.scene),
          undefined, 
          (err) => reject(err)
        );
      });
    };

    // Smart Loading Logic
    const attemptLoadModel = async () => {
      setLoading(true);
      setError(null);
      
      // If using local file override, just try that
      if (localFileUrl) {
        try {
           const scene = await loadGLTF(localFileUrl);
           finalizeModel(scene);
           return;
        } catch (e) {
           setError("Local file failed to load.");
           createProceduralDrone();
           setLoading(false);
           return;
        }
      }

      // If using provided prop URL, try multiple path variations to be helpful
      if (!modelUrl) {
        createProceduralDrone();
        setLoading(false);
        return;
      }

      // Paths to try in order of likelihood
      const cleanModelUrl = modelUrl.startsWith('/') ? modelUrl.substring(1) : modelUrl;
      const pathsToTry = [
        modelUrl,                       // As provided
        `/${cleanModelUrl}`,            // Absolute root
        `./${cleanModelUrl}`,           // Relative current
        `public/${cleanModelUrl}`,      // Explicit public folder
        `/public/${cleanModelUrl}`      // Absolute public folder
      ];

      // Deduplicate paths
      const uniquePaths = [...new Set(pathsToTry)];

      let loadedScene: THREE.Group | null = null;

      for (const path of uniquePaths) {
        try {
          setDebugInfo(`Attempting path: ${path}`);
          loadedScene = await loadGLTF(path);
          console.log(`Success loading model from: ${path}`);
          setDebugInfo(`Loaded from: ${path}`);
          break; // Exit loop on success
        } catch (e) {
          // Continue to next path
        }
      }

      if (loadedScene) {
        finalizeModel(loadedScene);
      } else {
        console.warn("Model asset missing, switching to holographic simulation.");
        setUsingFallback(true);
        createProceduralDrone();
        setLoading(false);
      }
    };

    const finalizeModel = (model: THREE.Group) => {
       while(modelGroup.children.length > 0){ 
         modelGroup.remove(modelGroup.children[0]); 
       }

       // Auto-scale and Center
       const box = new THREE.Box3().setFromObject(model);
       const size = box.getSize(new THREE.Vector3());
       const center = box.getCenter(new THREE.Vector3());

       model.position.x -= center.x;
       model.position.y -= center.y;
       model.position.z -= center.z;

       const maxDim = Math.max(size.x, size.y, size.z);
       if (maxDim > 0) {
         const targetSize = 4;
         const scaleFactor = targetSize / maxDim;
         model.scale.set(scaleFactor, scaleFactor, scaleFactor);
       }

       modelGroup.add(model);
       setLoading(false);
       setUsingFallback(false);
    };

    attemptLoadModel();

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();

      // Animate rotors if procedural
      modelGroup.children.forEach(child => {
        if (child.userData?.isRotor) child.rotation.y += 0.3;
        child.children?.forEach(gc => {
            if (gc.userData?.isRotor) gc.rotation.y += 0.3;
        })
      });

      // Float effect
      modelGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpen, modelUrl, localFileUrl]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    >
      <div className="relative w-full max-w-5xl aspect-video bg-military-dark border border-tactical-green/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,255,157,0.1)] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900/80 p-4 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-tactical-green" />
            <div>
              <h3 className="text-white font-display font-bold uppercase tracking-wider">{modelName}</h3>
              <div className="flex gap-2 items-center">
                <p className="text-[10px] text-tactical-green font-mono">3D SCHEMATIC VISUALIZATION</p>
                {usingFallback && <span className="text-[10px] text-alert-red font-mono animate-pulse">[SIMULATION MODE - ASSET MISSING]</span>}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Canvas */}
        <div className="relative flex-1 bg-gradient-to-b from-slate-900/50 to-black">
          <div ref={mountRef} className="w-full h-full cursor-move" />
          
          {/* Overlay Stats */}
          <div className="absolute top-4 left-4 text-tactical-green/50 font-mono text-[10px] space-y-1 pointer-events-none select-none">
            <p>ROTATION: FREE</p>
            <p>ZOOM: ENABLED</p>
            <p>GRID: 20x20m</p>
            <p>ENGINE: WEBGL 2.0</p>
            {debugInfo && <p className="text-slate-500 border-t border-slate-800 mt-2 pt-2">DEBUG: {debugInfo}</p>}
          </div>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
             <Crosshair className="w-64 h-64 text-tactical-green" strokeWidth={0.5} />
          </div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-tactical-green animate-spin mx-auto mb-2" />
                <p className="text-tactical-green font-mono text-xs animate-pulse">LOADING ASSET DATA...</p>
              </div>
            </div>
          )}
          
          {/* Controls Overlay (Not pointer-events-none so we can click buttons) */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-30">
             {/* File Upload Button */}
             <div className="relative">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".glb,.gltf"
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-slate-800/80 hover:bg-tactical-green hover:text-black border border-slate-600 text-white text-xs font-mono px-3 py-2 rounded transition-all backdrop-blur"
                >
                   <Upload className="w-3 h-3" />
                   {localFileUrl ? 'CHANGE LOCAL FILE' : 'LOAD .GLB FROM DEVICE'}
                </button>
             </div>
             
             {error && (
               <div className="bg-red-900/90 text-white text-[10px] p-2 rounded max-w-[200px] text-right font-mono border border-red-500">
                  ⚠️ {error}
               </div>
             )}
          </div>
          
          {/* Simulation Mode Helper Text */}
          {usingFallback && !localFileUrl && (
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-tactical-green/70 text-xs font-mono bg-black/50 px-4 py-1 rounded border border-tactical-green/20">
                   VISUALIZATION MODE ACTIVE<br/>
                   <span className="text-[10px] text-slate-400">Upload a .GLB file to view actual model</span>
                </p>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900/80 p-2 flex justify-between items-center border-t border-slate-800 px-4">
           <p className="text-slate-500 font-mono text-[10px]">
             <span className="text-tactical-green">CONTROLS:</span> CLICK & DRAG TO ROTATE • SCROLL TO ZOOM
           </p>
           {localFileUrl && (
             <span className="text-[10px] text-tactical-green font-mono flex items-center gap-1">
               <RefreshCw className="w-3 h-3 animate-spin" />
               LOCAL FILE LOADED
             </span>
           )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModelViewer;