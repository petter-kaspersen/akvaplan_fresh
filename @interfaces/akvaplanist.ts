export interface Akvaplanist {
  given: string;
  family: string;
  position: Position;
  tel?: string;
  unit?: string;
  workplace?: string;
  country?: string;
  id?: string;
  email?: string;
  employed?: boolean;
  created?: Date;
}
export interface Position {
  [lang: string]: string;
}
