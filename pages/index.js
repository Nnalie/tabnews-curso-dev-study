import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Calendar, Award, Rocket, PawPrint, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import YouTube from 'react-youtube';

// Importe as fontes no seu index.html:
// <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Quicksand:wght@700&display=swap" rel="stylesheet">

const LoveJourneyFinal = () => {
  const [daysTogether, setDaysTogether] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const startDate = new Date('2022-11-24'); // ❤️ Ajuste sua data aqui
  const youtubeVideoId = 'i6l9sLLwxJ8'; 

  useEffect(() => {
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  }, []);

  const handleSurprise = () => {
    setShowSurprise(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff0055', '#fff'] });
  };

  const sections = [
    // { title: "O Começo", text: "Aquele primeiro 'oi' que mudou tudo.", icon: <Stars size={48} />, color: "bg-white/20" },
    // { title: "Nós Dois", text: "Cada conquista que celebramos juntos.", icon: <Award size={48} />, color: "bg-white/20" },
    { title: "Pra Sempre", text: "Vc é minha vida, meu amor, meu presente divino, te amo para todo sempre. Vamos conquistar tudo que queremos, seu concurso, nossa casa, nosso carro... O futuro é lindo ao seu lado.", icon: <Rocket size={48} />, color: "bg-white/20" }
  ];

  return (
    <div className="min-h-screen w-full bg-[#ff0055] text-white overflow-x-hidden selection:bg-white selection:text-rose-600"
         style={{ fontFamily: "'Quicksand', sans-serif" }}>
      
      {/* Background Vibrante */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#ff0055] via-[#ff4d8d] to-[#8000ff]" />

      <div className="relative z-10 w-full">
        
        {/* HEADER GIGANTE (Focado em Mobile) */}
        <motion.header 
          className="h-screen w-full flex flex-col items-center justify-center p-8 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart size={120} className="fill-white drop-shadow-2xl" />
          </motion.div>

          <h1 style={{ fontFamily: "'Great Vibes', cursive" }} 
              className="text-[18vw] leading-none mt-6 drop-shadow-lg">
            Meu amor,
          </h1>
          
          <p className="text-[6vw] font-bold opacity-90 mt-4 italic">Um dos desafios iniciais do meu novo curso é fazer algo que impacte alguém muito importante para vc, e não teria como eu não pensar em fazer uma declaração para vc de primeiro projeto :)...</p>

          <motion.div 
            className="mt-12 bg-white text-rose-600 px-10 py-6 rounded-[2rem] shadow-2xl border-4 border-rose-200"
            whileInView={{ scale: [0.9, 1] }}
          >
            {/* <div className="flex flex-col items-center leading-none">
              <span className="text-[15vw] font-black">{daysTogether}</span>
              <span className="text-[5vw] uppercase tracking-tighter font-bold">Dias de Amor</span>
            </div> */}
          </motion.div>
        </motion.header>

        {/* TIMELINE (Cards que preenchem a tela) */}
        <div className="px-6 space-y-10 pb-20">
          {sections.map((item, index) => (
            <motion.div
              key={index}
              className={`${item.color} backdrop-blur-xl p-10 rounded-[3rem] border-2 border-white/30 shadow-2xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="bg-white p-4 rounded-2xl text-rose-600 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-[8vw] font-bold leading-none">{item.title}</h3>
              </div>
              <p className="text-[6vw] leading-tight font-medium opacity-95">
                {item.text}
              </p>
              <div className="mt-6 flex justify-end opacity-40">
                <PawPrint size={40} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* SURPRESA INTERATIVA */}
        <section className="p-6 text-center pb-32">
          {!showSurprise ? (
            <motion.button
              onClick={handleSurprise}
              className="w-full bg-white text-rose-600 py-12 rounded-[3rem] shadow-3xl border-8 border-rose-100 flex flex-col items-center gap-4"
              whileTap={{ scale: 0.9 }}
            >
              <h2 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-[12vw]">Toque aqui ❤️</h2>
              <span className="text-[4vw] font-bold uppercase tracking-widest flex items-center gap-2">
                <Play fill="currentColor" size={20} /> Veja um surpresa pra vc...
              </span>
            </motion.button>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="bg-white p-4 rounded-[3rem] shadow-2xl border-8 border-rose-100">
                <div className="aspect-video rounded-[2rem] overflow-hidden">
                  <YouTube 
                    videoId={youtubeVideoId} 
                    opts={{ height: '100%', width: '100%', playerVars: { autoplay: 1 } }}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <p className="text-[6vw] mt-8 font-bold italic drop-shadow-md">"Você é meu melhor presente!"</p>
            </motion.div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="bg-white/10 backdrop-blur-md p-16 text-center rounded-t-[4rem] border-t-2 border-white/20">
            <Heart className="mx-auto mb-6 fill-white" size={60} />
            <p className="text-[8vw] leading-none mb-6 italic" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Quero que essa página, seja cada vez mais alimentada com meu amor, declarações, projetos nossos, comemorar datas importantes, pode até virar uma site do casal hehe, Te amo muito...
            </p>
            <p className="text-[5vw] font-bold opacity-80 underline decoration-rose-300 uppercase tracking-widest">
                Leonardo Carvalho
            </p>
        </footer>
      </div>
    </div>
  );
};

export default LoveJourneyFinal;