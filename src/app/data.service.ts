import { HttpClient } from '@angular/common/http';
import { Injectable,  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  fetchData = (url: string) => this.httpClient.get(url)
  
}
