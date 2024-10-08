import { Component, NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoChartType, PoChartOptions, PoChartSerie, PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule, PoSelectOption, PoDisclaimerGroupModule, PoFieldModule, PoMultiselectOption, PoDialogService} from '@po-ui/ng-components';
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
  //dataIni: string | Date = '20240909'
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
  selectCusto: Array<PoSelectOption> = []
  selectDepartamentos: Array<PoSelectOption> = []
  selectCargos: Array<PoSelectOption> = []

  
  constructor(
    private poAlert: PoDialogService,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit() {

    this.getTable()
    this.getCustos()
    this.getDpdto()
    this.getCargos()
    console.log(this.mesAtual())
   
  } 
  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.label}`, '_blank');
  }
  getCustos(){
    this.dashboardService.getCustos(this.custo).subscribe(
      response => {
        this.selectCusto = response.objects;
        console.log(this.custo)
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
        //console.log(this.pizzaItens)
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
        console.log(response.afastamento[0].data)

        let ferias = response.ferias?.[0]?.data ?? 0;
        let afastado = response.afastamento?.[0]?.data ?? 0;
        let atestado = response.atestado?.[0]?.data ?? 0;
        let orcamento = response.orcamento?.[0]?.orcamento ?? 0;
        let quantidadeFuncionarios = 0;
        if (this.funcionarios && this.funcionarios.length) {
          quantidadeFuncionarios = this.funcionarios.filter(item => Object.keys(item).length > 0).length;
        }
        this.delta = orcamento - quantidadeFuncionarios
        this.colunaItens = [
          { label: 'Orçado', data: [orcamento]},
          { label: 'Funcionarios', data: [quantidadeFuncionarios ] }
        ]

        let ativos =  quantidadeFuncionarios - (ferias + atestado + afastado)

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

    //this.getPizza()
    this.getTable()
    //this.getCols()

  }
  changeAno(event: any) {

    //this.getPizza()
    this.getTable()
   // this.getCols()

  }
  changeProduto(event: any) {

    //this.getPizza()
    this.getTable()
    //this.getCols()

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
  
  }
  changeDpto(event: any) {

    //this.getPizza()
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

  consumptionPerCapitaOptions: PoChartOptions = {
    axis: {
      maxRange: 100,
      gridLines: 2
    }
  };

  chartAreaOptions: PoChartOptions = {
    axis: {
      maxRange: 700,
      gridLines: 8
    }
  };

  options: PoChartOptions = {
    axis: {
      minRange: 0,
      maxRange: 40,
      gridLines: 5
    }
  };

  optionsColumn: PoChartOptions = {
    axis: {
      minRange: -20,
      maxRange: 100,
      gridLines: 7
    }
  };

}
