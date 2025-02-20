import { IsString, MinLength } from 'class-validator';

export enum typeTurn {
  DESCUBRIMIENTO = 'descubrimiento',
  CRECIMIENTO = 'crecimiento',
  DIVERSION = 'diversión',
}

export class CupoDto {
  @IsString()
  @MinLength(2)
  representante: string;

  @IsString()
  @MinLength(11)
  tlf: string;

  @IsString()
  @MinLength(11)
  tlf_registro: string;

  @IsString()
  @MinLength(2)
  alumno: string;

  @IsString()
  @MinLength(10)
  fecha_nacimiento: string;

  horario: typeTurn;
}
