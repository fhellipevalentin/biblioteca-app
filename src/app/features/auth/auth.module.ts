import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoginComponent,
    LogoutComponent
  ]
})
export class AuthModule { }
