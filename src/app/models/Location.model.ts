import { BaseModel } from "./base.model";
import { Category } from "./Category.model"
export class Location extends BaseModel {
    
    Address: string;
    Coordinates: { x: number, y: number };
    Category: Category;

    /**
     *
     */
    constructor() {
        super();
        this.Address = "";
        this.Coordinates = { x: 0, y: 0 };
        this.Category = { Name: "" };

    }

}