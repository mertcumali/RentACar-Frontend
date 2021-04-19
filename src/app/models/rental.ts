export interface Rental{
    rentalId?:number;
    carId:number;
    customerId:number;
    brandName:string;
    colorName:string;
    firstName?:string;
    lastName?:string;
    companyName?:string;
    carName:string;
    dailyPrice:number;
    modelYear:string;
    rentDate:Date;
    returnDate:Date;
}