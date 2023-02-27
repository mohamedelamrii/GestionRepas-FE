import {Component, OnInit} from '@angular/core';
import {RepasCategoriePatientService} from 'src/app/controller/service/RepasCategoriePatient.service';
import {RepasCategoriePatientDto} from 'src/app/controller/model/RepasCategoriePatient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RepasService} from 'src/app/controller/service/Repas.service';

@Component({
  selector: 'app-repas-categorie-patient-view-admin',
  templateUrl: './repas-categorie-patient-view-admin.component.html'
})
export class RepasCategoriePatientViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private repasCategoriePatientService: RepasCategoriePatientService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ,private categoriePatientService: CategoriePatientService,private repasService: RepasService) {
    }


    ngOnInit(): void {
        this.selectedRepas = new RepasDto();
        this.repasService.findAll().subscribe((data) => this.repass = data);
        this.selectedCategoriePatient = new CategoriePatientDto();
        this.categoriePatientService.findAll().subscribe((data) => this.categoriePatients = data);
    }

    hideViewDialog(){
        this.viewRepasCategoriePatientDialog  = false;
    }


    get repasCategoriePatients(): Array<RepasCategoriePatientDto> {
        return this.repasCategoriePatientService.repasCategoriePatients;
    }
    set repasCategoriePatients(value: Array<RepasCategoriePatientDto>) {
        this.repasCategoriePatientService.repasCategoriePatients = value;
    }

     get selectedRepasCategoriePatient(): RepasCategoriePatientDto {
        return this.repasCategoriePatientService.selectedRepasCategoriePatient;
     }
    set selectedRepasCategoriePatient(value: RepasCategoriePatientDto) {
        this.repasCategoriePatientService.selectedRepasCategoriePatient = value;
    }

   get viewRepasCategoriePatientDialog(): boolean {
           return this.repasCategoriePatientService.viewRepasCategoriePatientDialog;
   }

    set viewRepasCategoriePatientDialog(value: boolean) {
        this.repasCategoriePatientService.viewRepasCategoriePatientDialog= value;
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
