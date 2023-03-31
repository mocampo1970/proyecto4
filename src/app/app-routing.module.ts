import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components importa Mao
import { BookingComponent } from './booking/booking.component';
import { AddBookingComponent } from './booking/components/add-booking/add-booking/add-booking.component';
import { ListBookingsComponent } from './booking/components/header/list-bookings/list-bookings.component';
import { BurguerComponent } from './burguer/burguer/burguer.component';
import { FooterburguerComponent } from './burguer/burguer/components/footerburguer/footerburguer.component';
import { HeaderburguerComponent } from './burguer/burguer/components/headerburguer/headerburguer.component';
import { ListCategoriesComponent } from './burguer/burguer/components/list-categories/list-categories.component';
import { ListProductsComponent } from './burguer/burguer/components/list-products/list-products.component';
import { ProductComponent } from './burguer/burguer/components/product/product.component';
import { ProductsOrderComponent } from './burguer/burguer/components/products-order/products-order.component';
import { AddestudianteComponent } from './estudiantes/components/addestudiante/addestudiante.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { PersonasComponent } from './personas/personas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { AddproveedorComponent } from './proveedores/components/addproveedor/addproveedor.component';
import { AddalumnosComponent } from './alumnos/components/addalumnos/addalumnos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';

import { NuevaComponent } from './imagen/nueva.component';
import { DetalleComponent } from './imagen/detalle.component';
import { ListaComponent } from './imagen/lista.component';
import { CochesComponent } from './coches/coches.component';


/* Creamos las rutas de navegación de la aplicación*/
const routes: Routes = [
  // Esto significa cuando en la url tenga login vaya abra el componente login y asi con los demas
  // la de usuario/:id es para nevegar segun un indice dependiendo de la persona abra datos como una
  // ventana response.
  //
  // Nota: No me abria cuando entrada a las categorias
  //       daba click en list products porque lo tenia listproducts sin el -
  {path: 'add-booking', component: AddBookingComponent},
  {path: 'list-bookings', component: ListBookingsComponent},
  {path: 'booking', component: BookingComponent}, 
  {path: 'burguer', component: BurguerComponent},
  {path: 'headerburguer', component: HeaderburguerComponent},  
  {path: 'footerburguer', component: FooterburguerComponent},
  {path: 'list-categories', component: ListCategoriesComponent},
  {path: 'list-products', component: ListProductsComponent},
  {path: 'product', component: ProductComponent},  
  {path: 'products-order', component: ProductsOrderComponent},
  {path: 'estudiantes', component: EstudiantesComponent},
  {path: 'addestudiante', component: AddestudianteComponent},
  {path: 'addestudiante/:id', component: AddestudianteComponent},  // Se va utilizar para update 1 estud
  {path: 'personas', component: PersonasComponent},  
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'nueva', component: NuevaComponent},
  {path: 'detalle', component: DetalleComponent}, 
  {path: 'lista', component: ListaComponent},
  {path: 'addproveedor', component: AddproveedorComponent},
  {path: 'addproveedor', component: AddproveedorComponent}, 
  {path: 'coches', component: CochesComponent},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'addalumnos', component: AddalumnosComponent},
  {path: 'addalumnos/:id', component: AddalumnosComponent},  // Se va utilizar para update 1 alumno
  {path: '**', pathMatch: 'full', redirectTo: 'add-booking'}
];

// se adiciona el useHash
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
