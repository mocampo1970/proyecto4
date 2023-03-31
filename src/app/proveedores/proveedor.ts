// Model: Debe tener los mismos atributos de la clase en java en spring boot y tambien los mismos atributos 
// de la tabla y los mismos nombres.
// Nota: Importante que se llamen los mismos campos como en spring boot en la clase model 
export class Proveedor {
    id: number;
    tipoIdentificacion: string;
    identificacion: string;
    apellidos: string;
    nombres: string;
    razonsocial: string;
    direccion: string;        
    telefono: string;
    email: string;  
    nameFoto: string;
    imagenUrl: string;
    imagenId: string; 
    fechaInicio: Date;
    valor: number;
    estado: string; 
    idFoto: number
}
