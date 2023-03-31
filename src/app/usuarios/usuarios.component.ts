import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  // Nuevo decorador viewChild para trabajar con los modales, conecta el template con el modal
  @ViewChild("modal_success", {static: false}) modal_success: any;

  public titulo: string="Mantenimiento de usuarios"
  public id: number;  
  public apellidos: string;
  public email: string;
  public nombres: string;
  public password: string;
  public prioridad: number;
  public usuariop: string;

  // Para actualizar el usuario
  usuarioAct: Usuario = new (Usuario);

  // definimos la vble personas que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos, lo va a almacenar en una lista porque llegan varios
  // registros
  usuarios: Usuario[];  

  // Inyectamos el servicio y lo importamos arriba
  // Hacemos inyección de dependencias al servicio, casi siempre que se tenga un front y haya 
  // un servicio y necesitemos acceder a sus metodos lo inyectamos aqui.  
  // debe declararse con private para poder acceder a ella desde aqui  
  constructor(private usuarioService: UsuarioService, private modalService: NgbModal) { }

  // Cuando cargue la vista ejecuta el metodo recuperar todos y con el subscribe ocurre la
  // magia de obtener la lista de usuarios, con funciones de flecha => y donde 
  // u es una vble si tuviera mas irian separadas por coma.
  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(
      u => this.usuarios = u
    )

      console.log("entro a ngonit de usuarios.components")

  }

  editar(usuario: Usuario){
    console.log("usuario a editar es ", usuario)
    this.id        = usuario.id;
    this.apellidos = usuario.apellidos;
    this.nombres   = usuario.nombres;
    this.email     = usuario.email;
    this.password  = usuario.password;
    this.prioridad = usuario.prioridad;
    this.usuariop  = usuario.usuario; 

    // Invoca modal, pero como esta abajo es con parametros
    //this.modalService.open(this.modal_success);
    // esta es la forma de recibir parametros de un modal alla se hace un modal.close('yes') y aqui 
    // se reciben
    this.modalService.open(this.modal_success, {windowClass: "my-modal-dialog"}).result.then(result => {

      // Se comentare mientras tanto
      if (result ==='yes') {
        console.log("se va a grabar el usuario")
        this.update();
      }else{
        console.log("se ha cancelado el update")
      }
    }); // Cierro modalService.open

  }

  // Actualizar y de una recupera registros
  update(): void{
    // Cuando me subscriba y grabe redirecciono
    console.log("update en usuario.component", this.usuarioAct)    
    this.usuarioAct.id        = this.id;
    this.usuarioAct.apellidos = this.apellidos;
    this.usuarioAct.nombres   = this.nombres;
    this.usuarioAct.email     = this.email;
    this.usuarioAct.password  = this.password;    
    this.usuarioAct.prioridad = this.prioridad;
    this.usuarioAct.usuario   = this.usuariop;

    // Hacer el subscribe para update y luego subscribe para getAll sin esto no graba
    this.usuarioService.update(this.usuarioAct).subscribe(
      res => this.usuarioService.getAll().subscribe(
      u   => this.usuarios = u  
      )
    )
   
  }


}
