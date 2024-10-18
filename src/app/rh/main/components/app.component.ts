import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { AppService } from '../services';
//import { ProAppConfigService, ProJsToAdvplService, ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import {
  PoContainerModule, 
  PoWidgetModule, 
  PoModalModule, 
  PoDynamicModule,
  PoTableModule, 
  PoPageAction,  
  PoBreadcrumb,
  PoComboComponent,
  PoFieldModule,
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  
 
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
    ReactiveFormsModule,
  
  ],
  providers: [AppService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

   public readonly actions: Array<PoPageAction> = [
    
  ];
  menuItemSelected: string = '';
  menus: Array<PoMenuItem> = [
    { label: 'Dashboard', action: this.printMenuAction.bind(this), icon: 'po-icon po-icon-chart-columns', link: 'dashboard', shortLabel: 'Dashboard' },
    // { label: 'Sair', action: this.closeApp.bind(this), icon: 'po-icon ph ph-sign-out', link: '', shortLabel: 'Sair' },
   
  ];

  constructor(
   // private proAppConfigService: ProAppConfigService,
    public appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Carrega a configuração do aplicativo se não estiver dentro do Protheus
    // if (!this.proAppConfigService.insideProtheus()) {
    //   this.proAppConfigService.loadAppConfig(); 
    // }
  }
  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }
  public breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/home' }]
  };
  // private closeApp() {
  //   if (this.proAppConfigService.insideProtheus()) {
  //     this.proAppConfigService.callAppClose();
  //   } else {
  //     alert('O App não está sendo executado dentro do Protheus.');
  //   }
  // }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  updateBreadcrumb(): void {
    const currentRoute = this.route.root.firstChild?.snapshot;
    if (currentRoute) {
      const breadcrumbLabel = currentRoute.data.title || 'Home';
      const breadcrumbLink = this.router.url;
      console.log(breadcrumbLink)

      this.breadcrumb.items = [
        { label: 'RH', link: '/home' },
        { label: breadcrumbLabel, link: breadcrumbLink }
      ];
    }

  }

}
