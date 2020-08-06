import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brandadd',
  templateUrl: './brandadd.component.html',
  styleUrls: ['./brandadd.component.scss']
})
export class BrandaddComponent implements OnInit {

  brandsDetails: any;

  constructor(private BS: BrandsService) { }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
    this.brandsDetails = data
    this.brandsDetails.categoryId = parseInt(data.categoryId)
    // this.brandsDetails.createdOn = new Date()
    // this.brandsDetails.isActive = true
    // this.brandsDetails.isDelete = false
    // this.brandsDetails.logo = "http://206.189.128.76:3030/public/vendorImages/null"
    // this.brandsDetails.updatedOn = new Date()
    console.log("form data", this.brandsDetails)
    this.addBrands(this.brandsDetails);
  }

  async addBrands(data) {
    await (await this.BS.addBrands(data))
      .subscribe(async p => {
        console.log(p.result);
      }, error => {
        console.log("error adding the brands")
      });
  }

}
