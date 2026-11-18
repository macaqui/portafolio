import { FormEvent, useEffect, useState } from "react";

type IconName =
  | "arrow"
  | "brain"
  | "chart"
  | "check"
  | "code"
  | "compass"
  | "design"
  | "github"
  | "layers"
  | "linkedin"
  | "mail"
  | "menu"
  | "rocket"
  | "spark"
  | "workflow"
  | "x";

type ModalContent = {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
};

const navLinks = [
  ["Inicio", "inicio"],
  ["Sobre mí", "sobre-mi"],
  ["Servicios", "servicios"],
  ["Tecnologías", "tecnologias"],
  ["Proyectos", "proyectos"],
  ["Contacto", "contacto"],
];

const services = [
  {
    icon: "code" as IconName,
    title: "Frontend Development",
    description:
      "Desarrollo de interfaces web modernas, responsivas y accesibles, con componentes reutilizables y código mantenible.",
    tags: ["React", "js", "html", "css"],
  },
  {
    icon: "brain" as IconName,
    title: "Aplicaciones con IA",
    description:
      "Integración de modelos de lenguaje y API de IA para crear asistentes, generadores de contenido y experiencias inteligentes.",
    tags: ["LLM", "OpenAI API", "AI UX"],
  },
  {
    icon: "layers" as IconName,
    title: "Diseño de interfaces",
    description:
      "Construcción de interfaces consistentes y atractivas a partir de sistemas de diseño, prototipos y requerimientos de producto.",
    tags: ["UI", "UX", "Design Systems"],
  },
  {
    icon: "workflow" as IconName,
    title: "Integración de API",
    description:
      "Conexión de interfaces frontend con servicios externos, API REST y funcionalidades de aplicaciones.",
    tags: ["REST API", "Fetch", "JSON"],
  },
  {
    icon: "chart" as IconName,
    title: "Dashboards inteligentes",
    description:
      "Interfaces para explorar datos, visualizar indicadores y presentar información con apoyo de inteligencia artificial.",
    tags: ["Analytics", "Charts"],
  },
  {
    icon: "rocket" as IconName,
    title: "Prototipos y MVP",
    description:
      "Desarrollo de prototipos funcionales y productos mínimos viables para validar ideas y acelerar el lanzamiento de productos digitales.",
    tags: ["MVP", "Next.js", "Prototyping"],
  },
];

const technologyGroups = {
  Frontend: [
    ["React", "Construcción de interfaces basadas en componentes.", "Frontend", "⚛"],
    ["Next.js", "Framework para aplicaciones React y experiencias web modernas.", "Frontend", "N"],
    ["TypeScript", "Tipado estático para desarrollar aplicaciones más mantenibles.", "Lenguaje", "TS"],
    ["JavaScript", "Lógica, interactividad y funcionalidades del navegador.", "Lenguaje", "JS"],
  ],
  "UI & Styling": [
    ["HTML5", "Estructura semántica y accesible para la web.", "Markup", "5"],
    ["CSS3", "Estilos, animaciones y layouts adaptables.", "Styling", "3"],
    ["Tailwind CSS", "Construcción rápida de interfaces mediante utilidades CSS.", "Styling", "TW"],
    ["Figma", "Exploración visual, prototipado y colaboración en diseño.", "Diseño", "F"],
  ],
  "AI & APIs": [
    ["OpenAI API", "Integración de modelos de lenguaje en aplicaciones.", "AI API", "AI"],
    ["LLM", "Experiencias conversacionales y generación de contenido.", "Inteligencia artificial", "LLM"],
    ["REST API", "Comunicación entre la interfaz y servicios externos.", "Integración", "{ }"],
    ["RAG", "Respuestas con información recuperada de fuentes de conocimiento.", "AI Pattern", "R"],
  ],
  "Tools & Backend": [
    ["Git", "Control de versiones y seguimiento de cambios.", "Herramienta", "G"],
    ["GitHub", "Repositorios, colaboración y gestión del código.", "Plataforma", "GH"],
    ["Node.js", "Entorno JavaScript para herramientas y servicios backend.", "Backend", "JS"],
    ["Vercel", "Despliegue y publicación de aplicaciones web.", "Deployment", "▲"],
  ],
};

