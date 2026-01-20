
import React, { useState } from 'react';
import { Product } from '../types';
import { getAIProductInsights } from '../services/geminiService';

interface AICustomerSupportProps {
  products: Product[];
}

const AICustomerSupport: React.FC<AICustomerSupportProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const aiRes = await getAIProductInsights(products, userMsg);
    setChat(prev => [...prev, { role: 'ai', text: aiRes || "I'm sorry, I couldn't process that request." }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 flex flex-col h-[500px] animate-in slide-in-from-bottom-10 duration-300">
          <div className="p-4 border-b border-slate-100 bg-blue-600 rounded-t-2xl flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold leading-none">Hub Assistant</h4>
                <p className="text-[10px] text-blue-100 mt-1">AI-Powered Shopping Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4 text-sm bg-slate-50">
            {chat.length === 0 && (
              <div className="text-center py-10 px-4 space-y-2">
                <p className="font-bold text-slate-800">Hi! I'm your Hub Guide.</p>
                <p className="text-slate-500 text-xs italic">Ask me about product recommendations, specs, or gift ideas from our store!</p>
              </div>
            )}
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white rounded-b-2xl flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 transition-colors"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 bg-blue-600 rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce-slow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AICustomerSupport;
