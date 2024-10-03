import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoesService {

  private apiUrl = 'http://vhwin1065:9023/rest/zWSMedicoes/get_all/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    console.log(this.http.get<any>(this.apiUrl))
    return this.http.get<any>(this.apiUrl);
  } 
  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
