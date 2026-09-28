import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CustomerCategory } from '../classes/iCustomer';

@Injectable({
    providedIn: 'root'
})
export class CustomerHttpService {
    private _url: string = 'assets/data/customers.json';
    constructor(private http: HttpClient) { }
    getCustomerCategories(): Observable<CustomerCategory[]>
    {
        return this.http.get<CustomerCategory[]>(this._url);

    }
}