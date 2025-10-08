/**
 * REGIONES Y COMUNAS DE CHILE
 * 
 * Este archivo contiene todas las regiones y comunas de Chile
 * actualizadas según la División Político-Administrativa.
 * 
 * ESTRUCTURA:
 * - Cada región tiene: nombre, código y lista de comunas
 * - Permite búsqueda y filtrado eficiente
 */

// ============================================
// DATOS DE REGIONES Y COMUNAS
// ============================================

export const REGIONES_COMUNAS = [
  {
    region: 'Región de Arica y Parinacota',
    codigo: 'XV',
    comunas: [
      'Arica',
      'Camarones',
      'General Lagos',
      'Putre'
    ]
  },
  {
    region: 'Región de Tarapacá',
    codigo: 'I',
    comunas: [
      'Alto Hospicio',
      'Camiña',
      'Colchane',
      'Huara',
      'Iquique',
      'Pica',
      'Pozo Almonte'
    ]
  },
  {
    region: 'Región de Antofagasta',
    codigo: 'II',
    comunas: [
      'Antofagasta',
      'Calama',
      'María Elena',
      'Mejillones',
      'Ollagüe',
      'San Pedro de Atacama',
      'Sierra Gorda',
      'Taltal',
      'Tocopilla'
    ]
  },
  {
    region: 'Región de Atacama',
    codigo: 'III',
    comunas: [
      'Alto del Carmen',
      'Caldera',
      'Chañaral',
      'Copiapó',
      'Diego de Almagro',
      'Freirina',
      'Huasco',
      'Tierra Amarilla',
      'Vallenar'
    ]
  },
  {
    region: 'Región de Coquimbo',
    codigo: 'IV',
    comunas: [
      'Andacollo',
      'Canela',
      'Combarbalá',
      'Coquimbo',
      'Illapel',
      'La Higuera',
      'La Serena',
      'Los Vilos',
      'Monte Patria',
      'Ovalle',
      'Paiguano',
      'Punitaqui',
      'Río Hurtado',
      'Salamanca',
      'Vicuña'
    ]
  },
  {
    region: 'Región de Valparaíso',
    codigo: 'V',
    comunas: [
      'Algarrobo',
      'Cabildo',
      'Calera',
      'Calle Larga',
      'Cartagena',
      'Casablanca',
      'Catemu',
      'Concón',
      'El Quisco',
      'El Tabo',
      'Hijuelas',
      'Isla de Pascua',
      'Juan Fernández',
      'La Cruz',
      'La Ligua',
      'Limache',
      'Llaillay',
      'Los Andes',
      'Nogales',
      'Olmué',
      'Panquehue',
      'Papudo',
      'Petorca',
      'Puchuncaví',
      'Putaendo',
      'Quillota',
      'Quilpué',
      'Quintero',
      'Rinconada',
      'San Antonio',
      'San Esteban',
      'San Felipe',
      'Santa María',
      'Santo Domingo',
      'Valparaíso',
      'Villa Alemana',
      'Viña del Mar',
      'Zapallar'
    ]
  },
  {
    region: 'Región Metropolitana de Santiago',
    codigo: 'RM',
    comunas: [
      'Alhué',
      'Buin',
      'Calera de Tango',
      'Cerrillos',
      'Cerro Navia',
      'Colina',
      'Conchalí',
      'Curacaví',
      'El Bosque',
      'El Monte',
      'Estación Central',
      'Huechuraba',
      'Independencia',
      'Isla de Maipo',
      'La Cisterna',
      'La Florida',
      'La Granja',
      'La Pintana',
      'La Reina',
      'Lampa',
      'Las Condes',
      'Lo Barnechea',
      'Lo Espejo',
      'Lo Prado',
      'Macul',
      'Maipú',
      'María Pinto',
      'Melipilla',
      'Ñuñoa',
      'Padre Hurtado',
      'Paine',
      'Pedro Aguirre Cerda',
      'Peñaflor',
      'Peñalolén',
      'Pirque',
      'Providencia',
      'Pudahuel',
      'Puente Alto',
      'Quilicura',
      'Quinta Normal',
      'Recoleta',
      'Renca',
      'San Bernardo',
      'San Joaquín',
      'San José de Maipo',
      'San Miguel',
      'San Pedro',
      'San Ramón',
      'Santiago',
      'Talagante',
      'Tiltil',
      'Vitacura'
    ]
  },
  {
    region: 'Región del Libertador General Bernardo O\'Higgins',
    codigo: 'VI',
    comunas: [
      'Chépica',
      'Chimbarongo',
      'Codegua',
      'Coinco',
      'Coltauco',
      'Doñihue',
      'Graneros',
      'La Estrella',
      'Las Cabras',
      'Litueche',
      'Lolol',
      'Machalí',
      'Malloa',
      'Marchihue',
      'Nancagua',
      'Navidad',
      'Olivar',
      'Palmilla',
      'Paredones',
      'Peralillo',
      'Peumo',
      'Pichidegua',
      'Pichilemu',
      'Placilla',
      'Pumanque',
      'Quinta de Tilcoco',
      'Rancagua',
      'Rengo',
      'Requínoa',
      'San Fernando',
      'San Vicente',
      'Santa Cruz'
    ]
  },
  {
    region: 'Región del Maule',
    codigo: 'VII',
    comunas: [
      'Cauquenes',
      'Chanco',
      'Colbún',
      'Constitución',
      'Curepto',
      'Curicó',
      'Empedrado',
      'Hualañé',
      'Licantén',
      'Linares',
      'Longaví',
      'Maule',
      'Molina',
      'Parral',
      'Pelarco',
      'Pelluhue',
      'Pencahue',
      'Rauco',
      'Retiro',
      'Río Claro',
      'Romeral',
      'Sagrada Familia',
      'San Clemente',
      'San Javier',
      'San Rafael',
      'Talca',
      'Teno',
      'Vichuquén',
      'Villa Alegre',
      'Yerbas Buenas'
    ]
  },
  {
    region: 'Región de Ñuble',
    codigo: 'XVI',
    comunas: [
      'Bulnes',
      'Chillán',
      'Chillán Viejo',
      'Cobquecura',
      'Coelemu',
      'Coihueco',
      'El Carmen',
      'Ninhue',
      'Ñiquén',
      'Pemuco',
      'Pinto',
      'Portezuelo',
      'Quillón',
      'Quirihue',
      'Ránquil',
      'San Carlos',
      'San Fabián',
      'San Ignacio',
      'San Nicolás',
      'Treguaco',
      'Yungay'
    ]
  },
  {
    region: 'Región del Biobío',
    codigo: 'VIII',
    comunas: [
      'Alto Biobío',
      'Antuco',
      'Arauco',
      'Cabrero',
      'Cañete',
      'Chiguayante',
      'Concepción',
      'Contulmo',
      'Coronel',
      'Curanilahue',
      'Florida',
      'Hualpén',
      'Hualqui',
      'Laja',
      'Lebu',
      'Los Álamos',
      'Los Ángeles',
      'Lota',
      'Mulchén',
      'Nacimiento',
      'Negrete',
      'Penco',
      'Quilaco',
      'Quilleco',
      'San Pedro de la Paz',
      'San Rosendo',
      'Santa Bárbara',
      'Santa Juana',
      'Talcahuano',
      'Tirúa',
      'Tomé',
      'Tucapel',
      'Yumbel'
    ]
  },
  {
    region: 'Región de La Araucanía',
    codigo: 'IX',
    comunas: [
      'Angol',
      'Carahue',
      'Cholchol',
      'Collipulli',
      'Cunco',
      'Curacautín',
      'Curarrehue',
      'Ercilla',
      'Freire',
      'Galvarino',
      'Gorbea',
      'Lautaro',
      'Loncoche',
      'Lonquimay',
      'Los Sauces',
      'Lumaco',
      'Melipeuco',
      'Nueva Imperial',
      'Padre Las Casas',
      'Perquenco',
      'Pitrufquén',
      'Pucón',
      'Purén',
      'Renaico',
      'Saavedra',
      'Temuco',
      'Teodoro Schmidt',
      'Toltén',
      'Traiguén',
      'Victoria',
      'Vilcún',
      'Villarrica'
    ]
  },
  {
    region: 'Región de Los Ríos',
    codigo: 'XIV',
    comunas: [
      'Corral',
      'Futrono',
      'La Unión',
      'Lago Ranco',
      'Lanco',
      'Los Lagos',
      'Máfil',
      'Mariquina',
      'Paillaco',
      'Panguipulli',
      'Río Bueno',
      'Valdivia'
    ]
  },
  {
    region: 'Región de Los Lagos',
    codigo: 'X',
    comunas: [
      'Ancud',
      'Calbuco',
      'Castro',
      'Chaitén',
      'Chonchi',
      'Cochamó',
      'Curaco de Vélez',
      'Dalcahue',
      'Fresia',
      'Frutillar',
      'Futaleufú',
      'Hualaihué',
      'Llanquihue',
      'Los Muermos',
      'Maullín',
      'Osorno',
      'Palena',
      'Puerto Montt',
      'Puerto Octay',
      'Puerto Varas',
      'Puqueldón',
      'Purranque',
      'Puyehue',
      'Queilén',
      'Quellón',
      'Quemchi',
      'Quinchao',
      'Río Negro',
      'San Juan de la Costa',
      'San Pablo'
    ]
  },
  {
    region: 'Región Aysén del General Carlos Ibáñez del Campo',
    codigo: 'XI',
    comunas: [
      'Aysén',
      'Chile Chico',
      'Cisnes',
      'Cochrane',
      'Coyhaique',
      'Guaitecas',
      'Lago Verde',
      'O\'Higgins',
      'Río Ibáñez',
      'Tortel'
    ]
  },
  {
    region: 'Región de Magallanes y de la Antártica Chilena',
    codigo: 'XII',
    comunas: [
      'Antártica',
      'Cabo de Hornos',
      'Laguna Blanca',
      'Natales',
      'Porvenir',
      'Primavera',
      'Punta Arenas',
      'Río Verde',
      'San Gregorio',
      'Timaukel',
      'Torres del Paine'
    ]
  }
];

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Obtiene todas las regiones
 * 
 * @returns {Array} - Array de objetos con información de regiones
 * 
 * @example
 * const regiones = obtenerRegiones();
 * // [{ region: "...", codigo: "...", comunas: [...] }, ...]
 */
