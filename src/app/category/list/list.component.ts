import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories: Array<object> = [];
  loadershow: boolean;
  columns: any;

  constructor(public CS: CategoryService) {}

  ngOnInit(): void {
    this.loadershow = true;
    this.columns = [{ prop: "id", name: "Id", width: "500" }];
    this.getList();
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
}
