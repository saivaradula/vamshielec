import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { BrandsService } from "src/app/services/brands.service";
import { CategoryService } from "src/app/services/category.service";
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories: Array<object> = [];
  loadershow: boolean;
  columns: any;

  constructor(
    private BS: BrandsService,
    private router: Router,
    private CS: CategoryService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public AR: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadershow = true;
    this.columns = [{ prop: "id", name: "Id", width: "500" }];
    this.getList();
  }
  
  edit(category) {
    this.router.navigate([`/category/edit/${category.id}`])
  }

  async getList() {
    await (await this.CS.getCategories()).pipe(first()).subscribe(
      async (p) => {
        this.loadershow = false;
        this.categories = p.result;
      },
      (error) => {}
    );
  }

  async delete(category) {
    await (await this.CS.deleteCategory(category.id)).pipe(first()).subscribe(
      async (p) => {
        this.categories = this.categories.filter(c => c.id !== category.id);
      },
      (error) => {}
    );
  }
}
