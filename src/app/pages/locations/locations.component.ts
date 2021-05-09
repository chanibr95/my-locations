import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { dbServicesClass } from '../../services/dbService';
import { Category } from '../../models/Category.model';
import { Location } from "../../models/Location.model";
@Component({
    selector: 'locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

    locations?: Location[];
    categories: any;
    selectedLocation?: Location;
    isGrouped: boolean;
    @Output() onSelectLocation = new EventEmitter();
    constructor() {
        this.isGrouped = false;
        this.categories = [];
    }

    ngOnInit() {
        this.getLocationsFromStorage();

    }

    async getLocationsFromStorage() {
        this.locations = (await dbServicesClass.getCollection("locations").pipe().toPromise()) as Location[];
    }
    onSelect(location: Location) {
        this.selectedLocation = location;
        this.onSelectLocation.emit(this.selectedLocation);
    }
    public Sort() {
        this.locations?.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0))
    }
    public Group() {
        this.isGrouped = true;
        this.categories = [];
        this.locations?.forEach((loc) => {
            let category = this.categories.find((cat: any) => cat.name === loc.Category.Name)
            if (!category) {
                category = { name: loc.Category.Name, locations: [loc] };
                this.categories.push(category);
            }
            else {
                category.locations.push(loc);
            }

        });
    }
    public Ungroup() {
        this.isGrouped = false;
    }
}