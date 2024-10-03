import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoButtonModule, PoContainerModule, PoDynamicModule, PoDynamicViewField, PoFieldModule, PoInfoModule, PoModalComponent, PoModalModule, PoPageModule, PoSelectOption, PoTableModule, PoWidgetModule } from '@po-ui/ng-components';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableOptions,
  PoPageDynamicDetailModule,
  PoPageDynamicEditModule,
  PoPageDynamicDetailField,
  PoPageDynamicDetailActions,
  PoPageDynamicTableModule  
} from '@po-ui/ng-templates';
import { PedidosService } from '../services';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-pedidos',
  standalone: true,
 
  imports: [
    PoTableModule, 
    CommonModule,
    PoContainerModule, 
    PoPageModule,
    PoWidgetModule,
    PoPageModule,
    PoModalModule,
    PoFieldModule,
    PoDynamicModule,
    PoTableModule,
    PoInfoModule,
    PoButtonModule,
    PoPageDynamicDetailModule,
    PoPageDynamicEditModule,
    PoPageDynamicTableModule,
    FormsModule,
    ReactiveFormsModule

    ],
  templateUrl: './pedidos.component.html',
  providers: [PedidosService]
})
export class PedidosComponent implements OnInit {
  
  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
  @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;

  serviceApi = 'http://vhwin1065:9023/rest/zWSPedidos/get_all_po?data1=20240906&data2=20240906';

  actionsRight = false;
  detailedUser: any = {};
  pedido: any = {};
  fieldLabel = 'razaoSocial';
  dependents: any;
  quickSearchWidth: number = 3;
  fixedFilter = false;

  public readonly optionsSelect: Array<PoSelectOption> = [
    { label: 'codigo', value: 'codigo' },
    { label: 'nomeFantasia', value: 'nomeFantasia' },
    { label: 'razaoSocial', value: 'razaoSocial' },
    { label: 'label', value: 'label' },
    { label: 'cnpj', value: 'cnpj' },
    { label: 'value', value: 'value' },
    { label: 'id', value: 'id' },
    { label: 'email', value: 'email' },
    { label: 'data', value: 'data' },
    { label: 'origem', value: 'origem' }
  ];

  readonly actions: PoPageDynamicTableActions = {
    new: 'pedidos/new',
    remove: this.teste(),
    removeAll: true,
    
  };
  teste(){
    console.log('oi')
    return true
  }
  readonly cityOptions: Array<object> = [
    { value: 'São Paulo', label: 'São Paulo' },
    { value: 'Joinville', label: 'Joinville' },
    { value: 'São Bento', label: 'São Bento' },
    { value: 'Araquari', label: 'Araquari' },
    { value: 'Campinas', label: 'Campinas' },
    { value: 'Osasco', label: 'Osasco' }
  ];

