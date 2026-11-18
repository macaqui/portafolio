# Portafolio — Samuel Hincapié

Portafolio personal de desarrollador, construido con **React 19 + Vite + TypeScript + Tailwind CSS v4**.

> 🌐 **En vivo:** <https://macaqui.github.io/portafolio/> — se publica solo con GitHub Pages
> (`.github/workflows/pages.yml`) cada vez que se sube un cambio a `main`.

## Qué incluye

| Sección | Contenido |
| --- | --- |
| Inicio | Presentación y llamada a la acción |
| Sobre mí | Perfil profesional |
| Servicios | Qué ofrezco (interfaces web, aplicaciones con IA, etc.) |
| Tecnologías | Herramientas que manejo, agrupadas por área |
| Proyectos | Tarjetas de proyectos con ventana de detalle |
| Contacto | Formulario y enlaces a redes |

## Cómo ejecutarlo

```bash
npm install
npm run dev        # servidor de desarrollo -> http://localhost:5173
npm run build      # compila la versión de producción en dist/
npm run preview    # previsualiza lo compilado
```

## Estructura

```
src/
├── App.tsx        # componente principal: todas las secciones del portafolio
├── index.css      # estilos globales e importación de Tailwind
└── main.tsx       # punto de entrada que monta React dentro de <div id="root">
index.html         # única página HTML del proyecto
vite.config.ts     # configuración de Vite (React, Tailwind y alias "@")
```

## Notas

- El diseño es **responsive** (se adapta a móvil, tablet y escritorio).
- El botón de menú, el modal de proyectos y el formulario de contacto son interactivos.

---

Proyecto desarrollado por **Samuel Hincapié** como parte de su portafolio de desarrollo de software.

---

## Abrirlo con doble clic (sin servidor ni internet)

```bash
npm run build:usb      # genera dist-usb/index.html
```

Ese comando produce **un solo archivo HTML** con el CSS y el JavaScript
incrustados. Funciona abriéndolo con doble clic (por ejemplo desde una USB), sin
servidor y sin conexión.

**¿Por qué hace falta?** Al abrir `dist/index.html` con `file://` el navegador
bloquea los módulos ES que se descargan, porque los trata como una petición
cross-origin desde el origen `null`, y la página queda en blanco. Al incrustar
el código dentro del HTML ya no hay nada que descargar.
