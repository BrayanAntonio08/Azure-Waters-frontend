export interface Temporada {
    idTemporada: number;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    descuento: number | null;
    idTipo: number;
    idTipoNavigation: TipoHabitacion | null;
}

export interface TipoHabitacion {
}
