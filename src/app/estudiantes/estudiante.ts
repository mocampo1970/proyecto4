
// Model: Debe tener los mismos atributos de la clase en java en spring boot y tambien los mismos atributos 
// de la tabla y los mismos nombres, por ejm en persona no aqui sino en persona tenia id y no traia nada, 
// pero lo cambie por id_persona y ahi si. Aunque este fue el primero que hice pero el id de estudiante
// y aqui no habia problema y se llama id y traia todo OK. pero en persona se llamaba id_persona 
// en spring boot y por tanto en la BD y el persona.ts lo llame id y no traia nada lo cambie por 
// id_persona y de una.
// Nota: Importante que se llamen los mismos campos como en spring boot en la clase model 
// y en la tabla de la BD
export class Estudiante {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    nota: number;
}
