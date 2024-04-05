import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapInterface } from '../../models/map';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:4000/';
    this.myApiUrl = 'api/mapdata/';
  }
  getLocations(): Observable<MapInterface[]> {
    return this.http.get<MapInterface[]>(this.myAppUrl + this.myApiUrl + 'getLocations');
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveLocation(location: MapInterface): Observable<MapInterface> {
    return this.http.post<MapInterface>(`${this.myAppUrl}${this.myApiUrl}saveLocation`, location);
  }
}
