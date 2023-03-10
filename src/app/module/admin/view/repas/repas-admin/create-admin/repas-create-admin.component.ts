import {Component, OnInit, Input} from '@angular/core';
import {RepasService} from 'src/app/controller/service/Repas.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';
import {RepasCategoriePatientDto} from 'src/app/controller/model/RepasCategoriePatient.model';
import {RepasCategoriePatientService} from 'src/app/controller/service/RepasCategoriePatient.service';
@Component({
  selector: 'app-repas-create-admin',
  templateUrl: './repas-create-admin.component.html'
})
export class RepasCreateAdminComponent implements OnInit {

        selectedRepasCategoriePatients = new RepasCategoriePatientDto();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRepasLibelle = true;

    _validTypeRepasLibelle = true;
    _validTypeRepasCode = true;


    private _repasCategoriePatients: Array<RepasCategoriePatientDto> = [];

    constructor(private datePipe: DatePipe, private repasService: RepasService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  
, private categoriePatientService: CategoriePatientService, private typeRepasService: TypeRepasService, private repasCategoriePatientService: RepasCategoriePatientService
) {
}

    ngOnInit(): void {
        this.categoriePatientService.findAll().subscribe(data => this.prepareRepasCategoriePatients(data));

        this.selectedRepasCategoriePatients.categoriePatient = new CategoriePatientDto();
        this.categoriePatientService.findAll().subscribe((data) => this.categoriePatients = data);


    this.selectedTypeRepas = new TypeRepasDto();
    this.typeRepasService.findAll().subscribe((data) => this.typeRepass = data);
}

     prepareRepasCategoriePatients(categoriePatients: Array<CategoriePatientDto>): void{
        if( categoriePatients != null){
                categoriePatients.forEach(e => {
                const repasCategoriePatient = new RepasCategoriePatientDto();
                repasCategoriePatient.categoriePatient = e;
                this.repasCategoriePatients.push(repasCategoriePatient);
            });
    }
}



private setValidation(value: boolean){
    this.validRepasLibelle = value;
    }


    public save(){
      this.submitted = true;
      this.validateForm();
      if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
      } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrig?? les erreurs sur le formulaire'});
      }
    }

    public saveWithShowOption(showList: boolean){
     this.repasService.save().subscribe(repas=>{
        if(repas != null){
           this.repass.push({...repas});
           this.createRepasDialog = false;
           this.submitted = false;
           this.selectedRepas = new RepasDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Repas existe d??j??' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateRepasLibelle();
    }

    private validateRepasLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedRepas.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validRepasLibelle = false;
        } else {
            this.validRepasLibelle = true;
        }
    }













       public async openCreateTypeRepas(typeRepas: string) {
          const isPermistted = await this.roleService.isPermitted('TypeRepas', 'add');
         if(isPermistted) {
         this.selectedTypeRepas = new TypeRepasDto();
         this.createTypeRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me de permission'
            });
        }
}
       public async openCreateCategoriePatient(categoriePatient: string) {
          const isPermistted = await this.roleService.isPermitted('CategoriePatient', 'add');
         if(isPermistted) {
         this.selectedCategoriePatient = new CategoriePatientDto();
         this.createCategoriePatientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me de permission'
            });
        }
}

    hideCreateDialog(){
        this.createRepasDialog  = false;
        this.setValidation(true);
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

    get createRepasDialog(): boolean {
        return this.repasService.createRepasDialog;
    }
    set createRepasDialog(value: boolean) {
        this.repasService.createRepasDialog= value;
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
    get repasCategoriePatients(): Array<RepasCategoriePatientDto> {
        if( this._repasCategoriePatients == null )
            this._repasCategoriePatients = new Array();
        return this._repasCategoriePatients;
    }

    set repasCategoriePatients(value: Array<RepasCategoriePatientDto>) {
        this._repasCategoriePatients = value;
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
