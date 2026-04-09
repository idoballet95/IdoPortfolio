import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#F5F5DC" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1699586197060-fbc6d8b20ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxtaW5pbWFsaXN0JTIwYmVpZ2UlMjB3b3Jrc3BhY2UlMjBjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzU3MTUwMDl8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Minimalist workspace"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1
            className="mb-6 tracking-tight"
            style={{
              fontSize: "clamp(4rem, 12vw, 9rem)",
              fontWeight: 800,
              lineHeight: 0.9,
            }}
          >
            ido.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <p
            className="tracking-[0.3em] opacity-80"
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
