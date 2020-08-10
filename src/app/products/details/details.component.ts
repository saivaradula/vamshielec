import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/products.service";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId = 0;
  loadershow = true;
  details: any;

  constructor(
    public PS: ProductService,
    public router: Router,
    public AR: ActivatedRoute
  ) {
    this.AR.params.subscribe((params) => {
      this.productId = params.id;
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  async getProductDetails() {
    await (await this.PS.getProductDetails(this.productId)).pipe(first()).subscribe(
      async (p) => {
        this.loadershow = false;
        this.details = p.result[0];
        console.log(this.details);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}