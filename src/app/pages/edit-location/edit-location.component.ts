import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-foundation';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, flatMap } from 'rxjs/operators';
import { dbServicesClass } from '../../services/dbService';
import { Category } from '../../models/Category.model';
import { Location } from "../../models/Location.model";
@Component({
    selector: 'edit-location',
    templateUrl: './edit-location.component.html',
    styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
    categories: Category[];
    isNotValidate?: boolean;
    location: Location;
    selectedCategory?: string;
    @Input() modalRef: BsModalRef | undefined;
    @Input() oldLocation?: Location;
    constructor() {
        this.categories = [];
        this.location = new Location();
    }

    ngOnInit() {
        this.isNotValidate = true;
        if (!!this.oldLocation) {
            this.location.Name = this.oldLocation.Name;
            this.location.Address = this.oldLocation.Address;
            this.location.Coordinates.x = this.oldLocation.Coordinates.x;
            this.location.Coordinates.y = this.oldLocation.Coordinates.y;
            this.location.Category.Name = this.oldLocation.Category.Name
            this.selectedCategory = this.location.Category.Name;
        }
        this.getCategories();
    }

    async getCategories() {
        debugger

        this.categories = (await dbServicesClass.getCollection("categories").pipe().toPromise()) as Category[];

    }
    public async edit(): Promise<any> {
        debugger
        if (!!this.oldLocation && !!this.location && !!this.location.Name && !!this.location.Address
            && !!this.location.Category
            && !!this.location.Category.Name
            && !!this.location.Coordinates
            && !!this.location.Coordinates.x
            && !!this.location.Coordinates.y) {
            await dbServicesClass.findOneAndUpdate("locations", this.oldLocation, this.location).pipe().toPromise();

            this.close();
        } else {
            this.isNotValidate = true;

        }

    }
    categorySelected(category: Category): void {
        if (!!this.location) { this.location.Category = category; }
    }

    close() {
        this.modalRef?.hide();
    }

}