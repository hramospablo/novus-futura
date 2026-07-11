/* ============================================
   Novus Futura — Script
   ============================================ */

// Año dinámico en el footer
document.getElementById('anio').textContent = new Date().getFullYear();

// ---------- Proyectos (placeholder) ----------

const proyectos = [
  { nombre: 'Proyecto A', url: '#' },
  { nombre: 'Proyecto B', url: '#' }
];

const listaProyectos = document.getElementById('lista-proyectos');
listaProyectos.innerHTML = proyectos
  .map(p => `<li><a href="${p.url}">${p.nombre}</a></li>`)
  .join('');

// ---------- Artículos (placeholder de ejemplo — sustituir por contenido real) ----------

const SUBSTACK_BASE = 'https://novusfutura.substack.com/p/';

const articulos = [
  {
    titulo: 'Por qué la imprenta tardó 50 años en cambiar el mundo',
    tipo: 'deep-dive',
    tags: ['historia', 'tecnología', 'difusión'],
    fecha: '2026-04-12',
    resumen: 'Toda tecnología transformadora atraviesa una larga fase de latencia antes de escalar. Qué nos dice la imprenta sobre la IA de hoy.',
    url: SUBSTACK_BASE + 'por-que-la-imprenta-tardo-50-anos',
    destacado: true
  },
  {
    titulo: 'La curva de adopción que nadie ve venir',
    tipo: 'perspectiva',
    tags: ['innovación', 'adopción'],
    fecha: '2026-05-03',
    resumen: 'Una reflexión breve sobre por qué subestimamos sistemáticamente la velocidad del cambio tecnológico.',
    url: SUBSTACK_BASE + 'la-curva-de-adopcion-que-nadie-ve-venir',
    destacado: false
  },
  {
    titulo: 'Redes eléctricas y redes neuronales: la misma historia',
    tipo: 'deep-dive',
    tags: ['energía', 'infraestructura', 'IA'],
    fecha: '2026-05-20',
    resumen: 'La electrificación del siglo XX y la actual carrera por infraestructura de cómputo comparten un mismo patrón estructural.',
    url: SUBSTACK_BASE + 'redes-electricas-y-redes-neuronales',
    destacado: true
  },
  {
    titulo: 'Lo que la crisis del Y2K nos enseñó sobre el pánico tecnológico',
    tipo: 'perspectiva',
    tags: ['historia', 'riesgo'],
    fecha: '2026-06-01',
    resumen: 'Una mirada corta a cómo se gestionan colectivamente los miedos ante lo desconocido.',
    url: SUBSTACK_BASE + 'la-crisis-del-y2k-y-el-panico-tecnologico',
    destacado: false
  },
  {
    titulo: 'El ferrocarril como primera red global de datos',
    tipo: 'deep-dive',
    tags: ['historia', 'infraestructura'],
    fecha: '2026-06-15',
    resumen: 'Antes de internet, el tren sincronizó relojes, mercados y noticias a una velocidad nunca vista.',
    url: SUBSTACK_BASE + 'el-ferrocarril-como-primera-red-global-de-datos',
    destacado: true
  },
  {
    titulo: 'Tres señales de que una tecnología está madurando',
    tipo: 'perspectiva',
    tags: ['innovación'],
    fecha: '2026-06-28',
    resumen: 'Patrones breves y observables que anticipan el paso de la novedad a la infraestructura.',
    url: SUBSTACK_BASE + 'tres-senales-de-que-una-tecnologia-esta-madurando',
    destacado: false
  }
];

// Nota: los "url" de arriba son placeholders con el patrón real de Substack
// (dominio/p/slug). Sustituir cada uno por el enlace real al publicar.
// "destacado: true" marca los 3 artículos curados a mano para la sección
// "Destacados" — actualízalo según cuáles quieras destacar en cada momento.
//
// Cuando el catálogo crezca, sustituir este array hardcodeado por una
// fuente de datos externa (ideal: leer el feed RSS de Substack).

const grid = document.getElementById('grid-articulos');
const gridDestacados = document.getElementById('grid-destacados');
const sinResultados = document.getElementById('sin-resultados');
const inputBuscar = document.getElementById('buscar');
const botonesFiltro = document.querySelectorAll('.filtro-btn');

let filtroActivo = 'todos';

const etiquetasTipo = {
  'deep-dive': 'Deep Dive',
  'perspectiva': 'Perspectiva'
};

function formatearFecha(iso) {
  const fecha = new Date(iso + 'T00:00:00');
  return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

function tarjetaHTML(a) {
  return `
    <a class="tarjeta-articulo" href="${a.url}" target="_blank" rel="noopener">
      <div class="tarjeta-meta">
        <span class="tarjeta-tipo">${etiquetasTipo[a.tipo]}</span>
        <span>·</span>
        <time datetime="${a.fecha}">${formatearFecha(a.fecha)}</time>
      </div>
      <h3>${a.titulo}</h3>
      <p class="tarjeta-resumen">${a.resumen}</p>
      <div class="tarjeta-tags">
        ${a.tags.map(t => `<span>${t}</span>`).join('')}
      </div>
    </a>
  `;
}

function renderDestacados() {
  const destacados = articulos.filter(a => a.destacado);
  gridDestacados.innerHTML = destacados.map(tarjetaHTML).join('');
}

function renderArticulos() {
  const termino = inputBuscar.value.trim().toLowerCase();

  const filtrados = articulos.filter(a => {
    const coincideTipo = filtroActivo === 'todos' || a.tipo === filtroActivo;
    if (!coincideTipo) return false;

    if (!termino) return true;

    const enTitulo = a.titulo.toLowerCase().includes(termino);
    const enResumen = a.resumen.toLowerCase().includes(termino);
    const enTags = a.tags.some(t => t.toLowerCase().includes(termino));

    return enTitulo || enResumen || enTags;
  });

  if (filtrados.length === 0) {
    grid.innerHTML = '';
    sinResultados.hidden = false;
    return;
  }

  sinResultados.hidden = true;
  grid.innerHTML = filtrados.map(tarjetaHTML).join('');
}

inputBuscar.addEventListener('input', renderArticulos);

botonesFiltro.forEach(btn => {
  btn.addEventListener('click', () => {
    botonesFiltro.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    filtroActivo = btn.dataset.filtro;
    renderArticulos();
  });
});

renderDestacados();
renderArticulos();
