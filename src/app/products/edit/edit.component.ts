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
      image1: [],
      image2:[]
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
    console.log(values);
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
    this.editProductForm.get('image1').patchValue(values.image);
    this.editProductForm.get('image2').patchValue(values.cimage);

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
    /* let addProductParams = {
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
    } */
    //console.log(addProductParams)

    const formData = new FormData();
    formData.append('productTitle', values.productTitle);
    formData.append('published', '');
    formData.append('isFeatured', this.featuresAvailableRadio);
    formData.append('visibilityinCatalog', this.visibilityInCatalogueRadio);
    formData.append('unitOption', '');
    formData.append('image', this.editProductForm.get('image1').value);
    formData.append('shortDescription', values.shortDescription);
    formData.append('description', values.description);
    formData.append('salePriceStartsAt', values.salePriceStartsAt);
    formData.append('salePriceEndsAt', values.salePriceEndsAt);
    formData.append('inStock', this.inStockRadio || this.inStockChecked,);
    formData.append('stock', (this.inStockRadio == 'yes' || this.inStockChecked == 'yes') ? values.stock : null);
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
    formData.append('cimage', this.editProductForm.get('image2').value);
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

    this.editProductApi(this.details.id, formData);

  }

  async editProductApi(id, params) {
    await (await this.productService.updateProductDetails(id, params)).pipe(first()).subscribe(async data => {
      console.log(data)
    })
  }

  onFileSelect(event, value) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(value == 1) {
        this.editProductForm.patchValue({ image1: file });
      } 

      if(value == 2) {
        this.editProductForm.patchValue({ image2: file });
      }
      
    }
  }

}
