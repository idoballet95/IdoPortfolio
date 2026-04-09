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
            src="https://images.pexels.com/photos/5012083/pexels-photo-5012083.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Sporty editorial background in beige tones"
            className="h-full w-full object-cover object-center brightness-[0.94] contrast-[1.01] saturate-[0.86]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(247,241,230,0.70)_0%,rgba(239,229,214,0.46)_44%,rgba(232,221,206,0.60)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.42),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,236,223,0.18)_0%,rgba(243,236,223,0.08)_46%,rgba(243,236,223,0.26)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1
            className="mb-6 tracking-tight text-[#1f1c18]"
            style={{
              fontSize: "clamp(4rem, 12vw, 9rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              textShadow: "0 8px 30px rgba(255, 255, 255, 0.28)",
            }}
          >
            i.do
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <p
            className="tracking-[0.3em] text-[#2d2924]/80"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              fontWeight: 300,
              letterSpacing: "0.3em",
            }}
          >
            i.do.picks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-12"
        >
          <button
            onClick={() => {
              document.getElementById("ai-works")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-[#333333] text-[#F5F5DC] rounded-2xl transition-all hover:scale-105 hover:shadow-lg"
            style={{ fontWeight: 500 }}
          >
            Explore Works
          </button>
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
