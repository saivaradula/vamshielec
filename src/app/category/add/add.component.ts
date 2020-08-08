import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { first } from "rxjs/operators";
import { AddLogoDialogComponent } from "../../shared/add-logo/add.logo.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public CS: CategoryService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ["", [Validators.required]],
      logo: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.categoryForm.patchValue({
        logo: file,
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cancelAdd() {
    this.router.navigate(["/category/list"]);
  }

  async saveCategory() {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append("name", this.categoryForm.get("name").value);
      formData.append("isActive", "true");
      formData.append("logo", this.categoryForm.get("logo").value);

      await (await this.CS.addCategory(formData)).pipe(first()).subscribe(
        async (p) => {
          this.openSnackBar("Category Added...", "");
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
