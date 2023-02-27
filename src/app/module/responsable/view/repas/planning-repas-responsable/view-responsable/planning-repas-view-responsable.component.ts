import {Component, OnInit} from '@angular/core';
import {PlanningRepasService} from 'src/app/controller/service/PlanningRepas.service';
import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PlanningDto} from 'src/app/controller/model/Planning.model';
import {PlanningService} from 'src/app/controller/service/Planning.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RepasService} from 'src/app/controller/service/Repas.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';

@Component({
  selector: 'app-planning-repas-view-responsable',
  templateUrl: './planning-repas-view-responsable.component.html'
})
export class PlanningRepasViewResponsableComponent implements OnInit {


    constructor(private datePipe: DatePipe, private planningRepasService: PlanningRepasService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ,private planningService: PlanningService,private repasService: RepasService,private typeRepasService: TypeRepasService) {
    }


    ngOnInit(): void {
        this.selectedPlanning = new PlanningDto();
        this.planningService.findAll().subscribe((data) => this.plannings = data);
        this.selectedRepas = new RepasDto();
        this.repasService.findAll().subscribe((data) => this.repass = data);
        this.selectedTypeRepas = new TypeRepasDto();
        this.typeRepasService.findAll().subscribe((data) => this.typeRepass = data);
    }

    hideViewDialog(){
        this.viewPlanningRepasDialog  = false;
    }


    get planningRepass(): Array<PlanningRepasDto> {
        return this.planningRepasService.planningRepass;
    }
    set planningRepass(value: Array<PlanningRepasDto>) {
        this.planningRepasService.planningRepass = value;
    }

     get selectedPlanningRepas(): PlanningRepasDto {
        return this.planningRepasService.selectedPlanningRepas;
     }
    set selectedPlanningRepas(value: PlanningRepasDto) {
        this.planningRepasService.selectedPlanningRepas = value;
    }

   get viewPlanningRepasDialog(): boolean {
           return this.planningRepasService.viewPlanningRepasDialog;
   }

    set viewPlanningRepasDialog(value: boolean) {
        this.planningRepasService.viewPlanningRepasDialog= value;
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
    get selectedPlanning(): PlanningDto {
       return this.planningService.selectedPlanning;
    }
    set selectedPlanning(value: PlanningDto) {
    this.planningService.selectedPlanning = value;
    }
    get plannings():Array<PlanningDto> {
       return this.planningService.plannings;
    }
    set plannings(value: Array<PlanningDto>) {
    this.planningService.plannings = value;
    }
    get editPlanningDialog(): boolean {
       return this.planningService.editPlanningDialog;
    }
    set editPlanningDialog(value: boolean) {
    this.planningService.editPlanningDialog= value;
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
