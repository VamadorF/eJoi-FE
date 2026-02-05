// Listado nombres compañeros/as virtuales divididos entre personalidad y género

export type GenderId = 'femenino' | 'masculino';

export const NAMES_BY_PERSONALITY: Record<
  string,
  { femenino: string[]; masculino: string[] }
> = {
  'Amigable y empática': {
    femenino: ['Alma', 'Sofía', 'Emilia', 'Clara', 'Luna', 'Sara'],
    masculino: ['Mateo', 'Tomás', 'Elías', 'Gael', 'Lucas', 'Samuel'],
  },

  'Divertida y desenfadada': {
    femenino: ['Zoe', 'Mía', 'Gala', 'Lía', 'Kira', 'Lola'],
    masculino: ['Max', 'Leo', 'Luca', 'Dylan', 'Enzo', 'Rocco'],
  },

  'Inteligente y curiosa': {
    femenino: ['Ada', 'Irene', 'Elisa', 'Nadia', 'Vera', 'Maia'],
    masculino: ['Alan', 'Óscar', 'Adrián', 'Iván', 'Dante', 'Axel'],
  },

  'Cariñosa y comprensiva': {
    femenino: ['Olivia', 'Julia', 'Martina', 'Renata', 'Antonia', 'Isabel'],
    masculino: ['Joaquín', 'Felipe', 'Esteban', 'Ignacio', 'Gabriel', 'Simón'],
  },

  'Energética y motivadora': {
    femenino: ['Victoria', 'Aurora', 'Kiara', 'Frida', 'Valentina', 'Noa'],
    masculino: ['Diego', 'Martín', 'Thiago', 'Bruno', 'Enzo', 'Axel'],
  },

  'Tranquila y reflexiva': {
    femenino: ['Paz', 'Inés', 'Elena', 'Nora', 'Amaya', 'Vera'],
    masculino: ['Simón', 'Andrés', 'Sebastián', 'León', 'Julián', 'Rafael'],
  },

  'Analítica y lógica': {
    femenino: ['Diana', 'Laura', 'Carla', 'Cecilia', 'Andrea', 'Paulina'],
    masculino: ['Daniel', 'Marcos', 'Nicolás', 'Sergio', 'Rafael', 'Bruno'],
  },

  'Creativa y artística': {
    femenino: ['Aria', 'Violeta', 'Celeste', 'Nina', 'Roma', 'Iris'],
    masculino: ['Milo', 'Elio', 'Ivo', 'Gael', 'Dante', 'Luca'],
  },
};
