import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelsuperadmin:any[];
  modelanonymous: any[];
    modeladmin : any[];
  modelresponsable : any[];
  constructor(public app: AppComponent,
   public appMain: AppMainComponent,
   private roleService: RoleService,
   private authService:AuthService,
  private router: Router) {}

  ngOnInit() {


    this.modeladmin =
      [
              {
                label: 'Configuration',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste jour',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/jour/list']
                    },
                ]
              },
              {
                label: 'Gestion Repas',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste repas categorie patient',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/repas-categorie-patient/list']
                    },
                    {
                      label: 'Liste repas',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/repas/list']
                    },
                    {
                      label: 'Liste type repas',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/type-repas/list']
                    },
                ]
              },
              {
                label: 'Gestion Patient',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste patient',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/patient/list']
                    },
                    {
                      label: 'Liste categorie patient',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/categorie-patient/list']
                    },
                ]
              },
              {
                label: 'Gestion Planning',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste responsable planning',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/responsable-planning/list']
                    },
                    {
                      label: 'Liste planning repas',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/planning-repas/list']
                    },
                    {
                      label: 'Liste planning execution',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/planning-execution/list']
                    },
                    {
                      label: 'Liste planning',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/repas/planning/list']
                    },
                ]
              },
    ]
    this.modelresponsable =
      [
              {
                label: 'Configuration',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste jour',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/jour/list']
                    },
                ]
              },
              {
                label: 'Gestion Repas',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste repas categorie patient',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/repas-categorie-patient/list']
                    },
                    {
                      label: 'Liste repas',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/repas/list']
                    },
                    {
                      label: 'Liste type repas',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/type-repas/list']
                    },
                ]
              },
              {
                label: 'Gestion Patient',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste patient',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/patient/list']
                    },
                    {
                      label: 'Liste categorie patient',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/categorie-patient/list']
                    },
                ]
              },
              {
                label: 'Gestion Planning',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste responsable planning',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/responsable-planning/list']
                    },
                    {
                      label: 'Liste planning repas',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/planning-repas/list']
                    },
                    {
                      label: 'Liste planning execution',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/planning-execution/list']
                    },
                    {
                      label: 'Liste planning',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/responsable/repas/planning/list']
                    },
                ]
              },
    ]
        if (this.authService.authenticated) {
      if (this.authService.authenticatedUser.roles) {

        this.authService.authenticatedUser.roles.forEach(role => {
          const roleName: string = this.getRole(role);
          this.roleService._role.next(roleName.toUpperCase());
          eval('this.model = this.model' + this.getRole(role));
        })
      }

    }
  }
  getRole(text){
  const [role, ...rest] = text.split('_');
  return rest.join('').toLowerCase();
}
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
}
