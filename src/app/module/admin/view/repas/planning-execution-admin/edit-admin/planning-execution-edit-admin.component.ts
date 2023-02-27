import {Component, OnInit, Input} from '@angular/core';
import {PlanningExecutionService} from 'src/app/controller/service/PlanningExecution.service';
import {PlanningExecutionDto} from 'src/app/controller/model/PlanningExecution.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import {PlanningRepasService} from 'src/app/controller/service/PlanningRepas.service';
@Component({
  selector: 'app-planning-execution-edit-admin',
  templateUrl: './planning-execution-edit-admin.component.html'
})
export class PlanningExecutionEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPlanningExecutionDatePlanningExecution = true;
   _validPlanningExecutionQuantiteExecution = true;

    _validPlanningRepasQuantite = true;



    constructor(private datePipe: DatePipe, private planningExecutionService: PlanningExecutionService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    , private planningRepasService: PlanningRepasService
    ) {

    }

    ngOnInit(): void {
    this.selectedPlanningRepas = new PlanningRepasDto();
    this.planningRepasService.findAll().subscribe((data) => this.planningRepass = data);
}




    private setValidation(value : boolean){
        this.validPlanningExecutionDatePlanningExecution = value;
        this.validPlanningExecutionQuantiteExecution = value;
        }


    public edit(){
      this.submitted = true;
      this.validateForm();
      if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
      } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
      }
    }

    public editWithShowOption(showList: boolean){
         this.planningExecutionService.edit().subscribe(planningExecution=>{
         const myIndex = this.planningExecutions.findIndex(e => e.id === this.selectedPlanningExecution.id);
         this.planningExecutions[myIndex] = planningExecution;
         this.editPlanningExecutionDialog = false;
         this.submitted = false;
         this.selectedPlanningExecution = new PlanningExecutionDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
        this.validatePlanningExecutionDatePlanningExecution();
        this.validatePlanningExecutionQuantiteExecution();
    }

    private validatePlanningExecutionDatePlanningExecution(){
        if (this.stringUtilService.isEmpty(this.selectedPlanningExecution.datePlanningExecution)) {
            this.errorMessages.push('Date planning execution non valide');
            this.validPlanningExecutionDatePlanningExecution = false;
        } else {
            this.validPlanningExecutionDatePlanningExecution = true;
        }
    }
    private validatePlanningExecutionQuantiteExecution(){
        if (this.stringUtilService.isEmpty(this.selectedPlanningExecution.quantiteExecution)) {
            this.errorMessages.push('Quantite execution non valide');
            this.validPlanningExecutionQuantiteExecution = false;
        } else {
            this.validPlanningExecutionQuantiteExecution = true;
        }
    }



      public async openCreatePlanningRepas(planningRepas: string) {
        const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'edit');
        if(isPermistted) {
             this.selectedPlanningRepas = new PlanningRepasDto();
             this.createPlanningRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

    hideEditDialog(){
        this.editPlanningExecutionDialog  = false;
        this.setValidation(true);
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

   get editPlanningExecutionDialog(): boolean {
           return this.planningExecutionService.editPlanningExecutionDialog;
   }
    set editPlanningExecutionDialog(value: boolean) {
        this.planningExecutionService.editPlanningExecutionDialog= value;
    }

   get selectedPlanningRepas(): PlanningRepasDto {
       return this.planningRepasService.selectedPlanningRepas;
   }
  set selectedPlanningRepas(value: PlanningRepasDto) {
    this.planningRepasService.selectedPlanningRepas = value;
   }
   get planningRepass(): Array<PlanningRepasDto> {
       return this.planningRepasService.planningRepass;
   }
   set planningRepass(value: Array<PlanningRepasDto>) {
    this.planningRepasService.planningRepass = value;
   }
   get createPlanningRepasDialog(): boolean {
       return this.planningRepasService.createPlanningRepasDialog;
   }
  set createPlanningRepasDialog(value: boolean) {
    this.planningRepasService.createPlanningRepasDialog= value;
   }

    get dateFormat(){
        return environment.dateFormatEdit;
    }
    get dateFormatColumn(){
         return environment.dateFormatEdit;
     }
     get submitted(): boolean {
        return this._submitted;
    }
    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        return this._errorMessages;
    }
    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }
    get validPlanningExecutionDatePlanningExecution(): boolean {
        return this._validPlanningExecutionDatePlanningExecution;
    }

    set validPlanningExecutionDatePlanningExecution(value: boolean) {
        this._validPlanningExecutionDatePlanningExecution = value;
    }
    get validPlanningExecutionQuantiteExecution(): boolean {
        return this._validPlanningExecutionQuantiteExecution;
    }

    set validPlanningExecutionQuantiteExecution(value: boolean) {
        this._validPlanningExecutionQuantiteExecution = value;
    }

    get validPlanningRepasQuantite(): boolean {
        return this._validPlanningRepasQuantite;
    }

    set validPlanningRepasQuantite(value: boolean) {
        this._validPlanningRepasQuantite = value;
    }
}
