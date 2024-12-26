import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppService } from '../services';

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
  isHideLoading = false;

  public readonly actions: Array<PoPageAction> = [

  ];
  menuItemSelected: string = '';
  menus: Array<PoMenuItem> = [
    { label: 'Dashboard', action: this.printMenuAction.bind(this), icon: 'po-icon po-icon-chart-columns', link: 'dashboard', shortLabel: 'Dashboard' },

  ];

  constructor(
    // public appService: AppService,
    // private router: Router,
    // private route: ActivatedRoute,
    // private loadingService: LoadingService
  ) {

  }
  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }
  // public breadcrumb: PoBreadcrumb = {
  //   items: [{ label: 'Home', link: '/home' }]
  // };


  // ngOnInit(): void {
  //   // Controle do preloader durante chamadas de API
  //   this.loadingService.loading$.subscribe((loading: boolean) => {
  //     this.isLoading = loading;
  //   });


  //   // Controle do preloader durante a navegação
  //   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
  //     this.updateBreadcrumb();
  //   });
  // }

  // updateBreadcrumb(): void {
  //   const currentRoute = this.route.root.firstChild?.snapshot;
  //   if (currentRoute) {
  //     const breadcrumbLabel = currentRoute.data.title || 'Home';
  //     const breadcrumbLink = this.router.url;

  //     this.breadcrumb.items = [
  //       { label: 'RH', link: '/home' },
  //       { label: breadcrumbLabel, link: breadcrumbLink }
  //     ];
  //   }

  // }
  // navigateWithPreloader(link: string): void {
  //   this.isLoading = true; // Ativa o preloader antes da navegação
  //   this.router.navigate([link]).finally(() => {
  //     this.isLoading = false; // Garante que o preloader será desativado
  //   });
  // }

}
