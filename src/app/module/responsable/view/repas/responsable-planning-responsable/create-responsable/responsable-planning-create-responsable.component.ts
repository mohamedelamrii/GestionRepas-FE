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
  selector: 'app-responsable-planning-create-responsable',
  templateUrl: './responsable-planning-create-responsable.component.html'
})
export class ResponsablePlanningCreateResponsableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validResponsablePlanningNom = true;
   _validResponsablePlanningPrenom = true;
   _validResponsablePlanningCin = true;
   _validResponsablePlanningCode = true;
   _validResponsablePlanningEmail = true;




    constructor(private datePipe: DatePipe, private responsablePlanningService: ResponsablePlanningService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  

) {
}

    ngOnInit(): void {
}




private setValidation(value: boolean){
    this.validResponsablePlanningNom = value;
    this.validResponsablePlanningPrenom = value;
    this.validResponsablePlanningCin = value;
    this.validResponsablePlanningCode = value;
    this.validResponsablePlanningEmail = value;
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
     this.responsablePlanningService.save().subscribe(responsablePlanning=>{
        if(responsablePlanning != null){
           this.responsablePlannings.push({...responsablePlanning});
           this.createResponsablePlanningDialog = false;
           this.submitted = false;
           this.selectedResponsablePlanning = new ResponsablePlanningDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Responsable planning existe déjà' });
        }

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











    hideCreateDialog(){
        this.createResponsablePlanningDialog  = false;
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

    get createResponsablePlanningDialog(): boolean {
        return this.responsablePlanningService.createResponsablePlanningDialog;
    }
    set createResponsablePlanningDialog(value: boolean) {
        this.responsablePlanningService.createResponsablePlanningDialog= value;
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
