import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";  // Import the ThemeProvider

// Lazy loaded sections
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <ThemeProvider>  {/* Wrap the entire app with ThemeProvider */}
      <div className="min-h-screen select-none">
        {/* Navigation */}
        <Navbar />
        {/* Main content area */}
        <main>
          <Suspense fallback={
            // <div className="h-screen flex items-center justify-center text-center"><p>Loading...</p></div>
            <div className="h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          }>
            {/* Lazy loading wrapper */}
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </Suspense>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;