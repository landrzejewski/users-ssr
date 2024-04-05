import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SortConfig} from "./sort-config.type";
import {Observable} from "rxjs";
import {User} from "./user.type";

@Injectable({
  providedIn: 'root'
})
export default class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  getUsers(sortConfig: SortConfig, nameQuery: string): Observable<User[]> {
    const url = `http://localhost:3000/users?_sort=${sortConfig.column}&_order=${sortConfig.order}&name_like=${nameQuery}`;
    return this.httpClient.get<User[]>(url);
  }

}
