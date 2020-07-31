import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LecturasComponent } from './pages/lecturas/lecturas.component';
import { LimitesComponent } from './pages/limites/limites.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'lecturas', component: LecturasComponent },
  { path: 'limites', component: LimitesComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
