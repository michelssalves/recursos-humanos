import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar o FormsModule
import { CommonModule } from '@angular/common';
import { MedicoesComponent } from './components'
import { MedicoesService } from './services';
import { 
  PoContainerModule, 
  PoWidgetModule, 
  PoPageModule, 
  PoModalModule, 
  PoFieldModule, 
  PoDynamicModule,
  PoTableModule,  
  PoButtonModule 
} from '@po-ui/ng-components';

@NgModule({
  declarations: [ MedicoesComponent ],
  imports: [
  CommonModule,
  PoContainerModule, 
  PoWidgetModule, 
  PoPageModule, 
  PoModalModule, 
  PoFieldModule, 
  PoDynamicModule,
  FormsModule, 
  BrowserModule,
  PoTableModule, 
  PoButtonModule,
  
  ],
  exports: [
    MedicoesComponent
     
  ],
  providers: [
    MedicoesService
  ]
})
export class MedicoesModule { }


