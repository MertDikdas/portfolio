import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
    {
        title: "SmartWallet",
        type: "Backend / Microservices",
        description:
            "A personal finance application built with a microservice architecture. It includes authentication, financial transaction management, and asynchronous communication between services.",

        technologies: [
            "Java",
            "Spring Boot",
            "PostgreSQL",
            "RabbitMQ",
            "Docker",
            "Kubernetes",
        ],

        repository: "https://github.com/MertDikdas/SmartWallet",

        image: "/projects/smartwallet.webp",
        imageAlt: "SmartWallet personal finance application",

        highlights: [
            "Secure authentication and refresh-token flow",
            "Financial account and transaction management",
            "Asynchronous communication between microservices",
            "Containerized deployment with Docker and Kubernetes",
        ],

        architecture:
            "Spring Boot microservices → PostgreSQL → RabbitMQ → Docker / Kubernetes",
    },

    {
        title: "TaskForge",
        type: "Backend / Async Processing",
        description:
            "A backend job-processing system designed to execute asynchronous tasks reliably. It uses separate API and worker services, with retry and dead-letter mechanisms for failed jobs.",

        technologies: [
            "Java",
            "Spring Boot",
            "PostgreSQL",
            "RabbitMQ",
            "Flyway",
        ],

        repository: "https://github.com/MertDikdas/TaskForge",

        image: null,
        imageAlt: "",

        highlights: [
            "Separate API and worker services",
            "Asynchronous job processing with RabbitMQ",
            "Retry mechanism for failed jobs",
            "Dead-letter queue handling for unrecoverable jobs",
        ],

        architecture:
            "API Service → RabbitMQ → Worker Service → Retry Queue / Dead-Letter Queue",
    },

    {
        title: "Opti-Tour",
        type: "Travel App / Microservices",
        description:
            "A travel application designed to help users plan and optimize trips. It uses a microservice-based backend and a mobile frontend to manage locations, distances, and trip-related data.",

        technologies: [
            "Java",
            "Spring Boot",
            "React Native",
            "Expo",
            "PostgreSQL",
            "Microservices",
        ],

        repository: "",

        image: "/projects/optitour.webp",
        imageAlt: "Opti-Tour travel planning application",

        highlights: [
            "Trip creation and planning",
            "Location and distance management",
            "Mobile interface built with React Native and Expo",
            "Microservice-based backend architecture",
        ],

        architecture:
            "React Native / Expo → Spring Boot microservices → PostgreSQL",
    },

    {
        title: "EV Charge",
        type: "Mobile App / Backend API",
        description:
            "An electric vehicle charging application that helps users find compatible charging stations, manage reservations, and track charging sessions through a mobile interface.",

        technologies: [
            "Python",
            "FastAPI",
            "Flutter",
        ],

        repository:
            "https://github.com/MertDikdas/electric_charge_station_app",

        image: "/projects/ev-charge.webp",
        imageAlt: "EV Charge mobile application",

        highlights: [
            "Charging station discovery",
            "Compatible station filtering",
            "Charging reservation management",
            "Charging session tracking",
        ],

        architecture:
            "Flutter mobile client → FastAPI backend API",
    },

    {
        title: "Book Recommendation",
        type: "Full-Stack / Recommendation App",
        description:
            "A book recommendation application with separate frontend and backend components. The backend exposes recommendation functionality through a FastAPI-based API.",

        technologies: [
            "Python",
            "FastAPI",
        ],

        repository:
            "https://github.com/MertDikdas/book-recommender-backend",

        image: "/projects/book-recommendation.webp",
        imageAlt: "Book recommendation application",

        highlights: [
            "Book discovery and recommendation flow",
            "Separate frontend and backend architecture",
            "Recommendation functionality exposed through REST APIs",
            "FastAPI-based backend service",
        ],

        architecture:
            "Frontend client → FastAPI recommendation service",
    },
];

