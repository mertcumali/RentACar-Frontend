import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,FormBuilder,Validators} from "@angular/forms"
import { Router } from '@angular/router';
import {ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  customer:Customer;
  currentCustomerEmail:string;

  imageUrl = "https://localhost:44357/Images/"
  defaultImage="logorent.jpg";

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private toastrService:ToastrService,
              private router:Router,
              private localStorage:LocalStorageService,
              private customerService:CustomerService) { }

  ngOnInit(): void {
    this.setCurrentCustomerEmail();
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        this.localStorage.setToken("token",response.data.token)
        this.getCustomerByEmail(loginModel.email);
        this.router.navigate(["cars"])
       
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }

  getCustomerByEmail(email:string){
    this.customerService.getCustomerByEmail(email).subscribe(response => {
      this.customer = response.data;
      this.localStorage.setCurrentCustomer(this.customer);
      

    })
  }

  setCurrentCustomerEmail(){
    return this.localStorage.getCurrentCustomer()
     ? this.currentCustomerEmail = this.localStorage.getCurrentCustomer().email
     :null;
  }


}
