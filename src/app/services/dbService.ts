import { Observable } from "rxjs";
import { BaseModel } from "../models/base.model";

class DbServicesClass {
    public add(collectionName: string, item: { Name?: any; }): Observable<any> {
        return new Observable<any>((observer) => {
            let data = localStorage.getItem(collectionName);
            if (!!data) {
                let collection = JSON.parse(data);
                let doc = collection.find((doc: BaseModel) => doc.Name === item.Name);
                if (!!doc) {
                    collection = this.findOneAndUpdate(collectionName, doc, item).pipe().toPromise();
                }
                else {
                    collection.push(item)
                    localStorage.setItem(collectionName, JSON.stringify(collection));
                }
                observer.next(collection);
                observer.complete();

            }
            else {
                observer.next(null);
                observer.complete();
            }
        })
    }
    findOne() { }
    public findOneAndUpdate(collectionName: string, item: BaseModel, newItem: {}): Observable<any> {
        return new Observable<any>((observer) => {
            let data = localStorage.getItem(collectionName);
            if (!!data) {
                let collection = JSON.parse(data);
                let editedCollection = collection.filter((doc: BaseModel) => {
                    return (doc.Name !== item.Name);
                })
                editedCollection.push(newItem)
                localStorage.setItem(collectionName, JSON.stringify(editedCollection));

                observer.next(newItem);
                observer.complete();
            }
            else {
                observer.next(null);
                observer.complete();
            }
        })
    }
    public removeOne(collectionName: string, item: BaseModel): Observable<any> {
        return new Observable<any>((observer) => {
            let data = localStorage.getItem(collectionName);
            if (!!data) {
                let collection = JSON.parse(data);
                let newCollection = collection.filter((doc: BaseModel) => {
                    return (doc.Name !== item.Name);
                })
                localStorage.setItem(collectionName, JSON.stringify(newCollection));
                observer.next(newCollection);
                observer.complete();
            }
            else {
                observer.next(null);
                observer.complete();
            }
        })

    }

    public getCollection(collectionName: string): Observable<any> {
        return new Observable<any>((observer) => {
            let data = localStorage.getItem(collectionName);
            if (!!data) {
                let collection = JSON.parse(data);

                observer.next(collection);
                observer.complete();
            }
            else {
                observer.next(null);
                observer.complete();
            }
        })

    }
}

export const dbServicesClass = new DbServicesClass();