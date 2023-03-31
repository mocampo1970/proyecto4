import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import * as _ from 'lodash'; 

// Cuando se utiliza primeng se recomienda colocar la linea encapsulation
@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddBookingComponent implements OnInit {

  // Nuevo decorador viewChild para trabajar con los modales, conecta el template con el modal
  @ViewChild("modal_success", {static: false}) modal_success: any;
  @ViewChild("modal_exists", {static: false}) modal_exists: any;


  public options: string[];   // Declara un arreglo tipo string con las opciones del listbox
  public locale: any;         // vble que vamos a utilizar en el calendario
  public today: Date;         // Para validar la fecha minima
  public formBooking: FormGroup;

  // Inyectamos una utilidad formBuilder para el formularioe inyectamos el booking service que es donde va a tener
  // el http y abajo en el add-booking se va a utilizar y adicional se va a crear una vble modalService para el tema
  // de los modales aqui se define y arriba se importa es de tipo bootstrap
  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,   // Vble que me accede a booking.service
    private modalService: NgbModal
  ) { 
    // Opciones del select    
    this.options = ['haircut','hair-coloring', 'hair-washing', 'hair-straightening'];
    console.log(navigator.language);

    // Pasamos lo que tiene la documentación del calendario
    if (navigator.language=='es-ES' || navigator.language=='es-419') {
        this.locale = {
          firstDayOfWeek: 1,
          dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
          dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
          dayNamesMin: [ "D","L","M","X","J","V","S" ],
          monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
          monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
          today: 'Hoy',
          clear: 'Borrar'
        }
    } else {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      }      

    }

    // Dia de hoy
    this.today = new Date();

    // Si la hora del dia es menor que 30, la proxima reserva se puede hacer a y media
    if (this.today.getMinutes() < 30) {
      this.today.setMinutes(30);  
    }else {
      // Sino, sera en la siguiente hora y los minutos a 0
      this.today.setHours(this.today.getHours() + 1);
      this.today.setMinutes(0);
    }

    // asigno 0 a segundos y a milisegundos para evitar de pronto que las horas queden mal
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);

    // Creo el formGroup y aqui se asignan datos por defecto, se valida y se coloca requerido y mas cosas,
    // en este caso coloco requerido el name
    this.formBooking = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      date: new FormControl(this.today),
      service: new FormControl(this.options[0])
    })

  
  }

  /**
   * Obtengo el nombre del formGroup
   */
   get name() {
    console.log("this.formBooking.get('name')2" + this.formBooking.get('name'));     
    return this.formBooking.get('name');
  }

  get date(){
    return this.formBooking.get('date');
  }

  get service(){
    return this.formBooking.get('service');
  }  

  ngOnInit(): void {
  }

  addBooking(){
    console.log("addBooking de add.booking.componet.ts" + this.formBooking.value);

    // Creo el booking con los datos del formulario
    const booking = new Booking(this.formBooking.value);

    // Antes de insertar 
    // Obtengo los bookings es como un RETRIEVE para comprobar si existe alguno en la misma hora
    this.bookingService.getBookings().subscribe(bookings => {
      console.log(bookings);

      // Busco si existe el booking, lo hacemos con lodash
      const bookingFound = _.find(bookings, b=>{
        const date = new Date(b.date)
        const dateNewBooking = new Date(booking.date);
        return date.getTime() === dateNewBooking.getTime();
      })

      // Si existe, sale el modal indicandolo  
      if (bookingFound) {
          console.log("Mao: abro modal de que ya existe ")
          this.modalService.open(this.modal_exists);
      } else {
          // Llama el metodo addBooking del booking.service.ts y hace subscribe
          // subscribe() es un método del tipo Observable. El tipo Observable es una utilidad que transmite datos 
          // de forma asíncrona o sincrónica a una variedad de componentes o servicios que se han suscrito al observable.
          // en este caso por ejm el http. Aqui es el INSERTAR.
          this.bookingService.addBooking(booking).subscribe(id =>{
            console.log("se ha insertado con el siguiente id: " , id);
          
            // para llamar el modal despues de que grabe, es como si le pasaramos el modal con el parametro
            // modal_success. es como un openWithparm con parametros.
            this.modalService.open(this.modal_success);
            // Para adicionar este error que va dentro del subscribe se coloca }, error y la instrucción console
          }, error => {
            console.error("Se ha producido un error: " + error);  
          })       
      }
      
    })

    // ************ pase este pedazo para el anterior else *********************************************
    // Llama el metodo addBooking del booking.service.ts y hace subscribe
    // subscribe() es un método del tipo Observable. El tipo Observable es una utilidad que transmite datos 
    // de forma asíncrona o sincrónica a una variedad de componentes o servicios que se han suscrito al observable.
    // en este caso por ejm el http. Aqui es el INSERTAR.
    //this.bookingService.addBooking(booking).subscribe(id =>{
    //  console.log("se ha insertado con el siguiente id: " , id);
    //
    //   // para llamar el modal despues de que grabe, es como si le pasaramos el modal con el parametro
    //   // modal_success. es como un openWithparm con parametros.
    //   this.modalService.open(this.modal_success);
    //})
    // *************************
  }

}
