
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppService } from '../services';
import { LoadingService } from './../../dashboard/services/loading.service';

import {
  PoFieldModule,
  PoMenuItem,
  PoMenuModule,
  PoPageAction,
  PoPageModule,
  PoToolbarModule
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [

  CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isLoading = false; 

  public readonly actions: Array<PoPageAction> = [

  ];
  menuItemSelected: string = '';
  menus: Array<PoMenuItem> = [
    { label: 'Dashboard', action: this.printMenuAction.bind(this), icon: 'po-icon po-icon-chart-columns', link: 'dashboard', shortLabel: 'Dashboard' },

  ];

  constructor(private loadingService: LoadingService) {}
  
  ngOnInit(): void {
    setInterval(() => {
      this.isLoading = this.loadingService.isLoading();
    }, 100); 
  }
  
  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }

}