const skillGroups = [
    {
        title: "Backend",
        skills: [
            "Java",
            "Spring Boot",
            "Python",
            "FastAPI",
            "REST APIs",
            "SQL",
            "PostgreSQL",
        ],
    },
    {
        title: "Infrastructure",
        skills: ["Docker", "Kubernetes", "RabbitMQ", "Git"],
    },
    {
        title: "Frontend & Mobile",
        skills: ["React", "TypeScript", "React Native", "Expo"],
    },
];

const experiences = [
    {
        company: "Flyrank AI",
        role: "Backend AI Engineering Intern",
        period: "2026",
        description:
            "Took part in a structured internship program that progressed through weekly learning modules and practical assignments covering backend development and the effective use of artificial intelligence. I developed backend and AI-powered features using Python and FastAPI, worked with REST APIs, validation, error handling, structured model outputs, and LLM integrations, and used AI-assisted development tools throughout the weekly tasks to support implementation, debugging, and evaluation.",
    },
    {
        company: "Vestel Electronics",
        role: "Software Intern — TV Software Department",
        period: "2025",
        description:
            "Contributed to C++-based TV software development and examined how software components and graphic resources were organized within the system. I also developed a utility that synchronizes graphic files with their corresponding source files, helping reduce manual file management and improve the development workflow.",
    },

];

const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

