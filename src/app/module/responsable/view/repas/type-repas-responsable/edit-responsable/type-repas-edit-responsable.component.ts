import {Component, OnInit, Input} from '@angular/core';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-type-repas-edit-responsable',
  templateUrl: './type-repas-edit-responsable.component.html'
})
export class TypeRepasEditResponsableComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeRepasLibelle = true;
   _validTypeRepasCode = true;




    constructor(private datePipe: DatePipe, private typeRepasService: TypeRepasService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    
    ) {

    }

    ngOnInit(): void {
}




    private setValidation(value : boolean){
        this.validTypeRepasLibelle = value;
        this.validTypeRepasCode = value;
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
         this.typeRepasService.edit().subscribe(typeRepas=>{
         const myIndex = this.typeRepass.findIndex(e => e.id === this.selectedTypeRepas.id);
         this.typeRepass[myIndex] = typeRepas;
         this.editTypeRepasDialog = false;
         this.submitted = false;
         this.selectedTypeRepas = new TypeRepasDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
        this.validateTypeRepasLibelle();
        this.validateTypeRepasCode();
    }

    private validateTypeRepasLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeRepas.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeRepasLibelle = false;
        } else {
            this.validTypeRepasLibelle = true;
        }
    }
    private validateTypeRepasCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeRepas.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeRepasCode = false;
        } else {
            this.validTypeRepasCode = true;
        }
    }




    hideEditDialog(){
        this.editTypeRepasDialog  = false;
        this.setValidation(true);
    }

    get typeRepass(): Array<TypeRepasDto> {
        return this.typeRepasService.typeRepass;
    }
    set typeRepass(value: Array<TypeRepasDto>) {
            this.typeRepasService.typeRepass = value;
    }

    get selectedTypeRepas(): TypeRepasDto {
           return this.typeRepasService.selectedTypeRepas;
    }
    set selectedTypeRepas(value: TypeRepasDto) {
        this.typeRepasService.selectedTypeRepas = value;
    }

   get editTypeRepasDialog(): boolean {
           return this.typeRepasService.editTypeRepasDialog;
   }
    set editTypeRepasDialog(value: boolean) {
        this.typeRepasService.editTypeRepasDialog= value;
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
