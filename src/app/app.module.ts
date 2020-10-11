import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CalendarModule, IslamicService } from '@syncfusion/ej2-angular-calendars';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewusersComponent } from './viewusers/viewusers.component';
import { ViewmeetingsComponent } from './viewmeetings/viewmeetings.component';
import { AddmeetingComponent } from './addmeeting/addmeeting.component';
import { EditmeetingComponent } from './editmeeting/editmeeting.component';
import { TodaymeetingsComponent } from './todaymeetings/todaymeetings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    ViewusersComponent,
    ViewmeetingsComponent,
    AddmeetingComponent,
    EditmeetingComponent,
    TodaymeetingsComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule, CalendarModule ,
    RouterModule,
    // BsDatepickerModule.forRoot(),  
    // NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
