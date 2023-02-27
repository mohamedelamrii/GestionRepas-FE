import {Component, OnInit, Input} from '@angular/core';
import {PlanningService} from 'src/app/controller/service/Planning.service';
import {PlanningDto} from 'src/app/controller/model/Planning.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {JourDto} from 'src/app/controller/model/Jour.model';
import {JourService} from 'src/app/controller/service/Jour.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';
import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import {PlanningRepasService} from 'src/app/controller/service/PlanningRepas.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RepasService} from 'src/app/controller/service/Repas.service';
@Component({
  selector: 'app-planning-edit-admin',
  templateUrl: './planning-edit-admin.component.html'
})
export class PlanningEditAdminComponent implements OnInit {

        selectedPlanningRepass = new PlanningRepasDto();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPlanningDateDebut = true;
   _validPlanningDateFin = true;
   _validPlanningCategoriePatient = true;

    _validCategoriePatientLibelle = true;
    _validCategoriePatientCode = true;
    _validJourLibelle = true;
    _validJourCode = true;
    _validPlanningRepassQuantite = true;



    constructor(private datePipe: DatePipe, private planningService: PlanningService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    , private categoriePatientService: CategoriePatientService, private jourService: JourService, private typeRepasService: TypeRepasService, private planningRepasService: PlanningRepasService, private repasService: RepasService
    ) {

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


    validatePlanningRepass(){
    this.errorMessages = new Array();
    this.validatePlanningRepassQuantite();
    }


    private setValidation(value : boolean){
        this.validPlanningDateDebut = value;
        this.validPlanningDateFin = value;
        this.validPlanningCategoriePatient = value;
        this.validPlanningRepassQuantite = value;
        }

    addPlanningRepass() {
        if( this.selectedPlanning.planningRepass == null ){
            this.selectedPlanning.planningRepass = new Array<PlanningRepasDto>();
        }
       this.validatePlanningRepass();
       if (this.errorMessages.length === 0) {
          this.selectedPlanning.planningRepass.push(this.selectedPlanningRepass);
          this.selectedPlanningRepass = new PlanningRepasDto();
       }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
   }

    deletePlanningRepass(p: PlanningRepasDto) {
        this.selectedPlanning.planningRepass.forEach((element, index) => {
            if (element === p) { this.selectedPlanning.planningRepass.splice(index, 1); }
        });
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
         this.planningService.edit().subscribe(planning=>{
         const myIndex = this.plannings.findIndex(e => e.id === this.selectedPlanning.id);
         this.plannings[myIndex] = planning;
         this.editPlanningDialog = false;
         this.submitted = false;
         this.selectedPlanning = new PlanningDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
        this.validatePlanningDateDebut();
        this.validatePlanningDateFin();
        this.validatePlanningCategoriePatient();
    }

    private validatePlanningDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedPlanning.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validPlanningDateDebut = false;
        } else {
            this.validPlanningDateDebut = true;
        }
    }
    private validatePlanningDateFin(){
        if (this.stringUtilService.isEmpty(this.selectedPlanning.dateFin)) {
            this.errorMessages.push('Date fin non valide');
            this.validPlanningDateFin = false;
        } else {
            this.validPlanningDateFin = true;
        }
    }
    private validatePlanningCategoriePatient(){
        if (this.stringUtilService.isEmpty(this.selectedPlanning.categoriePatient)) {
            this.errorMessages.push('Categorie patient non valide');
            this.validPlanningCategoriePatient = false;
        } else {
            this.validPlanningCategoriePatient = true;
        }
    }


    private validatePlanningRepassQuantite(){
        if (this.selectedPlanningRepass.quantite == null) {
        this.errorMessages.push('Quantite de la planningRepas est  invalide');
            this.validPlanningRepassQuantite = false;
        } else {
            this.validPlanningRepassQuantite = true;
        }
}

      public async openCreateTypeRepas(typeRepas: string) {
        const isPermistted = await this.roleService.isPermitted('TypeRepas', 'edit');
        if(isPermistted) {
             this.selectedTypeRepas = new TypeRepasDto();
             this.createTypeRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateCategoriePatient(categoriePatient: string) {
        const isPermistted = await this.roleService.isPermitted('CategoriePatient', 'edit');
        if(isPermistted) {
             this.selectedCategoriePatient = new CategoriePatientDto();
             this.createCategoriePatientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateJour(jour: string) {
        const isPermistted = await this.roleService.isPermitted('Jour', 'edit');
        if(isPermistted) {
             this.selectedJour = new JourDto();
             this.createJourDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateRepas(repas: string) {
        const isPermistted = await this.roleService.isPermitted('Repas', 'edit');
        if(isPermistted) {
             this.selectedRepas = new RepasDto();
             this.createRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

    hideEditDialog(){
        this.editPlanningDialog  = false;
        this.setValidation(true);
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

   get editPlanningDialog(): boolean {
           return this.planningService.editPlanningDialog;
   }
    set editPlanningDialog(value: boolean) {
        this.planningService.editPlanningDialog= value;
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
   get selectedCategoriePatient(): CategoriePatientDto {
       return this.categoriePatientService.selectedCategoriePatient;
   }
  set selectedCategoriePatient(value: CategoriePatientDto) {
    this.categoriePatientService.selectedCategoriePatient = value;
   }
   get categoriePatients(): Array<CategoriePatientDto> {
       return this.categoriePatientService.categoriePatients;
   }
   set categoriePatients(value: Array<CategoriePatientDto>) {
    this.categoriePatientService.categoriePatients = value;
   }
   get createCategoriePatientDialog(): boolean {
       return this.categoriePatientService.createCategoriePatientDialog;
   }
  set createCategoriePatientDialog(value: boolean) {
    this.categoriePatientService.createCategoriePatientDialog= value;
   }
   get selectedJour(): JourDto {
       return this.jourService.selectedJour;
   }
  set selectedJour(value: JourDto) {
    this.jourService.selectedJour = value;
   }
   get jours(): Array<JourDto> {
       return this.jourService.jours;
   }
   set jours(value: Array<JourDto>) {
    this.jourService.jours = value;
   }
   get createJourDialog(): boolean {
       return this.jourService.createJourDialog;
   }
  set createJourDialog(value: boolean) {
    this.jourService.createJourDialog= value;
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

    get validCategoriePatientLibelle(): boolean {
        return this._validCategoriePatientLibelle;
    }

    set validCategoriePatientLibelle(value: boolean) {
        this._validCategoriePatientLibelle = value;
    }
    get validCategoriePatientCode(): boolean {
        return this._validCategoriePatientCode;
    }

    set validCategoriePatientCode(value: boolean) {
        this._validCategoriePatientCode = value;
    }
    get validJourLibelle(): boolean {
        return this._validJourLibelle;
    }

    set validJourLibelle(value: boolean) {
        this._validJourLibelle = value;
    }
    get validJourCode(): boolean {
        return this._validJourCode;
    }

    set validJourCode(value: boolean) {
        this._validJourCode = value;
    }
    get validPlanningRepassQuantite(): boolean {
        return this._validPlanningRepassQuantite;
    }

    set validPlanningRepassQuantite(value: boolean) {
        this._validPlanningRepassQuantite = value;
    }
}
