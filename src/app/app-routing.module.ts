import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivateRouteGuard } from '@core/guards/auth.guard';
import { HomeComponent } from '@features/home/pages/home/home.component';
import { LoginComponent } from '@features/auth/pages/login/login.component';
import { LogoutComponent } from '@features/auth/pages/logout/logout.component';
import { DashboardComponent } from '@features/dashboard/pages/dashboard/dashboard.component';
import { BooksComponent } from '@features/books/pages/books/books.component';
import { EditBookComponent } from '@features/books/components/edit-book/edit-book.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthActivateRouteGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthActivateRouteGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthActivateRouteGuard] },
  { path: 'book/:id', component: EditBookComponent, canActivate: [AuthActivateRouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
