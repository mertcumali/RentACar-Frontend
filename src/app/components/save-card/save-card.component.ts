import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-save-card',
  templateUrl: './save-card.component.html',
  styleUrls: ['./save-card.component.css']
})
export class SaveCardComponent implements OnInit {

  cards:CreditCard[];
  currentCustomer:Customer;
  @Output() selectedCard : EventEmitter<CreditCard> = new EventEmitter<CreditCard>();

  constructor(private creditCardService:CreditCardService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.currentCustomer = Object.assign({},this.localStorageService.getCurrentCustomer());
    this.getCardsByCustomerId(this.currentCustomer.customerId);
  }

  getCardsByCustomerId(customerId:number){
    this.creditCardService.getCardsByCustomerId(customerId).subscribe(response => {
      this.cards = response.data;
    })
  }

  getSelectCard(cardId:number){
    let selectedCard = this.cards.find(card => card.creditCardId == cardId);
    
    
    let newSelectedCard: CreditCard =  {
    
      creditCardId: selectedCard.creditCardId,
      creditCardNumber : selectedCard.creditCardNumber,
      expirationDate : selectedCard.expirationDate,
      customerId : selectedCard.customerId,
      cvv : selectedCard.cvv,
      balance : selectedCard?.balance
    }
    this.selectedCard.emit(newSelectedCard);
  
  }

}
