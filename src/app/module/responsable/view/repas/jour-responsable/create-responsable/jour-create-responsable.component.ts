import {Component, OnInit, Input} from '@angular/core';
import {JourService} from 'src/app/controller/service/Jour.service';
import {JourDto} from 'src/app/controller/model/Jour.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-jour-create-responsable',
  templateUrl: './jour-create-responsable.component.html'
})
export class JourCreateResponsableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validJourLibelle = true;
   _validJourCode = true;




    constructor(private datePipe: DatePipe, private jourService: JourService
     , private stringUtilService: StringUtilService, private roleService: RoleService,  private messageService: MessageService
     , private router: Router  

) {
}

    ngOnInit(): void {
}




private setValidation(value: boolean){
    this.validJourLibelle = value;
    this.validJourCode = value;
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
     this.jourService.save().subscribe(jour=>{
        if(jour != null){
           this.jours.push({...jour});
           this.createJourDialog = false;
           this.submitted = false;
           this.selectedJour = new JourDto();

        }else{
            this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Jour existe déjà' });
        }

        } , error =>{
            console.log(error);
        });
    }

    private validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateJourLibelle();
        this.validateJourCode();
    }

    private validateJourLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedJour.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validJourLibelle = false;
        } else {
            this.validJourLibelle = true;
        }
    }
    private validateJourCode(){
        if (this.stringUtilService.isEmpty(this.selectedJour.code)) {
        this.errorMessages.push('Code non valide');
        this.validJourCode = false;
        } else {
            this.validJourCode = true;
        }
    }







    hideCreateDialog(){
        this.createJourDialog  = false;
        this.setValidation(true);
    }

    get jours(): Array<JourDto> {
        return this.jourService.jours;
    }
    set jours(value: Array<JourDto>) {
            this.jourService.jours = value;
    }
     get selectedJour(): JourDto {
               return this.jourService.selectedJour;
     }
    set selectedJour(value: JourDto) {
        this.jourService.selectedJour = value;
    }

    get createJourDialog(): boolean {
        return this.jourService.createJourDialog;
    }
    set createJourDialog(value: boolean) {
        this.jourService.createJourDialog= value;
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


}
