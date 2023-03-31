// Angular
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Consumir servicios
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Para subir fotos
import { FormsModule } from '@angular/forms';   // Para crear formularios
import { ReactiveFormsModule } from '@angular/forms'; // Para crear formularios reactivos
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

// Module
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar'     // Calendario que se va a utilizar en add-booking
import { NgxPayPalModule } from 'ngx-paypal';
import { TableModule } from 'primeng/table';


// component
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu/menu.component';

// Componentes aqui va el nombre fisico del componenente(como se llama el objeto no internamente)
import { HeaderComponent } from './booking/components/header/header.component';
import { BookingComponent } from './booking/booking.component';
import { AddBookingComponent } from './booking/components/add-booking/add-booking/add-booking.component';
import { ListBookingsComponent } from './booking/components/header/list-bookings/list-bookings.component';
import { LoginComponent } from './booking/components/header/login/login.component';
import { BurguerComponent } from './burguer/burguer/burguer.component';
import { HeaderburguerComponent } from './burguer/burguer/components/headerburguer/headerburguer.component';
import { FooterburguerComponent } from './burguer/burguer/components/footerburguer/footerburguer.component';
import { ListCategoriesComponent } from './burguer/burguer/components/list-categories/list-categories.component';
import { ListProductsComponent } from './burguer/burguer/components/list-products/list-products.component';
import { ProductComponent } from './burguer/burguer/components/product/product.component';
import { ProductsOrderComponent } from './burguer/burguer/components/products-order/products-order.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { AddestudianteComponent } from './estudiantes/components/addestudiante/addestudiante.component';
import { AddproveedorComponent } from './proveedores/components/addproveedor/addproveedor.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AddalumnosComponent } from './alumnos/components/addalumnos/addalumnos.component';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Services
import { TranslateService } from './services/translate.service';
import { ProductService } from './services/product.service';
import { PersonasComponent } from './personas/personas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ListaComponent } from './imagen/lista.component';
import { NuevaComponent } from './imagen/nueva.component';
import { DetalleComponent } from './imagen/detalle.component';
import { CochesComponent } from './coches/coches.component';
import { CocheMarcaPipe } from './pipes/coche-marca.pipe';


// NOTA: en los providers se inyecta el traslate para que los cargue de inicio y el ProductService.

// Función que traduce a traves de la promesa.
export function translateFactory(provider: TranslateService){
  return () => provider.getData();
}

export function productFactory(provider: ProductService){
  return () => provider.getData();
}


// El traslate.service y el product.service se cargan de entrada a la aplciación porque 
// desde aqui del provider se cargan
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TranslatePipe,
    HeaderComponent,
    BookingComponent,
    AddBookingComponent,
    ListBookingsComponent,
    LoginComponent,
    BurguerComponent,
    HeaderburguerComponent,
    FooterburguerComponent,
    ListCategoriesComponent,
    ListProductsComponent,
    ProductComponent,
    ProductsOrderComponent,
    EstudiantesComponent,
    AddestudianteComponent,
    PersonasComponent,
    UsuariosComponent,
    ProveedoresComponent,
    FilterPipe,
    ListaComponent,
    NuevaComponent,
    DetalleComponent,
    AddproveedorComponent,
    CochesComponent,
    CocheMarcaPipe,
    AlumnosComponent,
    AddalumnosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // Calendario
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CalendarModule,    // calendarModule se importa arriba y se va a usar en add-booking
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxPayPalModule,
    TableModule
  ],
  providers: [
    TranslateService, // Los que esten en provides se cargan al inicializar la app
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    ProductService,
    {
      provide: APP_INITIALIZER,
      useFactory: productFactory,
      deps: [ProductService],
      multi: true
    },    
  ],
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
