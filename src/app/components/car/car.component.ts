import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
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
    private imageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByFilter(params["brandId"],params["colorId"])
        console.log("if")
      }
      if(params["brandId"]){
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
}
