
// Model: Debe tener los mismos atributos de la clase en java en spring boot y tambien los mismos atributos 
// de la tabla y los mismos nombres, por ejm tenia id y no traia nada, pero lo cambie por id_persona y ahi
// si. Y es porque en spring boot tenia id_persona lo mismo en la BD porque el spring boot crea
// la tabla de la BD y asi debe llamarse aqui.
export class Persona {
    id_persona: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}
