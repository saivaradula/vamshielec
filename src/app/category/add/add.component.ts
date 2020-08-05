import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { first } from "rxjs/operators";
import { AddLogoDialogComponent } from "../../shared/add-logo/add.logo.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddCategoryComponent implements OnInit {
  imageChangedEvent: any = "";
  croppedImage: any = null;
  categoryName: any = "";

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public CS: CategoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  deleteImage() {
    this.croppedImage = null;
  }

  handleFileSelect(e) {
    this.openLogoDialog(e);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openLogoDialog(e) {
    let dialogRef = this.dialog.open(AddLogoDialogComponent, {
      height: "auto",
      width: "40%",
      disableClose: true,
    });
    dialogRef.componentInstance.event = e;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "save") {
        this.croppedImage = dialogRef.componentInstance.croppedImage;
        console.log("Image got:" + this.croppedImage);
      }
    });
  }

  cancelAdd() {
    this.router.navigate(['/category/list']);
  }

  async saveCategory() {
    if (this.categoryName === "") {
      this.openSnackBar("Please enter a category name", "");
      return false;
    }

    // if (this.croppedImage === null) {
    //   this.openSnackBar("Please upload Image", "");
    //   return false;
    // }

    await (await this.CS.addCategory(this.categoryName, this.croppedImage))
      .pipe(first())
      .subscribe(
        async (p) => {
          this.openSnackBar("Category Added...", "");
          this.router.navigate(['/category/list']);
        },
        (error) => {}
      );
  }
}
