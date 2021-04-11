import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  customer:Customer;

  
  imageUrl = "https://localhost:44357/Images/"
  defaultImage="logorent.jpg";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorage: LocalStorageService,
    private customerService:CustomerService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      secondPassword: ['', Validators.required],
      findexPoint: [70,Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.toastrService.error('Please fill the all forms', 'Error');
      return;
    }

    if (this.registerForm.value['password'] !=this.registerForm.value['secondPassword']) {
      this.toastrService.error('The password is not confirmed', 'Error');
      return;
    }

    delete this.registerForm.value["secondPassword"]
    console.log(this.registerForm.value);
    let registerModel = Object.assign({}, this.registerForm.value);

    this.authService.register(registerModel).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.getCustomerByEmail(registerModel.email);
        this.localStorage.setToken('token', response.data.token);
        this.router.navigate(['cars']);
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );

  }

      
  getCustomerByEmail(email: string) {
    this.customerService.getCustomerByEmail(email).subscribe(response => {
      this.customer = response.data; 
      this.localStorage.setCurrentCustomer(this.customer);
    });
  }






}
