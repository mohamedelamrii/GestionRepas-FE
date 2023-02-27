import {Component, OnInit} from '@angular/core';
import {PlanningRepasService} from 'src/app/controller/service/PlanningRepas.service';
import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import {PlanningRepasCriteria} from 'src/app/controller/criteria/PlanningRepasCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';



import { PlanningService } from 'src/app/controller/service/Planning.service';
import { RepasService } from 'src/app/controller/service/Repas.service';
import { TypeRepasService } from 'src/app/controller/service/TypeRepas.service';

import {PlanningDto} from 'src/app/controller/model/Planning.model';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-planning-repas-list-admin',
  templateUrl: './planning-repas-list-admin.component.html'
})
export class PlanningRepasListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PlanningRepas';

    plannings :Array<PlanningDto>;
    repass :Array<RepasDto>;
    typeRepass :Array<TypeRepasDto>;
    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private planningRepasService: PlanningRepasService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private planningService: PlanningService
        , private repasService: RepasService
        , private typeRepasService: TypeRepasService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
      this.loadPlanning();
      this.loadRepas();
      this.loadTypeRepas();
    }

    public async loadPlanningRepass(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'list');
        isPermistted ? this.planningRepasService.findAll().subscribe(planningRepass => this.planningRepass = planningRepass,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.planningRepasService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.planningRepass = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new PlanningRepasCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'planning?.id', header: 'Planning'},
            {field: 'repas?.libelle', header: 'Repas'},
            {field: 'typeRepas?.libelle', header: 'Type repas'},
            {field: 'quantite', header: 'Quantite'},
        ];
    }
    
    public async editPlanningRepas(planningRepas: PlanningRepasDto){
        const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'edit');
        if(isPermistted){
              this.planningRepasService.findByIdWithAssociatedList(planningRepas).subscribe(res => {
              this.selectedPlanningRepas = res;

              this.editPlanningRepasDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewPlanningRepas(planningRepas: PlanningRepasDto){
        const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'view');
        if(isPermistted){
           this.planningRepasService.findByIdWithAssociatedList(planningRepas).subscribe(res => {
           this.selectedPlanningRepas = res;
            this.viewPlanningRepasDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreatePlanningRepas(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedPlanningRepas = new PlanningRepasDto();
            this.createPlanningRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.planningRepasService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.planningRepasSelections == null || this.planningRepasSelections.length==0
    }


    public async deletePlanningRepas(planningRepas: PlanningRepasDto){
       const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Planning repas) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.planningRepasService.delete(planningRepas).subscribe(status=>{
              if(status > 0){
                  const position = this.planningRepass.indexOf(planningRepas);
                  position > -1 ? this.planningRepass.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Planning repas Supprimé',
                    life: 3000
                  });
              }

        },error=>console.log(error))
                 }
            });
    }else{
    this.messageService.add({
    severity: 'error', summary: 'erreur', detail: 'Problème de permission'
    });
    }
    }

public async loadPlanning(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'list');
    isPermistted ? this.planningService.findAll().subscribe(plannings => this.plannings = plannings,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadRepas(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'list');
    isPermistted ? this.repasService.findAll().subscribe(repass => this.repass = repass,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeRepas(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PlanningRepas', 'list');
    isPermistted ? this.typeRepasService.findAll().subscribe(typeRepass => this.typeRepass = typeRepass,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

    public async duplicatePlanningRepas(planningRepas: PlanningRepasDto) {
        this.planningRepasService.findByIdWithAssociatedList(planningRepas).subscribe(
	    res => {
	       this.initDuplicatePlanningRepas(res);
	       this.selectedPlanningRepas = res;
	       this.selectedPlanningRepas.id = null;


            this.createPlanningRepasDialog = true;
        });

	}

	initDuplicatePlanningRepas(res: PlanningRepasDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.planningRepass.map(e => {
            return {
                'Planning': e.planning?.id ,
                'Repas': e.repas?.libelle ,
                'Type repas': e.typeRepas?.libelle ,
                 'Quantite': e.quantite ,
                 'Description': e.description ,
            }
        });

        this.criteriaData = [{
        //'Planning': this.search.planning?.id ? this.search.planning?.id : environment.emptyForExport ,
        //'Repas': this.search.repas?.libelle ? this.search.repas?.libelle : environment.emptyForExport ,
        //'Type repas': this.search.typeRepas?.libelle ? this.search.typeRepas?.libelle : environment.emptyForExport ,
            'Quantite Min': this.search.quantiteMin ? this.search.quantiteMin : environment.emptyForExport ,
            'Quantite Max': this.search.quantiteMax ? this.search.quantiteMax : environment.emptyForExport ,
            'Description': this.search.description ? this.search.description : environment.emptyForExport ,
        }];
      }

    get planningRepass() : Array<PlanningRepasDto> {
           return this.planningRepasService.planningRepass;
    }
    set planningRepass(value: Array<PlanningRepasDto>) {
        this.planningRepasService.planningRepass = value;
    }

    get planningRepasSelections() : Array<PlanningRepasDto> {
           return this.planningRepasService.planningRepasSelections;
    }
    set planningRepasSelections(value: Array<PlanningRepasDto>) {
        this.planningRepasService.planningRepasSelections = value;
    }

    get selectedPlanningRepas() : PlanningRepasDto {
           return this.planningRepasService.selectedPlanningRepas;
    }
    set selectedPlanningRepas(value: PlanningRepasDto) {
        this.planningRepasService.selectedPlanningRepas = value;
    }
    
    get createPlanningRepasDialog() :boolean {
           return this.planningRepasService.createPlanningRepasDialog;
    }
    set createPlanningRepasDialog(value: boolean) {
        this.planningRepasService.createPlanningRepasDialog= value;
    }
    
    get editPlanningRepasDialog() :boolean {
           return this.planningRepasService.editPlanningRepasDialog;
    }
    set editPlanningRepasDialog(value: boolean) {
        this.planningRepasService.editPlanningRepasDialog= value;
    }
    get viewPlanningRepasDialog() :boolean {
           return this.planningRepasService.viewPlanningRepasDialog;
    }
    set viewPlanningRepasDialog(value: boolean) {
        this.planningRepasService.viewPlanningRepasDialog = value;
    }
       
     get search() : PlanningRepasCriteria {
        return this.planningRepasService.search;
     }
    set search(value: PlanningRepasCriteria) {
        this.planningRepasService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
