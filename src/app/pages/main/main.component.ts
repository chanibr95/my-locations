import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Category } from '../../models/Category.model';
import { Location } from "../../models/Location.model";
import { BsModalRef, BsModalService } from 'ngx-foundation';
import { dbServicesClass } from '../../services/dbService';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    @ViewChild('addLocation') public addLocationModal?: TemplateRef<any>;
    @ViewChild('addCategory') public addCategoryModal?: TemplateRef<any>;
    @ViewChild('editLocation') public editLocationModal?: TemplateRef<any>;
    @ViewChild('editCategory') public editCategoryModal?: TemplateRef<any>;
    @ViewChild('showLocation') public showLocationModal?: TemplateRef<any>;
    @ViewChild('showCategory') public showCategoryModal?: TemplateRef<any>;
    modalRef: BsModalRef | undefined;
    locations?: Location[];
    categories?: Category[];
    locationIsSelected: boolean;
    selectedLocation?: Location;
    selectedCategory?: Category;
    constructor(
        private modal: BsModalService) {
        this.locationIsSelected = true;
    }

    ngOnInit() {
        this.getLocationsFromStorage();
        this.getCategoriesFromStorage();

    }
    public showCategories() {
        this.locationIsSelected = false;
        this.getCategoriesFromStorage()
    }
   public showLocations() {
        this.locationIsSelected = true;
        this.getLocationsFromStorage()
    }
    async getLocationsFromStorage() {
        this.locations = (await dbServicesClass.getCollection("locations").pipe().toPromise()) as Location[];

    }
    async getCategoriesFromStorage() {
        this.categories = (await dbServicesClass.getCollection("categories").pipe().toPromise()) as Category[];
    }
    edit() {
        this.modalRef?.hide();
        if (!!this.locationIsSelected) {
            this.modalRef?.hide();
            this.modalRef = this.modal.show(this.editLocationModal);
        } else {
            this.modalRef?.hide();
            this.modalRef = this.modal.show(this.editCategoryModal);
        }
    }
    async remove() {
        this.modalRef?.hide();
        if (!!this.locationIsSelected) {
            if (!!this.selectedLocation) {
                this.locations = await dbServicesClass.removeOne("locations", this.selectedLocation).pipe().toPromise();
            }
        } else if (!!this.selectedCategory) {
            this.categories = await dbServicesClass.removeOne("categories", this.selectedCategory).pipe().toPromise();
        }
    }
    add() {

        if (!!this.locationIsSelected) {
            this.modalRef?.hide();
            this.modalRef = this.modal.show(this.addLocationModal);
        } else {
            this.modalRef?.hide();
            this.modalRef = this.modal.show(this.addCategoryModal);
        }
    }
    view() {
        this.modalRef?.hide();
        if (!!this.locationIsSelected) {
            this.modalRef?.hide();
            this.modalRef = this.modal.show(this.showLocationModal);
        } else {
            this.modalRef?.hide();
            this.modalRef = this.modal.show(this.showCategoryModal);
        }
    }
    showTab(tab: number) { return true; }
    onSelectLocation(location: Location) {
        this.selectedLocation = location;
    }
    onSelectCategory(category: Category) {
        this.selectedCategory = category;
    }
}