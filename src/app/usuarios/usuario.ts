
// Model: Debe tener los mismos atributos de la clase en java en spring boot y tambien los mismos atributos 
// de la tabla y los mismos nombres, por ejm tenia id y no traia nada, pero lo cambie por id_persona y ahi
// si. Y es porque en spring boot tenia id_persona y asi debe llamarse aqui.
export class Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    usuario: string;
    password: string;
    email: string;
    prioridad: number;
}
