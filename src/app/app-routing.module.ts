import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksAddComponent } from './components/books-add/books-add.component';
import { BooksComponent } from './components/books/books.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthActivateRouteGuard } from './routeguards/auth.routeguard';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthActivateRouteGuard]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthActivateRouteGuard]},
  {path: 'books', component: BooksComponent, canActivate: [AuthActivateRouteGuard]},
  {path: 'books-add', component: BooksAddComponent, canActivate: [AuthActivateRouteGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
