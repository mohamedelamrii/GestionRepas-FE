import {Component, OnInit} from '@angular/core';
import {PlanningExecutionService} from 'src/app/controller/service/PlanningExecution.service';
import {PlanningExecutionDto} from 'src/app/controller/model/PlanningExecution.model';
import {PlanningExecutionCriteria} from 'src/app/controller/criteria/PlanningExecutionCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';



import { PlanningRepasService } from 'src/app/controller/service/PlanningRepas.service';

import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-planning-execution-list-admin',
  templateUrl: './planning-execution-list-admin.component.html'
})
export class PlanningExecutionListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PlanningExecution';

    planningRepass :Array<PlanningRepasDto>;
    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private planningExecutionService: PlanningExecutionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private planningRepasService: PlanningRepasService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
      this.loadPlanningRepas();
    }

    public async loadPlanningExecutions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PlanningExecution', 'list');
        isPermistted ? this.planningExecutionService.findAll().subscribe(planningExecutions => this.planningExecutions = planningExecutions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.planningExecutionService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.planningExecutions = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new PlanningExecutionCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'datePlanningExecution', header: 'Date planning execution'},
            {field: 'quantiteExecution', header: 'Quantite execution'},
            {field: 'planningRepas?.id', header: 'Planning repas'},
        ];
    }
    
    public async editPlanningExecution(planningExecution: PlanningExecutionDto){
        const isPermistted = await this.roleService.isPermitted('PlanningExecution', 'edit');
        if(isPermistted){
              this.planningExecutionService.findByIdWithAssociatedList(planningExecution).subscribe(res => {
              this.selectedPlanningExecution = res;
              this.selectedPlanningExecution.datePlanningExecution = new Date(planningExecution.datePlanningExecution);

              this.editPlanningExecutionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewPlanningExecution(planningExecution: PlanningExecutionDto){
        const isPermistted = await this.roleService.isPermitted('PlanningExecution', 'view');
        if(isPermistted){
           this.planningExecutionService.findByIdWithAssociatedList(planningExecution).subscribe(res => {
           this.selectedPlanningExecution = res;
           this.selectedPlanningExecution.datePlanningExecution = new Date(planningExecution.datePlanningExecution);
            this.viewPlanningExecutionDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreatePlanningExecution(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedPlanningExecution = new PlanningExecutionDto();
            this.createPlanningExecutionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('PlanningExecution', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.planningExecutionService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.planningExecutionSelections == null || this.planningExecutionSelections.length==0
    }


    public async deletePlanningExecution(planningExecution: PlanningExecutionDto){
       const isPermistted = await this.roleService.isPermitted('PlanningExecution', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Planning execution) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.planningExecutionService.delete(planningExecution).subscribe(status=>{
              if(status > 0){
                  const position = this.planningExecutions.indexOf(planningExecution);
                  position > -1 ? this.planningExecutions.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Planning execution Supprimé',
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

public async loadPlanningRepas(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PlanningExecution', 'list');
    isPermistted ? this.planningRepasService.findAll().subscribe(planningRepass => this.planningRepass = planningRepass,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

    public async duplicatePlanningExecution(planningExecution: PlanningExecutionDto) {
        this.planningExecutionService.findByIdWithAssociatedList(planningExecution).subscribe(
	    res => {
	       this.initDuplicatePlanningExecution(res);
	       this.selectedPlanningExecution = res;
	       this.selectedPlanningExecution.id = null;


            this.createPlanningExecutionDialog = true;
        });

	}

	initDuplicatePlanningExecution(res: PlanningExecutionDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.planningExecutions.map(e => {
            return {
                'Date planning execution': this.datePipe.transform(e.datePlanningExecution , 'dd/MM/yyyy hh:mm'),
                 'Quantite execution': e.quantiteExecution ,
                'Planning repas': e.planningRepas?.id ,
                 'Commentaire': e.commentaire ,
            }
        });

        this.criteriaData = [{
            'Date planning execution Min': this.search.datePlanningExecutionFrom ? this.datePipe.transform(this.search.datePlanningExecutionFrom , this.dateFormat) : environment.emptyForExport ,
            'Date planning execution Max': this.search.datePlanningExecutionTo ? this.datePipe.transform(this.search.datePlanningExecutionTo , this.dateFormat) : environment.emptyForExport ,
            'Quantite execution Min': this.search.quantiteExecutionMin ? this.search.quantiteExecutionMin : environment.emptyForExport ,
            'Quantite execution Max': this.search.quantiteExecutionMax ? this.search.quantiteExecutionMax : environment.emptyForExport ,
        //'Planning repas': this.search.planningRepas?.id ? this.search.planningRepas?.id : environment.emptyForExport ,
            'Commentaire': this.search.commentaire ? this.search.commentaire : environment.emptyForExport ,
        }];
      }

    get planningExecutions() : Array<PlanningExecutionDto> {
           return this.planningExecutionService.planningExecutions;
    }
    set planningExecutions(value: Array<PlanningExecutionDto>) {
        this.planningExecutionService.planningExecutions = value;
    }

    get planningExecutionSelections() : Array<PlanningExecutionDto> {
           return this.planningExecutionService.planningExecutionSelections;
    }
    set planningExecutionSelections(value: Array<PlanningExecutionDto>) {
        this.planningExecutionService.planningExecutionSelections = value;
    }

    get selectedPlanningExecution() : PlanningExecutionDto {
           return this.planningExecutionService.selectedPlanningExecution;
    }
    set selectedPlanningExecution(value: PlanningExecutionDto) {
        this.planningExecutionService.selectedPlanningExecution = value;
    }
    
    get createPlanningExecutionDialog() :boolean {
           return this.planningExecutionService.createPlanningExecutionDialog;
    }
    set createPlanningExecutionDialog(value: boolean) {
        this.planningExecutionService.createPlanningExecutionDialog= value;
    }
    
    get editPlanningExecutionDialog() :boolean {
           return this.planningExecutionService.editPlanningExecutionDialog;
    }
    set editPlanningExecutionDialog(value: boolean) {
        this.planningExecutionService.editPlanningExecutionDialog= value;
    }
    get viewPlanningExecutionDialog() :boolean {
           return this.planningExecutionService.viewPlanningExecutionDialog;
    }
    set viewPlanningExecutionDialog(value: boolean) {
        this.planningExecutionService.viewPlanningExecutionDialog = value;
    }
       
     get search() : PlanningExecutionCriteria {
        return this.planningExecutionService.search;
     }
    set search(value: PlanningExecutionCriteria) {
        this.planningExecutionService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
