import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoChartType, PoChartOptions, PoChartSerie, PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule, PoSelectOption, PoDisclaimerGroupModule, PoFieldModule, PoMultiselectOption, PoDialogService, PoMultiselectFilterMode } from '@po-ui/ng-components';
import { DashboardService } from '../services';
import { CommonModule } from '@angular/common';

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
    this.getCustos()
    this.getFuncoes()
    this.getDiretores()
    this.getArea()
    this.getDeptos()
    this.getTable()

  }
  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.label}`, '_blank');
  }
  getCustos() {
    this.dashboardService.postCustos(this.custo, this.codDir, this.codArea, this.codDep, this.codFunc).subscribe(
      response => {
        this.selectCusto = response.objects;
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getDiretores() {
    this.dashboardService.postDiretores(this.custo, this.codDir, this.codArea, this.codDep, this.codFunc).subscribe(
      response => {
        this.selectDiretores = response.objects.diretores;
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getArea() {
    this.dashboardService.postAreas(this.custo, this.codDir, this.codArea, this.codDep, this.codFunc).subscribe(
      response => {
        this.selectAreas = response.objects.areas;
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getDeptos() {
    this.dashboardService.postDeptos(this.custo, this.codDir, this.codArea, this.codDep, this.codFunc).subscribe(
      response => {
        this.selectDepartamentos = response.objects.departamentos;
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getFuncoes() {
    this.dashboardService.postFuncoes(this.custo, this.codDir, this.codArea, this.codDep, this.codFunc).subscribe(
      response => {
        this.selectFuncao = response.objects;
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
  getTable() {
    this.dashboardService.postTable(this.custo, this.codDir, this.codArea, this.codDep, this.codFunc, this.dataIni).subscribe(
      response => {

        this.diretores = response.tabela1;
        this.areas = response.tabela2;
        this.departamentos = response.tabela3;
        this.funcionarios = response.tabela4;

        let ferias = response.ferias?.[0]?.data ?? 0;
        let afastado = response.afastamento?.[0]?.data ?? 0;
        let atestado = response.atestado?.[0]?.data ?? 0;
        let orcamento = response.orcamento?.[0]?.orcamento ?? 0;
        let quantidadeFuncionarios = 0;
        if (this.funcionarios && this.funcionarios.length) {
          quantidadeFuncionarios = this.funcionarios.filter(item => Object.keys(item).length > 0).length;
        }
        this.delta = orcamento - quantidadeFuncionarios
        let ativos = quantidadeFuncionarios - (ferias + atestado + afastado)
        let funcionarios = ativos + atestado + ferias
        this.colunaItens = [
          { label: 'Orçado', data: [orcamento] },
          { label: 'Funcionarios', data: [funcionarios] }
        ]
        this.ativos = ativos
        this.atestados = atestado
        this.afastados = afastado
        this.ferias = ferias

        this.pizzaItens = [
          { label: 'Atestado', data: atestado, color: 'po-color-08' },
          { label: 'Afastados', data: afastado, color: 'po-color-07' },
          { label: 'Ativos', data: ativos, color: 'po-color-10' },
          { label: 'Ferias', data: ferias, color: 'po-color-02' },
        ]

      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  changeMes(event: any) {
    this.getTable()
  }
  changeAno(event: any) {
    this.getTable()
  }
  changeProduto(event: any) {
    this.getTable()
  }
  changeDate(event: any) {
    this.getTable()
  }
  changeCusto(event: any) {
    this.getArea()
    this.getDiretores()
    this.getFuncoes()
    this.getDeptos()
    this.getTable()

    if (this.selectedItems.length > 1) {
      this.selectedItems = [this.selectedItems[1]]; // Mantém apenas o último selecionado
    }

  }
  changeDpto(event: any) {
    this.getArea()
    this.getDiretores()
    this.getFuncoes()
    this.getCustos()
    this.getTable()
  }
  changeFuncao(event: any) {
    this.getArea()
    this.getDiretores()
    this.getDeptos()
    this.getCustos()
    this.getTable()
  }
  changeDiretor(event: any) {
    this.getArea()
    this.getFuncoes()
    this.getDeptos()
    this.getCustos()
    this.getTable()
  }
  changeArea(event: any) {
    this.getDiretores()
    this.getFuncoes()
    this.getDeptos()
    this.getCustos()
    this.getTable()
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