const techColors: Record<string, string> = {
  React: "#2e00e47a",
  "Next.js": "#F5F7FB",
  TypeScript: "#3179c67c",
  JavaScript: "#9b40089f",
  HTML5: "#40ac28",
  CSS3: "#1572B6",
  "Tailwind CSS": "#06B6D4",
  Figma: "#A259FF",
  "OpenAI API": "#34D399",
  LLM: "#8B5CF6",
  "REST API": "#22D3EE",
  RAG: "#A78BFA",
  Git: "#F05032",
  GitHub: "#F5F7FB",
  "Node.js": "#5FA04E",
  Vercel: "#F5F7FB",
};

const projects = [
  {
    title: "AI Assistant",
    category: "IA conversacional",
    description:
      "Concepto de asistente conversacional que integra una interfaz de chat moderna con respuestas generadas por un modelo de lenguaje.",
    tags: ["React", "TypeScript", "AI API"],
    visual: "assistant",
  },
  {
    title: "Smart Dashboard",
    category: "Data experience",
    description:
      "Dashboard conceptual para visualizar métricas y presentar resúmenes inteligentes que faciliten la comprensión de los datos.",
    tags: ["Next.js", "Charts", "API"],
    visual: "dashboard",
  },
  {
    title: "Knowledge Hub",
    category: "Knowledge AI",
    description:
      "Concepto de aplicación para explorar documentación, realizar búsquedas y consultar información mediante lenguaje natural.",
    tags: ["Next.js", "RAG", "Embeddings"],
    visual: "knowledge",
  },
];

const processSteps = [
  ["compass", "Descubrimiento", "Entender el problema, los usuarios y los objetivos del proyecto."],
  ["design", "Diseño", "Definir estructura, experiencia de usuario y dirección visual."],
  ["code", "Desarrollo", "Construir componentes, integrar servicios y validar funcionalidades."],
  ["rocket", "Entrega y mejora", "Publicar, probar y planificar iteraciones a partir de los resultados."],
] as const;

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    brain: <><path d="M9.5 4A3.5 3.5 0 0 0 6 7.5v.5A3 3 0 0 0 4 13.6 3.5 3.5 0 0 0 9.5 18" /><path d="M14.5 4A3.5 3.5 0 0 1 18 7.5v.5a3 3 0 0 1 2 5.6 3.5 3.5 0 0 1-5.5 4.4M9.5 4v16M14.5 4v16M9.5 9H7M17 9h-2.5M9.5 14H7m10 0h-2.5" /></>,
    chart: <><path d="M4 19V9m5 10V5m5 14v-7m5 7V3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    code: <><path d="m8 9-4 3 4 3m8-6 4 3-4 3m-3-9-2 12" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    design: <><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 4 5.1 5.1 0 0 0 19.1.5S18 0 15 2a13.4 13.4 0 0 0-6 0C6 0 4.9.5 4.9.5A5.1 5.1 0 0 0 4.7 4a5.5 5.5 0 0 0-1.5 3.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 19c-3 .9-3-1.5-4-2" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2M9 15l-3-3s3.5-6.5 8-8.5c3-1 6.5 0 6.5 0s1 3.5 0 6.5c-1.5 4.5-8 8-8 8l-3-3Z" /><circle cx="15" cy="9" r="2" /></>,
    spark: <><path d="m12 3-1.2 4.2L7 9l3.8 1.8L12 15l1.2-4.2L17 9l-3.8-1.8L12 3ZM5 15l-.7 2.3L2 18l2.3.7L5 21l.7-2.3L8 18l-2.3-.7L5 15Z" /></>,
    workflow: <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M9 6h4a4 4 0 0 1 4 4v5M15 18h-4a4 4 0 0 1-4-4V9" /></>,
    x: <><path d="M5 5l14 14M19 5 5 19" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="Ir al inicio">
      <span className="logo-mark">&lt;/&gt;</span>
      <span><strong>MAKE</strong><small>SAMUEL</small></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navLinks.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <a className="button button-small header-cta" href="#contacto">Hablemos <Icon name="arrow" size={16} /></a>
        <button className="icon-button menu-button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>
      <nav className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Navegación móvil">
        {navLinks.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<Icon name="arrow" size={16} /></a>)}
        <a className="button" href="#contacto" onClick={() => setOpen(false)}>Hablemos</a>
      </nav>
    </header>
  );
}

