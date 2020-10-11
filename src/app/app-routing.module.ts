import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewusersComponent } from './viewusers/viewusers.component';
import {AddmeetingComponent} from './addmeeting/addmeeting.component';
import {ViewmeetingsComponent} from './viewmeetings/viewmeetings.component';
import {EditmeetingComponent} from './editmeeting/editmeeting.component';
import {TodaymeetingsComponent} from './todaymeetings/todaymeetings.component';


// import { AuthguardGuard } from './authguard.guard'
import {AuthGuard } from './auth.guard';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'viewusers' , component : ViewusersComponent},
   {path:'addmeeting',component:AddmeetingComponent},
   {path:'viewmeetings',component:ViewmeetingsComponent},
   {path:'editmeeting',component:EditmeetingComponent},
   {path:'todaymeetings',component:TodaymeetingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
