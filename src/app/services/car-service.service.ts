import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/car';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl: string;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://epico.gob.ec/vehiculo/public/api';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
  }

  getListCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl + '/vehiculos/').pipe(
      map((resp: any) => resp.data)
    );
  }

  getCarByCode(code: string): Observable<Car> {
    return this.http.get<Car>(this.baseUrl + '/vehiculo/' + code).pipe(
      map((resp: any) => resp.data)
    );
  }

  deleteCarByCode(code: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/vehiculo/' + code);
  }

  updateCar(car: Car, code: string) {
    return this.http.put<any>(this.baseUrl + '/vehiculo/' + code, car, this.httpOptions);
  }

  newCar(car: Car) {
    return this.http.post<any>(this.baseUrl + '/vehiculo/', car, this.httpOptions);
  }
}