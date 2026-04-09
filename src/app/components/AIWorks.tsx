import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface WorkItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const works: WorkItem[] = [
  {
    id: 1,
    title: "Not Now Please",
    category: "AI Video",
    description: "YouTube series exploring modern digital interactions",
    image: "https://images.unsplash.com/photo-1655988940601-7702d8685f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwYmVpZ2UlMjB3b3Jrc3BhY2UlMjBjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzU3MTUwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["AI Video", "YouTube"],
  },
  {
    id: 2,
    title: "John",
    category: "3D Design",
    description: "3D character rendering with personality",
    image: "https://images.unsplash.com/photo-1772371272174-392cf9cfabae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHwzRCUyMGNoYXJhY3RlciUyMHJlbmRlciUyMGFydHxlbnwxfHx8fDE3NzU3MTUwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["3D Design", "Character"],
  },
  {
    id: 3,
    title: "Supernatural Soccer Girl",
    category: "Screenplay",
    description: "Concept art and screenplay development",
    image: "https://images.unsplash.com/photo-1735956929927-511f5f05ddaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMGZhc2hpb24lMjBzcG9ydHN8ZW58MXx8fHwxNzc1NzE1MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Screenplay", "Concept Art"],
  },
  {
    id: 4,
    title: "Digital Portraits",
    category: "AI Art",
    description: "AI-generated character studies",
    image: "https://images.unsplash.com/photo-1669605140640-d5908ffe8524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHwzRCUyMGNoYXJhY3RlciUyMHJlbmRlciUyMGFydHxlbnwxfHx8fDE3NzU3MTUwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["AI Art", "Portrait"],
  },
  {
    id: 5,
    title: "Abstract Forms",
    category: "3D Design",
    description: "Minimalist 3D compositions",
    image: "https://images.unsplash.com/photo-1742197143486-d6c7d146fbc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHwzRCUyMGNoYXJhY3RlciUyMHJlbmRlciUyMGFydHxlbnwxfHx8fDE3NzU3MTUwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["3D Design", "Abstract"],
  },
  {
    id: 6,
    title: "Character Studies",
    category: "3D Design",
    description: "Expressive character explorations",
    image: "https://images.unsplash.com/photo-1650229785916-2cbfe89c72c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHwzRCUyMGNoYXJhY3RlciUyMHJlbmRlciUyMGFydHxlbnwxfHx8fDE3NzU3MTUwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["3D Design", "Character"],
  },
];

export function AIWorks() {
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
      id="ai-works"
      ref={sectionRef}
      className="py-24 lg:py-32 px-8 lg:px-16"
      style={{ background: "#F5F5DC" }}
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
            AI Works
          </h2>
          <p className="opacity-70 max-w-2xl" style={{ fontSize: "1.125rem", fontWeight: 300 }}>
            Creative explorations in AI video, 3D design, and digital storytelling
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                <motion.img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/80 via-[#333333]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#FFFFFF] rounded-full text-xs tracking-wide"
                      style={{ fontWeight: 500 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="tracking-tight" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {work.title}
                </h3>

                <p className="opacity-70" style={{ fontSize: "0.9375rem", fontWeight: 300 }}>
                  {work.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
