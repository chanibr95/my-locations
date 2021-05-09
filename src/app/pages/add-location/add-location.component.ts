import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-foundation';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, flatMap } from 'rxjs/operators';
import { dbServicesClass } from '../../services/dbService';
import { Category } from '../../models/Category.model';
import { Location } from "../../models/Location.model";
@Component({
    selector: 'add-location',
    templateUrl: './add-location.component.html',
    styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
    location: Location;
    categories: Category[];
    isNotValidate: boolean;
    @Input() modalRef: BsModalRef | undefined;
    constructor() {
        this.location = new Location();
        this.categories = [];
        this.isNotValidate = true;
        this.getCategories();
    }

    ngOnInit() {
        this.location = new Location();
    }

    async getCategories() {
        debugger
        this.categories = (await dbServicesClass.getCollection("categories").pipe().toPromise()) as Category[];

    }
    public async add(): Promise<any> {
        if (!!this.location.Name && !!this.location.Address
            && !!this.location.Category
            && !!this.location.Category.Name
            && !!this.location.Coordinates
            && !!this.location.Coordinates.x
            && !!this.location.Coordinates.y) {
           await dbServicesClass.add("locations", this.location).pipe().toPromise();
            this.close();
        } else {
            this.isNotValidate = true;

        }

    }
    categorySelected(category: Category): void {
        this.location.Category = category;
    }

    close() {
        this.modalRef?.hide();
    }

}