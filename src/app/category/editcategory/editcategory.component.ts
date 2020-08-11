import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { BrandsService } from "src/app/services/brands.service";
import { CategoryService } from "src/app/services/category.service";
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-editcategory",
  templateUrl: "./editcategory.component.html",
  styleUrls: ["./editcategory.component.scss"],
})
export class EditcategoryComponent implements OnInit {
  categoryForm: FormGroup;
  cateId;

  constructor(
    private BS: BrandsService,
    private router: Router,
    private CS: CategoryService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public AR: ActivatedRoute
  ) {
    this.AR.params.subscribe((params) => {
      this.cateId = params.id;
    });
    this.categoryForm = this.fb.group({
      name: ["", [Validators.required]],
      logo: [null],
    });
  }

  async ngOnInit() {
    await (await this.CS.getCategoryDetails(this.cateId)).pipe(first()).subscribe(
      async (p) => {
        console.log(p.result)
        this.categoryForm
          .get("name")
          .patchValue( p.result[0].name);
      },
      (error) => {}
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryForm.patchValue({
        logo: file,
      });
    }
  }

  cancelAdd() {
    this.router.navigate(["/category/list"]);
  }

  async saveCategory() {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append("name", this.categoryForm.get("name").value);
      
      if (this.categoryForm.get("logo").value != "") {
        formData.append("logo", this.categoryForm.get("logo").value)
      }

      await (await this.CS.updateCategory(this.cateId, formData)).pipe(first()).subscribe(
        async (p) => {
          this.openSnackBar("Category Updated...", "");
          this.router.navigate(["/category/list"]);
        },
        (error) => {}
      );
    } else {
      this.openSnackBar("Please Enter Mandatory Fields!", "");
      return false;
    }
  }
}