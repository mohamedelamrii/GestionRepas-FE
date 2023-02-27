import {Component, OnInit, Input} from '@angular/core';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-categorie-patient-edit-admin',
  templateUrl: './categorie-patient-edit-admin.component.html'
})
export class CategoriePatientEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCategoriePatientLibelle = true;
   _validCategoriePatientCode = true;




    constructor(private datePipe: DatePipe, private categoriePatientService: CategoriePatientService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    
    ) {

    }

    ngOnInit(): void {
}




    private setValidation(value : boolean){
        this.validCategoriePatientLibelle = value;
        this.validCategoriePatientCode = value;
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
         this.categoriePatientService.edit().subscribe(categoriePatient=>{
         const myIndex = this.categoriePatients.findIndex(e => e.id === this.selectedCategoriePatient.id);
         this.categoriePatients[myIndex] = categoriePatient;
         this.editCategoriePatientDialog = false;
         this.submitted = false;
         this.selectedCategoriePatient = new CategoriePatientDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
        this.validateCategoriePatientLibelle();
        this.validateCategoriePatientCode();
    }

    private validateCategoriePatientLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCategoriePatient.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCategoriePatientLibelle = false;
        } else {
            this.validCategoriePatientLibelle = true;
        }
    }
    private validateCategoriePatientCode(){
        if (this.stringUtilService.isEmpty(this.selectedCategoriePatient.code)) {
            this.errorMessages.push('Code non valide');
            this.validCategoriePatientCode = false;
        } else {
            this.validCategoriePatientCode = true;
        }
    }




    hideEditDialog(){
        this.editCategoriePatientDialog  = false;
        this.setValidation(true);
    }

    get categoriePatients(): Array<CategoriePatientDto> {
        return this.categoriePatientService.categoriePatients;
    }
    set categoriePatients(value: Array<CategoriePatientDto>) {
            this.categoriePatientService.categoriePatients = value;
    }

    get selectedCategoriePatient(): CategoriePatientDto {
           return this.categoriePatientService.selectedCategoriePatient;
    }
    set selectedCategoriePatient(value: CategoriePatientDto) {
        this.categoriePatientService.selectedCategoriePatient = value;
    }

   get editCategoriePatientDialog(): boolean {
           return this.categoriePatientService.editCategoriePatientDialog;
   }
    set editCategoriePatientDialog(value: boolean) {
        this.categoriePatientService.editCategoriePatientDialog= value;
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
