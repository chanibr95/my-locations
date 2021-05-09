import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { BsModalService, ModalModule } from 'ngx-foundation';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditLocationComponent } from './pages/edit-location/edit-location.component';
import { LocationComponent } from './pages/location/location.component';
import { CategoryComponent } from './pages/category/category.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CategoriesComponent,
    LocationsComponent,
    AddLocationComponent,
    AddCategoryComponent,
    EditLocationComponent,
    EditCategoryComponent,
    LocationComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,

    ModalModule.forRoot()
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
