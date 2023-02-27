import {Component, OnInit} from '@angular/core';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-categorie-patient-view-admin',
  templateUrl: './categorie-patient-view-admin.component.html'
})
export class CategoriePatientViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private categoriePatientService: CategoriePatientService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewCategoriePatientDialog  = false;
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

   get viewCategoriePatientDialog(): boolean {
           return this.categoriePatientService.viewCategoriePatientDialog;
   }

    set viewCategoriePatientDialog(value: boolean) {
        this.categoriePatientService.viewCategoriePatientDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
