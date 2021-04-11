import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:44357/api/';

  constructor(private httpClient: HttpClient) { }
  getByCardNumber(cardNumber:string):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl+"creditcards/getbycreditcardnumber?cardNumber="+cardNumber;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcards/getbycustomerid?customerId="+customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  updateCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl+"creditcards/update";
    return this.httpClient.put<ResponseModel>(newPath, creditCard);
  }

  
  add(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl+"creditcards/add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }
}
