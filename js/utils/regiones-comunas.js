// ==============================================
// REGIONES Y COMUNAS DE CHILE - PRINCIPIANTE
// ==============================================

var regionesComunas = {
  "Región Metropolitana": [
    "Santiago", "Las Condes", "Providencia", "Ñuñoa", "Maipú", 
    "La Florida", "Puente Alto", "San Bernardo", "Quilicura", "Peñalolén"
  ],
  "Región de Valparaíso": [
    "Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", 
    "Concón", "Casablanca", "San Antonio", "Quillota"
  ],
  "Región del Biobío": [
    "Concepción", "Talcahuano", "Chillán", "Los Ángeles", 
    "Coronel", "San Pedro de la Paz", "Tomé", "Hualpén"
  ],
  "Región de La Araucanía": [
    "Temuco", "Padre Las Casas", "Villarrica", "Pucón", 
    "Angol", "Carahue", "Nueva Imperial", "Lautaro"
  ],
  "Región de Los Lagos": [
    "Puerto Montt", "Osorno", "Castro", "Ancud", 
    "Puerto Varas", "Frutillar", "Llanquihue", "Maullín"
  ]
};

// Función para cargar regiones en select
function cargarRegiones() {
  var selectRegion = document.getElementById('region');
  if (selectRegion) {
    selectRegion.innerHTML = '<option value="">Seleccione región</option>';
    
    for (var region in regionesComunas) {
      var option = document.createElement('option');
      option.value = region;
      option.textContent = region;
      selectRegion.appendChild(option);
    }
  }
}

// Función para cargar comunas según región seleccionada
function cargarComunas() {
  var selectRegion = document.getElementById('region');
  var selectComuna = document.getElementById('comuna');
  
  if (selectRegion && selectComuna) {
    var regionSeleccionada = selectRegion.value;
    selectComuna.innerHTML = '<option value="">Seleccione comuna</option>';
    
    if (regionSeleccionada && regionesComunas[regionSeleccionada]) {
      var comunas = regionesComunas[regionSeleccionada];
      
      comunas.forEach(function(comuna) {
        var option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;
        selectComuna.appendChild(option);
      });
    }
  }
}

// Función para inicializar regiones y comunas
function inicializarRegionesYComunas() {
  cargarRegiones();
  
  // Agregar evento para cambio de región
  var selectRegion = document.getElementById('region');
  if (selectRegion) {
    selectRegion.addEventListener('change', cargarComunas);
  }
}