import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarInterface } from '../../models/calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:4000/';
    this.myApiUrl = 'api/calendar/';
  }

  getListDates(): Observable<CalendarInterface[]> {
    return this.http.get<CalendarInterface[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteDate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveDate(date: CalendarInterface): Observable<CalendarInterface> {
    return this.http.post<CalendarInterface>(`${this.myAppUrl}${this.myApiUrl}`, date);
  }
}
