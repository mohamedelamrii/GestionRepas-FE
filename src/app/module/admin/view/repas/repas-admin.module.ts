import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { ResponsablePlanningCreateAdminComponent } from './responsable-planning-admin/create-admin/responsable-planning-create-admin.component';
import { ResponsablePlanningEditAdminComponent } from './responsable-planning-admin/edit-admin/responsable-planning-edit-admin.component';
import { ResponsablePlanningViewAdminComponent } from './responsable-planning-admin/view-admin/responsable-planning-view-admin.component';
import { ResponsablePlanningListAdminComponent } from './responsable-planning-admin/list-admin/responsable-planning-list-admin.component';
import { RepasCategoriePatientCreateAdminComponent } from './repas-categorie-patient-admin/create-admin/repas-categorie-patient-create-admin.component';
import { RepasCategoriePatientEditAdminComponent } from './repas-categorie-patient-admin/edit-admin/repas-categorie-patient-edit-admin.component';
import { RepasCategoriePatientViewAdminComponent } from './repas-categorie-patient-admin/view-admin/repas-categorie-patient-view-admin.component';
import { RepasCategoriePatientListAdminComponent } from './repas-categorie-patient-admin/list-admin/repas-categorie-patient-list-admin.component';
import { PlanningRepasCreateAdminComponent } from './planning-repas-admin/create-admin/planning-repas-create-admin.component';
import { PlanningRepasEditAdminComponent } from './planning-repas-admin/edit-admin/planning-repas-edit-admin.component';
import { PlanningRepasViewAdminComponent } from './planning-repas-admin/view-admin/planning-repas-view-admin.component';
import { PlanningRepasListAdminComponent } from './planning-repas-admin/list-admin/planning-repas-list-admin.component';
import { RepasCreateAdminComponent } from './repas-admin/create-admin/repas-create-admin.component';
import { RepasEditAdminComponent } from './repas-admin/edit-admin/repas-edit-admin.component';
import { RepasViewAdminComponent } from './repas-admin/view-admin/repas-view-admin.component';
import { RepasListAdminComponent } from './repas-admin/list-admin/repas-list-admin.component';
import { TypeRepasCreateAdminComponent } from './type-repas-admin/create-admin/type-repas-create-admin.component';
import { TypeRepasEditAdminComponent } from './type-repas-admin/edit-admin/type-repas-edit-admin.component';
import { TypeRepasViewAdminComponent } from './type-repas-admin/view-admin/type-repas-view-admin.component';
import { TypeRepasListAdminComponent } from './type-repas-admin/list-admin/type-repas-list-admin.component';
import { JourCreateAdminComponent } from './jour-admin/create-admin/jour-create-admin.component';
import { JourEditAdminComponent } from './jour-admin/edit-admin/jour-edit-admin.component';
import { JourViewAdminComponent } from './jour-admin/view-admin/jour-view-admin.component';
import { JourListAdminComponent } from './jour-admin/list-admin/jour-list-admin.component';
import { PatientCreateAdminComponent } from './patient-admin/create-admin/patient-create-admin.component';
import { PatientEditAdminComponent } from './patient-admin/edit-admin/patient-edit-admin.component';
import { PatientViewAdminComponent } from './patient-admin/view-admin/patient-view-admin.component';
import { PatientListAdminComponent } from './patient-admin/list-admin/patient-list-admin.component';
import { PlanningExecutionCreateAdminComponent } from './planning-execution-admin/create-admin/planning-execution-create-admin.component';
import { PlanningExecutionEditAdminComponent } from './planning-execution-admin/edit-admin/planning-execution-edit-admin.component';
import { PlanningExecutionViewAdminComponent } from './planning-execution-admin/view-admin/planning-execution-view-admin.component';
import { PlanningExecutionListAdminComponent } from './planning-execution-admin/list-admin/planning-execution-list-admin.component';
import { PlanningCreateAdminComponent } from './planning-admin/create-admin/planning-create-admin.component';
import { PlanningEditAdminComponent } from './planning-admin/edit-admin/planning-edit-admin.component';
import { PlanningViewAdminComponent } from './planning-admin/view-admin/planning-view-admin.component';
import { PlanningListAdminComponent } from './planning-admin/list-admin/planning-list-admin.component';
import { CategoriePatientCreateAdminComponent } from './categorie-patient-admin/create-admin/categorie-patient-create-admin.component';
import { CategoriePatientEditAdminComponent } from './categorie-patient-admin/edit-admin/categorie-patient-edit-admin.component';
import { CategoriePatientViewAdminComponent } from './categorie-patient-admin/view-admin/categorie-patient-view-admin.component';
import { CategoriePatientListAdminComponent } from './categorie-patient-admin/list-admin/categorie-patient-list-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {PaginatorModule} from 'primeng/paginator';



