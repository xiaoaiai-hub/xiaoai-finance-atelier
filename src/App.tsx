import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, usePresence, type Variants } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  ChartCandlestick,
  MessageCircle,
  Plus,
  QrCode,
  TrendingUp,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

const assetBase = "https://xiaoaiai-hub.github.io/xiaoai-finance/images";
const flowerVideoUrl = "https://res.cloudinary.com/dprydfxok/video/upload/v1782698816/flowers_motion_r54og5.webm";

const chaptersData = [
  {
    name: "AI 投研",
    label: "AI Research",
    image: `${assetBase}/hero-cat.jpg`,
    description: "把 GPT、Claude 和量化模型，变成普通人也能调用的研究员。",
  },
  {
    name: "财经，但人话",
    label: "Market Notes",
    image: `${assetBase}/pink-butterfly.jpg`,
    description: "K 线、利差、流动性、周期，用一杯咖啡的时间讲明白。",
  },
  {
    name: "女生的钱包态度",
    label: "Money Mindset",
    image: `${assetBase}/fashion.jpg`,
    description: "从理性消费到第一笔基金，财经也可以很美、很温柔。",
  },
  {
    name: "热点拆解",
    label: "Signal Brief",
    image: `${assetBase}/pink-dress.jpg`,
    description: "追踪 AI、市场和宏观变化，筛掉噪音，留下真正值得看的信号。",
  },
  {
    name: "商务合作",
    label: "Brand Collab",
    image: `${assetBase}/white-dress.jpg`,
    description: "为金融、AI、生活方式品牌创作有温度、有解释力的内容。",
  },
];

const navLinks = ["首页", "关于", "作品", "合作"];

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const letterBlock: Variants = {
  initial: { y: 120, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const sectionStagger: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15, delayChildren: 0.6 },
  },
};

function RoseMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 4c-2.7 2.4-3.7 4.7-3 7 1 2.2 2.6 3.4 3 3.6.4-.2 2-1.4 3-3.6 1-2.3 0-4.6-3-7Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 14.5c4.2-1.3 7.2-.8 9 1.4 1.8 2.1 1.7 4.2 1.3 5.2-1 .3-3.2.1-5.5-1.9-2-1.7-3.6-3.3-4.8-4.7Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M23 14.5c-4.2-1.3-7.2-.8-9 1.4-1.8 2.1-1.7 4.2-1.3 5.2 1 .3 3.2.1 5.5-1.9 2-1.7 3.6-3.3 4.8-4.7Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function BloomBadge() {
  const topId = useId();
  const bottomId = useId();

  return (
    <div className="pointer-events-none hidden h-[140px] w-[140px] items-center justify-center rounded-full border border-[#b98763]/40 p-3 text-[#8b5e3c] md:flex">
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 120 120"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path id={topId} d="M 22 60 A 38 38 0 0 1 98 60" />
            <path id={bottomId} d="M 98 60 A 38 38 0 0 1 22 60" />
          </defs>
          <text className="fill-[#8b5e3c] font-mono text-[10px] font-normal tracking-[0.32em]">
            <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
              BLOOMING
            </textPath>
          </text>
          <text className="fill-[#8b5e3c] font-mono text-[10px] font-normal tracking-[0.32em]">
            <textPath href={`#${bottomId}`} startOffset="50%" textAnchor="middle">
              SIGNALS
            </textPath>
          </text>
          <circle cx="12" cy="60" r="2.5" fill="#c98d8a" />
          <circle cx="108" cy="60" r="2.5" fill="#c98d8a" />
        </motion.svg>
        <RoseMark />
      </div>
    </div>
  );
}

function SandTransitionImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isPresent, safeToRemove] = usePresence();
  const filterId = useRef(`sand-${Math.random().toString(36).slice(2)}`);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const offsetRef = useRef<SVGFEOffsetElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const matrixRef = useRef<SVGFEColorMatrixElement>(null);

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();
    const duration = 900;

    const setProgress = (progress: number) => {
      const scale = progress * 150;
      const dy = isPresent ? -80 * progress : 120 * progress;
      const dx = isPresent ? -30 * progress : 30 * progress;
      const blur = progress * 6;
      const opacity = Math.max(0, 1 - progress * 1.2);

      displacementRef.current?.setAttribute("scale", scale.toFixed(2));
      offsetRef.current?.setAttribute("dy", dy.toFixed(2));
      offsetRef.current?.setAttribute("dx", dx.toFixed(2));
      blurRef.current?.setAttribute("stdDeviation", blur.toFixed(2));
      matrixRef.current?.setAttribute(
        "values",
        `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${opacity.toFixed(3)} 0`
      );
    };

    const tick = (now: number) => {
      const t = Math.min((now - startedAt) / duration, 1);
      const eased = isPresent ? 1 - Math.pow(1 - t, 4) : Math.pow(t, 3);
      const progress = isPresent ? 1 - eased : eased;
      setProgress(progress);

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!isPresent) {
        safeToRemove();
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPresent, safeToRemove]);

  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id={filterId.current} x="-35%" y="-45%" width="170%" height="190%">
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="4" result="noise" />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feOffset ref={offsetRef} in="displaced" dx="0" dy="0" result="offset" />
          <feGaussianBlur ref={blurRef} in="offset" stdDeviation="0" result="blurred" />
          <feColorMatrix ref={matrixRef} in="blurred" type="matrix" result="faded" />
        </filter>
      </svg>
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={{ filter: `url(#${filterId.current})` }}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </>
  );
}

