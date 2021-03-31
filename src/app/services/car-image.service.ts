import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/car-image';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44357/api/carimages';
  apiUrl2 = 'https://localhost:44357/api/Images';
  constructor(private httpClient: HttpClient) {}
  
  getCarImages(): Observable<ListResponseModel<CarImage>> {
    let newPath=this.apiUrl+"/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath=this.apiUrl+"/getimagesbycarid?CarId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
