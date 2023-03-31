import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  public titulo: string = "Lista de alumnos HibernateJPA mirar cascade domicilio/contacto";

  // definimos la vble alumnos que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  alumnos: Alumno[];

  constructor(private alumnoService: AlumnoService) { }

  // propiedad que se utiliza en el alumno.html en el filtro
  filterAlumno = '';  

  ngOnInit(): void {
    this.alumnoService.getAll().subscribe(
      e => this.alumnos = e
    );    
  }

  // Para el borrar le vamos a pasar ub objeto completo de alumno y mediante
  // el id lo eliminamos asi como en PB era getItemNumber(Row, col). En el html le pasamos el  
  // alumno completo y aqui lo recibimos por eso tenemos arriba importada la clase model
  // alumno, y cuando se llama el servicio hago subscribe para eliminar y refrescar
  // esta pantalla con el getAll, sino se hace subscribe no hace nada. el subscribe es como el
  // commit digamolo asi ese primer subscribe hace el delete y el segundo hace el getAll,
  // envia el objeto pero borramos por id , se va a trabajar con sweetalert2 que se instala 
  // npm i sweetalert2 y aqui arriba se importa.
  delete(alumno: Alumno): void { 
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "El registro del alumno: " + alumno.nombre + ' ' + alumno.apellido,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // Si confirman que eliminan 
      if (result.isConfirmed) {
        // Vamos a ingresar aqui el codigo de eliminar, primero elimina y luego consulta
        this.alumnoService.delete(alumno.idAlumno).subscribe(
          res => this.alumnoService.getAll().subscribe(
          response => this.alumnos = response  
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
