import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { AIWorks } from "./components/AIWorks";
import { SportsPicks } from "./components/SportsPicks";
import { Contact } from "./components/Contact";
import { FavoritesPage } from "./components/FavoritesPage";
import { WorkGallery } from "./components/WorkGallery";
import { ImagesPage } from "./components/ImagesPage";
import { VideosPage } from "./components/VideosPage";
import { WorkDetail } from "./components/WorkDetail";
import { LanguageProvider } from "./i18n/LanguageContext";
import { SportsPicksPage } from "./components/SportsPicksPage";
import { YenaCuration } from "./components/YenaCuration";

function HomePage() {
  return (
    <main id="main-content" className="size-full">
      <Navigation />
      <Hero />
      <AIWorks />
      <SportsPicks />
      <Contact />
    </main>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const element = document.getElementById(location.hash.slice(1));
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location]);

  return (
    <LanguageProvider>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<><Navigation /><WorkGallery /></>} />
        <Route path="/work/images" element={<><Navigation /><ImagesPage /></>} />
        <Route path="/work/videos" element={<><Navigation /><VideosPage /></>} />
        <Route path="/work/:slug" element={<><Navigation /><WorkDetail /></>} />
        <Route path="/sports-picks" element={<><Navigation /><SportsPicksPage /></>} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/curate/yena" element={<YenaCuration />} />
      </Routes>
    </LanguageProvider>
  );
}
