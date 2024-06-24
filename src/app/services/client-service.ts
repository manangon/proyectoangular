import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../interfaces/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl: string;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://epico.gob.ec/vehiculo/public/api';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
  }

  newClient(client: Client) {
    return this.http.post<any>(this.baseUrl + '/cliente/', client, this.httpOptions);
  }
}