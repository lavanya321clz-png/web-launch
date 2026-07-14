import pg from 'pg';

const { Pool } = pg;

// ─── PostgreSQL Connection Pool ───────────────────────────────────────────────
export const pool = new Pool({
  host:     'localhost',
  port:     5432,
  database: 'postgres',        // default postgres database, public schema
  user:     'postgres',
  password: 'postgresql17',
  max: 10,                     // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
});

// ─── Initial Seed Data ────────────────────────────────────────────────────────
const INITIAL_PORTFOLIO = {
  personalInfo: {
    fullName: "Lavanya Ponnusamy",
    title: "Full Stack Developer",
    tagline: "Building high-performance, beautiful, and scalable web solutions.",
    description: "I am a passionate software developer with 1 year of professional experience, specializing in building modern web applications. With expertise spanning frontend aesthetics and backend architecture using ASP.NET Core & C#, I create robust digital experiences that solve real-world problems.",
    resumeUrl: "#",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    email: "lavanyaponnusamy07@gmail.com",
    phone: "9344850181",
    location: "Kunnathur, Tiruppur, Tamil Nadu",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  aboutMe: {
    intro: "Hello! I'm Lavanya Ponnusamy, a Full Stack Developer with 1 year of professional experience building web apps.",
    objective: "To leverage my skills in ASP.NET Core, C#, React, and PostgreSQL to build robust, scalable products that deliver outstanding user experiences and drive business success.",
    strengths: [
      "Clean, maintainable code practitioner (SOLID, design patterns)",
      "Strong problem-solving skills and algorithmic thinking",
      "Effective communicator & collaborative team player",
      "Adaptable and quick learner of new technologies",
      "User-centric design mindset with attention to detail"
    ],
    languages: [
      { name: "Tamil", level: "Native / Mother Tongue" },
      { name: "English", level: "Fluent / Professional" }
    ],
    stats: [
      { value: 1, suffix: "+", label: "Year Experience" },
      { value: 10, suffix: "+", label: "Projects Completed" },
      { value: 5, suffix: "", label: "Certifications" },
      { value: 5, suffix: "★", label: "Client Rating Average" }
    ]
  },
  skillsData: {
    frontend: [
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 88 },
      { name: "Tailwind CSS", level: 82 },
      { name: "HTML5 / CSS3", level: 90 },
    ],
    backend: [
      { name: "ASP.NET Core", level: 82 },
      { name: "C#", level: 80 },
    ],
    database: [
      { name: "PostgreSQL", level: 80 },
    ],
    cloud: [
      { name: "AWS EC2", level: 70 },
      { name: "AWS S3", level: 72 },
    ],
    devops: [
      { name: "Git & GitHub", level: 85 },
      { name: "Linux / Bash", level: 70 },
      { name: "Nginx", level: 68 },
    ],
    tools: [
      { name: "VS Code", level: 92 },
      { name: "Figma", level: 78 },
      { name: "Antigravity", level: 80 },
    ],
  },
  projectsData: [
    {
      id: "employee-management-system",
      name: "Employee Management System",
      description: "An enterprise-grade administrative dashboard designed to manage employee roles, departments, attendance, payroll, and work performance metrics with fine-grained access control.",
      tech: ["React", "TypeScript", "ASP.NET Core", "PostgreSQL", "Tailwind CSS"],
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
      tech: ["React", "TypeScript", "ASP.NET Core", "PostgreSQL", "Tailwind CSS"],
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
  ],
  experienceData: [
    {
      company: "Current Organization",
      role: "Full Stack Developer",
      duration: "2024 - Present",
      responsibilities: [
        "Developing and maintaining full stack web applications using React, ASP.NET Core, and PostgreSQL.",
        "Designing RESTful APIs with C# and ASP.NET Core, ensuring secure and efficient data communication.",
        "Collaborating with cross-functional teams to transform UI designs from Figma into responsive web pages.",
        "Performing database management and query optimization in PostgreSQL for improved performance."
      ],
      technologies: ["React", "TypeScript", "ASP.NET Core", "C#", "PostgreSQL", "Git"]
    },
    {
      company: "Internship / Training",
      role: "Junior Web Developer",
      duration: "2023 - 2024",
      responsibilities: [
        "Built responsive web interfaces using HTML5, CSS3, JavaScript, and React.",
        "Assisted in developing backend modules using ASP.NET Core and C# following MVC patterns.",
        "Worked with PostgreSQL databases for data insertion, retrieval, and report generation.",
        "Used Git & GitHub for version control and collaborated in agile sprint cycles."
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "C#", "ASP.NET Core", "PostgreSQL", "Git"]
    }
  ],
  educationData: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      college: "Erode Arts and Science College",
      university: "Erode Arts and Science College, Erode",
      year: "2020 - 2023",
      score: "First Class with Distinction"
    },
    {
      degree: "Higher Secondary School (12th Standard)",
      college: "Government Higher Secondary School",
      university: "Government Higher Secondary School, Tiruppur",
      year: "2019 - 2020",
      score: "Percentage: 91%"
    }
  ],
  certificationsData: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services (AWS)", year: "2025", icon: "Cloud" },
    { name: "Advanced React Developer", issuer: "Meta / Coursera", year: "2024", icon: "React" },
    { name: "TypeScript Professional Developer Certificate", issuer: "Microsoft / EdX", year: "2023", icon: "Code" },
    { name: "Modern JavaScript Certified Specialist", issuer: "W3Schools", year: "2022", icon: "Award" },
    { name: "Database Administrator Specialist (PostgreSQL)", issuer: "Microsoft", year: "2022", icon: "Database" },
    { name: "DevOps Foundations Certification", issuer: "Linux Foundation", year: "2023", icon: "Terminal" }
  ],
  servicesData: [
    { title: "Web Application Development", description: "Creating highly interactive, secure, and performant web applications customized to meet specific business objectives.", icon: "Globe" },
    { title: "Frontend Engineering", description: "Building responsive, pixel-perfect user interfaces with optimized render lifecycles, rich transitions, and standard accessibility.", icon: "Layout" },
    { title: "Backend Development", description: "Designing scalable server systems, object relational mappers, robust business logic, and modular database architectures.", icon: "Server" },
    { title: "REST API Development", description: "Building well-documented, JSON-compliant, rate-limited REST APIs following industry standards.", icon: "Cpu" },
    { title: "Cloud & DevOps Integration", description: "Setting up continuous deployments, configuring server environments, and managing cloud server scaling.", icon: "CloudLightning" }
  ],
  testimonialsData: [
    {
      name: "Sarah Jenkins",
      role: "Product Director",
      company: "ApexFin Tech",
      content: "Lavanya Ponnusamy is a phenomenal software developer. They took our complex dashboard wireframes and built a high-performance React application in record time. Clean code, professional communication, and outstanding performance.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Michael Chen",
      role: "Technical Founder",
      company: "LaunchPad Labs",
      content: "We hired Lavanya to build out our recruitment portal's backend and API layers. The architecture is incredibly robust, easy to read, and documented beautifully. An absolute pleasure to pair program with.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      "name": "Emily Rodriguez",
      "role": "Operations Manager",
      "company": "Core Retail Group",
      "content": "Lavanya redesigned our online catalog interface and optimized the entire site. Our page loading times dropped by 50% and mobile user conversions increased instantly. Their attention to minor details is exceptional.",
      "rating": 5,
      "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ]
};nversions increased instantly. Their attention to minor details is exceptional.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ]
};

