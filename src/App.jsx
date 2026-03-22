import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import NeonClickEffect from "./components/NeonClickEffect";

// Lazy loaded sections
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <Navbar />
        {/* Main Content */}
        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              }
            >
              <NeonClickEffect />
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default App;
