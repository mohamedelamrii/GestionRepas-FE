import {Component, OnInit} from '@angular/core';
import {PlanningService} from 'src/app/controller/service/Planning.service';
import {PlanningDto} from 'src/app/controller/model/Planning.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import {PlanningRepasService} from 'src/app/controller/service/PlanningRepas.service';
import {JourDto} from 'src/app/controller/model/Jour.model';
import {JourService} from 'src/app/controller/service/Jour.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RepasService} from 'src/app/controller/service/Repas.service';

@Component({
  selector: 'app-planning-view-admin',
  templateUrl: './planning-view-admin.component.html'
})
export class PlanningViewAdminComponent implements OnInit {

    selectedPlanningRepass = new PlanningRepasDto();
    planningRepassListe: Array<PlanningRepasDto> = [];

    myRepass: Array<RepasDto> = [];
    myTypeRepass: Array<TypeRepasDto> = [];


    constructor(private datePipe: DatePipe, private planningService: PlanningService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ,private categoriePatientService: CategoriePatientService,private planningRepasService: PlanningRepasService,private jourService: JourService,private typeRepasService: TypeRepasService,private repasService: RepasService) {
    }


    ngOnInit(): void {
        this.selectedPlanningRepass.repas = new RepasDto();
        this.repasService.findAll().subscribe((data) => this.repass = data);
        this.selectedPlanningRepass.typeRepas = new TypeRepasDto();
        this.typeRepasService.findAll().subscribe((data) => this.typeRepass = data);
        this.selectedCategoriePatient = new CategoriePatientDto();
        this.categoriePatientService.findAll().subscribe((data) => this.categoriePatients = data);
        this.selectedJour = new JourDto();
        this.jourService.findAll().subscribe((data) => this.jours = data);
    }

    hideViewDialog(){
        this.viewPlanningDialog  = false;
    }


    get plannings(): Array<PlanningDto> {
        return this.planningService.plannings;
    }
    set plannings(value: Array<PlanningDto>) {
        this.planningService.plannings = value;
    }

     get selectedPlanning(): PlanningDto {
        return this.planningService.selectedPlanning;
     }
    set selectedPlanning(value: PlanningDto) {
        this.planningService.selectedPlanning = value;
    }

   get viewPlanningDialog(): boolean {
           return this.planningService.viewPlanningDialog;
   }

    set viewPlanningDialog(value: boolean) {
        this.planningService.viewPlanningDialog= value;
   }

    get selectedTypeRepas(): TypeRepasDto {
       return this.typeRepasService.selectedTypeRepas;
    }
    set selectedTypeRepas(value: TypeRepasDto) {
    this.typeRepasService.selectedTypeRepas = value;
    }
    get typeRepass():Array<TypeRepasDto> {
       return this.typeRepasService.typeRepass;
    }
    set typeRepass(value: Array<TypeRepasDto>) {
    this.typeRepasService.typeRepass = value;
    }
    get editTypeRepasDialog(): boolean {
       return this.typeRepasService.editTypeRepasDialog;
    }
    set editTypeRepasDialog(value: boolean) {
    this.typeRepasService.editTypeRepasDialog= value;
    }
    get selectedCategoriePatient(): CategoriePatientDto {
       return this.categoriePatientService.selectedCategoriePatient;
    }
    set selectedCategoriePatient(value: CategoriePatientDto) {
    this.categoriePatientService.selectedCategoriePatient = value;
    }
    get categoriePatients():Array<CategoriePatientDto> {
       return this.categoriePatientService.categoriePatients;
    }
    set categoriePatients(value: Array<CategoriePatientDto>) {
    this.categoriePatientService.categoriePatients = value;
    }
    get editCategoriePatientDialog(): boolean {
       return this.categoriePatientService.editCategoriePatientDialog;
    }
    set editCategoriePatientDialog(value: boolean) {
    this.categoriePatientService.editCategoriePatientDialog= value;
    }
    get selectedJour(): JourDto {
       return this.jourService.selectedJour;
    }
    set selectedJour(value: JourDto) {
    this.jourService.selectedJour = value;
    }
    get jours():Array<JourDto> {
       return this.jourService.jours;
    }
    set jours(value: Array<JourDto>) {
    this.jourService.jours = value;
    }
    get editJourDialog(): boolean {
       return this.jourService.editJourDialog;
    }
    set editJourDialog(value: boolean) {
    this.jourService.editJourDialog= value;
    }
    get selectedRepas(): RepasDto {
       return this.repasService.selectedRepas;
    }
    set selectedRepas(value: RepasDto) {
    this.repasService.selectedRepas = value;
    }
    get repass():Array<RepasDto> {
       return this.repasService.repass;
    }
    set repass(value: Array<RepasDto>) {
    this.repasService.repass = value;
    }
    get editRepasDialog(): boolean {
       return this.repasService.editRepasDialog;
    }
    set editRepasDialog(value: boolean) {
    this.repasService.editRepasDialog= value;
    }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
