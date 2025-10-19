document.getElementById('anio').textContent = new Date().getFullYear();

// Ejemplo: pintar proyectos desde datos
const proyectos = [
  { nombre: 'Proyecto A', url: '#' },
  { nombre: 'Proyecto B', url: '#' }
];
document.getElementById('lista-proyectos').innerHTML =
  proyectos.map(p => `<li><a href="${p.url}">${p.nombre}</a></li>`).join('');
