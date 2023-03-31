import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from './persona';
import { PersonaService } from './persona.service';
// Importa modal de alerta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  public titulo: string="Mantenimiento/lista  de personas";
  public id: number;
  public nombre: string= "";
  public apellido: string = "";
  public email: string = "";
  public telefono: string = "";


  // Aqui vamos a declarar un objeto de tipo persona para poder mapearlo en la vista
  persona: Persona = new Persona();  

  // definimos la vble personas que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos, lo va a almacenar en una lista porque llegan varios
  // registros
  personas: Persona[];

  // Inyectamos el servicio y lo importamos arriba
  // Hacemos inyección de dependencias al servicio, casi siempre que se tenga un front y haya 
  // un servicio y necesitemos acceder a sus metodos lo inyectamos aqui.  
  // debe declararse con private para poder acceder a ella desde aqui
  constructor(private personaService: PersonaService, private router: Router) { }

  // Cuando cargue la vista ejecuta el metodo recuperar todos y con el subscribe ocurre la
  // magia de obtener la lista de personas, con funciones de flecha => y donde 
  // e es una vble si tuviera mas   
  ngOnInit(): void {
    this.personaService.getAll().subscribe(
      p => this.personas = p
    );
  }

  // Metodo que va a tener la logica que va a hacer el guardar, me subscribo y si sale bien
  // voy a la pagina de estudiantes que es la que consulta los estudiantes y es la que definimos en
  // app.routing.module estudiantes o tambien como se llama la ventana(pagina o la vista) estudiantes
  // y el parametro es el model estudiante
  // en este create despues del subscribe le tenia este:  p => this.personas = p
  // se lo cambie por: res =>this.router.navigate(['/personas'])  para que me abra la ventana
  // de personas apenas grabe una persona
  create(): void{
    console.log(this.persona);
    // subscribe para crear y subscribe para getAll (despues de que grabe me lo muestre en pantalla)
    this.personaService.create(this.persona).subscribe(
      res => this.personaService.getAll().subscribe(
      response => this.personas = response 
      )
    )
  }
  // res =>this.router.navigate(['/personas'])

  // Delete para borrar una persona, envia el objeto pero borramos por id
  delete(persona: Persona){
    console.log("va a eliminar", persona)

    // Tema de sweetalert2
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "El registro de la persona: " + persona.nombre + ' ' + persona.apellido,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // Si confirman que eliminan 
      if (result.isConfirmed) {
        // Vamos a ingresar aqui el codigo de eliminar
        this.personaService.delete(persona.id_persona).subscribe(
          res => this.personaService.getAll().subscribe(
          response => this.personas = response
          )
        )
        Swal.fire(
          'Eliminado!',
          'El registro fue eliminado.',
          'success'
        )
      }
    })

  }

 // Actualizar y de una recupera registros
 update(): void{
    // Cuando me subscriba y grabe redirecciono
    console.log("update en persona.component", this.persona)
    this.persona.id_persona   = this.id;  
    this.persona.nombre       = this.nombre;
    this.persona.apellido     = this.apellido;
    this.persona.email        = this.email;
    this.persona.telefono     = this.telefono;
        
    this.personaService.update(this.persona).subscribe(
      res => this.personaService.getAll().subscribe(
        response => this.personas = response
        )
    )           
 }  

 // Editar, creamos vbles para posteriormente asignarlas en el update si deciden grabar mediante
 // el offcanvas
 editar(persona: Persona){
   console.log("persona a editar es: " , persona)
   this.id          = persona.id_persona;
   console.log("id :", this.id)
   this.nombre      = persona.nombre;
   this.apellido    = persona.apellido;
   this.email       = persona.email;
   this.telefono    = persona.telefono;   
 }

}
