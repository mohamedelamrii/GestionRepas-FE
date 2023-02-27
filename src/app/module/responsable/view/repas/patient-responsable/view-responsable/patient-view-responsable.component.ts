import {Component, OnInit} from '@angular/core';
import {PatientService} from 'src/app/controller/service/Patient.service';
import {PatientDto} from 'src/app/controller/model/Patient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-patient-view-responsable',
  templateUrl: './patient-view-responsable.component.html'
})
export class PatientViewResponsableComponent implements OnInit {


    constructor(private datePipe: DatePipe, private patientService: PatientService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewPatientDialog  = false;
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

   get viewPatientDialog(): boolean {
           return this.patientService.viewPatientDialog;
   }

    set viewPatientDialog(value: boolean) {
        this.patientService.viewPatientDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
