import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sensor {
  id: number;
  name: string;
  value: number;
  unit: string;
}

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private apiUrl = 'http://localhost:3000/sensors';

  constructor(private http: HttpClient) {}

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.apiUrl);
  }
}
