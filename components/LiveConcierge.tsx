
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Product } from '../types';

interface Props {
  products: Product[];
}

export const LiveConcierge: React.FC<Props> = ({ products }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startSession = async () => {
    setStatus('connecting');
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // In a real app, you'd handle the pcm streaming logic here as per Google GenAI guidelines
    // For this UI demo, we simulate the connection state
    try {
      setIsActive(true);
      setStatus('listening');
      // Real implementation would use navigator.mediaDevices.getUserMedia and ai.live.connect
    } catch (e) {
      console.error(e);
      setStatus('idle');
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setStatus('idle');
    sessionRef.current?.close();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {isActive && (
        <div className="glass w-72 p-6 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-3 w-3 rounded-full animate-pulse ${status === 'listening' ? 'bg-indigo-500' : 'bg-red-500'}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Live Concierge</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {status === 'listening' ? "I'm listening... Ask me about our latest premium tech or style advice." : "Thinking..."}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex gap-1 items-end h-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-1 bg-indigo-500 rounded-full animate-bounce`} style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 100}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={isActive ? stopSession : startSession}
        className={`h-16 w-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 ${isActive ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white animate-float'}`}
      >
        {isActive ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
      </button>
    </div>
  );
};
