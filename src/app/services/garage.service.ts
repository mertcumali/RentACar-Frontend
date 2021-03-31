import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { GarageItem } from '../models/garageItem';
import { GarageItems } from '../models/garageItems';

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  constructor() {}

  addToGarage(car: Car) {
    let item = GarageItems.find((c) => c.car.carId === car.carId);
    if (item) {
      item.quantity++;
    } else {
      let garageItem = new GarageItem();
      garageItem.car = car;
      garageItem.quantity = 1;
      GarageItems.push(garageItem);
    }
  }
  removeFromGarage(car: Car) {
    let item: GarageItem = GarageItems.find(c => c.car.carId === car.carId);
    GarageItems.splice(GarageItems.indexOf(item), 1);
  }

  list(): GarageItem[] {
    return GarageItems;
  }
}
