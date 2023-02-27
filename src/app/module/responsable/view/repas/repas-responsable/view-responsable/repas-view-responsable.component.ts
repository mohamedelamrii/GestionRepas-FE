import {Component, OnInit} from '@angular/core';
import {RepasService} from 'src/app/controller/service/Repas.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {RepasCategoriePatientDto} from 'src/app/controller/model/RepasCategoriePatient.model';
import {RepasCategoriePatientService} from 'src/app/controller/service/RepasCategoriePatient.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';

@Component({
  selector: 'app-repas-view-responsable',
  templateUrl: './repas-view-responsable.component.html'
})
export class RepasViewResponsableComponent implements OnInit {

    selectedRepasCategoriePatients = new RepasCategoriePatientDto();
    repasCategoriePatientsListe: Array<RepasCategoriePatientDto> = [];

    myCategoriePatients: Array<CategoriePatientDto> = [];


    constructor(private datePipe: DatePipe, private repasService: RepasService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ,private categoriePatientService: CategoriePatientService,private repasCategoriePatientService: RepasCategoriePatientService,private typeRepasService: TypeRepasService) {
    }


    ngOnInit(): void {
        this.selectedRepasCategoriePatients.categoriePatient = new CategoriePatientDto();
        this.categoriePatientService.findAll().subscribe((data) => this.categoriePatients = data);
        this.selectedTypeRepas = new TypeRepasDto();
        this.typeRepasService.findAll().subscribe((data) => this.typeRepass = data);
    }

    hideViewDialog(){
        this.viewRepasDialog  = false;
    }


    get repass(): Array<RepasDto> {
        return this.repasService.repass;
    }
    set repass(value: Array<RepasDto>) {
        this.repasService.repass = value;
    }

     get selectedRepas(): RepasDto {
        return this.repasService.selectedRepas;
     }
    set selectedRepas(value: RepasDto) {
        this.repasService.selectedRepas = value;
    }

   get viewRepasDialog(): boolean {
           return this.repasService.viewRepasDialog;
   }

    set viewRepasDialog(value: boolean) {
        this.repasService.viewRepasDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
