import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { CalendarComponent } from './Pages/calendar/calendar.component';
import { MapaComponent } from './Pages/mapa/mapa.component';
import { ChartsComponent } from './Pages/charts/charts.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

export const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'calendari', component: CalendarComponent},
  {path:'grafics', component: ChartsComponent},
  {path:'mapa', component: MapaComponent},
  {path: 'edit-product/:id', component: CreateProductComponent},
  {path: 'crear-producte', component: CreateProductComponent},


  {path:'**', redirectTo: 'home', pathMatch:'full'},
];
