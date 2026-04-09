import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { AIWorks } from "./components/AIWorks";
import { SportsPicks } from "./components/SportsPicks";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="size-full">
      <Navigation />
      <Hero />
      <AIWorks />
      <SportsPicks />
      <Contact />
    </div>
  );
}