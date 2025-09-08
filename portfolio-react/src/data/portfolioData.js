// Personal information and portfolio data
export const personalInfo = {
  name: "Sadique Hasan",
  title: "Software Engineer",
  description: "Computer Science and Engineering student with expertise in Java, web development, and a passion for building innovative and impactful projects.",
  email: "sadiquehasan03@gmail.com",
  location: "New Delhi, India",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/sadique-hasan/",
    github: "https://www.github.com/SadiqueHasan03",
    instagram: "#"
  }
}

// Skills data with categories and percentages
export const skillsData = {
  frontend: {
    title: "Frontend Developer",
    icon: "uil-brackets-curly",
    skills: [
      { name: "HTML", percentage: 80 },
      { name: "CSS", percentage: 80 },
      { name: "JavaScript", percentage: 75 },
      { name: "React", percentage: 80 }
    ]
  },
  backend: {
    title: "Backend Developer", 
    icon: "uil-server-network",
    skills: [
      { name: "Java", percentage: 80 },
      { name: "Python", percentage: 80 },
      { name: "SQL", percentage: 90 }
    ]
  }
}

// Education and experience data
export const qualificationData = {
  education: [
    {
      title: "Computer Science Engineer",
      subtitle: "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
      period: "2021 - 2025"
    },
    {
      title: "XII (CBSE)",
      subtitle: "St. Jude's Vidyalaya, Barauni",
      period: "2020 - 2021"
    },
    {
      title: "X (CBSE)",
      subtitle: "St. Jude's Vidyalaya, Barauni", 
      period: "2018 - 2019"
    }
  ],
  projects: [
    {
      title: "Honey Selling Website",
      subtitle: "A website built for selling Honey",
      period: "2024"
    },
    {
      title: "Sorting Visualizer",
      subtitle: "Helps in understanding how different sorting algorithms work",
      period: "2024"
    },
    {
      title: "The Simon Game",
      subtitle: "A brain game built in JavaScript",
      period: "2023"
    }
  ]
}

// Project portfolio data for future expansion
export const projectsData = [
  {
    id: "honey-website",
    title: "Honey Selling Website",
    description: "A modern e-commerce website for selling natural honey products with payment integration and responsive design.",
    technologies: ["HTML", "CSS", "JavaScript", "PayPal API"],
    image: "/images/honey-website.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "sorting-visualizer",
    title: "Sorting Visualizer",
    description: "Interactive web application that visualizes popular sorting algorithms with customizable speed and array size.",
    technologies: ["React", "JavaScript", "CSS3", "Algorithms"],
    image: "/images/sorting-visualizer.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "simon-game",
    title: "The Simon Game",
    description: "Classic memory game implementation with sound effects and progressive difficulty levels.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Web Audio API"],
    image: "/images/simon-game.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }
]

// Navigation menu items
export const navigationItems = [
  { id: "home", label: "Home", icon: "uil-estate", href: "#home" },
  { id: "about", label: "About", icon: "uil-user", href: "#about" },
  { id: "skills", label: "Skills", icon: "uil-file-alt", href: "#skills" },
  { id: "services", label: "Services", icon: "uil-briefcase", href: "#services" },
  { id: "portfolio", label: "Portfolio", icon: "uil-scenery", href: "#portfolio" },
  { id: "contact", label: "Contact", icon: "uil-message", href: "#contact" }
]