import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/products.service";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddLogoDialogComponent } from 'src/app/shared/add-logo/add.logo.component';
import { CategoryService } from 'src/app/services/category.service';
import { BrandsService } from 'src/app/services/brands.service';

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
  categories: any = [];
  brands: any = [];

  constructor(
    public PS: ProductService,
    public router: Router,
    public AR: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar, private CS: CategoryService, private BS: BrandsService
  ) {
    this.AR.params.subscribe((params) => {
      this.productId = params.id;
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.getCategoryList();
    this.getBrandsList();
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

  cancelAdd() {
    this.router.navigate([`/products/list`]);
  }
  
  async getCategoryList() {
    await (await this.CS.getCategories()).pipe(first()).subscribe(
      async (p) => {
        p.result.map(categories => {
          if(categories.name !== null) {
            this.categories.push(categories);
          }
        })
      },
      (error) => {}
    );
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
  

  patchEditValues(values: any) {
    console.log(values);
    this.editProductForm.get('productTitle').patchValue(values.productTitle);
    
    this.editProductForm.get('category').patchValue(values.category.id);
    this.editProductForm.get('shortDescription').patchValue(values.shortDescription);
    this.editProductForm.get('description').patchValue(values.description);
    this.editProductForm.get('brand').patchValue(values.brand.id);
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
    this.editProductForm.get('image2').patchValue(values.product_variances[0].cimage);

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
    this.inStockChecked = value;
    (this.inStockChecked == 'yes') ? this.isStockAvailable = true : this.isStockAvailable = false;
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

  async updateProduct(values) {
    console.log(values);
    console.log(this.inStockRadio)
    console.log(this.inStockChecked);
    console.log(values.stock);
    const formData = new FormData();
    formData.append('productTitle', values.productTitle);
    formData.append('published', 'yes');
    formData.append('isFeatured', this.featuresAvailableRadio);
    formData.append('visibilityinCatalog', this.isVisibilityChecked);
    formData.append('unitOption', '1');
    formData.append('image', this.editProductForm.get('image1').value);
    formData.append('shortDescription', values.shortDescription);
    formData.append('description', values.description);
    formData.append('salePriceStartsAt', values.salePriceStartsAt);
    formData.append('salePriceEndsAt', values.salePriceEndsAt);
    formData.append('inStock', this.inStockChecked);
    formData.append('stock', (this.inStockChecked.toLowerCase() == 'yes') ? values.stock : null);
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
    formData.append('productQuantity', values.quantity);
    formData.append('cimage', this.editProductForm.get('image2').value);
    formData.append('colorCode', values.colorCode);
    formData.append('addMoreFields', values.addMoreFields);
    formData.append('discountAvailable', this.discountAvailableRadio);
    formData.append('discount', values.discount);
    formData.append('categoryId', this.details.categoryId);
    formData.append('features', values.features);
    formData.append('variantRetailPrice', values.variantRetailPrice);
    formData.append('variantTaxPercent', values.variantTaxPercent);
    formData.append('baseTaxPercent', values.baseTaxPercent);
    formData.append('brandId', values.brand);
    formData.append('quantity', values.quantity);

    await (await this.productService.updateProductDetails(this.details.id, formData)).pipe(first()).subscribe(async data => {
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
