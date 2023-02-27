import {Component, OnInit, Input} from '@angular/core';
import {ResponsablePlanningService} from 'src/app/controller/service/ResponsablePlanning.service';
import {ResponsablePlanningDto} from 'src/app/controller/model/ResponsablePlanning.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-responsable-planning-edit-responsable',
  templateUrl: './responsable-planning-edit-responsable.component.html'
})
export class ResponsablePlanningEditResponsableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validResponsablePlanningNom = true;
   _validResponsablePlanningPrenom = true;
   _validResponsablePlanningCin = true;
   _validResponsablePlanningCode = true;
   _validResponsablePlanningEmail = true;




    constructor(private datePipe: DatePipe, private responsablePlanningService: ResponsablePlanningService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    
    ) {

    }

    ngOnInit(): void {
}




    private setValidation(value : boolean){
        this.validResponsablePlanningNom = value;
        this.validResponsablePlanningPrenom = value;
        this.validResponsablePlanningCin = value;
        this.validResponsablePlanningCode = value;
        this.validResponsablePlanningEmail = value;
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
         this.responsablePlanningService.edit().subscribe(responsablePlanning=>{
         const myIndex = this.responsablePlannings.findIndex(e => e.id === this.selectedResponsablePlanning.id);
         this.responsablePlannings[myIndex] = responsablePlanning;
         this.editResponsablePlanningDialog = false;
         this.submitted = false;
         this.selectedResponsablePlanning = new ResponsablePlanningDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
        this.validateResponsablePlanningNom();
        this.validateResponsablePlanningPrenom();
        this.validateResponsablePlanningCin();
        this.validateResponsablePlanningCode();
        this.validateResponsablePlanningEmail();
    }

    private validateResponsablePlanningNom(){
        if (this.stringUtilService.isEmpty(this.selectedResponsablePlanning.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validResponsablePlanningNom = false;
        } else {
            this.validResponsablePlanningNom = true;
        }
    }
    private validateResponsablePlanningPrenom(){
        if (this.stringUtilService.isEmpty(this.selectedResponsablePlanning.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validResponsablePlanningPrenom = false;
        } else {
            this.validResponsablePlanningPrenom = true;
        }
    }
    private validateResponsablePlanningCin(){
        if (this.stringUtilService.isEmpty(this.selectedResponsablePlanning.cin)) {
            this.errorMessages.push('Cin non valide');
            this.validResponsablePlanningCin = false;
        } else {
            this.validResponsablePlanningCin = true;
        }
    }
    private validateResponsablePlanningCode(){
        if (this.stringUtilService.isEmpty(this.selectedResponsablePlanning.code)) {
            this.errorMessages.push('Code non valide');
            this.validResponsablePlanningCode = false;
        } else {
            this.validResponsablePlanningCode = true;
        }
    }
    private validateResponsablePlanningEmail(){
        if (this.stringUtilService.isEmpty(this.selectedResponsablePlanning.email)) {
            this.errorMessages.push('Email non valide');
            this.validResponsablePlanningEmail = false;
        } else {
            this.validResponsablePlanningEmail = true;
        }
    }




    hideEditDialog(){
        this.editResponsablePlanningDialog  = false;
        this.setValidation(true);
    }

    get responsablePlannings(): Array<ResponsablePlanningDto> {
        return this.responsablePlanningService.responsablePlannings;
    }
    set responsablePlannings(value: Array<ResponsablePlanningDto>) {
            this.responsablePlanningService.responsablePlannings = value;
    }

    get selectedResponsablePlanning(): ResponsablePlanningDto {
           return this.responsablePlanningService.selectedResponsablePlanning;
    }
    set selectedResponsablePlanning(value: ResponsablePlanningDto) {
        this.responsablePlanningService.selectedResponsablePlanning = value;
    }

   get editResponsablePlanningDialog(): boolean {
           return this.responsablePlanningService.editResponsablePlanningDialog;
   }
    set editResponsablePlanningDialog(value: boolean) {
        this.responsablePlanningService.editResponsablePlanningDialog= value;
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
    get validResponsablePlanningNom(): boolean {
        return this._validResponsablePlanningNom;
    }

    set validResponsablePlanningNom(value: boolean) {
        this._validResponsablePlanningNom = value;
    }
    get validResponsablePlanningPrenom(): boolean {
        return this._validResponsablePlanningPrenom;
    }

    set validResponsablePlanningPrenom(value: boolean) {
        this._validResponsablePlanningPrenom = value;
    }
    get validResponsablePlanningCin(): boolean {
        return this._validResponsablePlanningCin;
    }

    set validResponsablePlanningCin(value: boolean) {
        this._validResponsablePlanningCin = value;
    }
    get validResponsablePlanningCode(): boolean {
        return this._validResponsablePlanningCode;
    }

    set validResponsablePlanningCode(value: boolean) {
        this._validResponsablePlanningCode = value;
    }
    get validResponsablePlanningEmail(): boolean {
        return this._validResponsablePlanningEmail;
    }

    set validResponsablePlanningEmail(value: boolean) {
        this._validResponsablePlanningEmail = value;
    }

}
