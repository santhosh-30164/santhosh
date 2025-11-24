export interface DroneModel {
  id: string;
  model: string;
  type: string;
  priceRange: string;
  description: string;
  specs: {
    range: string;
    endurance: string;
    payload: string;
  };
  imageUrl: string;
  modelUrl?: string;
}

export enum Sender {
  USER = 'user',
  AI = 'ai'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

export interface ApiState {
  loading: boolean;
  error: string | null;
}