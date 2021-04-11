import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { GarageService } from 'src/app/services/garage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  carImages:CarImage[]=[];
  dataLoaded=false;
  filterText="";
  imageUrl = "https://localhost:44357/Images/"

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private garageService:GarageService,
    private imageService:CarImageService,
    private brandService:BrandService,
    private colorService:ColorService,) { }

  
    currentBrand:number
    currentColor:number

    brands: Brand[] = [];
    colors: Color[] = [];
  

  ngOnInit(): void {
    this.getColors()
    this.getBrands()
    this.activatedRoute.params.subscribe(params=>{
      if(params["selectedBrandId"] && params["selectedColorId"]){
        this.getCarsByFilter(params["selectedBrandId"],params["selectedColorId"])
      }
      else if(params["brandId"]){
        this.getCarByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarByColor(params["colorId"])
      }
      else{
        this.getCars()
      }
    })
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
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
  addToGarage(car:Car){
    this.toastrService.success("Added to Garage.",car.description)
    this.garageService.addToGarage(car)
  }
  getCarImages(car:Car){
    this.imageService.getCarImagesByCarId(car.carId).subscribe(response=>{
      this.carImages=response.data;
    })
  }

  getCarsByFilter(brandId:number,colorId:number){
    this.carService.getCarsByBrandColor(brandId,colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
      if(this.cars.length==0){
        this.toastrService.info("Arama sonucunuza ait araç bulunamamaktadır.","Arama sonucu")
      }
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

  getCurrentColor(colorId: number) {
    if(colorId==this.currentColor)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getCurrentBrand(brandId: number) {
    if(brandId == this.currentBrand)
    {
      return true;
    }
    else
    {
      return false;
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
