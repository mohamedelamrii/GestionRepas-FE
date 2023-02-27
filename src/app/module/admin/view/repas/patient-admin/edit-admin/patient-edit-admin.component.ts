import {Component, OnInit, Input} from '@angular/core';
import {PatientService} from 'src/app/controller/service/Patient.service';
import {PatientDto} from 'src/app/controller/model/Patient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-patient-edit-admin',
  templateUrl: './patient-edit-admin.component.html'
})
export class PatientEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPatientIpp = true;
   _validPatientNom = true;
   _validPatientPrenom = true;
   _validPatientCin = true;




    constructor(private datePipe: DatePipe, private patientService: PatientService, private stringUtilService: StringUtilService,
        private roleService: RoleService, private messageService: MessageService, private router: Router
     
    
    ) {

    }

    ngOnInit(): void {
}




    private setValidation(value : boolean){
        this.validPatientIpp = value;
        this.validPatientNom = value;
        this.validPatientPrenom = value;
        this.validPatientCin = value;
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
         this.patientService.edit().subscribe(patient=>{
         const myIndex = this.patients.findIndex(e => e.id === this.selectedPatient.id);
         this.patients[myIndex] = patient;
         this.editPatientDialog = false;
         this.submitted = false;
         this.selectedPatient = new PatientDto();
    } , error =>{
        console.log(error);
    });

}

    private validateForm(): void{
    this.errorMessages = new Array<string>();
        this.validatePatientIpp();
        this.validatePatientNom();
        this.validatePatientPrenom();
        this.validatePatientCin();
    }

    private validatePatientIpp(){
        if (this.stringUtilService.isEmpty(this.selectedPatient.ipp)) {
            this.errorMessages.push('Ipp non valide');
            this.validPatientIpp = false;
        } else {
            this.validPatientIpp = true;
        }
    }
    private validatePatientNom(){
        if (this.stringUtilService.isEmpty(this.selectedPatient.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validPatientNom = false;
        } else {
            this.validPatientNom = true;
        }
    }
    private validatePatientPrenom(){
        if (this.stringUtilService.isEmpty(this.selectedPatient.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validPatientPrenom = false;
        } else {
            this.validPatientPrenom = true;
        }
    }
    private validatePatientCin(){
        if (this.stringUtilService.isEmpty(this.selectedPatient.cin)) {
            this.errorMessages.push('Cin non valide');
            this.validPatientCin = false;
        } else {
            this.validPatientCin = true;
        }
    }




    hideEditDialog(){
        this.editPatientDialog  = false;
        this.setValidation(true);
    }

    get patients(): Array<PatientDto> {
        return this.patientService.patients;
    }
    set patients(value: Array<PatientDto>) {
            this.patientService.patients = value;
    }

    get selectedPatient(): PatientDto {
           return this.patientService.selectedPatient;
    }
    set selectedPatient(value: PatientDto) {
        this.patientService.selectedPatient = value;
    }

   get editPatientDialog(): boolean {
           return this.patientService.editPatientDialog;
   }
    set editPatientDialog(value: boolean) {
        this.patientService.editPatientDialog= value;
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
    get validPatientIpp(): boolean {
        return this._validPatientIpp;
    }

    set validPatientIpp(value: boolean) {
        this._validPatientIpp = value;
    }
    get validPatientNom(): boolean {
        return this._validPatientNom;
    }

    set validPatientNom(value: boolean) {
        this._validPatientNom = value;
    }
    get validPatientPrenom(): boolean {
        return this._validPatientPrenom;
    }

    set validPatientPrenom(value: boolean) {
        this._validPatientPrenom = value;
    }
    get validPatientCin(): boolean {
        return this._validPatientCin;
    }

    set validPatientCin(value: boolean) {
        this._validPatientCin = value;
    }

}
