import { Component, NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoChartType, PoChartOptions,PoChartOptionsExtended, PoChartSerie, PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule, PoSelectOption, PoDisclaimerGroupModule, PoFieldModule, PoMultiselectOption, PoDialogService, PoMultiselectFilterMode} from '@po-ui/ng-components';
import { DashboardService } from '../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule,PoDisclaimerGroupModule, PoFieldModule, FormsModule, CommonModule],

schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PoDialogService, DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {
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
  custo: string = ''
  departamento: string = ''
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
  custos: Array<any> = [];
  departamentos: Array<any> = [];
  cargos: Array<any> = [];
  funcionarios: Array<any> = [];
  //selectCusto: Array<PoSelectOption> = []
  selectCusto: Array<PoMultiselectOption> = []
  //selectDepartamentos: Array<PoSelectOption> = []
  selectDepartamentos: Array<PoMultiselectOption> = []
  //selectCargos: Array<PoSelectOption> = []
  selectCargos: Array<PoMultiselectOption> = []
  startDate: string = <any>new Date();

  filterMode = PoMultiselectFilterMode.contains;

  selectedItems = [];
  
  constructor(
    private poAlert: PoDialogService,
    private dashboardService: DashboardService,
  ) {}
  
  chartOptions: PoChartOptions = {
    legend: true,
    // axis: {
    //   minRange: 0,
    //   maxRange: 100,
    //   gridLines: 7,
    // },
  };
  ngOnInit() {
    this.getTable()
    this.getCustos()
    this.getDpdto()
    this.getCargos()
   
  } 
  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.label}`, '_blank');
  }
  getCustos(){
    this.dashboardService.getCustos(this.custo).subscribe(
      response => {
        this.selectCusto = response.objects;
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getDpdto(){
    this.dashboardService.getDpdto(this.custo, this.departamento, this.cargo).subscribe(
      response => {
        this.selectDepartamentos = response.objects;
        console.log(this.selectDepartamentos)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getCargos(){
    this.dashboardService.getCargos(this.custo, this.departamento, this.cargo).subscribe(
      response => {
        this.selectCargos = response.objects;
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  dataAtual(){
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);  // Adiciona zero à esquerda se necessário
    const day = ('0' + today.getDate()).slice(-2);           // Adiciona zero à esquerda se necessário
    
    const formattedDate = `${year}${month}${day}`;

    return formattedDate

  }
  anoAtual(){
    const agora = new Date()
    return agora.getFullYear().toString()
  }
  mesAtual(){
    const data = new Date();
    return (data.getMonth() + 1).toString().padStart(2, '0');
  }
  getDeltaTitle() {
    return this.delta > 0 ? `🔼 Delta: ${this.delta}` : `🔽 Delta: ${this.delta}`;
  }
  
  getTable(){

    this.dashboardService.getTable(this.dataIni, this.custo, this.departamento, this.cargo).subscribe(
      response => {

        this.custos = response.tabela1;
        this.departamentos = response.tabela2;
        this.cargos = response.tabela3;
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
        let ativos =  quantidadeFuncionarios - (ferias + atestado + afastado)
        let funcionarios =  ativos +  atestado + ferias
        this.colunaItens = [
          { label: 'Orçado', data: [orcamento]},
          { label: 'Funcionarios', data: [funcionarios] }
        ]
        this.ativos = ativos
        this.atestados = atestado
        this.afastados = afastado
        this.ferias = ferias

         this.pizzaItens= [
          { label: 'Atestado', data: atestado, color: 'po-color-08' },
          { label: 'Afastados', data: afastado, color: 'po-color-07' },
          { label: 'Ativos', data: ativos, color:  'po-color-10' },
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

    this.cargo = ''
    this.departamento = ''
    this.selectCargos = []

    this.getDpdto()
    this.getTable()

    if (this.selectedItems.length > 1) {
      this.selectedItems = [this.selectedItems[1]]; // Mantém apenas o último selecionado
    }
  
  }
  changeDpto(event: any) {
    
    this.cargo = ''
    this.selectCargos = []
    this.getTable()
    this.getCargos()
  
  }
  changeCargo(event: any) {
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
  onDptoChange(value: any) {
    this.departamento = value
  }
  onCargoChange(value: any) {
    this.cargo = value;  
  }

}
