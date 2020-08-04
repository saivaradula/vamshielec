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
}