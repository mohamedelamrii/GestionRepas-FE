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
  selector: 'app-planning-execution-create-admin',
  templateUrl: './planning-execution-create-admin.component.html'
})
export class PlanningExecutionCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPlanningExecutionDatePlanningExecution = true;
   _validPlanningExecutionQuantiteExecution = true;

    _validPlanningRepasQuantite = true;



    constructor(private datePipe: DatePipe, private planningExecutionService: PlanningExecutionService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  
, private planningRepasService: PlanningRepasService
) {
}

    ngOnInit(): void {
    this.selectedPlanningRepas = new PlanningRepasDto();
    this.planningRepasService.findAll().subscribe((data) => this.planningRepass = data);
}




private setValidation(value: boolean){
    this.validPlanningExecutionDatePlanningExecution = value;
    this.validPlanningExecutionQuantiteExecution = value;
    }


    public save(){
      this.submitted = true;
      this.validateForm();
      if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
      } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
      }
    }

    public saveWithShowOption(showList: boolean){
     this.planningExecutionService.save().subscribe(planningExecution=>{
        if(planningExecution != null){
           this.planningExecutions.push({...planningExecution});
           this.createPlanningExecutionDialog = false;
           this.submitted = false;
           this.selectedPlanningExecution = new PlanningExecutionDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Planning execution existe déjà' });
        }

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
          const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'add');
         if(isPermistted) {
         this.selectedPlanningRepas = new PlanningRepasDto();
         this.createPlanningRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

    hideCreateDialog(){
        this.createPlanningExecutionDialog  = false;
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

    get createPlanningExecutionDialog(): boolean {
        return this.planningExecutionService.createPlanningExecutionDialog;
    }
    set createPlanningExecutionDialog(value: boolean) {
        this.planningExecutionService.createPlanningExecutionDialog= value;
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
        return environment.dateFormatCreate;
    }
    get dateFormatColumn(){
        return environment.dateFormatCreate;
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
