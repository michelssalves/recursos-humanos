import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoChartModule, PoChartOptions, PoChartSerie, PoChartType, PoContainerModule, PoDialogService, PoDisclaimerGroupModule, PoFieldModule, PoMultiselectFilterMode, PoMultiselectOption, PoTableModule, PoWidgetModule } from '@po-ui/ng-components';
import { DashboardService } from '../services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule, PoDisclaimerGroupModule, PoFieldModule, FormsModule, CommonModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PoDialogService, DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  delta = 0
  ativos = 0
  atestados = 0
  afastados = 0
  ferias = 0
  format: string;
  maxDate: string | Date;
  minDate: string | Date;
  countFunc = 0
  orcado = 30
  custo: Array<any> = [];
  codDir: Array<any> = [];
  codArea: Array<any> = [];
  codDep: Array<any> = [];
  codFunc: Array<any> = [];
  departamento: string = ''
  funcao: string = ''
  cargo: string = ''
  dataIni: string | Date = this.dataAtual()
  mes: string = this.mesAtual()
  ano: string = this.anoAtual()
  tipoCol: PoChartType = PoChartType.Column;
  tipoPizza: PoChartType = PoChartType.Line;
  tipoBar: PoChartType = PoChartType.Bar;
  categoriesColumn: Array<any> = [];
  pizzaItens: Array<PoChartSerie> = []
  colunaItens: Array<PoChartSerie> = []
  diretores: Array<any> = [];
  areas: Array<any> = [];
  departamentos: Array<any> = [];
  custos: Array<any> = [];
  cargos: Array<any> = [];
  funcionarios: Array<any> = [];
  selectAreas: Array<PoMultiselectOption> = []
  selectDiretores: Array<PoMultiselectOption> = []
  selectDepartamentos: Array<PoMultiselectOption> = []
  selectCusto: Array<PoMultiselectOption> = []
  selectFuncao: Array<PoMultiselectOption> = []
  startDate: string = <any>new Date();
  filterMode = PoMultiselectFilterMode.contains;
  selectedItems = [];

  constructor(
    private poAlert: PoDialogService,
    private dashboardService: DashboardService,
  ) { }

  chartOptions: PoChartOptions = {
    legend: true,
  };
  ngOnInit() {

    this.getMenus()

  }
  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.label}`, '_blank');
  }
  getMenus() {
    this.dashboardService.getMenus(this.custo, this.codDir, this.codArea, this.codDep, this.codFunc).subscribe(
      response => {

        this.selectCusto = response.custos;
        this.selectDepartamentos = response.departamentos;
        this.selectFuncao = response.funcoes;
        this.selectDiretores = response.diretores;
        this.selectAreas = response.areas;        
        this.diretores = response.tabela1;
        this.areas = response.tabela2;
        this.departamentos = response.tabela3;
        //this.funcionarios = response.tabela4;

      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  dataAtual() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);  // Adiciona zero à esquerda se necessário
    const day = ('0' + today.getDate()).slice(-2);           // Adiciona zero à esquerda se necessário
    const formattedDate = `${year}${month}${day}`;
    return formattedDate
  }
  anoAtual() {
    const agora = new Date()
    return agora.getFullYear().toString()
  }
  mesAtual() {
    const data = new Date();
    return (data.getMonth() + 1).toString().padStart(2, '0');
  }
  getDeltaTitle() {
    return this.delta > 0 ? `🔼 Delta: ${this.delta}` : `🔽 Delta: ${this.delta}`;
  }

  changeDate(event: any) {
    
  }
  changeCusto(event: any) {
    this.getMenus()
    if (this.selectedItems.length > 1) {
      this.selectedItems = [this.selectedItems[1]]; // Mantém apenas o último selecionado
    }

  }
  changeDpto(event: any) {
    this.getMenus()
  }
  changeFuncao(event: any) {
    this.getMenus()
  
  }
  changeDiretor(event: any) {
    this.getMenus()
  }
  changeArea(event: any) {
    this.getMenus()
  }
  onDateChange(value: Date | string) {
    if (typeof value === 'string') {
      this.dataIni = value.replace(/-/g, '');
    }
  }
  onCustoChange(value: any) {
    this.custo = value
  }
  onDiretorChange(value: any) {
    this.codDir = value
  }
  onAreaChange(value: any) {
    this.codArea = value
  }
  onDptoChange(value: any) {
    this.departamento = value
  }
  onFuncaoChange(value: any) {
    this.codFunc = value;
  }

}
