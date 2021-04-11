import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updateForm:FormGroup;
  customer:Customer;

  imageUrl = "https://localhost:44357/Images/"
  updateImage="logorent.jpg";

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private toastrService:ToastrService,
              private router:Router,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
   
    this.getCustomer();
    this.createUpdateForm();
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      customerId:[this.customer.customerId,Validators.required],
      userId:[this.customer.userId,Validators.required],
      firstName:[this.customer.firstName,Validators.required],
      lastName:[this.customer.lastName,Validators.required],
      companyName:[this.customer.companyName,Validators.required],
      email:[this.customer.email,Validators.required],
      findexPoint:[this.customer.findexPoint,Validators.required],
      password:[""],
      confirmPassword:[""]
    })
  }
  getCustomer(){
    this.customer = this.localStorage.getCurrentCustomer();
  }

  update(){
    if(this.updateForm.invalid) {
      this.toastrService.error('Please fill the all forms', 'Error');
      return;
    }

    if(this.updateForm.value['password'] !=this.updateForm.value['secondPassword']) {
      this.toastrService.error('The password is not confirmed', 'Error');
      return;
    }

      delete this.updateForm.value["confirmPassword"];
      console.log(this.updateForm.value)
      let updateModel = Object.assign({},this.updateForm.value)

      this.authService.login(updateModel).subscribe(response=>{
        this.localStorage.removeCurrentCustomer();
        delete updateModel.password;
        this.localStorage.setCurrentCustomer(updateModel);
        this.router.navigate(["cars"])
        return this.toastrService.success("Your profile is updated","Successful");
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    
  }


}
