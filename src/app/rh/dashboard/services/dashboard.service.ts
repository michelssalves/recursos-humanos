import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://vhwin1065:9323/rest/zWSDashRh'; // Substitua com a URL correta do seu serviço

  constructor(private http: HttpClient) { }

  // Método genérico para construir o corpo da requisição
  private buildRequestBody(
    codCusto: Array<any>,
    codDir: Array<any>,
    codArea: Array<any>,
    codDep: Array<any>,
    codFunc: Array<any>,
    dataIni?: string | Date
  ): any {
    return {
      codCusto: codCusto || '',
      codDir: codDir || '',
      codArea: codArea || '',
      codDep: codDep || '',
      codFunc: codFunc || '',
      dataIni: dataIni || ''
    };
  }

  // Headers padrão
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // POST para custos
  postCustos(codCusto: Array<any>, codDir: Array<any>, codArea: Array<any>, codDep: Array<any>, codFunc: Array<any>): Observable<any> {
    const url = `${this.apiUrl}/get_custo`;
    const body = this.buildRequestBody(codCusto, codDir, codArea, codDep, codFunc);
    return this.http.post<any>(url, body, { headers: this.getHeaders() });
  }

  // POST para diretores
  postDiretores(codCusto: Array<any>, codDir: Array<any>, codArea: Array<any>, codDep: Array<any>, codFunc: Array<any>): Observable<any> {
    const url = `${this.apiUrl}/get_diretores`;
    const body = this.buildRequestBody(codCusto, codDir, codArea, codDep, codFunc);
    return this.http.post<any>(url, body, { headers: this.getHeaders() });
  }

  // POST para áreas
  postAreas(codCusto: Array<any>, codDir: Array<any>, codArea: Array<any>, codDep: Array<any>, codFunc: Array<any>): Observable<any> {
    const url = `${this.apiUrl}/get_areas`;
    const body = this.buildRequestBody(codCusto, codDir, codArea, codDep, codFunc);
    return this.http.post<any>(url, body, { headers: this.getHeaders() });
  }

  // POST para departamentos
  postDeptos(codCusto: Array<any>, codDir: Array<any>, codArea: Array<any>, codDep: Array<any>, codFunc: Array<any>): Observable<any> {
    const url = `${this.apiUrl}/get_depto`;
    const body = this.buildRequestBody(codCusto, codDir, codArea, codDep, codFunc);
    return this.http.post<any>(url, body, { headers: this.getHeaders() });
  }

  // POST para funções
  postFuncoes(codCusto: Array<any>, codDir: Array<any>, codArea: Array<any>, codDep: Array<any>, codFunc: Array<any>): Observable<any> {
    const url = `${this.apiUrl}/get_funcoes`;
    const body = this.buildRequestBody(codCusto, codDir, codArea, codDep, codFunc);
    return this.http.post<any>(url, body, { headers: this.getHeaders() });
  }

  // POST para tabela
  postTable(codCusto: Array<any>, codDir: Array<any>, codArea: Array<any>, codDep: Array<any>, codFunc: Array<any>, dataIni: string | Date): Observable<any> {
    const url = `${this.apiUrl}/get_table`;
    const body = this.buildRequestBody(codCusto, codDir, codArea, codDep, codFunc, dataIni);
    return this.http.post<any>(url, body, { headers: this.getHeaders() });
  }
}
