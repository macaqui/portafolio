const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Lee el .env; si no existe, usa la base de datos local por defecto
try {
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
} catch (e) {
  process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';
}

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Corta el acceso a carpetas y archivos internos del proyecto.
app.use((req, res, next) => {
  const partes = decodeURIComponent(req.path).split('/').filter(Boolean);
  const prohibidas = ['server', 'node_modules', 'src'];
  const bloqueado = partes.some((p) => prohibidas.includes(p) || p.startsWith('.'));
  if (bloqueado) return res.status(403).json({ error: 'Acceso prohibido' });
  next();
});

app.get('/api/proyectos', async (req, res) => {
  const proyectos = await prisma.proyecto.findMany({ orderBy: { id: 'asc' } });
  res.json(proyectos);
});

app.get('/api/proyectos/:id', async (req, res) => {
  const proyecto = await prisma.proyecto.findUnique({ where: { id: Number(req.params.id) } });
  if (!proyecto) return res.status(404).json({ error: 'No existe' });
  res.json(proyecto);
});

app.post('/api/proyectos', async (req, res) => {
  const { titulo, descripcion, enlace } = req.body;
  const proyecto = await prisma.proyecto.create({ data: { titulo, descripcion, enlace } });
  res.status(201).json(proyecto);
});

app.put('/api/proyectos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existe = await prisma.proyecto.findUnique({ where: { id } });
  if (!existe) return res.status(404).json({ error: 'No existe' });
  const { titulo, descripcion, enlace } = req.body;
  const proyecto = await prisma.proyecto.update({
    where: { id },
    data: { titulo, descripcion, enlace },
  });
  res.json(proyecto);
});

app.delete('/api/proyectos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const existe = await prisma.proyecto.findUnique({ where: { id } });
  if (!existe) return res.status(404).json({ error: 'No existe' });
  await prisma.proyecto.delete({ where: { id } });
  res.json({ ok: true });
});

const raiz = path.join(__dirname, '..', '..');
const dist = path.join(raiz, 'dist');
app.use(express.static(fs.existsSync(dist) ? dist : raiz));

async function iniciar() {
  const total = await prisma.proyecto.count();
  if (total === 0) {
    await prisma.proyecto.createMany({
      data: [
        {
          titulo: 'Cívica Metro de Medellín',
          descripcion: 'Simulador de la tarjeta Cívica del Metro de Medellín.',
          enlace: 'https://macaqui.github.io/civica-metro-medellin/',
        },
        {
          titulo: 'Origami',
          descripcion: 'Gestor de notas con grulla de papel en 3D.',
          enlace: 'https://github.com/macaqui/origami',
        },
        {
          titulo: 'Práctica de CSS',
          descripcion: 'Ejercicios de maquetación y estilos con CSS.',
          enlace: 'https://macaqui.github.io/practica-css/',
        },
      ],
    });
  }

  const puerto = process.env.PORT || 3006;
  app.listen(puerto, () => {
    console.log(`Servidor portafolio en http://localhost:${puerto}`);
    console.log('Base de datos lista (Prisma + SQLite)');
  });
}

iniciar();
