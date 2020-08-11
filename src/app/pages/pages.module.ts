import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { LecturasComponent } from './lecturas/lecturas.component';
import { LimitesComponent } from './limites/limites.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [InicioComponent, LecturasComponent, LimitesComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PagesModule { }
