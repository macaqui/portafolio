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

---

## Backend

El backend es un servidor Node.js + Express con Prisma y SQLite (un archivo
local, sin servidor de base de datos). Sirve la página compilada de `dist/` y
una API REST para los proyectos del portafolio. La página consume esa API con
`fetch` usando rutas relativas, porque todo se sirve desde el mismo puerto.

### Instalación y arranque

La carpeta `dist/` no se sube al repositorio, así que primero hay que compilar la
página desde la raíz del proyecto:

```bash
npm install
npm run build        # genera la carpeta dist/ que sirve el backend
```

Después se instala y arranca el backend:

```bash
cd server
npm install
npx prisma db push   # crea la base de datos SQLite y la tabla
npm start            # queda en http://localhost:3006
```

También existe `npm run dev`, que reinicia el servidor al guardar cambios.

### Rutas de la API

| Método | Ruta | Qué hace |
| --- | --- | --- |
| GET | `/api/proyectos` | Lista todos los proyectos |
| GET | `/api/proyectos/:id` | Devuelve un proyecto (404 si no existe) |
| POST | `/api/proyectos` | Crea un proyecto (201) |
| PUT | `/api/proyectos/:id` | Actualiza un proyecto (404 si no existe) |
| DELETE | `/api/proyectos/:id` | Elimina un proyecto (404 si no existe) |

El puerto se define con `PORT` en `server/.env` (por defecto 3006). Ese archivo
no se sube al repositorio; la plantilla está en `server/.env.example`.

## Despliegue en Render

El repositorio trae un archivo `render.yaml` para subirlo a [Render](https://render.com) como Blueprint.

1. Crea una cuenta en Render (puedes entrar con GitHub).
2. Pulsa "New" y luego "Blueprint".
3. Elige este repositorio y confirma.

Render lee el `render.yaml`, compila la página con Vite y arma el servicio solo. Cuando
termina, el portafolio queda en `https://portafolio.onrender.com/` y ahí mismo funciona
la API.

La página publicada en GitHub Pages usa esta misma API: si no está en local, apunta a la
dirección de Render, así que para ver los datos ahí el servicio tiene que estar encendido.

En el plan gratis el disco es temporal: la base SQLite se crea de nuevo cada vez que el
servicio arranca, así que los datos que agregues desde la página se pierden al reiniciar
y vuelven los 3 datos de ejemplo. El servicio también se duerme tras 15 minutos sin
visitas y tarda unos segundos en despertar.
