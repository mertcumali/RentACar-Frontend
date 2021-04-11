import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;

  colorDetails: Color;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getColorDetails(params['colorId']);
    });
  }

  getColorDetails(colorId: number) {
    this.colorService.getById(colorId).subscribe((response) => {
      this.colorDetails = response.data[0];
      this.createColorUpdateForm();
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.colorDetails.colorId, Validators.required],
      colorName: [this.colorDetails.colorName, Validators.required],
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(
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
