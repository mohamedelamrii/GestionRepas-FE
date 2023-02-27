import {Component, OnInit, Input} from '@angular/core';
import {RepasCategoriePatientService} from 'src/app/controller/service/RepasCategoriePatient.service';
import {RepasCategoriePatientDto} from 'src/app/controller/model/RepasCategoriePatient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RepasService} from 'src/app/controller/service/Repas.service';
@Component({
  selector: 'app-repas-categorie-patient-create-admin',
  templateUrl: './repas-categorie-patient-create-admin.component.html'
})
export class RepasCategoriePatientCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validRepasLibelle = true;
    _validCategoriePatientLibelle = true;
    _validCategoriePatientCode = true;



    constructor(private datePipe: DatePipe, private repasCategoriePatientService: RepasCategoriePatientService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  
, private categoriePatientService: CategoriePatientService, private repasService: RepasService
) {
}

    ngOnInit(): void {
    this.selectedRepas = new RepasDto();
    this.repasService.findAll().subscribe((data) => this.repass = data);
    this.selectedCategoriePatient = new CategoriePatientDto();
    this.categoriePatientService.findAll().subscribe((data) => this.categoriePatients = data);
}




private setValidation(value: boolean){
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
     this.repasCategoriePatientService.save().subscribe(repasCategoriePatient=>{
        if(repasCategoriePatient != null){
           this.repasCategoriePatients.push({...repasCategoriePatient});
           this.createRepasCategoriePatientDialog = false;
           this.submitted = false;
           this.selectedRepasCategoriePatient = new RepasCategoriePatientDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Repas categorie patient existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
    }







       public async openCreateCategoriePatient(categoriePatient: string) {
          const isPermistted = await this.roleService.isPermitted('CategoriePatient', 'add');
         if(isPermistted) {
         this.selectedCategoriePatient = new CategoriePatientDto();
         this.createCategoriePatientDialog = true;
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
        this.createRepasCategoriePatientDialog  = false;
        this.setValidation(true);
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

    get createRepasCategoriePatientDialog(): boolean {
        return this.repasCategoriePatientService.createRepasCategoriePatientDialog;
    }
    set createRepasCategoriePatientDialog(value: boolean) {
        this.repasCategoriePatientService.createRepasCategoriePatientDialog= value;
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

    get validRepasLibelle(): boolean {
        return this._validRepasLibelle;
    }

    set validRepasLibelle(value: boolean) {
        this._validRepasLibelle = value;
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

}