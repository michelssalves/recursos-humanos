import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://vhwin1065:9323/rest/protheus/12919786000124/v1/head-count-budget/';

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getMenus(
    codCusto: Array<any>,
    codDir: Array<any>,
    codArea: Array<any>,
    codDep: Array<any>,
    codFunc: Array<any>,
    dataIni: string | Date
  ): Observable<any> {
    const body = this.buildRequestBody(codCusto, codDir, codArea, codDep, codFunc, dataIni);

    this.loadingService.show(); // Ativa o preloader
    return this.http.post<any>(this.apiUrl, body, { headers: this.getHeaders() }).pipe(
      finalize(() => this.loadingService.hide()) // Desativa o preloader após a conclusão
    );
  }
}