export const obtenerRegiones = () => {
  return REGIONES_COMUNAS.map(({ region, codigo }) => ({
    region,
    codigo
  }));
};

/**
 * Obtiene solo los nombres de las regiones
 * 
 * @returns {Array<string>} - Array de nombres de regiones
 * 
 * @example
 * const nombres = obtenerNombresRegiones();
 * // ["Región de Arica y Parinacota", "Región de Tarapacá", ...]
 */
export const obtenerNombresRegiones = () => {
  return REGIONES_COMUNAS.map(({ region }) => region);
};

/**
 * Obtiene las comunas de una región específica
 * 
 * @param {string} nombreRegion - Nombre de la región
 * @returns {Array<string>} - Array de comunas
 * 
 * @example
 * const comunas = obtenerComunasPorRegion("Región Metropolitana de Santiago");
 * // ["Alhué", "Buin", "Calera de Tango", ...]
 */
export const obtenerComunasPorRegion = (nombreRegion) => {
  const region = REGIONES_COMUNAS.find(r => r.region === nombreRegion);
  return region ? region.comunas : [];
};

/**
 * Obtiene las comunas de una región por su código
 * 
 * @param {string} codigoRegion - Código de la región (ej: "RM", "V")
 * @returns {Array<string>} - Array de comunas
 * 
 * @example
 * const comunas = obtenerComunasPorCodigo("RM");
 * // ["Alhué", "Buin", "Calera de Tango", ...]
 */
