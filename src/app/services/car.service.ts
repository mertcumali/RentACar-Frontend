import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44357/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getbybrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getbycolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrandColor(brandId:number,colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarsbybrandidcolorid?brandId='+brandId+'&colorId='+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+'cars/getcardetailsbyid?id='+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'cars/add',car)
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'cars/update',car)
  }

}
