import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Heart, MapPin, Calendar, Clock, Gift, CreditCard, Copy, Check } from 'lucide-react';

// --- TRANSLATIONS ---
const DICT = {
  uz: {
    heroTagline: "Bizning to'yimizga taklif etamiz",
    names: "Ali & Laylo",
    dateFull: "25-Iyul, 2026",
    days: "Kun",
    hours: "Soat",
    minutes: "Daqiqa",
    seconds: "Soniya",
    storyTitle: "Bizning Hikoyamiz",
    storyText: "Mo'jizaviy tasodif bizni uchrashtirdi, sevgi esa qalblarimizni birlashtirdi. Endi biz butun umr birga bo'lishga ahd qildik. Oila qurgach, hayotimiz yanada yorqinroq bo'lishini bilamiz va ushbu quvonchli kunimizda sizni ham aziz mehmonimiz sifatida kutamiz.",
    eventTitle: "To'y Tantanasi",
    eventDate: "25-Iyul, 2026",
    eventTime: "Soat 18:00 dan boshlab",
    eventLocation: "Toshkent shahri, 'Navro'z' qabullar uyi",
    galleryTitle: "Baxtli Lahzalar",
    giftTitle: "To'yona",
    giftSub: "Sizning e'tiboringiz – biz uchun eng katta sovg'a! Ammo agar siz yosh oilaga o'z hissangizni qo'shib, to'yona qilmoqchi bo'lsangiz, quyidagi hisob raqamidan foydalanishingiz mumkin.",
    cardNumber: "Karta raqami",
    cardName: "Karta egasi",
    copy: "Nusxa olish",
    copied: "Nusxa olindi!",
    dummyCard: "8600 1234 5678 9012",
    dummyName: "Aliyev Ali",
    langRu: "RU",
    langUz: "UZ"
  },
  ru: {
    heroTagline: "Приглашаем вас на нашу свадьбу",
    names: "Али & Лайло",
    dateFull: "25 Июля, 2026",
    days: "Дней",
    hours: "Часов",
    minutes: "Минут",
    seconds: "Секунд",
    storyTitle: "Наша История",
    storyText: "Волшебная случайность свела нас вместе, а любовь объединила наши сердца. Теперь мы решили быть вместе всю жизнь. Мы знаем, что наша жизнь станет еще ярче, и будем искренне рады видеть вас среди наших дорогих гостей в этот счастливый день.",
    eventTitle: "Свадебное Торжество",
    eventDate: "25 Июля, 2026",
    eventTime: "Сбор гостей в 18:00",
    eventLocation: "г. Ташкент, Дом приемов 'Навруз'",
    galleryTitle: "Счастливые Моменты",
    giftTitle: "Свадебный Подарок",
    giftSub: "Ваше присутствие — лучший подарок для нас! Но если вы хотите сделать нам приятное и внести свой вклад в молодую семью, вы можете использовать эти реквизиты.",
    cardNumber: "Номер карты",
    cardName: "Владелец карты",
    copy: "Копировать",
    copied: "Скопировано!",
    dummyCard: "8600 1234 5678 9012",
    dummyName: "Aliyev Ali",
    langRu: "РУ",
    langUz: "УЗ"
  }
} as const;

type Lang = keyof typeof DICT;

// --- DECORATIVE DIVIDER ---
const FloralDivider = () => (
  <div className="flex justify-center items-center my-16 opacity-70">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#B8965B]"></div>
    <div className="mx-4 text-[#B8965B]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    </div>
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#B8965B]"></div>
  </div>
);

