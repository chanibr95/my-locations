import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-foundation';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, flatMap } from 'rxjs/operators';
import { dbServicesClass } from '../../services/dbService';
import { Category } from '../../models/Category.model';
@Component({
    selector: 'category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    isNotValidate: boolean;
    @Input() modalRef: BsModalRef | undefined;
    @Input() category?: Category;

    constructor() {
        this.isNotValidate = true;
    }

    ngOnInit() {

    }



    close() {
        this.modalRef?.hide();
    }

}