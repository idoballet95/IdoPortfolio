import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#f3ecdf" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0">
          <img
            src="/media/ido-hero-studio-v7.png"
            srcSet="/media/ido-hero-studio-v7.png 1672w, /media/ido-hero-studio-v7-2x.png 3344w"
            sizes="100vw"
            alt="i.do character with a French braid working behind a MacBook with an iced Americano"
            className="h-full w-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,230,0.36)_0%,rgba(247,241,230,0.08)_38%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,236,223,0.06)_0%,transparent_55%,rgba(243,236,223,0.14)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-6 text-left sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-end gap-5 sm:gap-8">
            <h1
              className="mb-6 shrink-0 tracking-tight text-[#1f1c18]"
              style={{
                fontSize: "clamp(4rem, 11vw, 9rem)",
                fontWeight: 800,
                lineHeight: 0.9,
                textShadow: "0 8px 30px rgba(255, 255, 255, 0.38)",
              }}
            >
              i.do
            </h1>
            <span aria-hidden="true" className="mb-[1.9rem] h-px w-[clamp(5rem,18vw,20rem)] bg-[#1f1c18] sm:mb-[2.35rem] lg:mb-[2.75rem]" />
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#333333]/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#333333]/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
