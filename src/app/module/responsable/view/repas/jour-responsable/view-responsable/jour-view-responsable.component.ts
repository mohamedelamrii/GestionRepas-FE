import {Component, OnInit} from '@angular/core';
import {JourService} from 'src/app/controller/service/Jour.service';
import {JourDto} from 'src/app/controller/model/Jour.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-jour-view-responsable',
  templateUrl: './jour-view-responsable.component.html'
})
export class JourViewResponsableComponent implements OnInit {


    constructor(private datePipe: DatePipe, private jourService: JourService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewJourDialog  = false;
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

   get viewJourDialog(): boolean {
           return this.jourService.viewJourDialog;
   }

    set viewJourDialog(value: boolean) {
        this.jourService.viewJourDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
