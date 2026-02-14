
import React, { useState, useCallback, useRef } from 'react';
import { Step, ValentineState } from './types';
import { generateValentinePoem } from './services/geminiService';
import { FloatingHearts } from './components/FloatingHearts';

const App: React.FC = () => {
  const [state, setState] = useState<ValentineState>({
    name: '',
    step: Step.IDENTIFY,
    poem: '',
  });

  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [isNoMoving, setIsNoMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.name.trim()) {
      setState(prev => ({ ...prev, step: Step.ASK }));
    }
  };

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 100;
    const maxY = rect.height - 50;
    
    // Ensure it doesn't just jitter in one spot
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoBtnPos({ x: newX, y: newY });
    setIsNoMoving(true);
  }, []);

  const handleYes = async () => {
    setState(prev => ({ ...prev, step: Step.LOADING }));
    const poem = await generateValentinePoem(state.name);
    setState(prev => ({ ...prev, poem, step: Step.SUCCESS }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600 flex items-center justify-center p-4 relative font-sans overflow-hidden">
      <FloatingHearts />
      
      <div 
        ref={containerRef}
        className="relative bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md text-center border-4 border-pink-200 z-10"
      >
        {state.step === Step.IDENTIFY && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <h1 className="text-4xl font-bold text-rose-600 drop-shadow-sm">Surprise! 💖</h1>
            <p className="text-gray-600 text-lg">Je t'ai préparé quelque chose de spécial...</p>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Quel est ton prénom ?"
                value={state.name}
                onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-6 py-4 rounded-xl border-2 border-pink-300 focus:border-rose-500 outline-none transition-all text-center text-xl font-medium"
                autoFocus
              />
              <button
                type="submit"
                disabled={!state.name.trim()}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 transition-all transform active:scale-95 disabled:opacity-50"
              >
                C'est parti ! ✨
              </button>
            </form>
          </div>
        )}

        {state.step === Step.ASK && (
          <div className="space-y-10 min-h-[300px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-600 leading-tight">
              {state.name}, veux-tu être ma Valentine ? 🥺👉👈
            </h2>
            
            <div className="flex items-center justify-center gap-6 relative h-20">
              <button
                onClick={handleYes}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-rose-300 transition-all transform hover:scale-110 z-20"
              >
                Oui 😍
              </button>
              
              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={isNoMoving ? { 
                  position: 'fixed', 
                  left: noBtnPos.x, 
                  top: noBtnPos.y, 
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                } : {}}
                className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-10 py-4 rounded-xl transition-all ${!isNoMoving ? 'relative' : 'z-50 shadow-xl'}`}
              >
                Non 😏
              </button>
            </div>
          </div>
        )}

        {state.step === Step.LOADING && (
          <div className="py-12 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 border-8 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">💝</span>
            </div>
            <p className="text-rose-600 font-medium text-lg animate-pulse">
              Préparation de ta surprise personnalisée...
            </p>
          </div>
        )}

        {state.step === Step.SUCCESS && (
          <div className="space-y-8 animate-in zoom-in duration-1000">
            <div className="text-6xl mb-4">🥳💖🌈</div>
            <h2 className="text-4xl font-black text-rose-600">Yeeeees !!!</h2>
            <p className="text-xl text-gray-700 italic">Je suis trop content(e) !!!</p>
            
            <div className="bg-rose-50 p-6 rounded-2xl border-l-4 border-rose-400 text-left shadow-inner">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">Un petit message pour toi :</p>
              <div className="text-rose-800 text-lg font-serif whitespace-pre-line leading-relaxed italic">
                {state.poem}
              </div>
            </div>

            <button
              onClick={() => setState({ name: '', step: Step.IDENTIFY, poem: '' })}
              className="text-rose-400 hover:text-rose-600 text-sm font-medium underline"
            >
              Recommencer
            </button>
          </div>
        )}
      </div>

      {/* Credit Footer */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-medium tracking-widest pointer-events-none">
        FAIT AVEC AMOUR 💖
      </footer>
    </div>
  );
};

export default App;
