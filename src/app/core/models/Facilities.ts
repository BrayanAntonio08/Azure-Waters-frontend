export class Facilidad {
    facilidadId: number = 1;
    texto?: string;
    imagenId?: number;
    imagen?: Imagen;
  }
  
  export interface Imagen {
    imagenId: number;
  }
  