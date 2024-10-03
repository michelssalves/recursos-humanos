
import { MedicoesService } from '../services/medicoes.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PoBreadcrumb, PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-medicoes',
  templateUrl: './medicoes.component.html',
  styleUrls: ['./medicoes.component.css'],
  providers: [DecimalPipe]
})
export class MedicoesComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @ViewChild('optionsForm', { static: true }) form!: NgForm;

  medicoes: any[] = [];
  selectedItem: any = {};
  event: string = '';
  dataAtual: Date = new Date();
  dataFormatada: string;
  isGerenciadora: boolean = false;
  isNFEmitida: boolean = false;
  gerenciadoraSelecionada: string | undefined;
  selection: Array<string>;
  
  
  close: PoModalAction = {
    action: () => this.closeModal(),
    label: 'Close',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => this.processOrder(),
    label: 'Confirm'
  };

  constructor(private medicoesService: MedicoesService, private decimalPipe: DecimalPipe) {
    this.dataFormatada = this.formatarData(this.dataAtual);
  
  }
  formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const dia = data.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
    return `${ano}-${mes}-${dia}`;
  }
  ngOnInit() {
    this.medicoesService.getData().subscribe({
      next: (response) => {
        if (response && response.objects) {
          this.medicoes = response.objects;
          console.log('Dados recebidos:', this.medicoes);
        } else {
          console.error('Resposta inválida:', response);
        }
      },
      error: (error) => {
        console.error('Erro ao obter dados:', error);
      }
    });
  }
  onGerenciadoraChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.isGerenciadora = selectElement.value === 'true';
  }
  onNfEmitidaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.isNFEmitida = selectElement.value === 'true';
  }
  changeEvent(event: string) {
    this.event = event;
  }
  openModal(item: any) {
    this.selectedItem = item;
    this.poModal.open();
  }
  closeModal() {
    this.poModal.close();
  }
  processOrder() {
    if (this.form.invalid) {
      console.error('Escolha os itens para confirmar o pedido.');
    } else {
      this.confirm.loading = true;
      setTimeout(() => {
        this.confirm.loading = false;
        this.closeModal();
      }, 700);
    }
  }
}
