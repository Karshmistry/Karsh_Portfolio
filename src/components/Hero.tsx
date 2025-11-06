import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { track } from "@vercel/analytics";
import profileImg from "@/assets/karsh.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import Bg from "@/assets/background.jpg";

const Hero = () => {
  const handleResumeView = () => {
    // Jumpshare resume link
    const resumeUrl = "https://jumpshare.com/s/sV1BkRLsnA5ht9MNxMee";

    // Track analytics
    track("Resume Viewed", {
      source: "Hero Button",
      format: "PDF",
      destination: "Jumpshare",
    });

    // Open resume in new tab
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-28 lg:pt-32 scroll-mt-0"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/90" />

      <div className="container mx-auto px-6 md:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight">
              Hello, I'm <span className="gradient-text">Karsh Mistry</span>
            </h1>

            <h2 className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-medium">
              Web Developer | Data Analyst | MERN Stack Specialist
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Specializing in web development and data analytics,
               I build robust, scalable applications with clean, 
               maintainable code and responsive interfaces.
                I leverage data to drive insights and turn ideas into production-ready products that deliver measurable results.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                variant="hero"
                size="lg"
                onClick={() => {
                  track("Hero CTA Clicked", {
                    button: "View Projects",
                    destination: "projects",
                  });
                  scrollToSection("projects");
                }}
                className="text-lg px-6 py-4"
              >
                View Projects
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleResumeView}
                className="text-lg px-6 py-4 hover:bg-primary/10 border-primary/50 hover:border-primary group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                View Resume
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  track("Hero CTA Clicked", {
                    button: "Contact Me",
                    destination: "contact",
                  });
                  scrollToSection("contact");
                }}
                className="text-lg px-6 py-4 hover:bg-secondary/50"
              >
                Contact Me
              </Button>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex gap-6 pt-6">
              <a
                href="https://github.com/Karshmistry"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("Social Link Clicked", {
                    platform: "GitHub",
                    url: "https://github.com/Karshmistry",
                    section: "Hero",
                  })
                }
                className="text-foreground hover:text-primary transition-colors p-2 hover:scale-110"
              >
                <Github className="w-8 h-8 md:w-10 md:h-10" />
              </a>

              <a
                href="https://www.linkedin.com/in/karsh-mistry-756a0a2ba/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("Social Link Clicked", {
                    platform: "LinkedIn",
                    url: "https://www.linkedin.com/in/karsh-mistry-756a0a2ba/",
                    section: "Hero",
                  })
                }
                className="text-foreground hover:text-primary transition-colors p-2 hover:scale-110"
              >
                <Linkedin className="w-8 h-8 md:w-10 md:h-10" />
              </a>

              <a
                href="#contact"
                onClick={() => {
                  track("Social Link Clicked", {
                    platform: "Email",
                    url: "#contact",
                    section: "Hero",
                  });
                  scrollToSection("contact");
                }}
                className="text-foreground hover:text-primary transition-colors p-2 hover:scale-110"
              >
                <Mail className="w-8 h-8 md:w-10 md:h-10" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - PROFILE IMAGE */}
          <div className="flex justify-center animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-3xl opacity-30 animate-glow-pulse" />
              <img
                src={profileImg}
                alt="Karsh Mistry"
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-4 border-primary/20 shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
