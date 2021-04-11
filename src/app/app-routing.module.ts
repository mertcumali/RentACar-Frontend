import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CreditcardComponent } from './components/creditcard/creditcard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/filter/brand/:selectedBrandId/color/:selectedColorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent},

  {path:"rental/:carId",component:RentalComponent},
  {path:"cars/rental/:carId",component:RentalComponent},
  {path:"creditcard/:rental",component:CreditcardComponent},

  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent},

  {path:"brands/add",component:BrandAddComponent},
  {path:"brands/update/:brandId",component:BrandUpdateComponent},

  {path:"colors/add",component:ColorAddComponent},
  {path:"colors/update/:colorId",component:ColorUpdateComponent},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"update",component:EditProfileComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
