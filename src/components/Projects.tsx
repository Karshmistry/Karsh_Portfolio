import { ExternalLink, Github, Grid, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { track } from '@vercel/analytics';

// Import project cover images
import homeUtilityImage from "@/assets/projects/home-utility.svg";
import zomatoReelImage from "@/assets/projects/zomato-reel.svg";
import obysAgencyImage from "@/assets/projects/obys-agency.svg";
import layout1Image from "@/assets/projects/layout-1.svg";
import layout2Image from "@/assets/projects/layout-2.svg";
import layout3Image from "@/assets/projects/layout-3.svg";
import layout4Image from "@/assets/projects/layout-4.svg";
import pinterestCardsImage from "@/assets/projects/pinterest-cards.svg";
import hospitalAppointmentImage from "@/assets/projects/hospital-appointment.svg";
import crimAi from "@/assets/projects/crim-ai.svg"; // <-- fixed
import goalRush from "@/assets/projects/GoalRush.svg";
import HealthAi from "@/assets/projects/HealthAI.svg";
import Netflix from "@/assets/projects/Netflix.svg";


interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  category: string;
  coverImage: string;
  githubUrl: string;
  liveUrl: string;
}

const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projects: Project[] = [
    {
      title: "GoalRush (The Football Website)",
      description: "-	Designed and developed a full-stack football website with live score updates, player profiles, and match details.Integrated manual input features for teams, scores, fouls, and match fixtures for real-time updates.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "EJS"],
      gradient: "from-red-500/20 to-orange-500/20",
      category: "Full-Stack",
      coverImage: goalRush,
      githubUrl: "https://github.com/Karshmistry/Football-Website",
      liveUrl: "#"
    },
   
    {
  title: "CrimAI – Criminal Detection & Alert System",
  description: "Built an AI-powered full-stack system for facial recognition, criminal record analysis, and case logging.Developed secure login/signup system and dynamic pages for criminal records, detection logs, and real-time alerts.",
  tech: ["React.js", "Tailwind CSS", "JavaScript", "Python (Flask/FastAPI)", "OpenCV", "TensorFlow"],
  gradient: "from-teal-500/20 to-blue-500/20",
  category: "Full-Stack",
  coverImage: crimAi, 
  githubUrl: "https://github.com/Karshmistry/CrimAII",
  liveUrl: "#"
},
    {
      title: "HealthAI – Symptom-Based Disease Prediction & Doctor Consultation System (In Progress)",
      description: "Built a full-stack medical web app for AI-based disease prediction and doctor consultation.Developed secure user and doctor dashboards with appointment booking and digital prescriptions.",
      tech: ["React.js", "Tailwind CSS", "Python (Flask)", "MongoDB", "Scikit-learn"],
      gradient: "from-blue-500/20 to-indigo-500/20",
      category: "Backend",
       coverImage: HealthAi,
      githubUrl: "https://github.com/Karshmistry/healthai-ml-api",
      liveUrl: "#"
    },
 {
      title: "Netflix Dashboard",
      description: " This app lets you explore Netflix content by genre, country, and release year, with live visualizations and filters — all in one clean UI..",
      tech: ["Streamlit", "Plotly", "Pandas", "Python"],
      gradient: "from-yellow-500/20 to-red-500/20",
      category: "Dashboard",
      coverImage: Netflix,
      githubUrl: "https://github.com/Karshmistry/Netflix-Dashboard-Streamlit-app",
      liveUrl: "https://netflix-dashboard-app-app-ksca57pdslsrdliktvt4m5.streamlit.app/"
    },

  ];

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 md:py-32 bg-card scroll-mt-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
            A showcase of my recent work and technical achievements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayedProjects.map((project, index) => (
            <div 
              key={index}
              className="bg-background rounded-lg border border-border overflow-hidden hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={project.coverImage} 
                  alt={`${project.title} cover`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-overlay`}></div>
                <span className="absolute top-4 right-4 text-xs px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg md:text-xl leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-2 bg-secondary text-sm md:text-base rounded-md text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => track('Project Code Clicked', { 
                        project: project.title,
                        category: project.category,
                        url: project.githubUrl
                      })}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => track('Project Demo Clicked', { 
                          project: project.title,
                          category: project.category,
                          url: project.liveUrl
                        })}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 opacity-50 cursor-not-allowed" 
                      disabled
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Projects Button */}
        {projects.length > 3 && (
          <div className="flex justify-center mt-16 animate-fade-in">
            <Button
              onClick={() => {
                setShowAllProjects(!showAllProjects);
                track('Projects Toggle Clicked', { 
                  action: showAllProjects ? 'Show Less' : 'Show More',
                  totalProjects: projects.length
                });
              }}
              variant="outline"
              size="lg"
              className="group px-8 py-4 text-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              <Grid className="w-5 h-5 mr-3 text-primary" />
              {showAllProjects ? 'Show Less Projects' : 'See All Projects'}
              {showAllProjects ? (
                <ChevronUp className="w-5 h-5 ml-3 text-primary group-hover:translate-y-[-2px] transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 ml-3 text-primary group-hover:translate-y-[2px] transition-transform" />
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
