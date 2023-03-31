import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../estudiante.service';
import { Estudiante } from '../../estudiante';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-addestudiante',
  templateUrl: './addestudiante.component.html',
  styleUrls: ['./addestudiante.component.css']
})
export class AddestudianteComponent implements OnInit {

  // Aqui vamos a declarar un objeto de tipo estudiante para poder mapearlo en la vista
  estudiante: Estudiante = new Estudiante();
  titulo: string= "Registro de estudiante";

  // Inyectamos el servicio y mediante el cual nos vamos a conectar al api rest, adicional
  // declaramos router que nos va a permitir navegar entre la aplicación y devolvernos 
  // a la lista de estudiantes, y 
  // ActivatedRoute Proporciona acceso a información sobre una ruta asociada con un componente
  constructor(private estudianteService: EstudianteService, private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Cuando presione Editar en esta vista estudiantes.components.html hace routerLink a 
    // esta vista addestudiante con el parametro estudiante.id y aqui en addestudiante 
    // abre y ejecuta este metodo ngOnit que llama al cargar
    // hace el cargar que es el metodo que carga datos a esa pantalla. 
    this.cargar();
  }

  // Obtiene el estudiante y lo muestra en pantalla vamos a utilizar funciones anonimas
  // subscribe para obtener el enlace e y lo asigna a la vble id, si el id es correcto(verdadero)
  // asigna al estudiante. Si id es invalid es porque es un estudiante nuevo
  cargar(): void{
    this.activatedRoute.params.subscribe(
      e => {
        // Capturamos el id que venga en el enlace
        let id = e['id'];   

        if (id) {
          // Si id es valid es porque es un estudiante que ya existe y lo captura y trae a pantalla
          this.estudianteService.get(id).subscribe(
           es=>this.estudiante = es          
          )        
        }  
      }
    );
  }

  // Metodo que va a tener la logica que va a hacer el guardar, me subscribo y si sale bien
  // voy a la pagina de estudiantes que es la que consulta los estudiantes y es la que definimos en
  // app.routing.module estudiantes o tambien como se llama la ventana(pagina o la vista) estudiantes
  // y el parametro es el model estudiante
  create(): void{
    console.log(this.estudiante);
    this.estudianteService.create(this.estudiante).subscribe(
      res =>this.router.navigate(['/estudiantes'])
    )
  }

  // Actualizar
  update(): void{
    // Cuando me subscriba y grabe redirecciono
    this.estudianteService.update(this.estudiante).subscribe(
      e => this.router.navigate(['/estudiantes'])
    )
  }

}
