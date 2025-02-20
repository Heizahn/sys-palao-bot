export enum TypeTurn {
  DESCUBRIMIENTO = 'descubrimiento',
  CRECIMIENTO = 'crecimiento',
  DIVERSION = 'diversión',
}

export interface Cupo {
  id: string;
  create_at: Date;
  representante: string;
  tlf: string;
  tlf_registro: string;
  alumno: string;
  fecha_nacimiento: string;
  horario: TypeTurn;
}
