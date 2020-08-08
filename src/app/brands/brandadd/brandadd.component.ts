import { Component, OnInit } from "@angular/core";
import { BrandsService } from "src/app/services/brands.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-brandadd",
  templateUrl: "./brandadd.component.html",
  styleUrls: ["./brandadd.component.scss"],
})
export class BrandaddComponent implements OnInit {
  brandsDetails: any;
  brandForm: FormGroup;

  constructor(
    private BS: BrandsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.brandForm = this.fb.group({
      name: ["", [Validators.required]],
      logo: [null, [Validators.required]],
      categoryId: ["", [Validators.required]],
      description: [null, []],
    });
  }

  ngOnInit(): void {}

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
          console.log("error adding the brands");
        }
      );
    } else {
      this.openSnackBar("Please Enter Mandatory Fields!", "");
      return false;
    }
  }
}
