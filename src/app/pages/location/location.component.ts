import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-foundation';
import { Location } from "../../models/Location.model";
@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
    @Input() modalRef: BsModalRef | undefined;
    @Input() location?: Location;
    constructor() {
    }

    ngOnInit() {
    }


    close() {
        this.modalRef?.hide();
    }

    map() { }

}