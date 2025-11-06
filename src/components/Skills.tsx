const Skills = () => {
  const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML-CSS","React.js", "Next.js",  "Tailwind CSS", "EJS"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", ]
  },
  {
    title: "Database",
    skills: ["MongoDB", "Firebase"]
  },
   {
    title: "Data Science & ML Tools",
    skills: ["Pandas", "NumPy", "Matplotlib", "OpenCV", "Seaborn, Scikit-learn"]
  },
  {
    title: "Tools & Integrations",
    skills: ["Git & GitHub", "Postman","Jupyter Notebook" , "PowerBI","VS Code"]
  }
 
];


  return (
    <section id="skills" className="py-24 md:py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
            Technologies I work with to build amazing products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="px-4 py-3 bg-secondary rounded-md text-lg text-secondary-foreground hover:bg-primary/10 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
