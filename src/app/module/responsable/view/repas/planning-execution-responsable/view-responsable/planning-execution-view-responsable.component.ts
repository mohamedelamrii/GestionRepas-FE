import {Component, OnInit} from '@angular/core';
import {PlanningExecutionService} from 'src/app/controller/service/PlanningExecution.service';
import {PlanningExecutionDto} from 'src/app/controller/model/PlanningExecution.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import {PlanningRepasService} from 'src/app/controller/service/PlanningRepas.service';

@Component({
  selector: 'app-planning-execution-view-responsable',
  templateUrl: './planning-execution-view-responsable.component.html'
})
export class PlanningExecutionViewResponsableComponent implements OnInit {


    constructor(private datePipe: DatePipe, private planningExecutionService: PlanningExecutionService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ,private planningRepasService: PlanningRepasService) {
    }


    ngOnInit(): void {
        this.selectedPlanningRepas = new PlanningRepasDto();
        this.planningRepasService.findAll().subscribe((data) => this.planningRepass = data);
    }

    hideViewDialog(){
        this.viewPlanningExecutionDialog  = false;
    }


    get planningExecutions(): Array<PlanningExecutionDto> {
        return this.planningExecutionService.planningExecutions;
    }
    set planningExecutions(value: Array<PlanningExecutionDto>) {
        this.planningExecutionService.planningExecutions = value;
    }

     get selectedPlanningExecution(): PlanningExecutionDto {
        return this.planningExecutionService.selectedPlanningExecution;
     }
    set selectedPlanningExecution(value: PlanningExecutionDto) {
        this.planningExecutionService.selectedPlanningExecution = value;
    }

   get viewPlanningExecutionDialog(): boolean {
           return this.planningExecutionService.viewPlanningExecutionDialog;
   }

    set viewPlanningExecutionDialog(value: boolean) {
        this.planningExecutionService.viewPlanningExecutionDialog= value;
   }

    get selectedPlanningRepas(): PlanningRepasDto {
       return this.planningRepasService.selectedPlanningRepas;
    }
    set selectedPlanningRepas(value: PlanningRepasDto) {
    this.planningRepasService.selectedPlanningRepas = value;
    }
    get planningRepass():Array<PlanningRepasDto> {
       return this.planningRepasService.planningRepass;
    }
    set planningRepass(value: Array<PlanningRepasDto>) {
    this.planningRepasService.planningRepass = value;
    }
    get editPlanningRepasDialog(): boolean {
       return this.planningRepasService.editPlanningRepasDialog;
    }
    set editPlanningRepasDialog(value: boolean) {
    this.planningRepasService.editPlanningRepasDialog= value;
    }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
