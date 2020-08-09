import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { BrandsService } from "src/app/services/brands.service";
import { first } from "rxjs/operators";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-brandsedit',
  templateUrl: './brandsedit.component.html',
  styleUrls: ['./brandsedit.component.scss']
})
export class BrandseditComponent implements OnInit {

  brandsDetails: any;
  brandForm: FormGroup;
  brandid: any;
  constructor(
    private BS: BrandsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder, 
    public AR: ActivatedRoute
  ) {
    this.AR.params.subscribe((params) => {
      this.brandid = params.id;
    }); 
  }

  async ngOnInit() {
    await (await this.BS.getBrandDetails(this.brandid)).pipe(first()).subscribe(
      async (p) => {
        this.brandsDetails = p.result;
      },
      (error) => {}
    );

    this.brandForm = this.fb.group({
      name: [this.brandsDetails.name, [Validators.required]],
      logo: [null, [Validators.required]],
      categoryId: ["", [Validators.required]],
      description: [null, []],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cancelAdd() {
    this.router.navigate(["/brands/list"]);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.brandForm.patchValue({
        logo: file,
      });
    }
  }

  async saveBrand() {
    if (this.brandForm.valid) {
      const formData = new FormData();
      formData.append("name", this.brandForm.get("name").value);
      formData.append("categoryId", this.brandForm.get("categoryId").value);
      formData.append("description", this.brandForm.get("description").value);
      formData.append("logo", this.brandForm.get("logo").value);

      await (await this.BS.addBrands(formData)).subscribe(
        async (p) => {
          this.openSnackBar("Brand Added...", "");
          this.router.navigate(["/brands/list"]);
        },
        (error) => {
          console.log("error updating the brands");
        }
      );
    } else {
      this.openSnackBar("Please Enter Mandatory Fields!", "");
      return false;
    }
  }

}
