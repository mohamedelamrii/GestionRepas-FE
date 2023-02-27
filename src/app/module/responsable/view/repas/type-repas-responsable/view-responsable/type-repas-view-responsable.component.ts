import {Component, OnInit} from '@angular/core';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-repas-view-responsable',
  templateUrl: './type-repas-view-responsable.component.html'
})
export class TypeRepasViewResponsableComponent implements OnInit {


    constructor(private datePipe: DatePipe, private typeRepasService: TypeRepasService
    ,private roleService:RoleService, private messageService: MessageService, private router: Router
    ) {
    }


    ngOnInit(): void {
    }

    hideViewDialog(){
        this.viewTypeRepasDialog  = false;
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

   get viewTypeRepasDialog(): boolean {
           return this.typeRepasService.viewTypeRepasDialog;
   }

    set viewTypeRepasDialog(value: boolean) {
        this.typeRepasService.viewTypeRepasDialog= value;
   }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
