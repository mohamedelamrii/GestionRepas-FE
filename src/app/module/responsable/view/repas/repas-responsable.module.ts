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

import { ResponsablePlanningCreateResponsableComponent } from './responsable-planning-responsable/create-responsable/responsable-planning-create-responsable.component';
import { ResponsablePlanningEditResponsableComponent } from './responsable-planning-responsable/edit-responsable/responsable-planning-edit-responsable.component';
import { ResponsablePlanningViewResponsableComponent } from './responsable-planning-responsable/view-responsable/responsable-planning-view-responsable.component';
import { ResponsablePlanningListResponsableComponent } from './responsable-planning-responsable/list-responsable/responsable-planning-list-responsable.component';
import { RepasCategoriePatientCreateResponsableComponent } from './repas-categorie-patient-responsable/create-responsable/repas-categorie-patient-create-responsable.component';
import { RepasCategoriePatientEditResponsableComponent } from './repas-categorie-patient-responsable/edit-responsable/repas-categorie-patient-edit-responsable.component';
import { RepasCategoriePatientViewResponsableComponent } from './repas-categorie-patient-responsable/view-responsable/repas-categorie-patient-view-responsable.component';
import { RepasCategoriePatientListResponsableComponent } from './repas-categorie-patient-responsable/list-responsable/repas-categorie-patient-list-responsable.component';
import { PlanningRepasCreateResponsableComponent } from './planning-repas-responsable/create-responsable/planning-repas-create-responsable.component';
import { PlanningRepasEditResponsableComponent } from './planning-repas-responsable/edit-responsable/planning-repas-edit-responsable.component';
import { PlanningRepasViewResponsableComponent } from './planning-repas-responsable/view-responsable/planning-repas-view-responsable.component';
import { PlanningRepasListResponsableComponent } from './planning-repas-responsable/list-responsable/planning-repas-list-responsable.component';
import { RepasCreateResponsableComponent } from './repas-responsable/create-responsable/repas-create-responsable.component';
import { RepasEditResponsableComponent } from './repas-responsable/edit-responsable/repas-edit-responsable.component';
import { RepasViewResponsableComponent } from './repas-responsable/view-responsable/repas-view-responsable.component';
import { RepasListResponsableComponent } from './repas-responsable/list-responsable/repas-list-responsable.component';
import { TypeRepasCreateResponsableComponent } from './type-repas-responsable/create-responsable/type-repas-create-responsable.component';
import { TypeRepasEditResponsableComponent } from './type-repas-responsable/edit-responsable/type-repas-edit-responsable.component';
import { TypeRepasViewResponsableComponent } from './type-repas-responsable/view-responsable/type-repas-view-responsable.component';
import { TypeRepasListResponsableComponent } from './type-repas-responsable/list-responsable/type-repas-list-responsable.component';
import { JourCreateResponsableComponent } from './jour-responsable/create-responsable/jour-create-responsable.component';
import { JourEditResponsableComponent } from './jour-responsable/edit-responsable/jour-edit-responsable.component';
import { JourViewResponsableComponent } from './jour-responsable/view-responsable/jour-view-responsable.component';
import { JourListResponsableComponent } from './jour-responsable/list-responsable/jour-list-responsable.component';
import { PatientCreateResponsableComponent } from './patient-responsable/create-responsable/patient-create-responsable.component';
import { PatientEditResponsableComponent } from './patient-responsable/edit-responsable/patient-edit-responsable.component';
import { PatientViewResponsableComponent } from './patient-responsable/view-responsable/patient-view-responsable.component';
import { PatientListResponsableComponent } from './patient-responsable/list-responsable/patient-list-responsable.component';
import { PlanningExecutionCreateResponsableComponent } from './planning-execution-responsable/create-responsable/planning-execution-create-responsable.component';
import { PlanningExecutionEditResponsableComponent } from './planning-execution-responsable/edit-responsable/planning-execution-edit-responsable.component';
import { PlanningExecutionViewResponsableComponent } from './planning-execution-responsable/view-responsable/planning-execution-view-responsable.component';
import { PlanningExecutionListResponsableComponent } from './planning-execution-responsable/list-responsable/planning-execution-list-responsable.component';
import { PlanningCreateResponsableComponent } from './planning-responsable/create-responsable/planning-create-responsable.component';
import { PlanningEditResponsableComponent } from './planning-responsable/edit-responsable/planning-edit-responsable.component';
import { PlanningViewResponsableComponent } from './planning-responsable/view-responsable/planning-view-responsable.component';
import { PlanningListResponsableComponent } from './planning-responsable/list-responsable/planning-list-responsable.component';
import { CategoriePatientCreateResponsableComponent } from './categorie-patient-responsable/create-responsable/categorie-patient-create-responsable.component';
import { CategoriePatientEditResponsableComponent } from './categorie-patient-responsable/edit-responsable/categorie-patient-edit-responsable.component';
import { CategoriePatientViewResponsableComponent } from './categorie-patient-responsable/view-responsable/categorie-patient-view-responsable.component';
import { CategoriePatientListResponsableComponent } from './categorie-patient-responsable/list-responsable/categorie-patient-list-responsable.component';

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

    ResponsablePlanningCreateResponsableComponent,
    ResponsablePlanningListResponsableComponent,
    ResponsablePlanningViewResponsableComponent,
    ResponsablePlanningEditResponsableComponent,
    RepasCategoriePatientCreateResponsableComponent,
    RepasCategoriePatientListResponsableComponent,
    RepasCategoriePatientViewResponsableComponent,
    RepasCategoriePatientEditResponsableComponent,
    PlanningRepasCreateResponsableComponent,
    PlanningRepasListResponsableComponent,
    PlanningRepasViewResponsableComponent,
    PlanningRepasEditResponsableComponent,
    RepasCreateResponsableComponent,
    RepasListResponsableComponent,
    RepasViewResponsableComponent,
    RepasEditResponsableComponent,
    TypeRepasCreateResponsableComponent,
    TypeRepasListResponsableComponent,
    TypeRepasViewResponsableComponent,
    TypeRepasEditResponsableComponent,
    JourCreateResponsableComponent,
    JourListResponsableComponent,
    JourViewResponsableComponent,
    JourEditResponsableComponent,
    PatientCreateResponsableComponent,
    PatientListResponsableComponent,
    PatientViewResponsableComponent,
    PatientEditResponsableComponent,
    PlanningExecutionCreateResponsableComponent,
    PlanningExecutionListResponsableComponent,
    PlanningExecutionViewResponsableComponent,
    PlanningExecutionEditResponsableComponent,
    PlanningCreateResponsableComponent,
    PlanningListResponsableComponent,
    PlanningViewResponsableComponent,
    PlanningEditResponsableComponent,
    CategoriePatientCreateResponsableComponent,
    CategoriePatientListResponsableComponent,
    CategoriePatientViewResponsableComponent,
    CategoriePatientEditResponsableComponent,
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
  ResponsablePlanningCreateResponsableComponent,
  ResponsablePlanningListResponsableComponent,
  ResponsablePlanningViewResponsableComponent,
  ResponsablePlanningEditResponsableComponent,
  RepasCategoriePatientCreateResponsableComponent,
  RepasCategoriePatientListResponsableComponent,
  RepasCategoriePatientViewResponsableComponent,
  RepasCategoriePatientEditResponsableComponent,
  PlanningRepasCreateResponsableComponent,
  PlanningRepasListResponsableComponent,
  PlanningRepasViewResponsableComponent,
  PlanningRepasEditResponsableComponent,
  RepasCreateResponsableComponent,
  RepasListResponsableComponent,
  RepasViewResponsableComponent,
  RepasEditResponsableComponent,
  TypeRepasCreateResponsableComponent,
  TypeRepasListResponsableComponent,
  TypeRepasViewResponsableComponent,
  TypeRepasEditResponsableComponent,
  JourCreateResponsableComponent,
  JourListResponsableComponent,
  JourViewResponsableComponent,
  JourEditResponsableComponent,
  PatientCreateResponsableComponent,
  PatientListResponsableComponent,
  PatientViewResponsableComponent,
  PatientEditResponsableComponent,
  PlanningExecutionCreateResponsableComponent,
  PlanningExecutionListResponsableComponent,
  PlanningExecutionViewResponsableComponent,
  PlanningExecutionEditResponsableComponent,
  PlanningCreateResponsableComponent,
  PlanningListResponsableComponent,
  PlanningViewResponsableComponent,
  PlanningEditResponsableComponent,
  CategoriePatientCreateResponsableComponent,
  CategoriePatientListResponsableComponent,
  CategoriePatientViewResponsableComponent,
  CategoriePatientEditResponsableComponent,
  ],
  entryComponents: [],
})
export class RepasResponsableModule { }
