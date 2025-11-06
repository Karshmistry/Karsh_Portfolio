import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { scrollToSection as scrollToSectionUtil } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    scrollToSectionUtil(id);
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? "bg-background/98 backdrop-blur-xl border-b border-border shadow-lg transform translate-y-0" 
            : "bg-background/10 backdrop-blur-sm transform translate-y-0"
        }`}
      >
        <div className="container mx-auto px-6 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            {/* Logo - positioned more to the left */}
            <div className="flex items-center">
              <div className="relative">
                <div className="text-3xl md:text-4xl font-bold gradient-text cursor-pointer hover:scale-110 transition-all duration-300 relative z-10" 
                     onClick={() => scrollToSection("home")}>
                  KM
                </div>
                <div className="absolute inset-0 text-3xl md:text-4xl font-bold gradient-text blur-sm opacity-50 -z-10">
                  KM
                </div>
              </div>
              <div className="hidden sm:block ml-4 text-sm text-muted-foreground font-medium">
                Portfolio
              </div>
            </div>
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-lg">
                <button 
                  onClick={() => scrollToSection("home")} 
                  className={`text-sm font-medium transition-all duration-200 py-2 px-4 rounded-full nav-pill ${
                    activeSection === "home" 
                      ? "text-primary bg-primary/20 shadow-sm" 
                      : "text-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className={`text-sm font-medium transition-all duration-200 py-2 px-4 rounded-full nav-pill ${
                    activeSection === "about" 
                      ? "text-primary bg-primary/20 shadow-sm" 
                      : "text-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection("skills")} 
                  className={`text-sm font-medium transition-all duration-200 py-2 px-4 rounded-full nav-pill ${
                    activeSection === "skills" 
                      ? "text-primary bg-primary/20 shadow-sm" 
                      : "text-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  Skills
                </button>
                <button 
                  onClick={() => scrollToSection("projects")} 
                  className={`text-sm font-medium transition-all duration-200 py-2 px-4 rounded-full nav-pill ${
                    activeSection === "projects" 
                      ? "text-primary bg-primary/20 shadow-sm" 
                      : "text-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  Projects
                </button>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className={`text-sm font-medium transition-all duration-200 py-2 px-4 rounded-full nav-pill ${
                    activeSection === "contact" 
                      ? "text-primary bg-primary/20 shadow-sm" 
                      : "text-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Right side - CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Button 
                variant="hero" 
                onClick={() => scrollToSection("contact")}
                className="hidden md:inline-flex text-base px-6 py-2 hover:scale-105 transition-transform"
              >
                Hire Me
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-card/50 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-20 left-4 right-4 bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection("home")} 
                className={`text-lg font-medium transition-colors text-left py-3 px-4 rounded-lg ${
                  activeSection === "home" 
                    ? "text-primary bg-primary/20 border-l-2 border-primary" 
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("about")} 
                className={`text-lg font-medium transition-colors text-left py-3 px-4 rounded-lg ${
                  activeSection === "about" 
                    ? "text-primary bg-primary/20 border-l-2 border-primary" 
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("skills")} 
                className={`text-lg font-medium transition-colors text-left py-3 px-4 rounded-lg ${
                  activeSection === "skills" 
                    ? "text-primary bg-primary/20 border-l-2 border-primary" 
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection("projects")} 
                className={`text-lg font-medium transition-colors text-left py-3 px-4 rounded-lg ${
                  activeSection === "projects" 
                    ? "text-primary bg-primary/20 border-l-2 border-primary" 
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className={`text-lg font-medium transition-colors text-left py-3 px-4 rounded-lg ${
                  activeSection === "contact" 
                    ? "text-primary bg-primary/20 border-l-2 border-primary" 
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                Contact
              </button>
              <div className="pt-4 border-t border-border">
                <Button 
                  variant="hero" 
                  onClick={() => scrollToSection("contact")}
                  className="w-full text-lg py-3"
                >
                  Hire Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
