import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/services/login.service';
import { LoginData } from '../../model/logindata.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public formulary = this.buildForm()
  hide = true;
  authStatus: string = "";
  model = new User();

  ngOnInit(): void {
    this.formulary.valueChanges.subscribe(res => console.log(res))
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  buildForm() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  validateUser() {
    if (this.formulary.valid) {
      const loginData: LoginData = {
        email: this.formulary.get('email')?.value,
        password: this.formulary.get('password')?.value
      };
      this.loginService.validateLoginDetails(loginData).subscribe(
        responseData => {
          window.sessionStorage.setItem("Authorization",responseData.headers.get('Authorization')!);
          this.model = <any> responseData.body;
          this.model.authStatus = 'AUTH';
          window.sessionStorage.setItem("userdetails",JSON.stringify(this.model));
          this.router.navigate(['dashboard']);
          console.log(responseData)
        },
        error => {
          this.snackBar.open('Senha incorreta. Tente novamente', 'Fechar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          })
        });
      }
  }
}
