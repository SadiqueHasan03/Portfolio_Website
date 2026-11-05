// Personal information and portfolio data with image configuration
export const personalInfo = {
  name: 'Sadique Hasan',
  title: 'Software Engineer',
  summary: 'Open to Software Engineer roles in Java backend, Spring Boot, and full-stack product development.',
  description:
    'I build scalable backend systems, clean REST APIs, and responsive web products that combine strong engineering discipline with business-focused problem solving. My work is centered around Java, Spring Boot, SQL, React, and practical product thinking.',
  email: 'sadiquehasan03@gmail.com',
  location: 'New Delhi, India',
  images: {
    profile: {
      src: '/images/profile/perfil.png',
      alt: 'Sadique Hasan - Software Engineer',
      fallback: '/images/placeholders/user-placeholder.svg'
    },
    about: {
      src: '/images/profile/about.jpg',
      alt: 'About Sadique Hasan',
      fallback: '/images/placeholders/user-placeholder.svg'
    }
  },
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/sadique-hasan/',
    github: 'https://www.github.com/SadiqueHasan03',
    leetcode: 'https://leetcode.com/u/Sadique_Hasan/'
  }
}

// Skills data grouped by the kind of work they support
export const skillsData = {
  frontend: {
    title: 'Frontend Development',
    description: 'Building clear, responsive interfaces for the web.',
    icon: 'uil-brackets-curly',
    skills: [
      { name: 'HTML', icon: '/images/skills/html5.svg', fallbackIcon: 'uil-code' },
      { name: 'CSS', icon: '/images/skills/css3.svg', fallbackIcon: 'uil-brush-alt' },
      { name: 'JavaScript', icon: '/images/skills/javascript.svg', fallbackIcon: 'uil-brackets-curly' },
      { name: 'React', icon: '/images/skills/react.svg', fallbackIcon: 'uil-react' }
    ]
  },
  backend: {
    title: 'Backend & Frameworks',
    description: 'Designing services, APIs, and resilient backend systems.',
    icon: 'uil-server-network',
    skills: [
      { name: 'Java', icon: '/images/skills/java.svg', fallbackIcon: 'uil-java-script' },
      { name: 'Spring Boot', icon: '/images/skills/springboot.svg', fallbackIcon: 'uil-server-network' },
      { name: 'Spring Security', fallbackIcon: 'uil-shield-check' },
      { name: 'Spring Data JPA', fallbackIcon: 'uil-database' },
      { name: 'Spring Cloud', fallbackIcon: 'uil-cloud' },
      { name: 'Resilience4j', fallbackIcon: 'uil-heartbeat' },
      { name: 'JWT', fallbackIcon: 'uil-key-skeleton' },
      { name: 'REST APIs', fallbackIcon: 'uil-brackets-curly' },
      { name: 'Microservices', fallbackIcon: 'uil-server-network' }
    ]
  },
  data: {
    title: 'Databases & Messaging',
    description: 'Working with relational, in-memory, and event-streaming systems.',
    icon: 'uil-database',
    skills: [
      { name: 'SQL', fallbackIcon: 'uil-database' },
      { name: 'PostgreSQL', fallbackIcon: 'uil-database' },
      { name: 'Redis', fallbackIcon: 'uil-bolt-alt' },
      { name: 'Apache Kafka', fallbackIcon: 'uil-exchange' }
    ]
  },
  devops: {
    title: 'DevOps & Observability',
    description: 'Container workflows, monitoring, and performance testing.',
    icon: 'uil-cloud-computing',
    skills: [
      { name: 'Docker', fallbackIcon: 'uil-cube' },
      { name: 'Kubernetes', fallbackIcon: 'uil-layer-group' },
      { name: 'Prometheus', fallbackIcon: 'uil-chart-line' },
      { name: 'Grafana', fallbackIcon: 'uil-dashboard' },
      { name: 'Zipkin', fallbackIcon: 'uil-analysis' },
      { name: 'Apache JMeter', fallbackIcon: 'uil-tachometer-fast' }
    ]
  },
  tools: {
    title: 'Developer Tools',
    description: 'Version control, build tools, IDEs, and testing frameworks.',
    icon: 'uil-wrench',
    skills: [
      { name: 'Git', fallbackIcon: 'uil-github' },
      { name: 'GitHub', fallbackIcon: 'uil-github-alt' },
      { name: 'Maven', fallbackIcon: 'uil-package' },
      { name: 'JUnit', fallbackIcon: 'uil-check-circle' },
      { name: 'IntelliJ IDEA', fallbackIcon: 'uil-brackets-curly' },
      { name: 'Eclipse', fallbackIcon: 'uil-sun' },
      { name: 'VS Code', fallbackIcon: 'uil-code-branch' }
    ]
  },
  problemSolving: {
    title: 'Core Problem Solving',
    description: 'Foundational computer science skills for solving practical problems.',
    icon: 'uil-brain',
    skills: [
      { name: 'Data Structures', fallbackIcon: 'uil-sitemap' },
      { name: 'Algorithms', fallbackIcon: 'uil-brain' },
      { name: 'OOP', fallbackIcon: 'uil-cubes' },
      { name: 'Debugging', fallbackIcon: 'uil-bug' }
    ]
  }
}

