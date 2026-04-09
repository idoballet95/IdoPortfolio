import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, ShoppingCart } from "lucide-react";

interface Pick {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: string;
  featured?: boolean;
}

const picks: Pick[] = [
  {
    id: 1,
    title: "Balletcore & Blokecore",
    category: "Fashion Curation",
    description:
      "The intersection of delicate ballet aesthetics and rugged athletic wear creates a striking contrast that defines modern sports fashion.",
    image: "https://images.unsplash.com/photo-1764697584394-8fd4ba8df0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzb2NjZXIlMjBmb290YmFsbCUyMGZhc2hpb24lMjBzcG9ydHN8ZW58MXx8fHwxNzc1NzE1MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "Editorial",
    featured: true,
  },
  {
    id: 2,
    title: "Wefoot Yellow Socks",
    category: "Accessories",
    description:
      "Premium athletic socks with superior moisture-wicking technology. Bold yellow colorway for standout style.",
    image: "https://images.unsplash.com/photo-1750177894475-a9216d5bb3a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3BvcnRzd2VhciUyMGFjY2Vzc29yaWVzJTIwYW5rbGUlMjBicmFjZXxlbnwxfHx8fDE3NzU3MTUwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "$24.99",
  },
  {
    id: 3,
    title: "Zamst Ankle Brace",
    category: "Performance Gear",
    description:
      "Professional-grade ankle support combining stability and mobility. Essential for athletes seeking protection without compromise.",
    image: "https://images.unsplash.com/photo-1584464259191-7be140d0937b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwc3BvcnRzd2VhciUyMGFjY2Vzc29yaWVzJTIwYW5rbGUlMjBicmFjZXxlbnwxfHx8fDE3NzU3MTUwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "$89.99",
  },
  {
    id: 4,
    title: "Premium Sport Cleats",
    category: "Footwear",
    description: "High-performance cleats engineered for speed and precision on the pitch.",
    image: "https://images.unsplash.com/photo-1768696082264-44f14594ca2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzb2NjZXIlMjBmb290YmFsbCUyMGZhc2hpb24lMjBzcG9ydHN8ZW58MXx8fHwxNzc1NzE1MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "$149.99",
  },
];

export function SportsPicks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sports-picks"
      ref={sectionRef}
      className="py-24 lg:py-32 px-8 lg:px-16"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="mb-4 tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700 }}
          >
            Sports Picks
          </h2>
          <p className="opacity-70 max-w-2xl" style={{ fontSize: "1.125rem", fontWeight: 300 }}>
            Curated selections of premium athletic wear and accessories
          </p>
        </motion.div>

        {/* Featured Pick */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 lg:mb-24"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              className="relative overflow-hidden rounded-2xl aspect-[3/4]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={picks[0].image}
                alt={picks[0].title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="space-y-6">
              <span
                className="inline-block px-4 py-2 bg-[#F5F5DC] rounded-full text-xs tracking-wide"
                style={{ fontWeight: 500 }}
              >
                {picks[0].category}
              </span>

              <h3
                className="tracking-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
              >
                {picks[0].title}
              </h3>

              <p className="opacity-70 text-lg leading-relaxed" style={{ fontWeight: 300 }}>
                {picks[0].description}
              </p>

              <div className="flex gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#333333] text-[#F5F5DC] rounded-2xl flex items-center gap-2 transition-all hover:shadow-lg"
                  style={{ fontWeight: 500 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Read Review
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid Picks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {picks.slice(1).map((pick, index) => (
            <motion.div
              key={pick.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group"
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl mb-6 aspect-[3/4]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src={pick.image} alt={pick.title} className="w-full h-full object-cover" />
              </motion.div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 bg-[#F5F5DC] rounded-full text-xs tracking-wide"
                    style={{ fontWeight: 500 }}
                  >
                    {pick.category}
                  </span>
                  <span className="opacity-70" style={{ fontWeight: 600 }}>
                    {pick.price}
                  </span>
                </div>

                <h3 className="tracking-tight" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  {pick.title}
                </h3>

                <p className="opacity-70 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {pick.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 px-4 py-2 border-2 border-[#333333] text-[#333333] rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#333333] hover:text-[#F5F5DC]"
                  style={{ fontWeight: 500 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Shop via Amazon
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