function App() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState("home");
    const [selectedImage, setSelectedImage] = useState<{
        src: string;
        alt: string;
    } | null>(null);
    const [status, setStatus] = useState<
        "idle" | "sending" | "success" | "error"
    >("idle");
    const isSending = status === "sending";



    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter((section): section is HTMLElement => section !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries.find((entry) => entry.isIntersecting);

                if (visibleEntry) {
                    setActiveSection(visibleEntry.target.id);
                }
            },
            {
                rootMargin: "-25% 0px -65% 0px",
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value,
        }));
    }


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setStatus("success");

            setForm({
                name: "",
                email: "",
                message: "",
            });

            setTimeout(() => {
                setStatus("idle");
            }, 3000);
        } catch (error) {
            console.error(error);

            setStatus("error");

            setTimeout(() => {
                setStatus("idle");
            }, 4000);
        }
    }

    function toggleProject(projectTitle: string) {
        const updateProject = () => {
            setExpandedProject((current) =>
                current === projectTitle ? null : projectTitle
            );
        };

        const documentWithTransition = document as Document & {
            startViewTransition?: (callback: () => void) => void;
        };

        if (documentWithTransition.startViewTransition) {
            documentWithTransition.startViewTransition(updateProject);
        } else {
            updateProject();
        }
    }
    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);
    useEffect(() => {
        if (!expandedProject) {
            return;
        }

        const timeout = setTimeout(() => {
            const card = document.querySelector(
                `[data-project="${expandedProject}"]`
            );

            card?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 180);

        return () => clearTimeout(timeout);
    }, [expandedProject]);
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setSelectedImage(null);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <>
            <header className="topbar">
                <div className="nav-container">
                    <a className="nav-logo" href="#home">
                        Mert
                    </a>

                    <nav className="nav-links" aria-label="Main navigation">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={
                                    activeSection === item.id
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="page">
                <div className="content-shell">
                <div className="container">

                    {/* HERO */}
                    <section className="hero section-block" id="home">
                        <div className="hero-main">

                            <p className="eyebrow">PORTFOLIO / 2026</p>
                            <div className="hero-status">
                                <span className="hero-status-dot" />
                                <span>Open to software opportunities</span>
                            </div>
                            <h1>Mert</h1>

                            <p className="role">
                                Software Developer & Computer Engineering Student
                            </p>

                            <p className="claim">
                                I build practical software products that turn real-world problems
                                into usable digital solutions.
                            </p>

                            <div className="hero-actions">
                                <a className="hero-button" href="#projects">
                                    View My Work
                                </a>

                                <a className="secondary-link" href="#contact">
                                    Contact
                                </a>

                                <a
                                    className="secondary-link"
                                    href="https://github.com/MertDikdas"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>

                                <a
                                    className="secondary-link"
                                    href="https://www.linkedin.com/in/mert-dikdas/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    className="nav-cv"
                                    href="/Mert-CV.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    CV ↗
                                </a>
                            </div>
                        </div>

                        <aside className="hero-side">
                            <div className="hero-meta">
                                <span>FOCUS</span>
                                <strong>Backend & Software Systems</strong>
                            </div>

                            <div className="hero-meta">
                                <span>CORE STACK</span>
                                <strong>Java / Spring Boot</strong>
                            </div>

                            <div className="hero-meta">
                                <span>INTERESTS</span>
                                <strong>APIs / Microservices / AI</strong>
                            </div>

                            <a
                                className="cv-link"
                                href="/Mert-CV.pdf"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View CV ↗
                            </a>
                        </aside>
                    </section>

                    {/* PROJECTS */}
                    <section
                        className="projects section-block reveal"

                        id="projects"
                    >
                        <p className="eyebrow">SELECTED PROJECTS</p>

                        <h2>Things I've built</h2>

                        <div className="project-list">
                            {projects.map((project) => {
                                const isExpanded =
                                    expandedProject === project.title;

                                return (
                                    <article
                                        className={`project-card ${
                                            isExpanded ? "project-card-expanded" : ""
                                        } ${!project.image ? "project-card-no-image" : ""}`}
                                        key={project.title}
                                        data-project={project.title}
                                        onClick={() => toggleProject(project.title)}
                                        style={{
                                            viewTransitionName: `project-${project.title
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`,
                                        }}
                                    >

                                        {project.image && (
                                            <div
                                                className="project-image-wrapper"
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    setSelectedImage({
                                                        src: project.image,
                                                        alt: project.imageAlt,
                                                    });
                                                }}
                                            >
                                                <img
                                                    className="project-image"
                                                    src={project.image}
                                                    alt={project.imageAlt}
                                                    loading="lazy"
                                                />

                                                <div className="project-image-overlay">
                                                    <span>View image ↗</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="project-content">
                                            <div className="project-header">
                                                <div>
                                                    <h3>{project.title}</h3>

                                                    <span className="project-type">
              {project.type}
            </span>
                                                </div>

                                                <button
                                                    className="expand-button"
                                                    type="button"
                                                    aria-label={
                                                        isExpanded
                                                            ? `Collapse ${project.title}`
                                                            : `Expand ${project.title}`
                                                    }
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        toggleProject(project.title);
                                                    }}
                                                >
                                                    {isExpanded ? "−" : "+"}
                                                </button>
                                            </div>

                                            <p className="project-description">
                                                {project.description}
                                            </p>

                                            <div className="tech-stack">
                                                {project.technologies.map(
                                                    (technology) => (
                                                        <span key={technology}>
                {technology}
              </span>
                                                    )
                                                )}
                                            </div>

                                            {isExpanded && (
                                                <div className="project-expanded-details">

                                                    <div className="project-detail-block">
      <span className="project-detail-label">
        WHAT I BUILT
      </span>

                                                        <ul className="project-highlights">
                                                            {project.highlights.map((highlight) => (
                                                                <li key={highlight}>
                                                                    {highlight}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="project-detail-block">
      <span className="project-detail-label">
        ARCHITECTURE
      </span>

                                                        <p className="project-architecture">
                                                            {project.architecture}
                                                        </p>
                                                    </div>

                                                </div>
                                            )}

                                            {project.repository ? (
                                                <a
                                                    className="project-link"
                                                    href={project.repository}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                >
                                                    View Repository →
                                                </a>
                                            ) : (
                                                <span className="project-link-disabled">
            Repository coming soon
          </span>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    {/* EXPERIENCE */}
                    <section
                        id="experience"
                        className="experience section-block reveal"
                    >
                        <p className="eyebrow">
                            EXPERIENCE
                        </p>

                        <h2>
                            Where I've worked
                        </h2>

                        <div className="experience-timeline">
                            {experiences.map((experience) => (
                                <article
                                    className="timeline-item"
                                    key={`${experience.company}-${experience.period}`}
                                >
                                    <div className="timeline-period">
                                        {experience.period}
                                    </div>

                                    <div className="timeline-marker">
                                        <span />
                                    </div>

                                    <div className="timeline-content">
                                        <h3>
                                            {experience.company}
                                        </h3>

                                        <p className="timeline-role">
                                            {experience.role}
                                        </p>

                                        <p className="timeline-description">
                                            {experience.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* ABOUT */}
                    <section
                        className="about section-block reveal"
                        id="about"
                    >
                        <p className="eyebrow">ABOUT ME</p>

                        <h2>
                            Building software, understanding systems.
                        </h2>

                        <p>
                            I’m a Computer Engineering student focused on
                            backend development and building practical
                            software products.
                        </p>

                        <p>
                            I mainly work with Java, Spring Boot, Python,
                            and modern backend technologies. I enjoy
                            designing APIs, working with microservice
                            architectures, and understanding how
                            applications work end to end.
                        </p>
                    </section>

                    {/* SKILLS */}
                    <section
                        className="skills section-block reveal"
                        id="skills"
                    >
                        <p className="eyebrow">SKILLS</p>

                        <h2>Technologies I work with</h2>

                        <div className="skill-groups">
                            {skillGroups.map((group) => (
                                <div
                                    className="skill-group"
                                    key={group.title}
                                >
                                    <h3>{group.title}</h3>

                                    <div className="skill-list">
                                        {group.skills.map((skill) => (
                                            <span key={skill}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CONTACT */}
                    <section
                        id="contact"
                        className="contact section-block reveal"
                    >
                        <div className="contact-layout">

                            <div className="contact-intro">
                                <p className="eyebrow">CONTACT</p>

                                <h2>Let's build something.</h2>

                                <p>
                                    Have a question, an opportunity, or a project in mind?
                                    Send me a message and I'll get back to you.
                                </p>

                                <div className="contact-links">
                                    <a
                                        href="https://github.com/MertDikdas"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub ↗
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/in/mert-dikdas/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn ↗
                                    </a>
                                </div>
                            </div>

                            <form
                                className="contact-form"
                                onSubmit={handleSubmit}
                            >
                                <label>
                                    <span>Name</span>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <label>
                                    <span>Email</span>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <label>
                                    <span>Message</span>

                                    <textarea
                                        name="message"
                                        placeholder="Write your message..."
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <div className="contact-form-footer">
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                    >
                                        {status === "sending" && "Sending..."}

                                        {status === "success" && "Message sent ✓"}

                                        {status !== "sending" &&
                                            status !== "success" &&
                                            "Send message →"}
                                    </button>

                                    {status === "error" && (
                                        <p className="form-status form-status-error">
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                </div>
                            </form>

                        </div>
                    </section>

                    {/* FOOTER */}
                    <footer className="footer">
                        <div>
                            <p className="footer-name">
                                Mert
                            </p>

                            <p className="footer-role">
                                Software Developer & Computer Engineering Student
                            </p>
                        </div>

                        <div className="footer-links">
                            <a
                                href="https://github.com/MertDikdas"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>

                            <a
                                href="https://www.linkedin.com/in/mert-dikdas/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="/Mert-CV.pdf"
                                target="_blank"
                                rel="noreferrer"
                            >
                                CV
                            </a>
                        </div>

                        <p className="footer-copy">
                            © 2026 Mert
                        </p>
                    </footer>

                </div>
                </div>
            </main>
            {selectedImage && (
                <div
                    className="image-modal"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        type="button"
                        className="image-modal-close"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close image"
                    >
                        ×
                    </button>

                    <img
                        className="image-modal-content"
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);