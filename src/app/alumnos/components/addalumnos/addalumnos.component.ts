import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Alumno } from '../../alumno';
import { AlumnoService } from '../../alumno.service';
import { Contacto } from '../../contacto';
import { Domicilio } from '../../domicilio';

@Component({
  selector: 'app-addalumnos',
  templateUrl: './addalumnos.component.html',
  styleUrls: ['./addalumnos.component.css']
})
export class AddalumnosComponent implements OnInit {

  // Aqui vamos a declarar un objeto de tipo alumno para poder mapearlo en la vista
  // lo mismo con domicilio y contacto
  alumno: Alumno = new Alumno();
  domicilio: Domicilio = new Domicilio();
  contacto: Contacto  = new Contacto();
  
  titulo: string= "Registro de alumno";

  // Inyectamos el servicio y mediante el cual nos vamos a conectar al api rest, adicional
  // declaramos router que nos va a permitir navegar entre la aplicación y devolvernos 
  // a la lista de alumnos, y 
  // ActivatedRoute Proporciona acceso a información sobre una ruta asociada con un componente
  constructor(private alumnoService: AlumnoService, private router: Router, 
    private activatedRoute: ActivatedRoute) { 
    }

  ngOnInit(): void {
    // Cuando presione Editar en esta vista alumno.components.html hace routerLink a 
    // esta vista addalumno con el parametro alumno.id y aqui en addalumno
    // abre y ejecuta este metodo ngOnit que llama al cargar
    // hace el cargar que es el metodo que carga datos a esa pantalla. 
    this.cargar();
  }

  // Obtiene el alumno y lo muestra en pantalla vamos a utilizar funciones anonimas
  // subscribe para obtener el enlace e y lo asigna a la vble id, si el id es correcto(verdadero)
  // asigna al alumno. Si id es invalid es porque es un alumno nuevo
  cargar(): void{
    this.activatedRoute.params.subscribe(
      e => {
        // Capturamos el id que venga en el enlace
        let id = e['id'];
        console.log("cargar id", id)        

        if (id) {
          // Si id es valid es porque es un alumno que ya existe y lo captura y trae a pantalla

          // Subscribe pequeño que solo sirve para asignar datos 
          /*this.alumnoService.get(id).subscribe(
           es=>this.alumno = es
          )*/
          // Subscribe que sirve para hacer varias operaciones
          this.alumnoService.get(id).subscribe(listalumno => {
            this.alumno = listalumno;
            console.log("this.alumno", this.alumno)
            this.domicilio = this.alumno.domicilio
            this.contacto = this.alumno.contacto
          }, error =>
            console.log("error al recuperar el alumno")
          )
        }  
      }
    );
  }

  // Metodo que va a tener la logica que va a hacer el guardar, me subscribo y si sale bien
  // voy a la pagina de alumnos que es la que consulta los alumnos y es la que definimos en
  // app.routing.module estudiantes o tambien como se llama la ventana(pagina o la vista) alumnos
  // y el parametro es el model alumno
  create(): void{
    console.log("create addalumnos", this.alumno);

    if (this.alumno.nombre && this.alumno.apellido && this.domicilio.noCalle && this.contacto.email) {
      console.log("entro", this.alumno)
      //=========================================================================================
      // NOTA IMPORTANTE: Asigna al alumno el domicilio y el contacto creado en pantalla y a 
      //                  sus propias entidades
      //=========================================================================================
      this.alumno.domicilio = this.domicilio;
      this.alumno.contacto = (this.contacto);
      console.log("create addalumnos2", this.alumno)
      // Crear el alumno
      this.alumnoService.create(this.alumno).subscribe(
        res =>this.router.navigate(['/alumnos'])
      )
    }
 
  }

  // Actualizar
  update(): void{
    // Cuando me subscriba y grabe redirecciono
    this.alumnoService.update(this.alumno).subscribe(
      e => this.router.navigate(['/alumnos'])
    )
  }


}
