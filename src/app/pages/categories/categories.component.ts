import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { dbServicesClass } from '../../services/dbService';
import { Category } from '../../models/Category.model';
import { Location } from "../../models/Location.model";
@Component({
    selector: 'categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    categories?: Category[];
    selectedCategory?: Category;
    @Output() onSelectCategory = new EventEmitter();
    constructor() {

    }

    ngOnInit() {
        this.getCategoriesFromStorage();
    }


   async getCategoriesFromStorage() {
        this.categories = (await dbServicesClass.getCollection("categories").pipe().toPromise()) as Category[];
    }

    onSelect(category: Category) {
        debugger
        this.selectedCategory = category;
        this.onSelectCategory.emit(this.selectedCategory);
    }
}