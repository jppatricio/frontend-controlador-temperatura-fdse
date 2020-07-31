import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { LecturasComponent } from './lecturas/lecturas.component';
import { LimitesComponent } from './limites/limites.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms'



@NgModule({
  declarations: [InicioComponent, LecturasComponent, LimitesComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
