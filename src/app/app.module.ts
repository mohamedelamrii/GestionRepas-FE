import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, DatePipe} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './controller/interceptors/jwt.interceptor';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TabViewModule} from 'primeng/tabview';
import {InputTextareaModule} from 'primeng/inputtextarea';

import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppConfigComponent} from './app.config.component';

import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppRightMenuComponent} from './app.right-menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';

import {AccessDeniedComponent} from './auth/access-denied/access-denied.component';
import {UserListComponent} from './module/user-list/user-list.component';
import {UserService} from './controller/service/user.service';
import {RoleService} from './controller/service/role.service';
import {HomeComponent} from './module/home/home.component';
import {InputSwitchModule} from 'primeng/inputswitch';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {MenuService} from './app.menu.service';

import {AdminModule} from './module/admin/admin.module';
import {AdminRoutingModule} from './module/admin/admin-routing.module';
import {ResponsableModule} from './module/responsable/responsable.module';
import {ResponsableRoutingModule} from './module/responsable/responsable-routing.module';
@NgModule({
  imports: [
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    PanelMenuModule,
    RadioButtonModule,
    InputTextModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    SplitButtonModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    CardModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
FileUploadModule,
    AdminModule,
    AdminRoutingModule,
    ResponsableModule,
    ResponsableRoutingModule,
  ],
  declarations: [
    AppComponent,
    AccessDeniedComponent,

    AppMainComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppConfigComponent,
    AppRightMenuComponent,
    AppTopBarComponent,
    AppFooterComponent,
    UserListComponent,
    HomeComponent
  ],
  providers: [
    /*    { provide: LocationStrategy, useClass: HashLocationStrategy }, */
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UserService,
    MenuService,
    RoleService,
    MessageService,
    ConfirmationService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
