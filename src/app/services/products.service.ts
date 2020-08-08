import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    constructor(private http: HttpClient) {}
    
    async getProducts() {
        return this.http
            .get<any>(`${environment.apiURL}/products-list`)
            .pipe(
                map((p) => {
                    return p;
                })
            );
    }

    async addProducts(params) {
        return this.http
            .post<any>(`${environment.apiURL}/products-add`, params)
            .pipe(
                map((p) => {
                    return p;
                })
            );
    }

    async getProductDetails(id) {
        return this.http
        .get<any>(`${environment.apiURL}/products-details/${id}`)
        .pipe(
            map((p) => {
                return p;
            })
        );
    }

    async updateProductDetails(id) {
        return this.http
        .get<any>(`${environment.apiURL}/products-update/${id}`)
        .pipe(
            map((p) => {
                return p;
            })
        );
    }
}