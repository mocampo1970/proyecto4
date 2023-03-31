import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Estudiante } from './estudiante';
import { EstudianteService } from './estudiante.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  public titulo: string = "Lista de estudiantes";
  // definimos la vble estudiantes que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  estudiantes: Estudiante[];

  // Hacemos inyección de dependencias al servicio, casi siempre que se tenga un front y haya 
  // un servicio y necesitemos acceder a sus metodos lo inyectamos aqui
  constructor(private estudianteService: EstudianteService) { }

  // propiedad que se utiliza en el estudiante.html en el filtro
  filterEstudiante = '';  

  // Cuando cargue la aplicación ejecuta el metodo recuperar todos y con el subscribe ocurre la
  // magia de obtener la lista de estudiantes, con funciones de flecha => y donde 
  // e es una vble si tuviera mas 
// debe declararse con private para poder acceder a ella desde aqui  
  ngOnInit(): void {

    this.estudianteService.getAll().subscribe(
      e => this.estudiantes = e
    );
  }

  // Para el borrar le vamos a pasar ub objeto completo de estudiante y mediante
  // el id lo eliminamos asi como en PB era getItemNumber(Row, col). En el html le pasamos el  
  // estudiante completo y aqui lo recibimos por eso tenemos arriba importada la clase model
  // estudiante, y cuando se llama el servicio hago subscribe para eliminar y refrescar
  // esta pantalla con el getAll, sino se hace subscribe no hace nada. el subscribe es como el
  // commit digamolo asi ese primer subscribe hace el delete y el segundo hace el getAll,
  // envia el objeto pero borramos por id , se va a trabajar con sweetalert2 que se instala 
  // npm i sweetalert2 y aqui arriba se importa.
  delete(estudiante: Estudiante): void {
    console.log("esta en borrado", estudiante)
    //this.estudianteService.delete(estudiante.id).subscribe(
    //  res => this.estudianteService.getAll().subscribe(
    //  response => this.estudiantes = response  
    //  )
    //)

    // Tema de sweetalert2
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "El registro del estudiante: " + estudiante.nombres + ' ' + estudiante.apellidos,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // Si confirman que eliminan 
      if (result.isConfirmed) {
        // Vamos a ingresar aqui el codigo de eliminar
        this.estudianteService.delete(estudiante.id).subscribe(
          res => this.estudianteService.getAll().subscribe(
          response => this.estudiantes = response  
          )
        ) 
        Swal.fire(
          'Eliminado!',
          'Tu registro fue eliminado.',
          'success'
        )
      }
    })
  }

}
