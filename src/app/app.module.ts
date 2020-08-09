import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartsModule } from "ng2-charts";

import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { LoginComponent } from "./login/login.component";

import { AddComponent } from './products/add/add.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ImageCropperModule } from 'ngx-image-cropper';

import { ListComponent } from "./products/list/list.component";
import { BrandlistComponent } from "./brands/brandlist/brandlist.component";
import { BrandaddComponent } from "./brands/brandadd/brandadd.component";

import { CategoryListComponent } from "./category/list/list.component";
import { AddCategoryComponent } from "./category/add/add.component";
import { AddLogoDialogComponent } from "./shared/add-logo/add.logo.component";
import { UserslistComponent } from "./users/userslist/userslist.component";
import { AddusersComponent } from "./users/addusers/addusers.component";
import { UserdetailsComponent } from "./users/userdetails/userdetails.component";
import { ProductDetailsComponent } from "./products/details/details.component";
import { OrderlistComponent } from './users/orderlist/orderlist.component';
import { EditProductComponent } from './products/edit/edit.component';
import { BrandseditComponent } from './brands/brandsedit/brandsedit.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    SpinnerComponent,
    LoginComponent,
    ListComponent,
    BrandlistComponent,
    BrandaddComponent,
    CategoryListComponent,
    AddCategoryComponent,
    AddLogoDialogComponent,
    UserslistComponent,
    AddusersComponent,
    UserdetailsComponent,
    ProductDetailsComponent,
    AddComponent,
    OrderlistComponent,
    EditProductComponent,
    BrandseditComponent,
    EditcategoryComponent
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    MatTableModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSnackBarModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