  fields: Array<any> = [
    { property: 'Id', key: true, visible: false, allowColumnsManager: true},
    { property: 'Pedido', label: 'Pedido'},
    { property: 'Item', label: 'Item', visible: false, allowColumnsManager: true},
    { property: 'Codigo', label: 'Codigo', visible: false, allowColumnsManager: true},
    { property: 'rzSocial', label: 'Fornecedor'},
    { property: 'Produto', label: 'Produto' },
    { property: 'Qtde1A', label: 'Qtde'},
    { property: 'Qtde2A', label: 'UN2A', visible: false, allowColumnsManager: true },
    { property: 'Un1A', label: 'UN'},
    { property: 'Un2A', label: 'UN2A', visible: false, allowColumnsManager: true},
    { property: 'Preco', label: 'Preco'},
    { property: 'R$', label: 'Total' },
    { property: 'Pagamento', label: 'Pagamento', visible: false, allowColumnsManager: true},
    { property: 'Condicao', label: 'Condicao', visible: false, allowColumnsManager: true},
    { property: 'Fornecedor', label: 'Cod For', visible: false, allowColumnsManager: true},
    { property: 'Loja', label: 'Loja', visible: false, allowColumnsManager: true},
  
    { property: 'Data', label: 'Data'}
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 2},
    { property: 'Id', visible: false },
    { property: 'Item', visible: false },
    { property: 'Pedido', label: 'Pedido', gridLgColumns: 2 },
    { property: 'Pagamento', label: 'Cod Pagamento', gridLgColumns: 4, divider: 'Financeiro'  },
    { property: 'Condicao', label: 'Descrição', gridLgColumns: 4  },
    { property: 'Codigo', gridLgColumns: 4, divider: 'Material' },
    { property: 'Produto', gridLgColumns: 8},
    { property: 'Un1A', gridLgColumns: 2, divider: 'Quantitativos'  },
    { property: 'Un2A', gridLgColumns: 2 },
    { property: 'Qtde1A', gridLgColumns: 2 },
    { property: 'Qtde2A', gridLgColumns: 2 },
    { property: 'Preco', gridLgColumns: 2 },
    { property: 'R$', gridLgColumns: 2 },
    { property: 'Fornecedor', gridLgColumns: 4,  divider: 'Fornecedor' },
    { property: 'Loja', gridLgColumns: 2 },
    { property: 'rzSocial', gridLgColumns: 6 },
    { property: 'Data', label: 'Data Emissão', type: 'date',  divider: 'Datas' },
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    {
      label: 'Actions Right',
      action: this.onClickActionsSide.bind(this),
      visible: this.isVisibleActionsRight.bind(this),
      icon: 'ph ph-caret-right'
    },
    {
      label: 'Actions Left',
      action: this.onClickActionsSide.bind(this),
      visible: this.isVisibleActionsLeft.bind(this),
      icon: 'ph ph-caret-left'
    },
    {
      label: 'Fixed Filter',
      action: this.onClickFixedFilter.bind(this),
      visible: this.isVisibleFixedFilter.bind(this),
      icon: 'ph ph-lock'
    },
    {
      label: 'Not Fixed Filter',
      action: this.onClickFixedFilter.bind(this),
      visible: this.isVisibleNotFixedFilter.bind(this),
      icon: 'ph ph-lock-open'
    },
    { label: 'Print', action: this.printPage.bind(this), icon: 'ph ph-printer' }
  ];


  constructor(private usersService: PedidosService) {}

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Visualizar',
      action: this.onClickUserDetail.bind(this),
      disabled: false,
      icon: 'ph ph-note-pencil'
    },
    {
      label: 'Editar',
      action: this.onClickDependents.bind(this),
      disabled: false,
      icon: 'ph ph-note-pencil'
    },
    {
      label: 'Aprovar',
      action: this.onClickDependents.bind(this),
      visible: true,
      icon: 'ph ph-check-fat'
    }
  ]
  ngOnInit(): void {
    console.log(this.fields)
    this.pageCustomActions = [
      ...this.pageCustomActions,
      {
        label: 'Download .csv',
        action: this.usersService.downloadCsv.bind(this.usersService, this.serviceApi),
        icon: 'ph ph-download-simple'
      }
    ];
  }
  buscarDadosFornecedor(fornecedor: string) {
    if (fornecedor) {
      this.usersService.getFornecedorDetails(fornecedor).subscribe(
        (dados: any) => {
          console.log(dados)
          if (dados.bloqueado !== '2') {
            this.pedido.Loja = dados.loja;
            this.pedido.rzSocial = dados.razaoSocial;
          } else {
            alert('Fornecedor Bloqueado!');
            this.pedido.Fornecedor = '';
          }
        },
        error => {
          console.error('Erro ao buscar dados do fornecedor:', error);
          alert('Codigo Inválido!')
        }
      );
    }
  }
  buscarDadosProduto(fornecedor: string) {
    if (fornecedor) {
      this.usersService.getProdutoDetails(fornecedor).subscribe(
        (dados: any) => {
          console.log(dados)
          if (dados.bloqueado !== '2') {
            this.pedido.Loja = dados.loja;
            this.pedido.rzSocial = dados.razaoSocial;
          } else {
            alert('Fornecedor Bloqueado!');
            this.pedido.Fornecedor = '';
          }
        },
        error => {
          console.error('Erro ao buscar dados do fornecedor:', error);
          alert('Codigo Inválido!')
        }
      );
    }
  }
  buscarDadosPagamento(fornecedor: string) {
    if (fornecedor) {
      this.usersService.getPagamentoDetails(fornecedor).subscribe(
        (dados: any) => {
          console.log(dados)
          if (dados.bloqueado !== '2') {
            this.pedido.Loja = dados.loja;
            this.pedido.rzSocial = dados.razaoSocial;
          } else {
            alert('Fornecedor Bloqueado!');
            this.pedido.Fornecedor = '';
          }
        },
        error => {
          console.error('Erro ao buscar dados do fornecedor:', error);
          alert('Codigo Inválido!')
        }
      );
    }
  }
 //COLUNAS
  onLoad(): PoPageDynamicTableOptions {
    return {

    };
  }

  isUserInactive(person: any) {
    return person.status === 'inactive';
  }

  hasDependents(person: any) {
    return true
   // return person.dependents.length !== 0;
  }

  printPage() {
    window.print();
  }

  public onClickUserDetail(user: any) {

    this.detailedUser = user;

    console.log(this.detailedUser)

    this.userDetailModal.open();
  }

  private onClickDependents(user: any) {
    console.log(user)
    this.pedido = user;

    this.dependentsModal.open();
  }

  private onClickActionsSide(value: any) {
    this.actionsRight = !this.actionsRight;
  }

  private isVisibleActionsRight() {
    return !this.actionsRight;
  }

  private isVisibleActionsLeft() {
    return this.actionsRight;
  }

  private onClickFixedFilter() {
    this.fixedFilter = !this.fixedFilter;
    const fieldsDefault = [...this.fields];

    if (this.fixedFilter) {
      fieldsDefault
        .filter(field => field.property === 'search')
        .map(field => {
          field.initValue = 'Joinville';
          field.filter = true;
          field.fixed = true;
        });

      this.fields = fieldsDefault;
    } else {
      fieldsDefault
        .filter(field => field.property === 'search')
        .map(field => {
          field.initValue = 'São Paulo';
          field.fixed = false;
        });

      this.fields = fieldsDefault;
    }
  }

  private isVisibleFixedFilter() {
    return !this.fixedFilter;
  }

  private isVisibleNotFixedFilter() {
    return this.fixedFilter;
  }
}