// Service areas based on the experience and projects documented in the résumé
export const servicesData = [
  {
    id: 'backend-api-development',
    title: 'Backend & API Development',
    icon: 'uil-server-network',
    description: 'Build Java backend services and REST APIs with authentication and structured data access.',
    features: ['Java', 'Spring Boot', 'REST APIs', 'Spring Security', 'JWT', 'Spring Data JPA', 'DTO Pattern']
  },
  {
    id: 'distributed-backend-systems',
    title: 'Distributed Backend Systems',
    icon: 'uil-server-network-alt',
    description: 'Connect backend services with event messaging, caching, resilience patterns, and container orchestration.',
    features: ['Microservices', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Resilience4j', 'Docker', 'Kubernetes', 'Spring Cloud']
  },
  {
    id: 'backend-testing-observability',
    title: 'Backend Testing & Observability',
    icon: 'uil-chart-line',
    description: 'Verify backend behavior with manual and automated tests, database checks, load testing, and service monitoring.',
    features: ['Manual & Integration Testing', 'SQL Validation', 'JUnit', 'Apache JMeter', 'Prometheus', 'Grafana', 'Zipkin']
  }
]

// Education and experience data
export const qualificationData = {
  education: [
    {
      title: 'B.Tech in Computer Science & Engineering',
      subtitle: 'Dr. A.P.J. Abdul Kalam Technical University, Lucknow',
      period: '2021 - 2025',
      type: 'Degree',
      icon: 'uil-graduation-cap'
    },
    {
      title: 'Class XII (CBSE)',
      subtitle: "St. Jude's Vidyalaya, Barauni",
      period: '2020 - 2021',
      type: 'Higher Secondary',
      icon: 'uil-book-open'
    },
    {
      title: 'Class X (CBSE)',
      subtitle: "St. Jude's Vidyalaya, Barauni",
      period: '2018 - 2019',
      type: 'Secondary',
      icon: 'uil-book'
    }
  ],
  experience: [
    {
      title: 'Graduate Engineer Trainee',
      subtitle: 'Wipro',
      period: 'Feb 2026 - Present',
      location: 'Noida, Uttar Pradesh',
      type: 'Work experience',
      icon: 'uil-briefcase-alt',
      highlights: [
        'Executed 500+ manual test cases across integration testing cycles to verify end-to-end functionality and identify defects before release.',
        'Wrote SQL queries to validate backend database records during testing.',
        'Logged defects with clear reproduction steps and collaborated with development teams on resolution.'
      ],
      technologies: ['Integration Testing', 'SQL', 'Defect Tracking']
    },
    {
      title: 'Razorpay Clone',
      subtitle: 'Distributed payment processing system',
      period: '2026',
      type: 'Featured project',
      icon: 'uil-credit-card',
      highlights: [
        'Built a distributed payment platform using seven microservices and Kubernetes.',
        'Used event-driven workflows, the transactional outbox pattern, and distributed locking to support reliable payment processing under concurrency.',
        'Designed the system for a target throughput of 10,000 transactions per second.'
      ],
      technologies: ['Java', 'Spring Boot', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Kubernetes']
    },
    {
      title: 'Fitness Tracker API',
      subtitle: 'Secure REST API for fitness tracking',
      period: '2025',
      type: 'Backend project',
      icon: 'uil-heartbeat',
      highlights: [
        'Built a REST backend for tracking fitness activities and personal goals.',
        'Implemented stateless authentication and role-based route protection with Spring Security and JWT.',
        'Structured API payloads with DTOs and mapped relational data with Spring Data JPA.'
      ],
      technologies: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker']
    }
  ]
}

// Project portfolio data with enhanced image configuration
export const projectsData = [
  {
    id: 'distributed-razorpay-project',
    title: 'Razorpay Clone',
    description: 'A distributed payment system built with seven microservices. It uses idempotency, transactional outbox, and distributed locking, with capacity planning for 10,000 TPS and Prometheus/Grafana observability.',
    technologies: ['Java', 'Spring Boot', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Kubernetes'],
    image: '/images/projects/razorpay-clone.svg',
    imageConfig: {
      alt: 'Illustrated distributed payment processing dashboard for the Razorpay Clone',
      fallback: '/images/placeholders/project-placeholder.svg',
      placeholder: '/images/placeholders/loading.svg'
    },
    githubUrl: 'https://github.com/SadiqueHasan03/distributed-razorpay-project',
    featured: true
  },
  {
    id: 'fitness-monolith',
    title: 'Fitness Tracker API',
    description: 'A RESTful backend for tracking workouts and fitness activities, with JWT authentication, role-based access, DTO-based payloads, and a Docker deployment connected to Neon PostgreSQL.',
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker'],
    image: '/images/projects/fitness-tracker-api.svg',
    imageConfig: {
      alt: 'Illustrated fitness activity dashboard for the Fitness Tracker API',
      fallback: '/images/placeholders/project-placeholder.svg',
      placeholder: '/images/placeholders/loading.svg'
    },
    githubUrl: 'https://github.com/SadiqueHasan03/fitness-monolith',
    featured: true
  },
  {
    id: 'honey-website',
    title: 'Honey Selling Website',
    description: 'A clean e-commerce-inspired site built to present and sell honey products with a responsive, user-friendly experience.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    image: '/images/projects/honey-website.svg',
    imageConfig: {
      alt: 'Illustrated golden honey jar for the honey selling website',
      fallback: '/images/placeholders/project-placeholder.svg',
      placeholder: '/images/placeholders/loading.svg'
    },
    liveUrl: 'https://github.com/SadiqueHasan03',
    githubUrl: 'https://github.com/SadiqueHasan03',
    featured: true
  },
  {
    id: 'sorting-visualizer',
    title: 'Sorting Visualizer',
    description: 'An interactive visualization tool that explains sorting algorithms with dynamic animations and adjustable controls.',
    technologies: ['React', 'JavaScript', 'CSS3', 'Algorithms'],
    image: '/images/projects/sorting-visualizer.svg',
    imageConfig: {
      alt: 'Illustrated animated bars for the Sorting Visualizer',
      fallback: '/images/placeholders/project-placeholder.svg',
      placeholder: '/images/placeholders/loading.svg'
    },
    liveUrl: 'https://github.com/SadiqueHasan03',
    githubUrl: 'https://github.com/SadiqueHasan03',
    featured: true
  },
  {
    id: 'simon-game',
    title: 'The Simon Game',
    description: 'A fun memory game with progressive difficulty, sound effects, and interactive gameplay built in JavaScript.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web Audio API'],
    image: '/images/projects/simon-game.svg',
    imageConfig: {
      alt: 'Illustrated colorful four-button Simon memory game',
      fallback: '/images/placeholders/project-placeholder.svg',
      placeholder: '/images/placeholders/loading.svg'
    },
    liveUrl: 'https://github.com/SadiqueHasan03',
    githubUrl: 'https://github.com/SadiqueHasan03',
    featured: false
  }
]

// Navigation menu items
export const navigationItems = [
  { id: 'home', label: 'Home', icon: 'uil-estate', href: '#home' },
  { id: 'about', label: 'About', icon: 'uil-user', href: '#about' },
  { id: 'skills', label: 'Skills', icon: 'uil-file-alt', href: '#skills' },
  { id: 'services', label: 'Services', icon: 'uil-briefcase', href: '#services' },
  { id: 'qualification', label: 'Qualification', icon: 'uil-graduation-cap', href: '#qualification' },
  { id: 'resume', label: 'Resume', icon: 'uil-file-alt', href: '/resume' },
  { id: 'contact', label: 'Contact', icon: 'uil-message', href: '#contact' }
]