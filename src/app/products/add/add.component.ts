import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/products.service';
import { first } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddLogoDialogComponent } from 'src/app/shared/add-logo/add.logo.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addProductForm: FormGroup;
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

  constructor(private fb: FormBuilder, private productService: ProductService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

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
      productSize: ['Select Size'],
      productLocation: ['Select Location'],
      productColor: ['Select Color'],
      length: ['Select Length'],
      weight: ['Select Weight'],
      width: ['Select Width'],
      height: ['Select Height'],
      productQuantity: ['Select Quantity'],
      colorCode: ['Select Color Code'],
      addMoreFields: ['Select Field'],
      discount: ['Select Discount'],
      features: ['Select Feature'],
      variantRetailPrice: ['Select Price'],
      variantTaxPercent: ['Select Price'],
      baseTaxPercent: ['Select Base Tax Percent'],
      purchaseNote: []
    })
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

  addProduct(values) {
    console.log(values);
    console.log('add product !!');
    console.log('this.inStockRadio', this.inStockRadio);
    console.log('this.visibilityInCatalogueRadio', this.visibilityInCatalogueRadio);
    console.log('this.allowCustomerReviewRadio', this.allowCustomerReviewRadio);
    console.log('this.discountAvailableRadio', this.discountAvailableRadio);
    console.log('this.featuresAvailableRadio', this.featuresAvailableRadio);

    let addProductParams = {
      productTitle: values.productTitle,
      published: '',
      isFeatured: this.featuresAvailableRadio,
      visibilityinCatalog: this.visibilityInCatalogueRadio,
      unitOption: '',
      image: 'c:/image.jpg',
      shortDescription: values.shortDescription,
      description: values.description,
      salePriceStartsAt: values.salePriceStartsAt,
      salePriceEndsAt: values.salePriceEndsAt,
      inStock: this.inStockRadio,
      stock: values.stock,
      allowCustomerReviews: this.allowCustomerReviewRadio,
      purchaseNote: values.purchaseNote,
      salePrice: values.salePrice,
      regularPrice: values.regularPrice,
      tags: values.tags,
      productLocation: values.productLocation,
      isActive: '',
      optionTypeId: '',
      optionValueId: '',
      userId: '',
      productColor: values.productColor,
      productSize: values.productSize,
      weight: values.weight,
      length: values.length,
      width: values.width,
      height: values.height,
      productQuantity: values.productQuantity,
      cimage: 'c:/image.jpg',
      colorCode: values.colorCode,
      addMoreFields: values.addMoreFields,
      discountAvailable: this.discountAvailableRadio,
      discount: values.discount,
      categoryId: values.categoryId,
      features: values.features,
      variantRetailPrice: values.variantRetailPrice,
      variantTaxPercent: values.variantTaxPercent,
      baseTaxPercent: values.baseTaxPercent,
      brandId: values.brandId,
      quantity: values.productQuantity
    }
    console.log(addProductParams)
    this.addProductApi(addProductParams);

  }

  async addProductApi(params) {
    await (await this.productService.addProducts(params)).pipe(first()).subscribe(async data => {
      console.log(data)
    })
  }

  deleteImage() {
    this.croppedImage1 = null;
  }

  handleFileSelect1(e) {
    console.log('1');
    this.openLogoDialog1(e);
  }

  handleFileSelect2(e) {
    console.log('2');
    this.openLogoDialog2(e);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openLogoDialog1(e) {
    let dialogRef = this.dialog.open(AddLogoDialogComponent, {
      height: "auto",
      width: "40%",
      disableClose: true,
    });
    dialogRef.componentInstance.event = e;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "save") {
        this.croppedImage1 = dialogRef.componentInstance.croppedImage;
        console.log("Image got:" + this.croppedImage1);
      }
    });
  }

  openLogoDialog2(e) {
    let dialogRef = this.dialog.open(AddLogoDialogComponent, {
      height: "auto",
      width: "40%",
      disableClose: true,
    });
    dialogRef.componentInstance.event = e;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "save") {
        this.croppedImage2 = dialogRef.componentInstance.croppedImage;
        console.log("Image got:" + this.croppedImage2);
      }
    });
  }

}