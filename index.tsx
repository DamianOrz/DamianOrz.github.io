import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

const PRICING = {
  individuo: { low: 180, mid: 360, high: 400 },
  matrimonio: { low: 280, mid: 440, high: 680 },
  familia: { low: 320, mid: 520, high: 760 }
};

type ContributorType = 'individuo' | 'matrimonio' | 'familia';

const App = () => {
  const [currentType, setCurrentType] = useState<ContributorType>('individuo');
  const [activity, setActivity] = useState(1);
  const [source, setSource] = useState(1);

  const calculation = useMemo(() => {
    const tier = Math.max(activity, source);
    let label = "";
    let color = "";
    let plus = false;
    let price = 0;

    if (tier === 1) {
      price = PRICING[currentType].low;
      label = "Baja Complejidad";
      color = "text-green-600 bg-green-500/10";
      plus = false;
    } else if (tier === 2) {
      price = PRICING[currentType].mid;
      label = "Mediana Complejidad";
      color = "text-orange-600 bg-orange-500/10";
      plus = false;
    } else {
      price = PRICING[currentType].high;
      label = "Alta Complejidad";
      color = "text-red-600 bg-red-500/10";
      plus = true;
    }

    return { price, label, color, plus };
  }, [currentType, activity, source]);

  return (
    <div className="min-h-screen">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-sand">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-petroleum rounded-lg flex items-center justify-center text-sand shadow-lg">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <div>
              <span className="block font-serif text-xl font-bold tracking-tight leading-none">PM Culture</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-graphite/80">SERVICIOS CONTABLES E IMPOSITIVOS</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-graphite/70">
            <a href="#calculadora" className="hover:text-petroleum transition-colors">Tarifas 2025</a>
            <a href="#" className="bg-petroleum text-sand px-5 py-2.5 rounded-full hover:bg-deepGreen transition-all">Asesoría Personalizada</a>
          </div>
        </div>
      </nav>

      <header className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-b from-white to-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="fade-in relative z-10">
            <div className="flex items-center gap-2 mb-6 px-3 py-1.5 bg-petroleum/5 rounded-full border border-petroleum/10 w-fit">
              <span className="inline-block w-2 h-2 rounded-full bg-petroleum animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-petroleum">Temporada Fiscal 2025 Abierta</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl mb-8 leading-[1.15] text-petroleum font-medium">
              Tu declaración 2025 resuelta con <span className="italic text-goldSoft">absoluta tranquilidad.</span>
            </h1>
            
            <p className="text-base text-graphite mb-10 leading-relaxed max-w-lg">
              La presentación de impuestos requiere rigor técnico y atención al detalle. En PM Culture garantizamos un proceso de cumplimiento profesional, adaptado a tu situación particular y diseñado para optimizar tu bienestar fiscal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="bg-petroleum text-sand px-8 py-4 rounded-xl font-bold text-sm text-center hover:shadow-2xl hover:shadow-petroleum/20 transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-lg">edit_note</span>
                Iniciar mi Declaración 2025
              </a>
              <a href="#calculadora" className="border-2 border-sand bg-white/50 backdrop-blur-sm text-petroleum px-8 py-4 rounded-xl font-bold text-sm text-center hover:border-petroleum/20 transition-all flex items-center justify-center gap-2">
                Conoce tu Perfil Fiscal
                <span className="material-symbols-outlined text-lg">arrow_downward</span>
              </a>
            </div>

            <div className="mt-10 flex items-center gap-8 border-t border-sand pt-8">
               <div className="flex flex-col">
                  <span className="text-xl font-serif font-bold text-petroleum">100%</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-graphite/60">Digital & Seguro</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-xl font-serif font-bold text-petroleum">Profesional</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-graphite/60">Servicio Experto</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-xl font-serif font-bold text-petroleum">A medida</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-graphite/60">Atención Personal</span>
               </div>
            </div>
          </div>

          <div className="relative fade-in animation-delay-200">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
              <img src="https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&q=80&w=1000" alt="Gestión Profesional en Miami" className="w-full h-[300px] md:h-[450px] object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-petroleum/20 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-8 -left-6 md:-left-12 bg-white p-6 rounded-3xl shadow-xl border border-sand max-w-[260px] hidden sm:block">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-goldSoft text-xs">star</span>
                ))}
              </div>
              <p className="text-sm italic font-serif leading-snug text-petroleum/90">"Un servicio impecable y cercano que me da la seguridad que mi patrimonio necesita."</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-sand flex items-center justify-center text-[10px] font-bold text-petroleum">M</div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-graphite/60">Cliente Corporativo Florida</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="text-lg">
        <section id="calculadora" className="py-20 md:py-32 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-goldSoft mb-4 block text-center">Claridad y Compromiso Profesional</span>
            <h2 className="font-serif text-4xl md:text-6xl text-petroleum font-medium mb-6 leading-tight">Calcula tu inversión para la temporada 2025</h2>
            <p className="text-graphite/70 max-w-2xl mx-auto text-base leading-relaxed">Presentamos un esquema de honorarios transparente basado en la realidad de tu perfil fiscal.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 border border-sand shadow-sm">
                <h3 className="font-serif text-2xl md:text-4xl mb-8 md:mb-12 border-b border-sand pb-6 md:pb-8 font-medium">Configura tu Perfil Fiscal</h3>
                
                <div className="mb-10 md:mb-16">
                  <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-graphite/60 mb-6 md:mb-8">1. Tipo de Contribuyente</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
                    {[
                      { id: 'individuo', icon: 'person', label: 'Individuo' },
                      { id: 'matrimonio', icon: 'group', label: 'Matrimonio' },
                      { id: 'familia', icon: 'family_restroom', label: 'Matrimonio con Hijos' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setCurrentType(type.id as ContributorType)}
                        className={`p-4 md:p-8 rounded-2xl md:rounded-[2rem] border-2 text-left transition-all flex flex-col md:gap-6 gap-2 group ${
                          currentType === type.id 
                            ? 'border-petroleum bg-sand/30 scale-[1.03] shadow-xl shadow-sand/20' 
                            : 'border-slate-50 hover:border-sand'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-2xl md:text-4xl transition-colors ${
                          currentType === type.id ? 'text-petroleum' : 'text-graphite group-hover:text-petroleum'
                        }`}>
                          {type.icon}
                        </span>
                        <span className="font-bold text-sm md:text-base tracking-tight">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-10 md:space-y-16">
                  <div>
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-graphite/60 mb-6 md:mb-8">2. Actividad Personal</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      {[
                        { val: 1, title: 'Básica', desc: 'Salario, W-2, Pensión o Jubilación.', badge: 'Baja', badgeColor: 'text-green-700 bg-green-50' },
                        { val: 2, title: 'Integral', desc: '1099, Deducción Detallada, Créditos Estudio.', badge: 'Mediana', badgeColor: 'text-orange-700 bg-orange-50' },
                        { val: 3, title: 'Estructurada', desc: 'Bolsa, Cripto o Renta de Propiedades.', badge: 'Alta', badgeColor: 'text-red-700 bg-red-50' }
                      ].map(item => (
                        <label key={item.val} className="complexity-card flex flex-col p-4 md:p-6 border rounded-2xl md:rounded-3xl cursor-pointer hover:bg-slate-50 transition-all">
                          <input type="radio" name="activity" value={item.val} checked={activity === item.val} onChange={() => setActivity(item.val)} className="hidden peer" />
                          <div className={`transition-all ${activity === item.val ? 'text-petroleum opacity-100' : 'opacity-40'}`}>
                            <div className="font-bold mb-1 md:mb-2 text-sm md:text-base">{item.title}</div>
                            <p className="text-[13px] md:text-sm leading-relaxed mb-3 md:mb-4 text-graphite/80">{item.desc}</p>
                            <div className={`text-[10px] md:text-[11px] font-bold uppercase inline-block px-2 md:px-3 py-1 rounded ${item.badgeColor}`}>{item.badge}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-graphite/60 mb-6 md:mb-8">3. Origen de Ingresos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      {[
                        { val: 1, title: 'Estatal', desc: 'Única fuente dentro de Florida.', badge: 'Baja', badgeColor: 'text-green-700 bg-green-50' },
                        { val: 2, title: 'Multi-Estatal', desc: 'Ingresos generados en múltiples estados.', badge: 'Mediana', badgeColor: 'text-orange-700 bg-orange-50' },
                        { val: 3, title: 'Internacional', desc: 'Actividad fuera de USA, FBAR o multi-jurisdicción.', badge: 'Alta', badgeColor: 'text-red-700 bg-red-50' }
                      ].map(item => (
                        <label key={item.val} className="complexity-card flex flex-col p-4 md:p-6 border rounded-2xl md:rounded-3xl cursor-pointer hover:bg-slate-50 transition-all">
                          <input type="radio" name="source" value={item.val} checked={source === item.val} onChange={() => setSource(item.val)} className="hidden peer" />
                          <div className={`transition-all ${source === item.val ? 'text-petroleum opacity-100' : 'opacity-40'}`}>
                            <div className="font-bold mb-1 md:mb-2 text-sm md:text-base">{item.title}</div>
                            <p className="text-[13px] md:text-sm leading-relaxed mb-3 md:mb-4 text-graphite/80">{item.desc}</p>
                            <div className={`text-[10px] md:text-[11px] font-bold uppercase inline-block px-2 md:px-3 py-1 rounded ${item.badgeColor}`}>{item.badge}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div className="bg-petroleum text-sand rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                  <div className="p-8 md:p-10 text-center border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3 block">Inversión en Cumplimiento</span>
                    <div className="text-6xl md:text-8xl font-serif">
                      <span className="text-2xl md:text-3xl opacity-40 mr-1">$</span>
                      <span className="inline-block transition-all duration-300 transform" key={`${calculation.price}-${currentType}`}>
                        {calculation.price}
                      </span>
                      {calculation.plus && <span className="text-2xl md:text-3xl opacity-40 ml-1">+</span>}
                    </div>
                  </div>
                  <div className="p-8 md:p-10 space-y-6 md:space-y-8">
                    <div className="bg-white/5 rounded-2xl p-5 md:p-6 border border-white/5">
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3 text-center md:text-left">Análisis de Perfil</div>
                      <div className={`text-sm font-bold px-4 py-2 rounded-full text-center ${calculation.color}`}>
                        {calculation.label}
                      </div>
                    </div>
                    
                    <ul className="text-sm space-y-4 opacity-80 leading-relaxed">
                      <li className="flex items-center gap-3"><span className="material-symbols-outlined text-goldSoft text-xl">verified</span> Asesoría experta personalizada</li>
                      <li className="flex items-center gap-3"><span className="material-symbols-outlined text-goldSoft text-xl">verified</span> Traducción técnica a lenguaje claro</li>
                      <li className="flex items-center gap-3"><span className="material-symbols-outlined text-goldSoft text-xl">verified</span> Revisión integral de documentos</li>
                    </ul>

                    <button className="w-full bg-sand text-petroleum py-5 rounded-2xl font-bold text-base hover:bg-white transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-xl">calendar_today</span>
                      Agendar Sesión de Trabajo
                    </button>
                    <p className="text-[10px] text-center opacity-40 uppercase tracking-widest font-bold">Temporada Fiscal 2025 - Servicio Profesional</p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl md:rounded-[2.5rem] border border-sand">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center flex-shrink-0 text-petroleum">
                      <span className="material-symbols-outlined text-2xl">shield</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-2 uppercase tracking-wider">Profesionalismo ante todo</h4>
                      <p className="text-sm text-graphite/80 italic leading-relaxed">"Nuestra prioridad es tu tranquilidad fiscal real a través de un acompañamiento riguroso."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hidden md:block max-w-7xl mx-auto px-6 mb-40">
          <div className="bg-white rounded-[3rem] border border-sand overflow-hidden shadow-sm">
            <div className="p-12 md:p-16 border-b border-sand flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <h2 className="font-serif text-4xl mb-4 font-medium">Guía Referencial de Honorarios</h2>
                <p className="text-graphite/70 text-base">Estructura profesional de acuerdo a la complejidad técnica.</p>
              </div>
              <div className="flex items-center gap-6 text-xs font-bold uppercase text-graphite/60 tracking-widest">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Baja</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Mediana</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Alta</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 text-xs font-bold uppercase tracking-[0.2em] text-graphite/50">
                    <th className="p-10 text-left">Categoría Fiscal</th>
                    <th className="p-10 text-left bg-green-50/30">Baja Complejidad</th>
                    <th className="p-10 text-left bg-orange-50/30">Mediana Complejidad</th>
                    <th className="p-10 text-left bg-red-50/30">Alta Complejidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand text-base text-graphite">
                  {[
                    { cat: 'Individuo', p: ['$180', '$360', '$400+'] },
                    { cat: 'Matrimonio', p: ['$280', '$440', '$680+'] },
                    { cat: 'Matrimonio con Hijos', p: ['$320', '$520', '$760+'] }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-10 font-bold text-petroleum">{row.cat}</td>
                      <td className="p-10">{row.p[0]}</td>
                      <td className="p-10">{row.p[1]}</td>
                      <td className="p-10">{row.p[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-20 md:py-24 px-6 border-t border-sand">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-petroleum rounded flex items-center justify-center text-sand">
              <span className="material-symbols-outlined text-2xl">account_balance</span>
            </div>
            <span className="font-serif text-2xl font-bold">PM Culture</span>
          </div>
          <p className="text-xs text-graphite/50 font-medium tracking-wide">© 2025 PM Culture - Gestión Impositiva Especializada.</p>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);