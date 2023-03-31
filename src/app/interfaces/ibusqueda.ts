
// Interface que va a contener los campos de busquedaDTO de coches que esta en el spring boot.
export interface Ibusqueda {
    marca: string;
    modelo: string;
    version: string;
    cambio: string;
    color: string;
    kmDesde: number;
    kmHasta: number;
}
