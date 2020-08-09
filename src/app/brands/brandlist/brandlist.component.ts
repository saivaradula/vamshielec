import { Component, OnInit } from "@angular/core";
import { BrandsService } from "src/app/services/brands.service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-brandlist",
  templateUrl: "./brandlist.component.html",
  styleUrls: ["./brandlist.component.scss"],
})
export class BrandlistComponent implements OnInit {
  brands: Array<object> = [];
  loadershow: boolean;
  columns: any;

  constructor(private BS: BrandsService, private router: Router) {}

  ngOnInit(): void {
    this.loadershow = true;
    this.columns = [{ prop: "brandTitle", name: "Title", width: "500" }];
    this.getList();
  }

  edit(brand) {
    console.log(brand);
    this.router.navigate([`/brands/edit/${brand.id}`])
  }

  async getList() {
    await (await this.BS.getBrands()).pipe(first()).subscribe(
      async (p) => {
        console.log(p.result);
        this.loadershow = false;
        this.brands = p.result;
      },
      (error) => {}
    );
  }
}
