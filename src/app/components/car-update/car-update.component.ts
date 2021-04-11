import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;

  carDetails:Car;

  brands:Brand[]=[];
  colors:Color[]=[];

  constructor(private formBuilder:FormBuilder,
              private carService:CarService,
              private toastrService:ToastrService,
              private colorService:ColorService,
              private brandService:BrandService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails(params["carId"]);
      this.getBrands();
      this.getColors();
  })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:[this.carDetails.carId,Validators.required],
      brandId:[this.carDetails.brandId,Validators.required],
      colorId:[this.carDetails.colorId,Validators.required],
      dailyPrice:[this.carDetails.dailyPrice,Validators.required],
      modelYear:[this.carDetails.modelYear,Validators.required],
      description:[this.carDetails.description,Validators.required]
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
        this.colors=response.data;
    })
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.carDetails = response.data;
      this.createCarUpdateForm();
    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({}, this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response=>{
        console.log(response)
        this.toastrService.success(response.message,"Successfull")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i< responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Dogrulama hatası")
            
          }
         
        }
        
       
      })
     
    }
    else{
      this.toastrService.error("Form is missing","Warning")
    }
   
  }

}
