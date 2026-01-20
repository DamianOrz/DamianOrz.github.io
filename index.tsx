
import React, { useState, useMemo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// --- COMPONENTE DE FONDO CONSOLIDADO ---
const DottedGlowBackground = ({
  gap = 24,
  radius = 1.5,
  color = "rgba(14, 58, 71, 0.1)",
  glowColor = "rgba(197, 160, 89, 0.4)",
  opacity = 1
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = canvasRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let raf;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      el.width = width * dpr; el.height = height * dpr;
      el.style.width = `${width}px`; el.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let dots = [];
    const cols = Math.ceil(window.innerWidth / gap) + 2;
    const rows = Math.ceil(window.innerHeight / gap) + 2;
    for (let i = -1; i < cols; i++) {
      for (let j = -1; j < rows; j++) {
        dots.push({
          x: i * gap + (j % 2 === 0 ? 0 : gap * 0.5),
          y: j * gap,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random()
        });
      }
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, el.width, el.height);
      const time = now / 1000;
      dots.forEach((d) => {
        const mod = (time * d.speed + d.phase) % 2;
        const lin = mod < 1 ? mod : 2 - mod;
        const intensity = 0.1 + 0.9 * (lin * lin);
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        if (intensity > 0.8) {
          ctx.fillStyle = glowColor;
          ctx.shadowBlur = 10;
          ctx.shadowColor = glowColor;
        } else {
          ctx.fillStyle = color;
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = opacity * (intensity > 0.8 ? 1 : 0.4);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [gap, radius, color, glowColor, opacity]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}><canvas ref={canvasRef} /></div>;
};

// --- CONFIGURACIÓN DE PRECIOS ---
const PRICING = {
  individuo: { low: 180, mid: 360, high: 400 },
  matrimonio: { low: 280, mid: 440, high: 680 },
  familia: { low: 320, mid: 520, height: 760 }
};

const App = () => {
  const [currentType, setCurrentType] = useState('individuo');
  const [activity, setActivity] = useState(1);
  const [source, setSource] = useState(1);

  const calculation = useMemo(() => {
    const tier = Math.max(activity, source);
    let label = "", color = "", plus = false, price = 0;
    if (tier === 1) { price = PRICING[currentType].low; label = "Baja Complejidad"; color = "text-green-600 bg-green-500/10"; }
    else if (tier === 2) { price = PRICING[currentType].mid; label = "Mediana Complejidad"; color = "text-orange-600 bg-orange-500/10"; }
    else { price = PRICING[currentType].high || PRICING[currentType].height; label = "Alta Complejidad"; color = "text-red-600 bg-red-500/10"; plus = true; }
    return { price, label, color, plus };
  }, [currentType, activity, source]);

  return (
    <div className="min-h-screen">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-sand">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-petroleum rounded-lg flex items-center justify-center text-sand">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <div>
              <span className="block font-serif text-xl font-bold tracking-tight leading-none">PM Culture</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-graphite/80">SERVICIOS CONTABLES</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-graphite/70">
            <a href="#calculadora" className="hover:text-petroleum text-petroleum font-extrabold">Tarifas 2025</a>
            <a href="#" className="bg-petroleum text-sand px-5 py-2.5 rounded-full hover:bg-deepGreen transition-all">Contacto</a>
          </div>
        </div>
      </nav>

      <header className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-b from-white to-[#F9F7F2]">
        <DottedGlowBackground />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="fade-in">
            <div className="flex items-center gap-2 mb-6 px-3 py-1.5 bg-petroleum/5 rounded-full border border-petroleum/10 w-fit">
              <span className="inline-block w-2 h-2 rounded-full bg-petroleum animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-petroleum">Temporada Fiscal 2025</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl mb-8 leading-[1.15] text-petroleum font-medium">
              Tu declaración 2025 con <span className="italic text-goldSoft">absoluta tranquilidad.</span>
            </h1>
            <p className="text-base text-graphite mb-10 leading-relaxed max-w-lg">
              Expertos en normativa fiscal de Florida. Garantizamos precisión técnica y un proceso optimizado para tu perfil personal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="bg-petroleum text-sand px-8 py-4 rounded-xl font-bold text-sm text-center shadow-lg hover:shadow-petroleum/20 transition-all">Iniciar Ahora</a>
              <a href="#calculadora" className="border-2 border-sand bg-white/50 backdrop-blur-sm text-petroleum px-8 py-4 rounded-xl font-bold text-sm text-center hover:bg-white transition-all">Ver Tarifas</a>
            </div>
          </div>
          <div className="relative fade-in">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
              <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000" alt="Finanzas" className="w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="py-20 max-w-7xl mx-auto px-6" id="calculadora">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[2rem] border border-sand shadow-sm">
            <h3 className="font-serif text-3xl mb-10 pb-6 border-b border-sand">Calculadora de Honorarios</h3>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-graphite/60 mb-6">1. Perfil del Contribuyente</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['individuo', 'matrimonio', 'familia'].map(t => (
                    <button key={t} onClick={() => setCurrentType(t)} className={`p-6 rounded-2xl border-2 transition-all ${currentType === t ? 'border-petroleum bg-sand/20' : 'border-slate-50'}`}>
                      <span className="block font-bold capitalize">{t === 'familia' ? 'Matrimonio c/ Hijos' : t}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-graphite/60 mb-6">2. Actividad</h4>
                  <select onChange={(e) => setActivity(Number(e.target.value))} className="w-full p-4 rounded-xl border-2 border-slate-50 outline-none focus:border-petroleum">
                    <option value="1">Básica (W-2, Salarios)</option>
                    <option value="2">Integral (1099, Deducciones)</option>
                    <option value="3">Estructurada (Rentas, Crypto)</option>
                  </select>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-graphite/60 mb-6">3. Origen Ingresos</h4>
                  <select onChange={(e) => setSource(Number(e.target.value))} className="w-full p-4 rounded-xl border-2 border-slate-50 outline-none focus:border-petroleum">
                    <option value="1">Sólo Florida (Local)</option>
                    <option value="2">Multi-Estatal (USA)</option>
                    <option value="3">Internacional (FBAR/Foreign)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-petroleum text-sand p-10 rounded-[2rem] sticky top-28 shadow-2xl">
              <span className="text-[10px] uppercase tracking-widest opacity-60 mb-4 block">Presupuesto Estimado</span>
              <div className="text-7xl font-serif mb-6">
                <span className="text-2xl opacity-40">$</span>{calculation.price}{calculation.plus && '+'}
              </div>
              <div className={`text-xs font-bold px-4 py-2 rounded-full inline-block mb-8 ${calculation.color}`}>
                {calculation.label}
              </div>
              <ul className="text-sm space-y-4 opacity-80 mb-10">
                <li className="flex gap-3"><span className="material-symbols-outlined text-goldSoft">check_circle</span> Revisión integral</li>
                <li className="flex gap-3"><span className="material-symbols-outlined text-goldSoft">check_circle</span> Presentación E-File</li>
                <li className="flex gap-3"><span className="material-symbols-outlined text-goldSoft">check_circle</span> Soporte post-entrega</li>
              </ul>
              <button className="w-full bg-sand text-petroleum py-4 rounded-xl font-bold hover:bg-white transition-all">Agendar Cita</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-12 px-6 border-t border-sand text-center">
        <p className="text-xs text-graphite/50 font-medium tracking-wide">© 2025 PM Culture - Expertos en Gestión Impositiva.</p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
