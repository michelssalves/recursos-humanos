import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PoTableColumn, PoTableColumnSort, PoTableColumnSortType, PoTableDetail } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = 'http://vhwin1065:9023/rest/zWSPedidos/';

  constructor(public http: HttpClient) {}

  downloadCsv(endpoint: any) {
    this.http.get(endpoint).subscribe((data: any) => {
      const csvStr = this.parseJsonToCsv(data['items']);
      const dataUri = 'data:text/csv;charset=utf-8,' + csvStr;

      const exportFileDefaultName = 'data.csv';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    });
  }

  parseJsonToCsv(jsonData = []) {
    if (!jsonData.length) {
      return '';
    }

    const keys = Object.keys(jsonData[0]);
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const csvColumnHeader = keys.join(columnDelimiter);

    const csvStr = jsonData.reduce((accCsvStr, currentItem) => {
      keys.forEach((key, index) => {
        if (index && index < keys.length - 1) {
          accCsvStr += columnDelimiter;
        }

        accCsvStr += currentItem[key];
      });

      return accCsvStr + lineDelimiter;
    }, csvColumnHeader + lineDelimiter);

    return encodeURIComponent(csvStr);
  }
  getFornecedorDetails(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get_fornecedor_details?codigo=${codigo}`);
  }
  getProdutoDetails(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get_produto_details?codigo=${codigo}`);
  }
  getPagamentoDetails(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get_pagamento_details?codigo=${codigo}`);
  }

}