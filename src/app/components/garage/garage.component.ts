import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { GarageItem } from 'src/app/models/garageItem';
import { GarageService } from 'src/app/services/garage.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  garageItems:GarageItem[]=[];

  constructor(private garageService:GarageService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getGarage()
  }

  getGarage(){
    this.garageItems=this.garageService.list()
  }
  removeFromGarage(car:Car){
    this.garageService.removeFromGarage(car);
    this.toastrService.error(car.description+" is deleted from Garage.","Deleted")
  }

}
