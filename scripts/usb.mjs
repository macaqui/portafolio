/**
 * Genera una versión del portafolio en UN SOLO archivo HTML (dist-usb/index.html)
 * que se abre con doble clic, sin servidor y sin internet.
 *
 * ¿Por qué hace falta? Al abrir dist/index.html con file:// el navegador bloquea
 * los módulos ES que se descargan (los trata como petición cross-origin desde
 * "null"), así que la página queda en blanco. Al incrustar el CSS y el JS dentro
 * del propio HTML ya no hay nada que descargar: no hay bloqueo posible.
 *
 * Uso:  npm run build:usb
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(raiz, 'dist')
const salida = resolve(raiz, 'dist-usb')
const htmlEntrada = resolve(dist, 'index.html')

if (!existsSync(htmlEntrada)) {
  console.error('No existe dist/index.html. Ejecuta primero: npm run build')
  process.exit(1)
}

const leer = (referencia) => readFileSync(resolve(dist, referencia.replace(/^\.?\//, '')), 'utf8')

const TIPOS = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
}

let html = readFileSync(htmlEntrada, 'utf8')

// 1) Hoja de estilos -> <style> incrustado
html = html.replace(
  /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
  (_m, href) => `<style>\n${leer(href)}\n</style>`,
)

// 2) Script de la app -> <script type="module"> incrustado (ya no se descarga)
html = html.replace(
  /<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g,
  (_m, src) => `<script type="module">\n${leer(src).replaceAll('</script', '<\\/script')}\n</script>`,
)

// 3) Iconos y demás archivos locales -> data URI (un solo archivo de verdad)
html = html.replace(
  /<link[^>]*rel="(icon|shortcut icon|apple-touch-icon)"[^>]*href="([^"]+)"[^>]*>/g,
  (original, _rel, href) => {
    const tipo = TIPOS[extname(href).toLowerCase()]
    if (!tipo || /^https?:/.test(href)) return original
    const datos = readFileSync(resolve(dist, href.replace(/^\.?\//, ''))).toString('base64')
    return original.replace(href, `data:${tipo};base64,${datos}`)
  },
)

mkdirSync(salida, { recursive: true })
const destino = resolve(salida, 'index.html')
writeFileSync(destino, html)

// 4) Aviso si quedó alguna referencia local que ya no exista dentro del HTML
const restantes = [...html.matchAll(/(?:src|href)="(\.\/[^"]+)"/g)].map((m) => m[1])
console.log(`Listo: ${destino}`)
console.log(`Tamano: ${(html.length / 1024).toFixed(0)} kB en un solo archivo`)
if (restantes.length > 0) {
  console.log('Referencias locales que quedaron sin incrustar:', restantes.join(', '))
}
