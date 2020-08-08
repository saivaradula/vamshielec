import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/products.service";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddLogoDialogComponent } from 'src/app/shared/add-logo/add.logo.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProductComponent implements OnInit {

  editProductForm: FormGroup;
  productId = 0;
  loadershow = true;
  details: any;
  inStockChecked: string;
  isVisibilityChecked: string;
  visibilityInCatalogueRadio: string;
  allowCustomerReviewRadio: string;
  discountAvailableRadio: string;
  inStockRadio: string;
  featuresAvailableRadio: string;
  featuresText: string;

  isStockAvailable: boolean = false;
  isDiscountAvailable: boolean = false;
  isFeaturesAvailable: boolean = false;
  
  croppedImage1: any;
  croppedImage2: any;

  constructor(
    public PS: ProductService,
    public router: Router,
    public AR: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar
  ) {
    this.AR.params.subscribe((params) => {
      this.productId = params.id;
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.editProductForm = this.fb.group({
      productTitle: [],
      category: [],
      shortDescription: [],
      description: [],
      brand: [],
      regularPrice: [],
      salePrice: [],
      salePriceStartsAt: [],
      salePriceEndsAt: [],
      stock: [],
      tags: [],
      productSize: [],
      productLocation: [],
      productColor: [],
      length: [],
      weight: [],
      width: [],
      height: [],
      quantity: [],
      colorCode: [],
      addMoreFields: [],
      discount: [],
      features: [],
      variantRetailPrice: [],
      variantTaxPercent: [],
      baseTaxPercent: [],
      purchaseNote: [],
    })
  }

  async getProductDetails() {
    await (await this.PS.getProductDetails(this.productId)).pipe(first()).subscribe(
      async (p) => {
        console.log(p);
        this.loadershow = false;
        this.details = p.result[0];
        console.log(this.details);
        this.patchEditValues(this.details);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  patchEditValues(values: any) {
    this.editProductForm.get('productTitle').patchValue(values.productTitle);
    this.editProductForm.get('category').patchValue(values.category.name);
    this.editProductForm.get('shortDescription').patchValue(values.shortDescription);
    this.editProductForm.get('description').patchValue(values.description);
    this.editProductForm.get('brand').patchValue(values.brand.name);
    this.editProductForm.get('regularPrice').patchValue(values.reqularPrice);
    this.editProductForm.get('salePrice').patchValue(values.salePrice);
    this.editProductForm.get('salePriceStartsAt').patchValue(values.salePriceStartsAt);
    this.editProductForm.get('salePriceEndsAt').patchValue(values.salePriceEndsAt);
    this.editProductForm.get('stock').patchValue(values.stock);
    this.editProductForm.get('tags').patchValue(values.tags);
    this.editProductForm.get('productSize').patchValue(values.product_variances[0]['productSize']);
    this.editProductForm.get('productLocation').patchValue(values.productLocation);
    this.editProductForm.get('productColor').patchValue(values.product_variances[0]['productColor']);
    this.editProductForm.get('length').patchValue(values.product_variances[0]['length']);
    this.editProductForm.get('weight').patchValue(values.product_variances[0]['weight']);
    this.editProductForm.get('width').patchValue(values.product_variances[0]['width']);
    this.editProductForm.get('height').patchValue(values.product_variances[0]['height']);
    this.editProductForm.get('quantity').patchValue(values.quantity);
    this.editProductForm.get('colorCode').patchValue(values.product_variances[0]['colorCode']);
    this.editProductForm.get('addMoreFields').patchValue(values.product_variances[0]['addMoreFields']);
    this.editProductForm.get('discount').patchValue(values.product_variances[0]['discount']);
    this.editProductForm.get('features').patchValue(values.product_variances[0]['features']);
    this.editProductForm.get('variantRetailPrice').patchValue(values.product_variances[0]['variantRetailPrice']);
    this.editProductForm.get('variantTaxPercent').patchValue(values.product_variances[0]['variantTaxPercent']);
    this.editProductForm.get('baseTaxPercent').patchValue(values.baseTaxPercent);
    this.editProductForm.get('purchaseNote').patchValue(values.purchaseNote);
    this.croppedImage1 = values.image;
    this.croppedImage2 = values.cimage;
    this.inStockChecked = values.inStock;
    this.isVisibilityChecked = values.visibilityinCatalog;
    this.allowCustomerReviewRadio = values.allowCustomerReviews;
    this.featuresText = values.product_variances[0]['features'];
    
    if(values.product_variances[0]['discountAvailable']) {
      this.discountAvailableRadio = 'yes';
      this.isDiscountAvailable = true;
    } else {
      this.discountAvailableRadio = 'no';
      this.isDiscountAvailable = false;
    }

    if(values.isFeatured) {
      this.featuresAvailableRadio = 'yes';
      this.isFeaturesAvailable = true;
    } else {
      this.featuresAvailableRadio = 'no';
      this.isFeaturesAvailable = false;
    }

    console.log(this.inStockChecked)

    if(this.inStockChecked.toLowerCase() == 'yes') {
      this.isStockAvailable = true
    } else {
      this.isStockAvailable = false 
    }
    

  }

  inStock(value) {
    console.log(value);
    this.inStockRadio = value;
    (this.inStockRadio === 'yes') ? this.isStockAvailable = true : this.isStockAvailable = false;
  }

  visibilityInCatalogue(value) {
    console.log(value);
    this.isVisibilityChecked = value;
  }

  allowCustomerReview(value) {
    console.log(value);
    this.allowCustomerReviewRadio = value;
  }

  discountAvailable(value) {
    console.log(value);
    this.discountAvailableRadio = value;
    (this.discountAvailableRadio === 'yes') ? this.isDiscountAvailable = true : this.isDiscountAvailable = false;
  }

  featuresAvailable(value) {
    console.log(value);
    this.featuresAvailableRadio = value;
    (this.featuresAvailableRadio === 'yes') ? this.isFeaturesAvailable = true : this.isFeaturesAvailable = false;
  }

  updateProduct(values) {
    console.log(values);
    //console.log(this.editProductForm.value);
    let addProductParams = {
      productTitle: values.productTitle,
      published: '',
      isFeatured: this.featuresAvailableRadio,
      visibilityinCatalog: this.visibilityInCatalogueRadio,
      unitOption: '',
      image: this.croppedImage1,
      shortDescription: values.shortDescription,
      description: values.description,
      salePriceStartsAt: values.salePriceStartsAt,
      salePriceEndsAt: values.salePriceEndsAt,
      inStock: this.inStockRadio || this.inStockChecked,
      stock: (this.inStockRadio == 'yes' || this.inStockChecked == 'yes') ? values.stock : null,
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
      productQuantity: values.quantity,
      cimage: this.croppedImage2,
      colorCode: values.colorCode,
      addMoreFields: values.addMoreFields,
      discountAvailable: this.discountAvailableRadio,
      discount: values.discount,
      categoryId: this.details.category.id,
      features: values.features,
      variantRetailPrice: values.variantRetailPrice,
      variantTaxPercent: values.variantTaxPercent,
      baseTaxPercent: values.baseTaxPercent,
      brandId: this.details.brand.id,
      quantity: values.quantity
    }
    console.log(addProductParams)

  }

  /* async addProductApi(params) {
    await (await this.productService.updateProductDetails(params)).pipe(first()).subscribe(async data => {
      console.log(data)
    })
  } */

  deleteImage1() {
    this.croppedImage1 = null;
  }

  deleteImage2() {
    this.croppedImage2 = null;
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
