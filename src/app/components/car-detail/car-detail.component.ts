import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {

  car:Car;
  carImages:CarImage[]=[];
  carId:number;
  currentCar:Car;
  imageUrl = "https://localhost:44357/Images/"
  
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.carId = params["carId"];
        this.getCarDetails(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      }
    })
  }
  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response =>{
      this.car = response.data;
    })
  }
  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response =>{
      this.carImages = response.data;
    })
  }
  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  setCurrentCar(car:Car){
    this.currentCar = car;    
  }

  getCurrentCarClass(car:Car){
    if(car == this.currentCar){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }



}