function XiaoAiLogo() {
  const letters = "XIAO AI".split("");

  return (
    <motion.h1
      className="flex w-full items-end justify-between overflow-hidden font-sans text-[clamp(3.2rem,13vw,12rem)] font-medium leading-[0.78] tracking-normal text-[#211714]"
      initial="initial"
      animate="animate"
      variants={{
        initial: { scale: 1.03 },
        animate: {
          scale: 1,
          transition: { staggerChildren: 0.055, delayChildren: 0.1 },
        },
      }}
      aria-label="Xiao Ai"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterBlock}
          className={letter === " " ? "w-[0.08em]" : "inline-block"}
        >
          {letter === " " ? "\u00a0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}

function App() {
  const [showVisual, setShowVisual] = useState(false);
  const [activeChapter, setActiveChapter] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowVisual(true), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % chaptersData.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const currentChapter = chaptersData[activeChapter];
  const actionPills: Array<[LucideIcon, string]> = [
    [Bot, "AI 投研"],
    [ChartCandlestick, "量化策略"],
    [TrendingUp, "财经热点"],
    [BrainCircuit, "大模型与市场"],
    [WalletCards, "理财思维"],
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf4ee] text-[#211714] selection:bg-black selection:text-white">
      <section className="order-2 relative flex min-h-screen w-full flex-col overflow-hidden bg-[#fbf4ee]">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(185,135,99,0.12)_1px,transparent_0)] bg-[length:24px_24px]" />

        <AnimatePresence>
          {showVisual && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-35"
                src={flowerVideoUrl}
              />
              <img
                src={`${assetBase}/pink-butterfly.jpg`}
                alt=""
                className="absolute right-[-12vw] top-[22vh] h-[62vh] w-[48vw] rounded-l-[42vw] object-cover opacity-38 blur-[1px]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#fbf4ee]/45 via-[#fbf4ee]/76 to-[#fbf4ee]" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.header
          className="relative z-20 px-6 pt-6 md:px-16"
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          <XiaoAiLogo />

          <div className="mt-8 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em] md:text-[11px]">
            <motion.div variants={fadeUp} className="w-[15%] shrink-0 leading-relaxed">
              <div>Xiao Ai</div>
              <div>Finance</div>
              <div>Atelier</div>
            </motion.div>

            <motion.div variants={fadeUp} className="hidden w-[5%] justify-center pt-1 text-[#b98763] md:flex">
              <ArrowRight size={14} strokeWidth={1} />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="max-w-[360px] flex-1 leading-relaxed text-[#5b4a45] md:w-[30%] md:flex-none"
            >
              <span className="hidden md:inline">
                AI × Finance creator
                <br />
                explaining money, models
                <br />
                and markets with warmth.
              </span>
              <span className="md:hidden">
                AI × Finance creator
                <br />
                explaining money,
                <br />
                models and markets
                <br />
                with warmth.
              </span>
            </motion.p>

            <motion.div variants={fadeUp} className="hidden w-[5%] justify-center pt-1 text-[#b98763] md:flex">
              <ArrowRight size={14} strokeWidth={1} />
            </motion.div>

            <motion.nav variants={fadeUp} className="hidden w-[15%] flex-col items-start gap-2 text-[#5b4a45] md:flex">
              {navLinks.map((link) => (
                <a key={link} href="#" className="transition hover:text-[#211714] hover:underline">
                  {link}
                </a>
              ))}
            </motion.nav>

            <motion.button
              variants={fadeUp}
              type="button"
              className="relative z-[60] ml-5 flex flex-col gap-[6px] pt-1"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span
                className={`h-[1.5px] bg-[#211714] transition-all duration-300 ${
                  isMobileMenuOpen ? "w-9 translate-y-[3.75px] rotate-45" : "w-8 hover:w-6"
                }`}
              />
              <span
                className={`h-[1.5px] bg-[#211714] transition-all duration-300 ${
                  isMobileMenuOpen ? "w-9 -translate-y-[3.75px] -rotate-45" : "w-8 hover:w-10"
                }`}
              />
            </motion.button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="absolute left-0 top-full z-50 w-full border-b border-[#ead8cc] bg-[#fbf4ee] px-6 py-8 shadow-xl md:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <nav className="space-y-6 font-mono text-sm uppercase tracking-[0.2em]">
                  {navLinks.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-[#211714]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <div className="relative z-10 flex flex-1 justify-between">
          <motion.div
            className="mt-20 w-[350px] px-10 sm:mt-28 md:mt-32 md:px-16"
            initial="initial"
            animate="animate"
            variants={sectionStagger}
          >
            <motion.div variants={fadeUp} className="mb-7 flex items-center gap-4 font-mono text-xs text-[#8b5e3c]">
              <span>01</span>
              <span className="h-[1.5px] w-16 bg-[#b98763]/35" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mb-7 text-[2.8rem] font-normal leading-[1.05] tracking-normal md:text-[4.2rem]"
            >
              温柔
              <br />
              财经
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mb-8 w-[260px] text-[13px] leading-[1.75] text-[#5b4a45] md:text-[14px]"
            >
              我是小爱。在 AI 与财经的交汇处，用一支麦克风、一只猫和一颗细腻的心，把复杂市场讲成听得懂的故事。
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="#explore"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md border border-[#211714] bg-[#211714] px-6 py-3.5 text-[#fbf4ee] shadow-sm transition-all duration-300 hover:-translate-y-[0.5px] hover:text-[#211714] hover:shadow-[3px_3px_0px_rgba(139,94,60,0.45)] active:translate-y-0 active:shadow-sm"
            >
              <span className="absolute inset-0 -translate-x-[101%] bg-[#fbf4ee] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
              <span className="relative transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-12 group-hover:scale-110">
                <RoseMark />
              </span>
              <span className="relative text-[15px] font-medium">看看作品</span>
            </motion.a>
          </motion.div>

          <motion.aside
            className="mr-16 mt-20 hidden w-[220px] flex-col gap-10 md:flex"
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
            }}
          >
            <motion.div variants={fadeUp}>
              <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest">
                AI Finance Creator
              </h3>
              <p className="text-[12px] leading-[1.6] text-[#5b4a45]">
                抖音原创内容
                <br />
                ID · 76895231haoyun
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#998579]">Followers</div>
                <div className="text-[13px] font-medium">120K+</div>
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#998579]">Videos</div>
                <div className="text-[13px] font-medium">300+</div>
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#998579]">Rating</div>
                <div className="text-[13px] font-medium">98%</div>
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#998579]">Weekly</div>
                <div className="text-[13px] font-medium">3-5</div>
              </div>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#collection"
              className="group flex items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-widest"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b98763] transition duration-300 group-hover:border-[#211714] group-hover:bg-[#211714]">
                <Plus size={16} strokeWidth={1.5} className="transition group-hover:text-[#fbf4ee]" />
              </span>
              View Content
            </motion.a>
          </motion.aside>
        </div>

        <div className="absolute bottom-[9rem] right-[8%] z-10">
          <BloomBadge />
        </div>

        <motion.div
          className="absolute bottom-10 left-[2.5rem] z-10 hidden items-center gap-4 md:left-[4rem] md:flex"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d9c2b4]">
            <div className="flex gap-[4px]">
              <span className="h-[12px] w-[1px] bg-[#8b5e3c]" />
              <span className="h-[12px] w-[1px] bg-[#8b5e3c]" />
            </div>
          </div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#998579]">
            Scroll to read
          </span>
        </motion.div>
      </section>

      <section
        id="explore"
        className="order-1 relative z-20 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#211714] pb-0 pt-24 text-[#fbf4ee] md:pt-28"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover brightness-110 saturate-110"
          src={flowerVideoUrl}
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#fbf4ee]/[0.08]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#fbf4ee]/[0.18] via-transparent to-[#211714]/[0.28]" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#fff8f2] md:px-16 md:pt-8">
          <div className="leading-relaxed">
            <div>Xiao Ai</div>
            <div>Finance</div>
            <div>Atelier</div>
          </div>
          <div className="hidden max-w-[240px] text-right leading-relaxed text-[#f3d9d7]/80 md:block">
            AI × Finance creator
            <br />
            money, models and markets
          </div>
        </div>

        <div className="relative z-10 mb-12 font-mono text-[10px] tracking-[0.2em] text-[#f3d9d7] md:text-[11px]">
          <span className="text-[#f3d9d7]/70">[ 01 ]</span>{" "}
          <span className="font-bold uppercase text-[#fff8f2]">AI Finance Lens</span>
        </div>

        <motion.h2
          className="relative z-10 max-w-[760px] px-6 text-center text-[1.65rem] font-normal leading-[1.35] tracking-normal text-[#fff8f2] drop-shadow-[0_2px_18px_rgba(33,23,20,0.28)] md:text-[2.45rem] lg:text-[3rem]"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          把复杂的财经，讲得更清楚。
        </motion.h2>

        <motion.div
          className="relative z-10 mb-10 mt-10 flex max-w-[850px] flex-wrap justify-center gap-3 px-6 md:mb-20 md:gap-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
          }}
        >
          {actionPills.map(([Icon, label]) => (
            <motion.button
              key={label}
              type="button"
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#f3d9d7]/60 bg-[#211714]/25 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider text-[#fff8f2] backdrop-blur-sm transition duration-300 hover:border-[#fff8f2] hover:bg-[#fff8f2] hover:text-[#211714]"
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </motion.button>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 z-10 hidden w-full justify-between px-8 pb-8 font-mono text-[10px] font-medium uppercase tracking-widest text-[#f3d9d7]/75 md:flex md:px-16 md:pb-12">
          <span>WE DON'T JUST TALK ABOUT MONEY.</span>
          <span>AI FINANCE ATELIER (C) 2026</span>
        </div>
      </section>

      <section id="collection" className="order-3 relative z-30 flex w-full flex-col bg-[#0f0b0a] text-[#fbf4ee]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden opacity-30">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            src={flowerVideoUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0b0a]/25 to-[#0f0b0a]" />
        </div>

        <div className="relative z-10 mb-12 flex flex-col justify-between gap-10 px-8 pt-24 md:mb-16 md:px-16 md:pt-32 xl:flex-row">
          <h2 className="max-w-[560px] text-[1.4rem] font-normal leading-[1.4] tracking-normal text-[#fbf4ee] md:text-[2rem] lg:text-[2.5rem] xl:text-[2.8rem]">
            把市场信号，讲成日常语言。
          </h2>

          <div className="shrink-0 xl:w-[360px]">
            <p className="mb-6 font-mono text-[9px] uppercase leading-relaxed tracking-widest text-[#bda89c] md:text-[10px]">
              NOT COLD FINANCE
              <br />
              BUT CLEAR, GENTLE SIGNALS
            </p>
            <div className="flex flex-wrap gap-3">
              {["新手友好", "女生视角", "AI 原创"].map((pill) => (
                <button
                  key={pill}
                  type="button"
                  className="rounded-full border border-[#6d5148] px-5 py-2 font-mono text-[9px] uppercase tracking-widest text-[#d8c2b4] transition duration-300 hover:border-[#fbf4ee] hover:bg-[#fbf4ee] hover:text-[#211714]"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#3a2b27]" />

        <div className="relative z-10 flex flex-col md:flex-row">
          <div className="relative flex min-h-[400px] flex-col justify-between border-b border-[#3a2b27] p-8 md:min-h-[500px] md:w-[35%] md:border-b-0 md:border-r">
            <div className="text-xl tracking-[0.3em] text-[#6d5148]">***</div>

            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <SandTransitionImage
                  key={currentChapter.image}
                  src={currentChapter.image}
                  alt={currentChapter.name}
                  className="absolute inset-0 m-auto h-[82%] w-[82%] rounded-lg object-cover opacity-95"
                />
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#bda89c]">
              <div className="h-4 overflow-hidden">
                <motion.div
                  key={activeChapter}
                  initial={{ y: 16 }}
                  animate={{ y: 0 }}
                  exit={{ y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {String(activeChapter + 1).padStart(2, "0")}
                </motion.div>
              </div>
              <span className="text-[#6d5148]">/</span>
              <span>05</span>
            </div>
          </div>

          <div className="md:w-[65%]">
            <div className="flex items-center justify-between border-b border-[#3a2b27] p-8 font-mono text-[10px] uppercase tracking-widest text-[#bda89c]">
              <span>Read money. Decode models. Stay soft.</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeChapter}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="hidden md:block"
                >
                  Chapter {String(activeChapter + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>

            <div>
              {chaptersData.map((chapter, index) => {
                const isActive = activeChapter === index;
                return (
                  <button
                    key={chapter.name}
                    type="button"
                    onClick={() => setActiveChapter(index)}
                    className={`group flex w-full items-center justify-between border-b border-[#3a2b27]/90 px-8 py-8 text-left transition duration-300 ${
                      isActive ? "text-[#fbf4ee]" : "text-[#6d5148] hover:text-[#bda89c]"
                    }`}
                  >
                    <span>
                      <span className="block text-2xl font-medium tracking-normal md:text-[2rem]">
                        {chapter.name}
                      </span>
                      <span className="mt-3 block max-w-[560px] text-[12px] leading-relaxed text-[#bda89c]">
                        {chapter.description}
                      </span>
                    </span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: -10, y: 10 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          exit={{ opacity: 0, x: 8, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="text-[#c9a48a]"
                        >
                          <ArrowUpRight size={22} strokeWidth={1} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#3a2b27]" />
        <footer className="grid gap-6 bg-[#0f0b0a] px-8 py-8 font-mono text-[10px] uppercase tracking-widest text-[#bda89c] md:grid-cols-3">
          <span>XIAO AI · AI FINANCE ATELIER</span>
          <span className="flex items-center gap-2">
            <QrCode size={13} /> DOUYIN · 76895231HAOYUN
          </span>
          <span className="flex items-center gap-2 md:justify-end">
            <MessageCircle size={13} /> BRAND COLLAB · CONTACT
          </span>
        </footer>
      </section>
    </div>
  );
}

export default App;