function AIWorkspaceCard() {
  return (
    <div className="ai-card-wrap" aria-label="Demostración visual de un espacio de trabajo de inteligencia artificial">
      <div className="ai-card">
        <div className="ai-topbar">
          <div className="window-dots"><i /><i /><i /></div>
          <span className="mono-label"><span className="status-dot" /> AI WORKSPACE</span>
          <span className="ai-version">v1.0</span>
        </div>
        <div className="ai-body">
          <div className="user-message">
            <span>USER REQUEST</span>
            Diseña una experiencia clara para explorar datos complejos.
          </div>
          <div className="assistant-row">
            <div className="assistant-icon"><Icon name="spark" size={18} /></div>
            <div className="assistant-response">
              <div className="response-head"><strong>Assistant</strong><span>Procesando contexto</span></div>
              <p>Crearé una arquitectura visual que priorice los indicadores clave y convierta los datos en decisiones.</p>
              <div className="response-lines"><i /><i /><i /></div>
            </div>
          </div>
          <div className="data-flow">
            <div className="node node-a">UI</div><div className="flow-line line-a" />
            <div className="node node-b">API</div><div className="flow-line line-b" />
            <div className="node node-c"><Icon name="brain" size={17} /></div>
            <span className="pulse pulse-one" /><span className="pulse pulse-two" />
          </div>
          <div className="ai-footer">
            <div className="chips"><span>LLM</span><span>API</span><span>Frontend</span></div>
            <span className="processing"><i /><i /><i /> GENERATING</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero section" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span /> FRONTEND DEVELOPER · AI ENTHUSIAST</div>
          <h1>Diseño el futuro <span className="gradient-text">con codigo e innovacion.</span></h1>
          <p className="hero-lead">Desarrollo interfaces web modernas y aplicaciones potenciadas por inteligencia artificial, combinando diseño, tecnología y soluciones centradas en las personas.</p>
          <div className="hero-actions">
            <a className="button" href="#proyectos">Explorar proyectos <Icon name="arrow" size={18} /></a>
            <a className="button button-secondary" href="#contacto">Contactarme</a>
          </div>
          <div className="hero-features">
            {["Frontend moderno", "Aplicaciones con IA", "Diseño centrado en el usuario"].map(item => (
              <span key={item}><Icon name="check" size={15} />{item}</span>
            ))}
          </div>
        </div>
        <AIWorkspaceCard />
      </div>
    </section>
  );
}

