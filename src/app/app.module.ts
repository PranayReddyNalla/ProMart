import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './NavBAR/navbar.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddcategoriesComponent } from './addcategories/addcategories.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort'
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    CategoriesComponent,
    AddcategoriesComponent,
    UserComponent,
   

    RegisterComponent,
     ModalpopupComponent,
     AddproductComponent,
     EditproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSortModule,
    MatCheckboxModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    
    
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    
    MatPaginatorModule,
      RouterModule.forRoot([

        {
          path:'register',
          component:RegisterComponent
        }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
  ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
