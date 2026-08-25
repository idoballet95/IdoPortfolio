import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import { Navigation } from "./Navigation";

const favoriteItems = [
  {
    id: 1,
    title: "Wefoot Yellow Socks",
    category: "Accessories",
    description:
      "Bold athletic socks that add an instant pop of energy to neutral sport styling.",
    image:
      "https://images.unsplash.com/photo-1750177894475-a9216d5bb3a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3BvcnRzd2VhciUyMGFjY2Vzc29yaWVzJTIwYW5rbGUlMjBicmFjZXxlbnwxfHx8fDE3NzU3MTUwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "$24.99",
  },
  {
    id: 2,
    title: "Zamst Ankle Brace",
    category: "Performance Gear",
    description:
      "A clean, performance-first staple that feels as considered as the outfit around it.",
    image:
      "https://images.unsplash.com/photo-1584464259191-7be140d0937b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwc3BvcnRzd2VhciUyMGFjY2Vzc29yaWVzJTIwYW5rbGUlMjBicmFjZXxlbnwxfHx8fDE3NzU3MTUwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "$89.99",
  },
  {
    id: 3,
    title: "Premium Sport Cleats",
    category: "Footwear",
    description:
      "Sharp enough for an editorial frame, practical enough to still feel grounded in sport.",
    image:
      "https://images.unsplash.com/photo-1768696082264-44f14594ca2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzb2NjZXIlMjBmb290YmFsbCUyMGZhc2hpb24lMjBzcG9ydHN8ZW58MXx8fHwxNzc1NzE1MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "$149.99",
  },
];

export function FavoritesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5efe4] text-[#1f1c18]">
      <Navigation />

      <main className="px-8 pb-24 pt-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/")}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#1f1c18]/12 bg-white/65 px-5 py-2.5 text-sm backdrop-blur-sm transition-opacity hover:opacity-75"
            style={{ fontWeight: 500 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </motion.button>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="mb-5 inline-block rounded-full bg-[#e8dcc9] px-4 py-2 text-xs tracking-[0.22em]"
                style={{ fontWeight: 600 }}
              >
                Ido&apos;s Edit
              </span>
              <h1
                className="max-w-3xl tracking-tight"
                style={{
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 700,
                  lineHeight: 0.94,
                }}
              >
                I.do&apos;s favorite sporty pieces, all in one place.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl text-lg leading-relaxed opacity-75"
              style={{ fontWeight: 300 }}
            >
              A tighter edit of the items that best match the site&apos;s fashion-meets-sport point
              of view. Clean, wearable, and still rooted in performance.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-16 overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/55 shadow-[0_24px_80px_rgba(99,77,52,0.08)]"
          >
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[420px]">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80"
                  alt="Sporty fashion editorial styling"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center px-8 py-10 lg:px-12">
                <p
                  className="text-sm uppercase tracking-[0.22em] opacity-50"
                  style={{ fontWeight: 600 }}
                >
                  Featured Curation
                </p>
                <h2 className="mt-4 text-4xl tracking-tight" style={{ fontWeight: 700 }}>
                  Sport styling with a softer editorial edge.
                </h2>
                <p className="mt-5 text-base leading-relaxed opacity-70" style={{ fontWeight: 300 }}>
                  These picks are meant to feel intentional rather than overly technical. Think
                  clean silhouettes, tonal accents, and gear that still looks considered outside
                  the gym or pitch.
                </p>
                <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-2xl bg-[#1f1c18] px-6 py-3 text-[#f5efe4]">
                  <ExternalLink className="h-4 w-4" />
                  <span style={{ fontWeight: 500 }}>Ido&apos;s Current Favorites</span>
                </div>
              </div>
            </div>
          </motion.div>

          <section className="mt-24">
            <div className="mb-10">
              <h2 className="text-3xl tracking-tight" style={{ fontWeight: 700 }}>
                Three Favorite Items
              </h2>
              <p className="mt-3 max-w-2xl opacity-70" style={{ fontWeight: 300 }}>
                The three pieces that anchor this edit live here at the bottom of the page.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {favoriteItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.25 + index * 0.08 }}
                  className="overflow-hidden rounded-[2rem] border border-white/45 bg-white/65 shadow-[0_20px_60px_rgba(99,77,52,0.08)]"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-4 px-6 py-6">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="rounded-full bg-[#efe4d3] px-3 py-1 text-xs tracking-[0.18em]"
                        style={{ fontWeight: 600 }}
                      >
                        {item.category}
                      </span>
                      <span className="opacity-65" style={{ fontWeight: 600 }}>
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl tracking-tight" style={{ fontWeight: 700 }}>
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed opacity-70" style={{ fontWeight: 300 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