// --- FLOATING PARTICLES (Elegant) ---
const FloatingParticles = () => {
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 15
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute bottom-[-10px] bg-[#dfcaa2] rounded-full blur-[1px] opacity-20"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, Math.random() * 40 - 20, Math.random() * -40 + 20, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// --- COUNTDOWN HOOK ---
const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  return timeLeft;
};

// --- MAIN APP ---
export default function App() {
  const [lang, setLang] = useState<Lang>('uz');
  const t = DICT[lang];

  const { days, hours, minutes, seconds } = useCountdown('2026-07-25T18:00:00');

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(t.dummyCard.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <div className="relative w-full min-h-screen font-sans bg-[var(--color-wedding-bg)]">
      <FloatingParticles />

      {/* PUBLIC DOMAIN WEDDING MUSIC */}
      <audio ref={audioRef} loop preload="auto">
        <source src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Canon_in_D_Major_-_Kevin_MacLeod.ogg" type="audio/ogg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" type="audio/mpeg" />
      </audio>

      {/* FLOATING CONTROLS */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <button
          onClick={() => setLang(lang === 'uz' ? 'ru' : 'uz')}
          className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 text-xs tracking-widest uppercase text-slate-800 hover:bg-white/60 transition-colors shadow-sm"
        >
          {lang === 'uz' ? t.langRu : t.langUz}
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <button
          onClick={toggleMusic}
          className="bg-white/40 backdrop-blur-md w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/60 hover:scale-105 transition-all text-[#B8965B] shadow-lg"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center p-6 text-center z-10 overflow-hidden">
        {/* Full screen background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover object-top"
            alt="Wedding couple"
          />
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
           className="relative z-10 text-white max-w-4xl w-full flex flex-col items-center"
        >
          <p className="text-xs md:text-sm font-light tracking-[0.3em] uppercase mb-8 md:mb-12 opacity-80 shadow-black drop-shadow-md">
            {t.heroTagline}
          </p>
          
          <h1 className="font-script text-7xl md:text-9xl text-white mb-8 drop-shadow-xl font-normal tracking-wide" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            {t.names}
          </h1>
          
          <p className="text-xl md:text-3xl font-serif italic mb-16 opacity-90 drop-shadow-md">
            {t.dateFull}
          </p>

          <FloralDivider />

          {/* COUNTDOWN */}
          <div className="flex justify-center gap-6 md:gap-12 mt-8 backdrop-blur-sm bg-black/20 px-8 py-6 rounded-2xl border border-white/10">
            {[
              { label: t.days, value: days },
              { label: t.hours, value: hours },
              { label: t.minutes, value: minutes },
              { label: t.seconds, value: seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center w-16 md:w-20">
                <div className="text-3xl md:text-5xl font-serif mb-2 text-white/90 drop-shadow-md">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#dfcaa2]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* LOVE STORY SECTION */}
      <section className="relative py-28 md:py-36 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <div className="order-2 md:order-1 relative">
              <div className="aspect-[4/5] overflow-hidden rounded-t-[10rem] border border-[#dfcaa2]/30 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800" 
                  alt="Our story" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-[1px] border-[#B8965B]/20 m-4 rounded-t-[10rem] pointer-events-none"></div>
              </div>
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <span className="font-script text-4xl md:text-5xl text-[#B8965B] block mb-2">The Beginning</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-8 text-slate-800 uppercase tracking-widest text-sm">
                {t.storyTitle}
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-serif italic">
                {t.storyText}
              </p>
              <div className="mt-8 flex justify-center md:justify-start text-[#B8965B]">
                 <Heart size={20} fill="currentColor" className="opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="w-full flex justify-center"><FloralDivider /></div>

      {/* EVENT DETAILS SECTION */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <span className="font-script text-4xl text-[#B8965B] block mb-2">Join Us</span>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-slate-800 uppercase tracking-[0.15em]">
              {t.eventTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Details Card */}
            <motion.div 
              className="bg-white/60 backdrop-blur-sm p-12 rounded-t-full shadow-sm border border-[#dfcaa2]/40 flex flex-col items-center text-center justify-center relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-3 border-[1px] border-[#B8965B]/10 rounded-t-full pointer-events-none"></div>
              
              <div className="flex flex-col items-center gap-6 z-10">
                <div className="flex flex-col items-center">
                  <Calendar className="text-[#B8965B] mb-3" size={28} strokeWidth={1.5} />
                  <h3 className="font-serif text-2xl mb-1 text-slate-800">{t.eventDate}</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">{t.days}</p>
                </div>
                
                <div className="w-12 h-[1px] bg-[#dfcaa2]"></div>

                <div className="flex flex-col items-center">
                  <Clock className="text-[#B8965B] mb-3" size={28} strokeWidth={1.5} />
                  <h3 className="font-serif text-xl mb-1 text-slate-800">{t.eventTime}</h3>
                </div>

                <div className="w-12 h-[1px] bg-[#dfcaa2]"></div>

                <div className="flex flex-col items-center">
                  <MapPin className="text-[#B8965B] mb-3" size={28} strokeWidth={1.5} />
                  <h3 className="font-serif text-xl mb-1 text-slate-800">{t.eventLocation}</h3>
                </div>
              </div>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div
              className="w-full min-h-[400px] h-full overflow-hidden shadow-md relative bg-stone-200"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11342.34586419077!2d69.2131972740924!3d41.32832819864222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba578f4f58d%3A0xd7a2ecf23413b7a0!2z0KLQsNGI0LrQtdC90YI!5e0!3m2!1sru!2s!4v1700000000000!5m2!1sru!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="relative py-28 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
          >
            <span className="font-script text-4xl text-[#B8965B] block mb-2">Memories</span>
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-slate-800 uppercase tracking-[0.15em]">
              {t.galleryTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                className={`aspect-[3/4] relative overflow-hidden bg-stone-100 group ${idx % 2 === 0 ? 'md:mt-0' : 'md:mt-12'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <img 
                  src={src} 
                  alt="Wedding moment" 
                  className="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center"><FloralDivider /></div>

      {/* TO'YONA / GIFT SECTION - ELEGANT CARD DESIGN */}
      <section className="relative py-20 px-6 z-10 mb-20">
         <div className="max-w-xl mx-auto">
           <motion.div 
             className="bg-[#fffdf9] p-10 md:p-16 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-[#dfcaa2]/50 relative"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeUpVariant}
           >
              {/* Elegant dual border inside */}
              <div className="absolute inset-2 border-[1px] border-[#B8965B]/20 pointer-events-none"></div>
              <div className="absolute inset-3 border-[1px] border-[#B8965B]/10 pointer-events-none"></div>

              <div className="text-center mb-10 relative z-10">
                <Gift className="mx-auto text-[#B8965B] mb-6" size={36} strokeWidth={1} />
                <h2 className="text-2xl md:text-3xl font-serif mb-6 text-slate-800 uppercase tracking-widest">{t.giftTitle}</h2>
                <p className="text-slate-500 font-serif italic leading-relaxed text-sm md:text-base max-w-sm mx-auto">{t.giftSub}</p>
              </div>

               {/* Elegant Print Card UI */}
              <div className="relative p-8 bg-white border border-[#B8965B]/20 flex flex-col items-center text-center shadow-sm mb-8 z-10">
                 <CreditCard className="text-[#B8965B] mb-4 opacity-70" size={24} strokeWidth={1} />
                 
                 <div className="mb-6">
                    <div className="text-[#B8965B] text-[10px] tracking-[0.2em] uppercase mb-2">{t.cardNumber}</div>
                    <div className="text-xl md:text-2xl font-serif tracking-[0.1em] text-slate-800">
                      {t.dummyCard}
                    </div>
                 </div>

                 <div>
                    <div className="text-[#B8965B] text-[10px] tracking-[0.2em] uppercase mb-2">{t.cardName}</div>
                    <div className="text-lg font-serif italic text-slate-700">
                      {t.dummyName}
                    </div>
                 </div>
              </div>

              <button 
                onClick={handleCopy}
                className="w-full relative z-10 bg-transparent border border-[#B8965B] hover:bg-[#B8965B] hover:text-white text-[#B8965B] py-4 font-serif text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? t.copied : t.copy}
              </button>
           </motion.div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 flex flex-col items-center bg-[#2A2A2A] text-white z-10 relative">
        <h2 className="font-script text-5xl text-[#dfcaa2] mb-4">{t.names}</h2>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#8c8c8c]">
          25 July 2026
        </p>
      </footer>
    </div>
  );
}
