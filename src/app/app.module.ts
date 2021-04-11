import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';

import {ToastrModule} from "ngx-toastr";
import { GarageComponent } from './components/garage/garage.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CreditcardComponent } from './components/creditcard/creditcard.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { AuthBarComponent } from './components/navi/auth-bar/auth-bar.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SaveCardComponent } from './components/save-card/save-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarImageComponent,
    FilterBrandPipe,
    FilterColorPipe,
    GarageComponent,
    CarFilterComponent,
    FilterCarPipe,
    CarDetailComponent,
    CreditcardComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarUpdateComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    LoginComponent,
    RegisterComponent,
    AuthBarComponent,
    EditProfileComponent,
    SaveCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