// ─── Schema Initialization ────────────────────────────────────────────────────
export async function initDb() {
  const client = await pool.connect();
  try {
    console.log('PostgreSQL: Initializing database schema...');

    await client.query('BEGIN');

    // portfolio table — stores the entire portfolio JSON as a single document
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id        SERIAL PRIMARY KEY,
        data      JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // messages table — stores contact form submissions
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id         TEXT PRIMARY KEY,
        name       TEXT NOT NULL,
        email      TEXT NOT NULL,
        subject    TEXT NOT NULL,
        message    TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Seed portfolio row if the table is empty
    const { rowCount } = await client.query('SELECT 1 FROM portfolio LIMIT 1');
    if (rowCount === 0) {
      await client.query(
        'INSERT INTO portfolio (data) VALUES ($1)',
        [JSON.stringify(INITIAL_PORTFOLIO)]
      );
      console.log('PostgreSQL: portfolio table seeded with initial data.');
    }

    await client.query('COMMIT');
    console.log('PostgreSQL: Database schema ready.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('PostgreSQL: Error initializing database schema:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

// ─── Portfolio Queries ────────────────────────────────────────────────────────

/** Returns the full portfolio JSON object */
export async function getPortfolio() {
  try {
    const result = await pool.query(
      'SELECT data FROM portfolio ORDER BY id DESC LIMIT 1'
    );
    if (result.rowCount === 0) return INITIAL_PORTFOLIO;
    return result.rows[0].data;
  } catch (err) {
    console.error('PostgreSQL: Error fetching portfolio:', err.message);
    return INITIAL_PORTFOLIO; // graceful fallback
  }
}

/** Replaces the portfolio document entirely */
export async function updatePortfolio(newData) {
  try {
    await pool.query(
      'UPDATE portfolio SET data = $1, updated_at = NOW() WHERE id = (SELECT id FROM portfolio ORDER BY id DESC LIMIT 1)',
      [JSON.stringify(newData)]
    );
  } catch (err) {
    console.error('PostgreSQL: Error updating portfolio:', err.message);
    throw err;
  }
}

// ─── Messages Queries ─────────────────────────────────────────────────────────

/** Returns all contact messages ordered newest first */
export async function getMessages() {
  try {
    const result = await pool.query(
      'SELECT id, name, email, subject, message, created_at AS timestamp FROM messages ORDER BY created_at DESC'
    );
    return result.rows;
  } catch (err) {
    console.error('PostgreSQL: Error fetching messages:', err.message);
    return [];
  }
}

/** Inserts a new contact message */
export async function addMessage({ name, email, subject, message }) {
  try {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const result = await pool.query(
      `INSERT INTO messages (id, name, email, subject, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, subject, message, created_at AS timestamp`,
      [id, name, email, subject, message]
    );
    return result.rows[0];
  } catch (err) {
    console.error('PostgreSQL: Error inserting message:', err.message);
    throw err;
  }
}
