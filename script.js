document.getElementById('anio').textContent = new Date().getFullYear();

// --- Proyectos (igual que antes, sustituye por los tuyos) ---
const proyectos = [
  { nombre: 'Proyecto A', url: '#' },
  { nombre: 'Proyecto B', url: '#' }
];
document.getElementById('lista-proyectos').innerHTML =
  proyectos.map(p => `<li><a href="${p.url}">${p.nombre}</a></li>`).join('');

// --- Artículos ---
// Datos de ejemplo: sustituye por tus artículos reales (o carga desde un JSON externo)
const articulos = [
  {
    titulo: 'Por qué la imprenta tardó 50 años en cambiar el mundo',
    tipo: 'deep-dive',
    tags: ['historia', 'tecnología', 'difusión'],
    fecha: '2026-04-12',
    resumen: 'Toda tecnología transformadora atraviesa una larga fase de latencia antes de escalar. Qué nos dice la imprenta sobre la IA de hoy.',
    url: '#'
  },
  {
    titulo: 'La curva de adopción que nadie ve venir',
    tipo: 'perspectiva',
    tags: ['innovación', 'adopción'],
    fecha: '2026-05-03',
    resumen: 'Una reflexión breve sobre por qué subestimamos sistemáticamente la velocidad del cambio tecnológico.',
    url: '#'
  },
  {
    titulo: 'Redes eléctricas y redes neuronales: la misma historia',
    tipo: 'deep-dive',
    tags: ['energía', 'infraestructura', 'IA'],
    fecha: '2026-05-20',
    resumen: 'La electrificación del siglo XX y la actual carrera por infraestructura de cómputo comparten un mismo patrón estructural.',
    url: '#'
  },
  {
    titulo: 'Lo que la crisis del Y2K nos enseñó sobre el pánico tecnológico',
    tipo: 'perspectiva',
    tags: ['historia', 'riesgo'],
    fecha: '2026-06-01',
    resumen: 'Una mirada corta a cómo se gestionan colectivamente los miedos ante lo desconocido.',
    url: '#'
  },
  {
    titulo: 'El ferrocarril como primera red global de datos',
    tipo: 'deep-dive',
    tags: ['historia', 'infraestructura'],
    fecha: '2026-06-15',
    resumen: 'Antes de internet, el tren sincronizó relojes, mercados y noticias a una velocidad nunca vista.',
    url: '#'
  },
  {
    titulo: 'Tres señales de que una tecnología está madurando',
    tipo: 'perspectiva',
    tags: ['innovación'],
    fecha: '2026-06-28',
    resumen: 'Patrones breves y observables que anticipan el paso de la novedad a la infraestructura.',
    url: '#'
  }
];

const contenedor = document.getElementById('lista-articulos');
const sinResultados = document.getElementById('sin-resultados');
const inputBuscar = document.getElementById('buscar');
const botonesFiltro = document.querySelectorAll('.filtro');

let filtroActivo = 'todos';

const etiquetaTipo = { 'deep-dive': 'Deep Dive', 'perspectiva': 'Perspectiva' };

function formatearFecha(iso) {
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function renderizarArticulos() {
  const consulta = inputBuscar.value.trim().toLowerCase();

  const filtrados = articulos.filter(a => {
    const coincideTipo = filtroActivo === 'todos' || a.tipo === filtroActivo;
    const textoBusqueda = `${a.titulo} ${a.resumen} ${a.tags.join(' ')}`.toLowerCase();
    const coincideBusqueda = consulta === '' || textoBusqueda.includes(consulta);
    return coincideTipo && coincideBusqueda;
  });

  contenedor.innerHTML = filtrados.map(a => `
    <article class="tarjeta-articulo">
      <div class="meta">
        <span class="tipo">${etiquetaTipo[a.tipo]}</span>
        <span>${formatearFecha(a.fecha)}</span>
      </div>
      <h3><a href="${a.url}">${a.titulo}</a></h3>
      <p>${a.resumen}</p>
    </article>
  `).join('');

  sinResultados.hidden = filtrados.length !== 0;
}

inputBuscar.addEventListener('input', renderizarArticulos);

botonesFiltro.forEach(boton => {
  boton.addEventListener('click', () => {
    botonesFiltro.forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');
    filtroActivo = boton.dataset.filtro;
    renderizarArticulos();
  });
});

renderizarArticulos();
