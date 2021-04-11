import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44357/api/';
  constructor(private httpClient: HttpClient) {}
  
  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath=this.apiUrl+'brands/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  getById(brandId:number):Observable<ListResponseModel<Brand>> {
    let newPath=this.apiUrl+'brands/getbyid?id='+brandId;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'brands/add',brand)
  }
  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'brands/update',brand)
  }

}
