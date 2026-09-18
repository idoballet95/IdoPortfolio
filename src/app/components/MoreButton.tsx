import { ArrowUpRight } from "lucide-react";

export function MoreButton({ label, onClick, dark = false }: { label: string; onClick: () => void; dark?: boolean }) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className={`group inline-flex items-center gap-3 border px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[.14em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${dark ? "border-white/30 text-white/80 hover:border-[#d8e65b] hover:text-[#d8e65b]" : "border-black/25 text-black/70 hover:border-black hover:bg-black hover:text-white"}`}
      >
        {label}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
