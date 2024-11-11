import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://vhwin1065:9323/rest/zWSDashRh';

  constructor(private http: HttpClient) { }

  getCustos(custo: string): Observable<any> {
    const url = `${this.apiUrl}/get_custo?custo=${custo}`;
    return this.http.get<any>(url);
  }
  getDiretores(codDir: string, codArea: string, codDep: string): Observable<any> {
    const url = `${this.apiUrl}/get_diretores?codDir=${codDir}&codArea=${codArea}&codDep=${codDep}`;
    return this.http.get<any>(url);
  }
  getAreas(codDir: string, codArea: string, codDep: string): Observable<any> {
    const url = `${this.apiUrl}/get_areas?codDir=${codDir}&codArea=${codArea}&codDep=${codDep}`;
    return this.http.get<any>(url);
  }
  getDeptos(codDir: string, codArea: string, codDep: string): Observable<any> {
    const url = `${this.apiUrl}/get_depto?codDir=${codDir}&codArea=${codArea}&codDep=${codDep}`;
    return this.http.get<any>(url);
  }

  getDpdto(custo: string, departamento: string, cargo: string): Observable<any> {
    const url = `${this.apiUrl}/get_departamento?custo=${custo}&departamento=${departamento}&cargo=${cargo}`;
    return this.http.get<any>(url);
  }
  getCargos(custo: string, departamento: string, cargo: string): Observable<any> {
    const url = `${this.apiUrl}/get_cargo?custo=${custo}&departamento=${departamento}&cargo=${cargo}`;
    return this.http.get<any>(url);
  }

  getTable(codDir: string, codArea: string, codDep: string, dataIni: string | Date, custo: string): Observable<any> {
    const url = `${this.apiUrl}/get_table?codDir=${codDir}&codArea=${codArea}&codDep=${codDep}&dataIni=${dataIni}&custo=${custo}`;
    return this.http.get<any>(url);
  }

}
