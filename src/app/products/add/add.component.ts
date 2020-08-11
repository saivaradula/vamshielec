import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/products.service';
import { first } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddLogoDialogComponent } from 'src/app/shared/add-logo/add.logo.component';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addProductForm: FormGroup;
  categories: any = [];
  brands: any = [];
  productSize = [2, 3, 4, 5, 6];
  productLocation = ['Hyderabad', 'Mumbai', 'Pune'];
  productColor = ['Red', 'White', 'Blue', 'Black'];
  productLength = [24, 30, 36, 40, 46];
  productWeight = ['1', '2'];
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

  isStockAvailable: boolean = false;
  isDiscountAvailable: boolean = false;
  isFeaturesAvailable: boolean = false;

  inStockRadio: string;
  visibilityInCatalogueRadio: string;
  allowCustomerReviewRadio: string;
  discountAvailableRadio: string;
  featuresAvailableRadio: string;
  croppedImage1: any;
  croppedImage2: any;

  constructor(private fb: FormBuilder, private productService: ProductService, public dialog: MatDialog, private _snackBar: MatSnackBar, private BS: BrandsService, private CS: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productTitle: [],
      categoryId: ['Select Category'],
      shortDescription: [],
      description: [],
      brandId: ['Select Brand'],
      regularPrice: [],
      salePrice: [],
      salePriceStartsAt: [],
      salePriceEndsAt: [],
      stock: [],
      tags: [],
      productSize: [],
      productLocation: [''],
      productColor: [''],
      length: [''],
      weight: [''],
      width: [''],
      height: [''],
      productQuantity: [''],
      colorCode: [''],
      addMoreFields: [''],
      discount: [''],
      features: [''],
      variantRetailPrice: [''],
      variantTaxPercent: [''],
      baseTaxPercent: [''],
      purchaseNote: [],
      image1: [],
      image2: []
    })
    this.getBrandsList();
    this.getCategoryList();
  }

  async getBrandsList() {
    await (await this.BS.getBrands()).pipe(first()).subscribe(
      async (p) => {
        console.log(p.result);
        p.result.map(brand => {
          if(brand.name !== null) {
            this.brands.push(brand);
          }
        })
        console.log(this.brands);
      },
      (error) => {}
    );
  }

  async getCategoryList() {
    await (await this.CS.getCategories()).pipe(first()).subscribe(
      async (p) => {
        p.result.map(categories => {
          if(categories.name !== null) {
            this.categories.push(categories);
          }
        })
        console.log(this.categories);
      },
      (error) => {}
    );
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

  inStock(value) {
    console.log(value);
    this.inStockRadio = value;
    (this.inStockRadio === 'Yes') ? this.isStockAvailable = true : this.isStockAvailable = false;
  }

  visibilityInCatalogue(value) {
    console.log(value);
    this.visibilityInCatalogueRadio = value;
  }

  allowCustomerReview(value) {
    console.log(value);
    this.allowCustomerReviewRadio = value;
  }

  discountAvailable(value) {
    console.log(value);
    this.discountAvailableRadio = value;
    (this.discountAvailableRadio === 'Yes') ? this.isDiscountAvailable = true : this.isDiscountAvailable = false;
  }

  featuresAvailable(value) {
    console.log(value);
    this.featuresAvailableRadio = value;
    (this.featuresAvailableRadio === 'Yes') ? this.isFeaturesAvailable = true : this.isFeaturesAvailable = false;
  }

  cancelAdd() {
    this.router.navigate([`/products/list`]);
  }

  addProduct(values) {
    console.log(values);

    const formData = new FormData();
    formData.append('productTitle', values.productTitle);
    formData.append('published', '');
    formData.append('isFeatured', this.featuresAvailableRadio);
    formData.append('visibilityinCatalog', this.visibilityInCatalogueRadio);
    formData.append('unitOption', '');
    formData.append('image', this.addProductForm.get('image1').value);
    formData.append('shortDescription', values.shortDescription);
    formData.append('description', values.description);
    formData.append('salePriceStartsAt', values.salePriceStartsAt);
    formData.append('salePriceEndsAt', values.salePriceEndsAt);
    formData.append('inStock', this.inStockRadio);
    formData.append('stock', values.stock);
    formData.append('allowCustomerReviews', this.allowCustomerReviewRadio);
    formData.append('purchaseNote', values.purchaseNote);
    formData.append('salePrice', values.salePrice);
    formData.append('regularPrice', values.regularPrice);
    formData.append('tags', values.tags);
    formData.append('productLocation', values.productLocation);
    formData.append('isActive', 'true');
    formData.append('optionTypeId', '1');
    formData.append('optionValueId', '1');
    formData.append('userId', '1');
    formData.append('productColor', values.productColor);
    formData.append('productSize', values.productSize);
    formData.append('weight', values.weight);
    formData.append('length', values.length);
    formData.append('width', values.width);
    formData.append('height', values.height);
    formData.append('productQuantity', values.productQuantity);
    formData.append('cimage', this.addProductForm.get('image2').value);
    formData.append('colorCode', values.colorCode);
    formData.append('addMoreFields', values.addMoreFields);
    formData.append('discountAvailable', values.discountAvailableRadio);
    formData.append('discount', values.discount);
    formData.append('categoryId', values.categoryId);
    formData.append('features', values.features);
    formData.append('variantRetailPrice', values.variantRetailPrice);
    formData.append('variantTaxPercent', values.variantTaxPercent);
    formData.append('baseTaxPercent', values.baseTaxPercent);
    formData.append('brandId', values.brandId);
    formData.append('quantity', values.productQuantity);

    console.log(formData)
    
    this.addProductApi(formData);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  async addProductApi(params) {
    console.log(params);
    await (await this.productService.addProducts(params)).pipe(first()).subscribe(async data => {
      console.log(data)
      if(data.success) {
        this.openSnackBar(data.message, "");
        this.router.navigate([`/products/list`]);
      } else {
        this.openSnackBar(data.message, "");
      }
    })
  }

  onFileSelect(event, value) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(value == 1) {
        this.addProductForm.patchValue({ image1: file });
      } 

      if(value == 2) {
        this.addProductForm.patchValue({ image2: file });
      }
      
    }
  }

}