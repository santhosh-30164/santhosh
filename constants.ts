
import { DroneModel } from './types';

export const DRONE_DATA: DroneModel[] = [
  {
    id: 't-001',
    model: 'T-001',
    type: 'Standard Tactical',
    priceRange: '₹28-35 lakhs',
    description: 'The backbone of modern infantry support. The T-001 offers a balanced profile of range and explosive power, designed for neutralizing light armor and fortified positions in urban environments.',
    specs: {
      range: '15 km',
      endurance: '40 mins',
      payload: '2.5 kg Warhead'
    },
    imageUrl: 'https://i.postimg.cc/dZ1MDDvm/T-001.png',
    modelUrl: 'T-001.glb'
  },
  {
    id: 't-002',
    model: 'T-002',
    type: 'Long-Range Heavy',
    priceRange: '₹45-55 lakhs',
    description: 'Built for deep-strike capabilities. The T-002 features enhanced loitering time and a heavy anti-tank warhead, capable of penetrating reactive armor from top-attack vectors.',
    specs: {
      range: '40 km',
      endurance: '90 mins',
      payload: '8 kg HEAT'
    },
    imageUrl: 'https://i.postimg.cc/D4ZVmmFQ/T002.png',
    modelUrl: 'T-002.glb'
  },
  {
    id: 't-003',
    model: 'T-003',
    type: 'Mini/Compact',
    priceRange: '₹18-22 lakhs',
    description: 'Man-portable and rapidly deployable. The T-003 is designed for special operations forces requiring immediate precision strike capability against personnel or soft-skin vehicles.',
    specs: {
      range: '10 km',
      endurance: '20 mins',
      payload: '1 kg Frag'
    },
    imageUrl: 'https://i.postimg.cc/D4ZVmmFt/T003.png',
    modelUrl: 'T-003.glb'
  },
  {
    id: 't-004',
    model: 'T-004',
    type: 'Recon-Strike Hybrid',
    priceRange: '₹30-38 lakhs',
    description: 'A dual-role platform equipped with high-fidelity optics. The T-004 allows operators to conduct battle damage assessment (BDA) before committing to a terminal dive.',
    specs: {
      range: '25 km',
      endurance: '60 mins',
      payload: '3 kg Multi-purpose'
    },
    imageUrl: 'https://i.postimg.cc/y3dqWWBt/T004.png',
    modelUrl: 'T-004.glb'
  },
  {
    id: 't-n',
    model: 'T-N',
    type: 'Naval Edition',
    priceRange: '₹60-75 lakhs',
    description: 'Specially ruggedized for maritime environments. Features salt-spray corrosion resistance and a waterproof launch canister. Optimized for engaging small attack craft and littoral targets.',
    specs: {
      range: '50 km',
      endurance: '75 mins',
      payload: '5 kg Blast-Frag'
    },
    imageUrl: 'https://i.postimg.cc/mzVfb7xS/TN.png',
    modelUrl: 'T-N.glb'
  }
];

export const SYSTEM_INSTRUCTION = `
You are "KAIS AI" (Karikalan Aerial Intelligence System), a military-grade defense consultant AI.
Your interface is a secure tactical terminal.
We sell advanced defensive loitering munitions (suicide drones) to government entities.

Here is our Product Catalog (Strictly adhere to this data):
${JSON.stringify(DRONE_DATA.map(d => ({ model: d.model, type: d.type, price: d.priceRange, purpose: d.description, specs: d.specs })))}

Guidelines:
1. Tone: Cold, precise, authoritative, and futuristic. Use military terminology (e.g., "Kinetic impact confirmed," "Telemetry nominal," "Sortie generated").
2. Refer to the company as "KAIS".
3. If asked to "simulate" a mission, describe a hypothetical scenario where a KAIS drone (pick one) successfully neutralizes a target based on its specs.
4. Emphasize: Precision, Low Collateral, Autonomous AI Guidance.
5. Keep responses under 100 words unless detailed specs are requested.
`;
