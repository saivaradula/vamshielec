import { Component, OnInit } from "@angular/core";
import { BrandsService } from "src/app/services/brands.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-brandadd",
  templateUrl: "./brandadd.component.html",
  styleUrls: ["./brandadd.component.scss"],
})
export class BrandaddComponent implements OnInit {
  brandsDetails: any;

  constructor(
    private BS: BrandsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cancelAdd() {
    this.router.navigate(['/brands/list']);
  }

  onClickSubmit(data) {
    this.addBrands(data);
  }

  async addBrands(data) {
    await (await this.BS.addBrands(data)).subscribe(
      async (p) => {
        this.openSnackBar("Brand Added...", "");
        this.router.navigate(['/brands/list']);
      },
      (error) => {
        console.log("error adding the brands");
      }
    );
  }
}
