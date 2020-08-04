import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  categories = [{ id: 1, category: 'Category 1' }, { id: 2, category: 'Category 2' }, { id: 3, category: 'Category 3' }, { id: 4, category: 'Category 4' }, { id: 5, category: 'Category 5' }]
  brands = [{ id: 1, brand: 'brand 1' }, { id: 2, brand: 'brand 2' }, { id: 3, brand: 'brand 3' }, { id: 4, brand: 'brand 4' }, { id: 5, brand: 'brand 5' }]
  productSize = [2, 3, 4, 5, 6];
  productLocation = ['Hyderabad', 'Mumbai', 'Pune'];
  productColor = ['Red', 'White', 'Blue', 'Black'];
  productLength = [24, 30, 36, 40, 46];
  productWeight = ['1 KG', '2 KG'];
  productWidth = [24, 30, 36, 40, 46];
  productHeight = [24, 30, 36, 40, 46];
  quantity = [1, 2, 3, 4, 5, 6];
  colorCode = ['FFF', 'CCC', 'DDD', '000'];
  moreFields = [{ attr: 'Fields 1'}, { attr: 'Fields 2'},{ attr: 'Fields 3'}];
  discounts = [10, 20, 30, 40, 50];
  features = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'];
  variantRetailPrice = [100, 200, 300, 400, 500];
  variantTaxPrice = [10, 20, 30, 40, 50];
  baseTaxPercent = [10, 20, 30, 40, 50];

  constructor() { }

  ngOnInit(): void {
  }

  categoryChg(category) {
    console.log('category ==>', category);
  }

  brandChg(brand) {
    console.log('brand ==>', brand);
  }

  productSizeChg(size) {
    console.log('product size ==>', size);
  }

  productLocationChg(loc) {
    console.log('product location ==>', loc);
  }

  productColorChg(color) {
    console.log('product color ==>', color);
  }

  productLengthChg(length) {
    console.log('product length ==>', length);
  }

  productWeightChg(weight) {
    console.log('product weight ==>', weight);
  }

  productWidthChg(width) {
    console.log('product width ==>', width);
  }

  productHeightChg(height) {
    console.log('product height ==>', height);
  }

  productQtyChg(qty) {
    console.log('product qty ==>', qty);
  }

  colorCodeChg(code) {
    console.log('color code ==>', code);
  }  

  fieldChg(field) {
    console.log('add more field ==>', field);
  }

  discountChg(discount) {
    console.log('discount ==>', discount);
  }

  featureChg(feature) {
    console.log('feature ==>', feature);
  }

  retailPriceChg(retail) {
    console.log('retail ==>', retail);
  }

  variantTaxChg(tax) {
    console.log('variant tax ==>', tax);
  }

  baseTaxChg(baseTax) {
    console.log('baseTax ==>', baseTax);
  }

  

}
