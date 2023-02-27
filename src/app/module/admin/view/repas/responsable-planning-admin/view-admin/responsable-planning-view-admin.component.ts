import {Component, OnInit} from '@angular/core';
import {ResponsablePlanningService} from 'src/app/controller/service/ResponsablePlanning.service';
import {ResponsablePlanningDto} from 'src/app/controller/model/ResponsablePlanning.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-responsable-planning-view-admin',
  templateUrl: './responsable-planning-view-admin.component.html'
})
export class ResponsablePlanningViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private responsablePlanningService: ResponsablePlanningService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewResponsablePlanningDialog  = false;
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

   get viewResponsablePlanningDialog(): boolean {
           return this.responsablePlanningService.viewResponsablePlanningDialog;
   }

    set viewResponsablePlanningDialog(value: boolean) {
        this.responsablePlanningService.viewResponsablePlanningDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
