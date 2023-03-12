import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private router: Router) { }
  user = new User();
  
  ngOnInit(): void {
    
    window.sessionStorage.setItem("userdetails","");
    this.router.navigate(['/login']);
  }

}