export const obtenerComunasPorCodigo = (codigoRegion) => {
  const region = REGIONES_COMUNAS.find(r => r.codigo === codigoRegion);
  return region ? region.comunas : [];
};

/**
 * Busca a qué región pertenece una comuna
 * 
 * @param {string} nombreComuna - Nombre de la comuna
 * @returns {Object|null} - Objeto con información de la región o null
 * 
 * @example
 * const region = buscarRegionPorComuna("Santiago");
 * // { region: "Región Metropolitana de Santiago", codigo: "RM", comunas: [...] }
 */
export const buscarRegionPorComuna = (nombreComuna) => {
  return REGIONES_COMUNAS.find(r => 
    r.comunas.includes(nombreComuna)
  ) || null;
};

/**
 * Valida si una región existe
 * 
 * @param {string} nombreRegion - Nombre de la región
 * @returns {boolean} - true si existe
 * 
 * @example
 * validarRegion("Región Metropolitana de Santiago")  // true
 * validarRegion("Región Inventada")                   // false
 */
export const validarRegion = (nombreRegion) => {
  return REGIONES_COMUNAS.some(r => r.region === nombreRegion);
};

/**
 * Valida si una comuna existe en una región específica
 * 
 * @param {string} nombreRegion - Nombre de la región
 * @param {string} nombreComuna - Nombre de la comuna
 * @returns {boolean} - true si la comuna pertenece a esa región
 * 
 * @example
 * validarComunaEnRegion("Región Metropolitana de Santiago", "Santiago")  // true
 * validarComunaEnRegion("Región Metropolitana de Santiago", "Valparaíso") // false
 */
