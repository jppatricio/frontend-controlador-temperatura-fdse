import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetsModule } from './widgets/widgets.module';
import { PagesModule } from './pages/pages.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WidgetsModule,
    PagesModule,
    
    NgxChartsModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
