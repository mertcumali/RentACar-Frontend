import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-auth-bar',
  templateUrl: './auth-bar.component.html',
  styleUrls: ['./auth-bar.component.css']
})
export class AuthBarComponent implements OnInit {
  constructor(private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    console.log("girdi22")
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.localStorageService.removeToken("token");
    this.localStorageService.removeCurrentCustomer();
    this.toastrService.success("Log Outed","Successfull");
    return this.router.navigateByUrl("/login");
  }

  getCurrentCustomer():Customer{
    console.log("girdi")
    return this.localStorageService.getCurrentCustomer();
    
  }

}