@NgModule({
  declarations: [

    ResponsablePlanningCreateAdminComponent,
    ResponsablePlanningListAdminComponent,
    ResponsablePlanningViewAdminComponent,
    ResponsablePlanningEditAdminComponent,
    RepasCategoriePatientCreateAdminComponent,
    RepasCategoriePatientListAdminComponent,
    RepasCategoriePatientViewAdminComponent,
    RepasCategoriePatientEditAdminComponent,
    PlanningRepasCreateAdminComponent,
    PlanningRepasListAdminComponent,
    PlanningRepasViewAdminComponent,
    PlanningRepasEditAdminComponent,
    RepasCreateAdminComponent,
    RepasListAdminComponent,
    RepasViewAdminComponent,
    RepasEditAdminComponent,
    TypeRepasCreateAdminComponent,
    TypeRepasListAdminComponent,
    TypeRepasViewAdminComponent,
    TypeRepasEditAdminComponent,
    JourCreateAdminComponent,
    JourListAdminComponent,
    JourViewAdminComponent,
    JourEditAdminComponent,
    PatientCreateAdminComponent,
    PatientListAdminComponent,
    PatientViewAdminComponent,
    PatientEditAdminComponent,
    PlanningExecutionCreateAdminComponent,
    PlanningExecutionListAdminComponent,
    PlanningExecutionViewAdminComponent,
    PlanningExecutionEditAdminComponent,
    PlanningCreateAdminComponent,
    PlanningListAdminComponent,
    PlanningViewAdminComponent,
    PlanningEditAdminComponent,
    CategoriePatientCreateAdminComponent,
    CategoriePatientListAdminComponent,
    CategoriePatientViewAdminComponent,
    CategoriePatientEditAdminComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule,
    PaginatorModule
  ],
  exports: [
  ResponsablePlanningCreateAdminComponent,
  ResponsablePlanningListAdminComponent,
  ResponsablePlanningViewAdminComponent,
  ResponsablePlanningEditAdminComponent,
  RepasCategoriePatientCreateAdminComponent,
  RepasCategoriePatientListAdminComponent,
  RepasCategoriePatientViewAdminComponent,
  RepasCategoriePatientEditAdminComponent,
  PlanningRepasCreateAdminComponent,
  PlanningRepasListAdminComponent,
  PlanningRepasViewAdminComponent,
  PlanningRepasEditAdminComponent,
  RepasCreateAdminComponent,
  RepasListAdminComponent,
  RepasViewAdminComponent,
  RepasEditAdminComponent,
  TypeRepasCreateAdminComponent,
  TypeRepasListAdminComponent,
  TypeRepasViewAdminComponent,
  TypeRepasEditAdminComponent,
  JourCreateAdminComponent,
  JourListAdminComponent,
  JourViewAdminComponent,
  JourEditAdminComponent,
  PatientCreateAdminComponent,
  PatientListAdminComponent,
  PatientViewAdminComponent,
  PatientEditAdminComponent,
  PlanningExecutionCreateAdminComponent,
  PlanningExecutionListAdminComponent,
  PlanningExecutionViewAdminComponent,
  PlanningExecutionEditAdminComponent,
  PlanningCreateAdminComponent,
  PlanningListAdminComponent,
  PlanningViewAdminComponent,
  PlanningEditAdminComponent,
  CategoriePatientCreateAdminComponent,
  CategoriePatientListAdminComponent,
  CategoriePatientViewAdminComponent,
  CategoriePatientEditAdminComponent,
  ],
  entryComponents: [],
})
export class RepasAdminModule { }
