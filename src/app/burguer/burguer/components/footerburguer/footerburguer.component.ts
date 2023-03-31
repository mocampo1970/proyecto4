import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal/ngx-paypal'; // Cuando se usa ngx-paypal
// Importamos lodash para recorrer abajo los items
import * as _ from 'lodash';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-footerburguer',
  templateUrl: './footerburguer.component.html',
  styleUrls: ['./footerburguer.component.css']
})
export class FooterburguerComponent implements OnInit {

  // Modales el nombre modal_num_order se lo damos en el html asi #modal_num_order se coge solo 
  // despues del #, y siempre que se crea un modal se declara aqui con @View
  @ViewChild("modal_order", {static: false}) modal_order;
  @ViewChild("modal_num_order", {static: false}) modal_num_order;
  @ViewChild("modal_paypal", {static: false}) modal_paypal;  
  @ViewChild("modal_choose_payment", {static: false}) modal_choose_payment; 

  // Este objeto lo trajimos de la pagina de https://www.npmjs.com/package/ngx-paypal
  // buscando por ngx-paypal en el ts del ejm de la pagina antes del init y este es basico
  // para trabajar con paypal, luego sale error pero se importa una librería arriba
  public payPalConfig ? : IPayPalConfig;
  

  // Inyectamos el ngbModal para abrir el modal y el orderservice para utilizarlo en el html en el
  // modal y el translate que lo vamos a utilizar abajo cuando sea paypal recorra los productos
  constructor(
    private modalService: NgbModal,
    public orderService: OrderService,
    public traslateService: TranslateService
  ) { }

  // Todo este código me lo traje desde la pagina https://www.npmjs.com/package/ngx-paypal
  // buscando por ngx-paypal y alla en el initConfig lo traje para aca 
  // Pero el supertruco es donde dice createOrderOnClient esta en la pagina createOrder
  // y muestra error aqui, se debe colocar createOrderOnClient
  // vamos a la pagina de paypal con mi clave y entramos a myapp and credencials allí seleccionamos
  // burguer-queen y en Client-id pegamos aqui en el CliendId la clave en este caso ese string largo 
  ngOnInit(): void {
      this.payPalConfig = {
        currency: 'EUR',
        clientId: 'Ae_IO6YatCei-8KFqlhl6lP6-HcJtpkYlvMEEXTb4Il04mECn-vMPwXiqgs86pRAVu3TGiNuqqYqkbCJ',

        // este pedazo lo vamos a pasar para abajo cuando solo sea paypal
        // mirar como queda el createOrderOnClient y el arreglo de los items se cambia
        // por nuestra orden
//        createOrderOnClient: (data) => < ICreateOrderRequest > {
//            intent: 'CAPTURE',
//            purchase_units: [{
//                amount: {
//                    currency_code: 'EUR',
//                    value: '9.99',
//                    breakdown: {
//                        item_total: {
//                            currency_code: 'EUR',
//                            value: '9.99'
//                        }
//                    }
//                },
//                items: [{
//                    name: 'Enterprise Subscription',
//                    quantity: '1',
//                    category: 'DIGITAL_GOODS',
//                    unit_amount: {
//                        currency_code: 'EUR',
//                        value: '9.99',
//                    },
//                }]
//            }]
//        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
// recomienda dejarlo vacio, yo se lo comente y mas abajo se va a utilizar antes de abrir el modal       
//            console.log('onApprove - transaction was approved, but not authorized', data, actions);
//            actions.order.get().then(details => {
//                console.log('onApprove - you can get full order details inside onApprove: ', details);
//            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
//            this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
//            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
//            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
//            this.resetStatus();
        },
    };
  }

  // A los modales se les puede pasar parametros en este caso windowClass y esa se va
  // utilizar en el styles.css ppal para que solo afecte este modal
  // estaba hasta }) le coloque .result que es una promesa que 
  // La promesa que se resuelve cuando se cierra el modal y se rechaza cuando se descarta el modal
  // el result
  // para crear el pedido lo vamos a hacer en order.service (alla hacemos la conversion a json,
  // nos conectamos a la url y hacemos el post)
  // y aqui lo llamamos.
  // {windowClass: "my-modal-dialog"}) significa que afecte todas las clases que tenga ese modal y
  //               las afecte en styles.css y en todas partes
  openModalOrder(){
    this.modalService.open(this.modal_order, {windowClass: "my-modal-dialog"}).result.then(result => {

      // Se comentare mientras tanto
      if (result ==='yes') {

        this.modalService.open(this.modal_choose_payment, {windowClass: "my-modal-dialog"}).result.then(typePayment =>{
          if (typePayment === 'paypal') {

            const items = [];

              // toFixed es muy importante porque para paypal no se pueden colocar demasiados 
              // decimales en este caso es 2, y adicional la suma de todos los items(productos)
              // debe dar el gran total abajo
            _.forEach(this.orderService.order.productsOrder, product => {
              items.push({
                name: this.traslateService.getTranslate(product.name),
                quantity: product.quantity,
                unit_amount: {
                    currency_code: 'EUR',
                    value: product.totalPrice().toFixed(2),
                },
              })
            })

            // Este pedazo inicialmente venia directamente desde la pagina de paypal y lo pegamos
            // en el ngOnInit, pero este codigo solo se va utilizar cuando el pago sea
            // paypal. de la pagina de paypal venia con createOrder pero presentaba error
            // por eso se le coloco. Otra cosa que se modifica es aqui se le coloca
            // this.payPalConfig y abajo en los items los borramos porque lo vamos a rellenar.
            this.payPalConfig.createOrderOnClient = (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'EUR',
                        value: this.orderService.order.totalOrder().toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: 'EUR',
                                value: this.orderService.order.totalOrder().toFixed(2)
                            }
                        }
                    },
                    items: items
                }]
            }

            // Cuando apruebe el pedido le vamos a hacer lo que haciamos con el cash
            this.payPalConfig.onApprove = (data, actions) => {
              // pegamos este pedazo aqui 
              console.log("vamos a crear el pedido en efectivo")

              // Los Observables brindan soporte para pasar mensajes entre partes de su aplicación.         
              this.orderService.createOrder().subscribe(data => {
                console.log("se ha creado el objeto", data)
                // Limpiamos la orden porque si llega un nuevo cliente debe tener su orden vacia
                // apenas se cree esta.
                this.orderService.clearOrder();
  
                // Abre modal final modal_num_order y cerramos todos con result.then
                this.modalService.open(this.modal_num_order).result.then(r_num_order =>{
                  // Con esta instrucción cierra todos los modales que haya abiertos
                  this.modalService.dismissAll('close');
                });
  
              }, error =>{
                console.log("ha habido un error" , error)
              })              

            };


            // Abrimos modal de pago
            this.modalService.open(this.modal_paypal, {windowClass: "my-modal-dialog"});
          }else{

            console.log("vamos a crear el pedido en efectivo")

            // Los Observables brindan soporte para pasar mensajes entre partes de su aplicación.         
            this.orderService.createOrder().subscribe(data => {
              console.log("se ha creado el objeto", data)
              // Limpiamos la orden porque si llega un nuevo cliente debe tener su orden vacia
              // apenas se cree esta.
              this.orderService.clearOrder();

              // Abre modal final modal_num_order
              this.modalService.open(this.modal_num_order);

            }, error =>{
              console.log("ha habido un error" , error)
            })
          }

        }); // Cierro modalService.open

      }else{
        console.log("se ha cancelado el pedido")
      }
    });
  }

}
