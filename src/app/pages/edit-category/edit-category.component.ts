import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-foundation';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, flatMap } from 'rxjs/operators';
import { dbServicesClass } from '../../services/dbService';
import { Category } from '../../models/Category.model';
import { Location } from "../../models/Location.model";
@Component({
    selector: 'edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
    isNotValidate: boolean;
    category: Category;
    @Input() modalRef: BsModalRef | undefined;
    @Input() oldCategory?: Category;
    @Output() onEdit = new EventEmitter();
    constructor() {
        this.category = new Category();
        this.isNotValidate = true;
        debugger

    }

    ngOnInit() {
        this.category = new Category();
        if (!!this.oldCategory) {
            this.category.Name = this.oldCategory.Name;
        }
    }


    public async edit(): Promise<any> {
        debugger
        if (!!this.oldCategory&&!!this.category.Name) {
           await dbServicesClass.findOneAndUpdate("categories",this.oldCategory,this.category).pipe().toPromise()
           
            this.close();
        } else {
            this.isNotValidate = true;

        }

    }

    close() {
        this.modalRef?.hide();
    }

}