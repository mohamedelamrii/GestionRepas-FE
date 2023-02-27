import {Component, OnInit, Input} from '@angular/core';
import {PlanningRepasService} from 'src/app/controller/service/PlanningRepas.service';
import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {PlanningDto} from 'src/app/controller/model/Planning.model';
import {PlanningService} from 'src/app/controller/service/Planning.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RepasService} from 'src/app/controller/service/Repas.service';
@Component({
  selector: 'app-planning-repas-create-admin',
  templateUrl: './planning-repas-create-admin.component.html'
})
export class PlanningRepasCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPlanningRepasQuantite = true;

    _validPlanningDateDebut = true;
    _validPlanningDateFin = true;
    _validPlanningCategoriePatient = true;
    _validRepasLibelle = true;
    _validTypeRepasLibelle = true;
    _validTypeRepasCode = true;



    constructor(private datePipe: DatePipe, private planningRepasService: PlanningRepasService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  
, private planningService: PlanningService, private typeRepasService: TypeRepasService, private repasService: RepasService
) {
}

    ngOnInit(): void {
    this.selectedPlanning = new PlanningDto();
    this.planningService.findAll().subscribe((data) => this.plannings = data);
    this.selectedRepas = new RepasDto();
    this.repasService.findAll().subscribe((data) => this.repass = data);
    this.selectedTypeRepas = new TypeRepasDto();
    this.typeRepasService.findAll().subscribe((data) => this.typeRepass = data);
}




private setValidation(value: boolean){
    this.validPlanningRepasQuantite = value;
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
     this.planningRepasService.save().subscribe(planningRepas=>{
        if(planningRepas != null){
           this.planningRepass.push({...planningRepas});
           this.createPlanningRepasDialog = false;
           this.submitted = false;
           this.selectedPlanningRepas = new PlanningRepasDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Planning repas existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validatePlanningRepasQuantite();
    }

    private validatePlanningRepasQuantite(){
        if (this.stringUtilService.isEmpty(this.selectedPlanningRepas.quantite)) {
        this.errorMessages.push('Quantite non valide');
        this.validPlanningRepasQuantite = false;
        } else {
            this.validPlanningRepasQuantite = true;
        }
    }









       public async openCreateTypeRepas(typeRepas: string) {
          const isPermistted = await this.roleService.isPermitted('TypeRepas', 'add');
         if(isPermistted) {
         this.selectedTypeRepas = new TypeRepasDto();
         this.createTypeRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreatePlanning(planning: string) {
          const isPermistted = await this.roleService.isPermitted('Planning', 'add');
         if(isPermistted) {
         this.selectedPlanning = new PlanningDto();
         this.createPlanningDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateRepas(repas: string) {
          const isPermistted = await this.roleService.isPermitted('Repas', 'add');
         if(isPermistted) {
         this.selectedRepas = new RepasDto();
         this.createRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

    hideCreateDialog(){
        this.createPlanningRepasDialog  = false;
        this.setValidation(true);
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

    get createPlanningRepasDialog(): boolean {
        return this.planningRepasService.createPlanningRepasDialog;
    }
    set createPlanningRepasDialog(value: boolean) {
        this.planningRepasService.createPlanningRepasDialog= value;
    }

    get selectedTypeRepas(): TypeRepasDto {
        return this.typeRepasService.selectedTypeRepas;
    }
    set selectedTypeRepas(value: TypeRepasDto) {
        this.typeRepasService.selectedTypeRepas = value;
    }
    get typeRepass(): Array<TypeRepasDto> {
        return this.typeRepasService.typeRepass;
    }
    set typeRepass(value: Array<TypeRepasDto>) {
        this.typeRepasService.typeRepass = value;
    }
    get createTypeRepasDialog(): boolean {
       return this.typeRepasService.createTypeRepasDialog;
    }
    set createTypeRepasDialog(value: boolean) {
        this.typeRepasService.createTypeRepasDialog= value;
    }
    get selectedPlanning(): PlanningDto {
        return this.planningService.selectedPlanning;
    }
    set selectedPlanning(value: PlanningDto) {
        this.planningService.selectedPlanning = value;
    }
    get plannings(): Array<PlanningDto> {
        return this.planningService.plannings;
    }
    set plannings(value: Array<PlanningDto>) {
        this.planningService.plannings = value;
    }
    get createPlanningDialog(): boolean {
       return this.planningService.createPlanningDialog;
    }
    set createPlanningDialog(value: boolean) {
        this.planningService.createPlanningDialog= value;
    }
    get selectedRepas(): RepasDto {
        return this.repasService.selectedRepas;
    }
    set selectedRepas(value: RepasDto) {
        this.repasService.selectedRepas = value;
    }
    get repass(): Array<RepasDto> {
        return this.repasService.repass;
    }
    set repass(value: Array<RepasDto>) {
        this.repasService.repass = value;
    }
    get createRepasDialog(): boolean {
       return this.repasService.createRepasDialog;
    }
    set createRepasDialog(value: boolean) {
        this.repasService.createRepasDialog= value;
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
    get validPlanningRepasQuantite(): boolean {
        return this._validPlanningRepasQuantite;
    }

    set validPlanningRepasQuantite(value: boolean) {
         this._validPlanningRepasQuantite = value;
    }

    get validPlanningDateDebut(): boolean {
        return this._validPlanningDateDebut;
    }

    set validPlanningDateDebut(value: boolean) {
        this._validPlanningDateDebut = value;
    }
    get validPlanningDateFin(): boolean {
        return this._validPlanningDateFin;
    }

    set validPlanningDateFin(value: boolean) {
        this._validPlanningDateFin = value;
    }
    get validPlanningCategoriePatient(): boolean {
        return this._validPlanningCategoriePatient;
    }

    set validPlanningCategoriePatient(value: boolean) {
        this._validPlanningCategoriePatient = value;
    }
    get validRepasLibelle(): boolean {
        return this._validRepasLibelle;
    }

    set validRepasLibelle(value: boolean) {
        this._validRepasLibelle = value;
    }
    get validTypeRepasLibelle(): boolean {
        return this._validTypeRepasLibelle;
    }

    set validTypeRepasLibelle(value: boolean) {
        this._validTypeRepasLibelle = value;
    }
    get validTypeRepasCode(): boolean {
        return this._validTypeRepasCode;
    }

    set validTypeRepasCode(value: boolean) {
        this._validTypeRepasCode = value;
    }

}
