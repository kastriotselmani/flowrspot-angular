import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlowersService {

  constructor(private httpClient: HttpClient) { }

  getFlowers(page: number) : Observable<any> {
    const path = environment.apiUrl + `flowers?page=${page}`;
    return this.httpClient.get<any>(path);
  }

  postFavoriteFlower(flowerId: number) : Observable<any> {
    const path = environment.apiUrl + `flowers/${flowerId}/favorites`;
    return this.httpClient.post<any>(path, {});
  }

  deleteFavoriteFlower(id:number, flowerId: number) : Observable<any> {
    const path = environment.apiUrl + `flowers/${flowerId}/favorites/${id}`;
    return this.httpClient.delete<any>(path, {});
  }

}