export const validarComunaEnRegion = (nombreRegion, nombreComuna) => {
  const region = REGIONES_COMUNAS.find(r => r.region === nombreRegion);
  if (!region) return false;
  return region.comunas.includes(nombreComuna);
};

/**
 * Busca regiones o comunas por texto (búsqueda flexible)
 * 
 * @param {string} texto - Texto a buscar
 * @returns {Array} - Array con resultados
 * 
 * @example
 * buscarPorTexto("santiago")
 * // [{ tipo: "region", nombre: "...", codigo: "RM" }, 
 * //  { tipo: "comuna", nombre: "Santiago", region: "..." }]
 */
export const buscarPorTexto = (texto) => {
  if (!texto) return [];

  const textoLower = texto.toLowerCase();
  const resultados = [];

  REGIONES_COMUNAS.forEach(({ region, codigo, comunas }) => {
    // Buscar en nombres de regiones
    if (region.toLowerCase().includes(textoLower)) {
      resultados.push({
        tipo: 'region',
        nombre: region,
        codigo
      });
    }

    // Buscar en comunas
    comunas.forEach(comuna => {
      if (comuna.toLowerCase().includes(textoLower)) {
        resultados.push({
          tipo: 'comuna',
          nombre: comuna,
          region,
          codigoRegion: codigo
        });
      }
    });
  });

  return resultados;
};

/**
 * Obtiene el total de comunas de Chile
 * 
 * @returns {number} - Total de comunas
 */
export const obtenerTotalComunas = () => {
  return REGIONES_COMUNAS.reduce((total, region) => {
    return total + region.comunas.length;
  }, 0);
};

/**
 * Obtiene estadísticas de regiones y comunas
 * 
 * @returns {Object} - Estadísticas
 * 
 * @example
 * const stats = obtenerEstadisticas();
 * // { 
 * //   totalRegiones: 16,
 * //   totalComunas: 346,
 * //   regionConMasComunas: "Región Metropolitana de Santiago",
 * //   cantidadMaximaComunas: 52
 * // }
 */
export const obtenerEstadisticas = () => {
  const totalRegiones = REGIONES_COMUNAS.length;
  const totalComunas = obtenerTotalComunas();
  
  let regionConMasComunas = '';
  let cantidadMaximaComunas = 0;

  REGIONES_COMUNAS.forEach(({ region, comunas }) => {
    if (comunas.length > cantidadMaximaComunas) {
      cantidadMaximaComunas = comunas.length;
      regionConMasComunas = region;
    }
  });

  return {
    totalRegiones,
    totalComunas,
    regionConMasComunas,
    cantidadMaximaComunas
  };
};