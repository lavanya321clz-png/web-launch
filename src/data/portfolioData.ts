export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  demo: string;
  image: string;
  category: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  college: string;
  university: string;
  year: string;
  score: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  icon: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export const personalInfo = {
  fullName: "Alex Morgan",
  title: "Full Stack Developer",
  tagline: "Building high-performance, beautiful, and scalable web solutions.",
  description: "I am a passionate software developer specializing in building modern web applications. With expertise spanning frontend aesthetics and backend architecture, I create robust digital experiences that solve real-world problems.",
  resumeUrl: "#", // Placeholder for download
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80", // Premium unsplash profile placeholder
  email: "alex.morgan.dev@email.com",
  phone: "+1 (555) 019-2834",
  location: "San Francisco, CA",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};

export const aboutMe = {
  intro: "Hello! I'm Alex Morgan, a Full Stack Developer with 4+ years of professional experience building web apps.",
  objective: "To leverage my skills in React, TypeScript, Node.js, and cloud architectures to build robust, scalable products that deliver outstanding user experiences and drive business success.",
  strengths: [
    "Clean, maintainable code practitioner (SOLID, design patterns)",
    "Strong problem-solving skills and algorithmic thinking",
    "Effective communicator & collaborative team player",
    "Adaptable and quick learner of new technologies",
    "User-centric design mindset with attention to detail"
  ],
  languages: [
    { name: "English", level: "Fluent / Professional" },
    { name: "Spanish", level: "Conversational" },
    { name: "German", level: "Elementary" }
  ],
  stats: [
    { value: 4, suffix: "+", label: "Years Experience" },
    { value: 25, suffix: "+", label: "Projects Completed" },
    { value: 12, suffix: "", label: "Certifications" },
    { value: 5, suffix: "★", label: "Client Rating Average" }
  ]
};

export const skillsData = {
  frontend: [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "Tailwind CSS", level: 92 },
    { name: "HTML5 / CSS3", level: 98 },
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Express.js", level: 90 },
    { name: "ASP.NET Core", level: 82 },
    { name: "C#", level: 85 },
  ],
  database: [
    { name: "MongoDB", level: 85 },
    { name: "SQL Server", level: 88 },
    { name: "Oracle SQL", level: 75 },
  ],
  cloud: [
    { name: "AWS EC2", level: 82 },
    { name: "AWS S3", level: 88 },
    { name: "AWS IAM", level: 80 },
  ],
  devops: [
    { name: "Git & GitHub", level: 92 },
    { name: "Docker", level: 80 },
    { name: "Linux / Bash", level: 78 },
    { name: "Nginx", level: 75 },
  ],
  tools: [
    { name: "VS Code & Visual Studio", level: 95 },
    { name: "Postman", level: 90 },
    { name: "Figma", level: 78 },
  ],
};

export const projectsData: Project[] = [
  {
    id: "employee-management-system",
    name: "Employee Management System",
    description: "An enterprise-grade administrative dashboard designed to manage employee roles, departments, attendance, payroll, and work performance metrics with fine-grained access control.",
    tech: ["React", "TypeScript", "ASP.NET Core", "SQL Server", "Tailwind CSS"],
    features: [
      "Role-based authentication & authorization (Admin, Manager, Employee)",
      "Interactive organogram and interactive directory list",
      "Dynamic leave request workflows with email notifications",
      "Comprehensive payroll processing module with payslip exports",
      "Analytics dashboards with real-time attendance tracking charts"
    ],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    category: "Full Stack"
  },
  {
    id: "hr-recruitment-portal",
    name: "HR Recruitment Portal",
    description: "An applicant tracking system (ATS) that streamlines the hiring process, from job posting creation to candidate application, interview scheduling, and final boarding workflows.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Framer Motion"],
    features: [
      "Job board showing open positions with advanced search and filters",
      "Rich CV parsing and visual candidate pipeline tracker (drag & drop)",
      "In-app messaging system for interviewer notes & scorecard voting",
      "Calendar integration (Google/Outlook) for automatic interview scheduling",
      "Interactive onboarding checklist and document generator"
    ],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1521791136364-7286472b3153?auto=format&fit=crop&w=600&q=80",
    category: "Web Development"
  },
  {
    id: "e-commerce-website",
    name: "Apex Electronics E-Commerce",
    description: "A fast, SEO-optimized digital storefront featuring virtual product filters, cart management, checkout forms with Stripe mock integration, and customer order management panels.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Express.js", "MongoDB"],
    features: [
      "Responsive layout with instant product filtering, sorting, and live searching",
      "Persistent shopping cart using Redux Toolkit and LocalStorage",
      "Secure payment checkout simulation with validation",
      "Admin portal for product catalog, stock checks, and sales metrics tracking",
      "Customer reviews, ratings, and recommended items carousel"
    ],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80",
    category: "E-Commerce"
  },
  {
    id: "portfolio-website",
    name: "Interactive Portfolio Website",
    description: "A modern developer showcase featuring glassmorphic designs, scroll animations, dynamic active-nav spies, custom gradients, and a responsive contact form.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    features: [
      "Premium glassmorphism-based UI design optimized for dark theme",
      "Smooth section transitions and animations using Framer Motion",
      "Responsive navigation panel and progress trackers",
      "Interactive contact form with automated local input validation",
      "Fast bundle load times leveraging Vite's asset optimization pipelines"
    ],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    category: "Frontend"
  },
  {
    id: "task-management-app",
    name: "FlowTask Management App",
    description: "A collaborative project management application featuring customizable Kanban boards, sprint backlogs, and real-time dashboard analytics.",
    tech: ["React", "TypeScript", "Node.js", "SQL Server", "Tailwind CSS"],
    features: [
      "Draggable Kanban boards with customizable columns and labels",
      "Real-time checklist updates and task priority tagging",
      "Sprint planning tools, task point estimations, and burndown charts",
      "Activity feeds listing recent edits made by team members",
      "Subtask delegation, deadline reminders, and comment panels"
    ],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=600&q=80",
    category: "Productivity"
  }
];

