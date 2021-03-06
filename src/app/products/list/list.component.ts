import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/products.service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  products: Array<object> = [];
  loadershow: boolean;
  columns: any;

  constructor(public PS: ProductService, public router: Router) {}

  ngOnInit(): void {
    this.loadershow = true;
    this.columns = [{ prop: "productTitle", name: "Title", width: "500" }];
    this.getList();
  }

  async getList() {
    await (await this.PS.getProducts()).pipe(first()).subscribe(
      async (p) => {
        console.log(p.result);
        this.loadershow = false;
        this.products = p.result;
      },
      (error) => {}
    );
  }

  viewDetails(product) {
    this.router.navigate([`/products/details/${product.id}`]);
  }
}