import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  constructor(private router:Router, 
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  cars:Car[]=[];
  currentBrand:number
  currentColor:number

  brands: Brand[] = [];
  colors: Color[] = [];
  dataLoaded=false;

  ngOnInit(): void {
    this.getColors()
    this.getBrands()
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
    })
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }


  getCarByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarByBrandColor(brandId:number,colorId:number){
    this.carService.getCarsByBrandColor(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
      if(this.cars.length==0)
      {
        this.toastrService.error("No cars matching your search were found.");
      }
    })
  }

  getCurrentColor(color: Color) {
    if(color.colorId==this.currentColor)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getCurrentBrand(brand: Brand) {
    if(brand.brandId == this.currentBrand)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getRouterLink(){
    if(this.currentBrand && this.currentColor){
      return "/cars/filter/brand/"+this.currentBrand+"/color/"+this.currentColor;
    }else if(this.currentBrand){
      return "/cars/filter/brand/"+this.currentBrand;
    }else if(this.currentColor){
      return "/cars/filter/color/"+this.currentColor;
    }else{
      return "/cars";
    }
  }

  IsCurrentBrandNull(){
    if(this.currentBrand){
      return true;
    }else{
      return false;
    }
  }

  IsCurrentColorNull(){
    if(this.currentColor){
      return true;
    }else{
      return false;
    }
  }
}
