// Client data from actual logo files
export const clients = [
  {
    id: 'altapharma',
    name: 'Altapharma',
    logo: '/src/assets/images/client-logos/altapharma.png',
    active: false
  },
  {
    id: 'bridgestone',
    name: 'Bridgestone',
    logo: '/src/assets/images/client-logos/bridgestone.png',
    active: false
  },
  {
    id: 'firestone',
    name: 'Firestone',
    logo: '/src/assets/images/client-logos/firestone.png',
    active: false
  },
  {
    id: 'drclauders',
    name: 'Dr. Clauders',
    logo: '/src/assets/images/client-logos/drclauders.png',
    active: false
  },
  {
    id: 'panasonic',
    name: 'Panasonic',
    logo: '/src/assets/images/client-logos/panasonic.png',
    active: false
  },
  {
    id: 'universal',
    name: 'Universal',
    logo: '/src/assets/images/client-logos/universal.png',
    active: false
  },
  {
    id: 'superrtl',
    name: 'Super RTL',
    logo: '/src/assets/images/client-logos/superrtl.png',
    active: false
  },
  {
    id: 'johnsonjohnson',
    name: 'Johnson & Johnson',
    logo: '/src/assets/images/client-logos/johnsonjohnson.png',
    active: false
  },
  {
    id: 'wrigley',
    name: 'Wrigley',
    logo: '/src/assets/images/client-logos/wrigley.png',
    active: false
  },
  {
    id: 'rossmann',
    name: 'Rossmann',
    logo: '/src/assets/images/client-logos/rossmann.png',
    active: false
  },
  {
    id: 'epson',
    name: 'Epson',
    logo: '/src/assets/images/client-logos/epson.png',
    active: false
  },
  {
    id: 'beko',
    name: 'Beko',
    logo: '/src/assets/images/client-logos/beko.png',
    active: false
  },
  {
    id: 'candy',
    name: 'Candy',
    logo: '/src/assets/images/client-logos/candy.png',
    active: false
  },
  {
    id: 'hoover',
    name: 'Hoover',
    logo: '/src/assets/images/client-logos/hoover.png',
    active: false
  },
  {
    id: 'evonik',
    name: 'Evonik',
    logo: '/src/assets/images/client-logos/evonik.png',
    active: false
  },
  {
    id: 'bechem',
    name: 'Bechem',
    logo: '/src/assets/images/client-logos/bechem.png',
    active: false
  },
  {
    id: 'metso',
    name: 'Metso',
    logo: '/src/assets/images/client-logos/metso.png',
    active: false
  },
  {
    id: 'novihum',
    name: 'Novihum',
    logo: '/src/assets/images/client-logos/novihum.png',
    active: false
  },
  {
    id: 'hapert',
    name: 'Hapert',
    logo: '/src/assets/images/client-logos/hapert.png',
    active: false
  },
  {
    id: 'isopart',
    name: 'Isopart',
    logo: '/src/assets/images/client-logos/isopart.png',
    active: false
  },
  {
    id: 'silverline',
    name: 'Silverline',
    logo: '/src/assets/images/client-logos/silverline.png',
    active: false
  },
  {
    id: 'visomax',
    name: 'Visomax',
    logo: '/src/assets/images/client-logos/visomax.png',
    active: false
  },
  {
    id: 'copeo',
    name: 'Copeo',
    logo: '/src/assets/images/client-logos/copeo.png',
    active: false
  },
  {
    id: 'dimp',
    name: 'DIMP',
    logo: '/src/assets/images/client-logos/dimp.png',
    active: false
  },
  {
    id: 'lucanet',
    name: 'LucaNet',
    logo: '/src/assets/images/client-logos/lucanet.png',
    active: false
  },
  {
    id: 'citti',
    name: 'CITTI',
    logo: '/src/assets/images/client-logos/citti.png',
    active: false
  },
  {
    id: 'bettenfueger',
    name: 'Betten Füger',
    logo: '/src/assets/images/client-logos/bettenfueger.png',
    active: false
  },
  {
    id: 'lux',
    name: 'LUX',
    logo: '/src/assets/images/client-logos/lux.png',
    active: false
  },
  {
    id: 'regina',
    name: 'Regina',
    logo: '/src/assets/images/client-logos/regina.png',
    active: false
  },
  {
    id: 'softis',
    name: 'Softis',
    logo: '/src/assets/images/client-logos/softis.png',
    active: false
  },
  {
    id: 'gesunderruecken',
    name: 'Gesunder Rücken',
    logo: '/src/assets/images/client-logos/gesunderruecken.png',
    active: false
  }
];

// For convenience, create a map of clients by ID
export const clientsMap = clients.reduce((map, client) => {
  map[client.id] = client;
  return map;
}, {});