function TechMarquee() {
  const items = [["R", "React"], ["TS", "TypeScript"], ["N", "Next.js"], ["TW", "Tailwind CSS"], ["JS", "JavaScript"], ["G", "Git"], ["AI", "OpenAI API"], ["⬡", "Node.js"]];
  return (
    <section className="tech-strip" aria-labelledby="tech-strip-title">
      <div className="container">
        <p id="tech-strip-title">Tecnologías con las que construyo</p>
        <div className="tech-strip-list">
          {items.map(([icon, name]) => <div key={name}><span>{icon}</span>{name}</div>)}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, subtitle, centered = false }: { eyebrow: string; title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <div className="eyebrow"><span /> {eyebrow}</div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function AboutSection() {
  const focuses = [
    ["layers", "Experiencias de usuario intuitivas"],
    ["code", "Arquitecturas frontend mantenibles"],
    ["workflow", "Integración de API y servicios de IA"],
    ["spark", "Aprendizaje continuo e innovación"],
  ] as const;
  return (
    <section className="section section-alt" id="sobre-mi">
      <div className="container about-grid">
        <div>
          <SectionHeading eyebrow="SOBRE MÍ" title="Desarrollo con propósito. Diseño con intención." />
          <div className="about-copy">
            <p>Soy una persona que está comenzando en el mundo del desarrollo de software. Me interesa aprender a crear páginas web modernas, fáciles de usar y explorar cómo la inteligencia artificial puede ayudar a desarrollar mejores aplicaciones. </p>
            <p>Mi enfoque combina pensamiento visual, buenas prácticas de desarrollo, componentes reutilizables e integración de servicios inteligentes. Busco transformar ideas en productos funcionales que resuelvan problemas reales.</p>
          </div>
        </div>
        <div className="focus-card">
          <div className="focus-head"><span>Mi enfoque técnico</span><span className="focus-badge"><Icon name="spark" size={15} /> BUILD WITH INTENT</span></div>
          <div className="focus-list">
            {focuses.map(([icon, title], index) => (
              <div key={title}>
                <span className="focus-number">0{index + 1}</span>
                <span className="icon-box"><Icon name={icon} /></span>
                <strong>{title}</strong>
                <Icon name="arrow" size={17} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, onOpen }: { service: typeof services[number]; onOpen: () => void }) {
  return (
    <article className="service-card">
      <div className="icon-box"><Icon name={service.icon} /></div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="chips">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <button className="text-button" onClick={onOpen}>Explorar servicio <Icon name="arrow" size={17} /></button>
    </article>
  );
}

function ServicesGrid({ openModal }: { openModal: (content: ModalContent) => void }) {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <SectionHeading eyebrow="SERVICIOS" title="Servicios para construir la próxima generación de productos digitales." subtitle="Del diseño de interfaces a la integración de inteligencia artificial, desarrollo soluciones adaptadas a las necesidades de cada proyecto." />
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard key={service.title} service={service} onOpen={() => openModal({ eyebrow: "SERVICIO", title: service.title, description: service.description, tags: service.tags })} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologyCard({ technology }: { technology: string[] }) {
  const [name, description, category, icon] = technology;
  return (
    <article className="technology-card">
      <div className="tech-icon" style={{ "--icon-color": techColors[name] } as React.CSSProperties}>{icon}</div>
      <span className="tech-index">/ STACK</span>
      <h3>{name}</h3>
      <p>{description}</p>
      <span className="category-chip">{category}</span>
    </article>
  );
}

function TechnologyTabs() {
  const tabs = Object.keys(technologyGroups) as Array<keyof typeof technologyGroups>;
  const [active, setActive] = useState<keyof typeof technologyGroups>("Frontend");
  return (
    <section className="section section-alt tech-section" id="tecnologias">
      <div className="container">
        <SectionHeading eyebrow="TECHNOLOGY STACK" title="Mi stack tecnológico." subtitle="Herramientas que utilizo o exploro para diseñar, desarrollar e integrar aplicaciones web e inteligencia artificial." />
        <div className="tabs" role="tablist" aria-label="Categorías de tecnologías">
          {tabs.map(tab => (
            <button key={tab} role="tab" aria-selected={active === tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)}>{tab}</button>
          ))}
        </div>
        <div className="technology-grid" key={active} role="tabpanel">
          {technologyGroups[active].map(technology => <TechnologyCard key={technology[0]} technology={technology} />)}
        </div>
        <p className="stack-note"><Icon name="spark" size={15} /> Un stack en evolución constante, elegido según las necesidades de cada producto.</p>
      </div>
    </section>
  );
}

function ProjectVisual({ type }: { type: string }) {
  if (type === "assistant") return (
    <div className="project-mockup assistant-mockup">
      <div className="mock-sidebar"><i /><i /><i /><i /></div>
      <div className="mock-content"><span className="mock-title" /><div className="mock-chat"><i /><span /><span /></div><div className="mock-answer"><i /><span /><span /><span /></div><div className="mock-input" /></div>
    </div>
  );
  if (type === "dashboard") return (
    <div className="project-mockup dashboard-mockup">
      <div className="dash-top"><i /><i /></div><div className="dash-cards"><span /><span /><span /></div>
      <div className="dash-chart"><div className="bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="donut" /></div>
    </div>
  );
  return (
    <div className="project-mockup knowledge-mockup">
      <div className="knowledge-side"><i /><i /><i /><i /></div>
      <div className="knowledge-main"><span className="search-bar" /><div className="knowledge-layout"><div><i /><i /><i /></div><aside><Icon name="spark" size={16} /><span /><span /><span /></aside></div></div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: typeof projects[number]; onOpen: () => void }) {
  return (
    <article className="project-card">
      <div className={`project-cover ${project.visual}`}>
        <span className="project-label">DEMO · {project.category}</span>
        <ProjectVisual type={project.visual} />
      </div>
      <div className="project-info">
        <div className="project-title-row"><h3>{project.title}</h3><span>CONCEPT / 0{projects.indexOf(project) + 1}</span></div>
        <p>{project.description}</p>
        <div className="chips">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          <button className="button button-small" onClick={onOpen}>Ver proyecto <Icon name="arrow" size={16} /></button>
          <button className="button button-small button-secondary" onClick={onOpen}>Código fuente <Icon name="code" size={16} /></button>
        </div>
      </div>
    </article>
  );
}

function ProjectsGrid({ openModal }: { openModal: (content: ModalContent) => void }) {
  return (
    <section className="section" id="proyectos">
      <div className="container">
        <SectionHeading eyebrow="PROYECTOS DESTACADOS" title="Proyectos que convierten ideas en experiencias." subtitle="Una selección de productos y conceptos que representan mi enfoque de desarrollo frontend e inteligencia artificial." />
        <div className="projects-grid">
          {projects.map(project => <ProjectCard key={project.title} project={project} onOpen={() => openModal({ eyebrow: "PROYECTO DEMOSTRATIVO", title: project.title, description: `${project.description} Este proyecto es un concepto de interfaz y aún no cuenta con una URL pública o repositorio configurado.`, tags: project.tags })} />)}
        </div>
      </div>
    </section>
  );
}

type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  enlace: string;
  creado: string;
};

// En local y en Render la API esta en el mismo servidor; en GitHub Pages uso la de Render.
const API = (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.indexOf("onrender.com") !== -1) ? "" : "https://portafolio.onrender.com";

function ProjectsApi() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // La página y la API se sirven desde el mismo puerto, por eso la ruta es relativa.
  async function cargar() {
    try {
      const respuesta = await fetch(API + "/api/proyectos");
      if (!respuesta.ok) throw new Error("No se pudo listar");
      setProyectos(await respuesta.json());
      setError("");
    } catch {
      setError("No se pudieron cargar los proyectos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function crear(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formulario = event.currentTarget;
    const datos = new FormData(formulario);
    try {
      const respuesta = await fetch(API + "/api/proyectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: String(datos.get("titulo") || "").trim(),
          descripcion: String(datos.get("descripcion") || "").trim(),
          enlace: String(datos.get("enlace") || "").trim(),
        }),
      });
      if (!respuesta.ok) throw new Error("No se pudo crear");
      formulario.reset();
      setError("");
      cargar();
    } catch {
      setError("No se pudo guardar el proyecto.");
    }
  }

  async function borrar(id: number) {
    try {
      const respuesta = await fetch(`${API}/api/proyectos/${id}`, { method: "DELETE" });
      if (!respuesta.ok) throw new Error("No se pudo borrar");
      setError("");
      cargar();
    } catch {
      setError("No se pudo borrar el proyecto.");
    }
  }

  return (
    <section className="section section-alt" id="proyectos-api">
      <div className="container">
        <SectionHeading eyebrow="PROYECTOS DESDE LA API" title="Proyectos guardados en la base de datos." subtitle="Esta lista se carga desde la API del portafolio. Puedes agregar un proyecto nuevo o borrar los que ya no quieras mostrar." />
        <div className="grid gap-7 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-start">
          <form className="contact-form" onSubmit={crear}>
            <label>Título <span>*</span><input name="titulo" placeholder="Nombre del proyecto" required /></label>
            <label>Descripción <span>*</span><textarea name="descripcion" rows={3} placeholder="De qué trata el proyecto" required /></label>
            <label>Enlace <span>*</span><input name="enlace" type="url" placeholder="https://ejemplo.com" required /></label>
            <button className="button submit-button" type="submit">Agregar proyecto <Icon name="arrow" size={18} /></button>
          </form>
          <div>
            {error && <p className="mb-4 text-[12px] text-[#fca5a5]">{error}</p>}
            {cargando ? (
              <p className="text-[13px] text-[#a1a8b8]">Cargando proyectos...</p>
            ) : proyectos.length === 0 ? (
              <p className="text-[13px] text-[#a1a8b8]">Todavía no hay proyectos guardados.</p>
            ) : (
              <div className="projects-grid">
                {proyectos.map(proyecto => (
                  <article className="project-card" key={proyecto.id}>
                    <div className="project-info">
                      <div className="project-title-row"><h3>{proyecto.titulo}</h3><span>API / {String(proyecto.id).padStart(2, "0")}</span></div>
                      <p>{proyecto.descripcion}</p>
                      <div className="project-actions">
                        <a className="button button-small" href={proyecto.enlace} target="_blank" rel="noreferrer">Ver proyecto <Icon name="arrow" size={16} /></a>
                        <button className="button button-small button-secondary" onClick={() => borrar(proyecto.id)}>Borrar <Icon name="x" size={16} /></button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeading eyebrow="PROCESO DE TRABAJO" title="De la idea al producto." subtitle="Un proceso claro, colaborativo y enfocado en convertir objetivos en experiencias funcionales." />
        <div className="process-grid">
          {processSteps.map(([icon, title, description], index) => (
            <article className="process-step" key={title}>
              <span className="step-number">0{index + 1}</span>
              <div className="step-icon"><Icon name={icon} /></div>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialLinks({ labels = false }: { labels?: boolean }) {
  return (
    <div className={`social-links ${labels ? "with-labels" : ""}`}>
      <a href="https://github.com/macaqui" target="_blank" rel="noreferrer" aria-label="GitHub de Samuel Hincapié"><Icon name="github" />{labels && <span>GitHub</span>}</a>
      <a href="https://www.linkedin.com/in/samuel-velez-0154b22a2" target="_blank" rel="noreferrer" aria-label="LinkedIn de Samuel Hincapié"><Icon name="linkedin" />{labels && <span>LinkedIn</span>}</a>
      <a href="mailto:Samuelvelezhinca@gmail.com" aria-label="Enviar correo"><Icon name="mail" />{labels && <span>Samuelvelezhinca@gmail.com</span>}</a>
    </div>
  );
}

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    const email = String(data.get("email") || "");
    if (!String(data.get("name") || "").trim()) nextErrors.name = "Ingresa tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Ingresa un correo electrónico válido.";
    if (!data.get("project")) nextErrors.project = "Selecciona un tipo de proyecto.";
    if (!String(data.get("message") || "").trim()) nextErrors.message = "Cuéntame brevemente sobre tu idea.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setConfirmed(true);
  }
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>Nombre <span>*</span><input name="name" placeholder="Tu nombre" aria-invalid={!!errors.name} />{errors.name && <small>{errors.name}</small>}</label>
        <label>Correo electrónico <span>*</span><input name="email" type="email" placeholder="tu@correo.com" aria-invalid={!!errors.email} />{errors.email && <small>{errors.email}</small>}</label>
      </div>
      <label>Tipo de proyecto <span>*</span>
        <select name="project" defaultValue="" aria-invalid={!!errors.project}>
          <option value="" disabled>Selecciona una opción</option>
          <option>Desarrollo frontend</option><option>Aplicación con IA</option><option>Dashboard o herramienta interna</option><option>Prototipo o MVP</option><option>Otro</option>
        </select>
        {errors.project && <small>{errors.project}</small>}
      </label>
      <label>Mensaje <span>*</span><textarea name="message" rows={5} placeholder="Cuéntame sobre tu idea, objetivo o reto..." aria-invalid={!!errors.message} />{errors.message && <small>{errors.message}</small>}</label>
      {confirmed ? (
        <div className="form-success" role="status">
          <Icon name="check" /><div><strong>Tu mensaje está listo.</strong><p>Este sitio no tiene un backend configurado. Puedes enviarlo directamente por correo.</p></div>
          <a className="button button-small" href="mailto:Samuelvelezhinca@gmail.com?subject=Consulta%20desde%20el%20portafolio">Abrir correo <Icon name="mail" size={16} /></a>
        </div>
      ) : <button className="button submit-button" type="submit">Enviar mensaje <Icon name="arrow" size={18} /></button>}
      <p className="form-note">Al enviar, validaremos tus datos y te ofreceremos la alternativa de contacto por correo.</p>
    </form>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contacto">
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="eyebrow"><span /> HABLEMOS</div>
          <h2>¿Construimos algo <span className="gradient-text">inteligente?</span></h2>
          <p>Si tienes una idea, un producto digital o un proceso que podría beneficiarse de una mejor experiencia web o de la inteligencia artificial, conversemos.</p>
          <div className="availability"><span className="status-dot" /><div><strong>Disponible para conversar</strong><small>Proyectos freelance · Colaboraciones · Nuevas ideas</small></div></div>
          <SocialLinks labels />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Modal({ content, onClose }: { content: ModalContent; onClose: () => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", close);
    document.body.classList.add("modal-open");
    return () => { document.removeEventListener("keydown", close); document.body.classList.remove("modal-open"); };
  }, [onClose]);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={event => event.stopPropagation()}>
        <button className="icon-button modal-close" aria-label="Cerrar modal" onClick={onClose}><Icon name="x" /></button>
        <div className="eyebrow"><span /> {content.eyebrow}</div>
        <h2 id="modal-title">{content.title}</h2><p>{content.description}</p>
        <div className="chips">{content.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <a className="button" href="#contacto" onClick={onClose}>Conversemos sobre esto <Icon name="arrow" size={17} /></a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div><Logo /><p>Diseñado y desarrollado con curiosidad, código e inteligencia artificial.</p></div>
        <nav aria-label="Enlaces del pie de página">{navLinks.slice(0, 5).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <SocialLinks />
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Developer Portfolio.</span><span>FRONTEND · DESIGN · ARTIFICIAL INTELLIGENCE</span></div>
    </footer>
  );
}

export default function App() {
  const [modal, setModal] = useState<ModalContent | null>(null);
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <ServicesGrid openModal={setModal} />
        <TechnologyTabs />
        <ProjectsGrid openModal={setModal} />
        <ProjectsApi />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      {modal && <Modal content={modal} onClose={() => setModal(null)} />}
    </>
  );
}
