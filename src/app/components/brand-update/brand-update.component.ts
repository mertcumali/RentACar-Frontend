import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm: FormGroup;

  brandDetails: Brand;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBrandDetails(params['brandId']);
    });
  }

  getBrandDetails(brandId: number) {
    this.brandService.getById(brandId).subscribe((response) => {
      this.brandDetails = response.data[0];
      this.createBrandUpdateForm();
    });
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.brandDetails.brandId, Validators.required],
      brandName: [this.brandDetails.brandName, Validators.required],
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Successfull');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Dogrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form is missing', 'Warning');
    }
  }

}
