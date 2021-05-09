import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-foundation';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, flatMap } from 'rxjs/operators';
import { dbServicesClass } from '../../services/dbService';
import { Category } from '../../models/Category.model';
@Component({
    selector: 'add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
    category: Category;
    isNotValidate: boolean;
    @Input() modalRef: BsModalRef | undefined;
    constructor() {
        this.category = new Category();
        this.isNotValidate = true;
    }

    ngOnInit() {

    }


    public async add(): Promise<any> {
        debugger
        if (!!this.category && !!this.category.Name) {
            await dbServicesClass.add("categories", this.category).pipe().toPromise();
            this.close();
        } else {
            this.isNotValidate = true;
        }

    }

    close() {
        this.modalRef?.hide();
    }

}