export const experienceData: Experience[] = [
  {
    company: "InnovateTech Solutions",
    role: "Senior Full Stack Developer",
    duration: "2024 - Present",
    responsibilities: [
      "Architected and engineered enterprise SaaS platforms using React, TypeScript, and ASP.NET Core, boosting platform performance by 35%.",
      "Led a team of 4 engineers to design and launch a custom microservices architecture communicating via RESTful APIs.",
      "Optimized complex SQL Server query paths and database indices, reducing server response times by 40%.",
      "Mentored junior developers, established modern CI/CD pipelines using GitHub Actions, and standardized code linting and testing strategies."
    ],
    technologies: ["React", "TypeScript", "ASP.NET Core", "SQL Server", "Docker", "AWS"]
  },
  {
    company: "WebSystems Development Ltd",
    role: "Full Stack Engineer",
    duration: "2022 - 2024",
    responsibilities: [
      "Developed interactive responsive web dashboards for finance clients utilizing React and Node.js.",
      "Built and integrated secure REST APIs with MongoDB, implementing JWT security and rate limiting.",
      "Deployed and monitored system servers on AWS EC2, configuring Nginx reverse proxies and SSL setups.",
      "Collaborated with UX/UI designers to transform Figma wireframes into high-performance components."
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Nginx", "Figma"]
  },
  {
    company: "DigitalCraft Labs",
    role: "Junior Web Developer",
    duration: "2021 - 2022",
    responsibilities: [
      "Maintained and added features to client websites using JavaScript, HTML5, CSS3, and C# ASP.NET.",
      "Wrote structured Oracle SQL scripts for daily data management tasks and generated reports.",
      "Implemented responsive styles across multiple web pages, resolving visual bugs on mobile devices.",
      "Utilized Git for source code control and participated in sprint reviews."
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "C#", "Oracle SQL", "Git"]
  }
];

export const educationData: Education[] = [
  {
    degree: "Master of Science in Computer Science",
    college: "State University School of Engineering",
    university: "State University",
    year: "2019 - 2021",
    score: "GPA: 3.9 / 4.0"
  },
  {
    degree: "Bachelor of Engineering in Information Technology",
    college: "Tech Institute of Science",
    university: "National Technological University",
    year: "2015 - 2019",
    score: "Percentage: 86.5%"
  }
];

export const certificationsData: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    year: "2025",
    icon: "Cloud"
  },
  {
    name: "Advanced React Developer",
    issuer: "Meta / Coursera",
    year: "2024",
    icon: "React"
  },
  {
    name: "TypeScript Professional Developer Certificate",
    issuer: "Microsoft / EdX",
    year: "2023",
    icon: "Code"
  },
  {
    name: "Modern JavaScript Certified Specialist",
    issuer: "W3Schools",
    year: "2022",
    icon: "Award"
  },
  {
    name: "Database Administrator Specialist (SQL Server)",
    issuer: "Microsoft",
    year: "2022",
    icon: "Database"
  },
  {
    name: "DevOps Foundations Certification",
    issuer: "Linux Foundation",
    year: "2023",
    icon: "Terminal"
  }
];

export const servicesData: Service[] = [
  {
    title: "Web Application Development",
    description: "Creating highly interactive, secure, and performant web applications customized to meet specific business objectives.",
    icon: "Globe"
  },
  {
    title: "Frontend Engineering",
    description: "Building responsive, pixel-perfect user interfaces with optimized render lifecycles, rich transitions, and standard accessibility.",
    icon: "Layout"
  },
  {
    title: "Backend Development",
    description: "Designing scalable server systems, object relational mappers, robust business logic, and modular database architectures.",
    icon: "Server"
  },
  {
    title: "REST API Development",
    description: "Building well-documented, JSON-compliant, rate-limited REST APIs following industry standards.",
    icon: "Cpu"
  },
  {
    title: "Cloud & DevOps Integration",
    description: "Configuring environment containerization, setting up continuous deployments, and managing cloud server scaling.",
    icon: "CloudLightning"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Product Director",
    company: "ApexFin Tech",
    content: "Alex Morgan is a phenomenal software developer. They took our complex dashboard wireframes and built a high-performance React application in record time. Clean code, professional communication, and outstanding performance.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Michael Chen",
    role: "Technical Founder",
    company: "LaunchPad Labs",
    content: "We hired Alex to build out our recruitment portal's backend and API layers. The architecture is incredibly robust, easy to read, and documented beautifully. An absolute pleasure to pair program with.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "Core Retail Group",
    content: "Alex redesigned our online catalog interface and optimized the entire site. Our page loading times dropped by 50% and mobile user conversions increased instantly. Their attention to minor details is exceptional.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  }
];
