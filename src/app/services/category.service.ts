import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  async getCategories() {
    return this.http.get<any>(`${environment.apiURL}/category-list`).pipe(
      map((p) => {
        return p;
      })
    );
  }

  async addCategory(data) {
    return this.http
      .post<any>(`${environment.apiURL}/category-add`, data)
      .pipe(
        map((p) => {
          console.log(p);
          return p;
        })
      );
  }
}
