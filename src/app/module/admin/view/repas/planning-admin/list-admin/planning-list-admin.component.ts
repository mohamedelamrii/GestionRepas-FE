import {Component, OnInit} from '@angular/core';
import {PlanningService} from 'src/app/controller/service/Planning.service';
import {PlanningDto} from 'src/app/controller/model/Planning.model';
import {PlanningCriteria} from 'src/app/controller/criteria/PlanningCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';



import { CategoriePatientService } from 'src/app/controller/service/CategoriePatient.service';
import { JourService } from 'src/app/controller/service/Jour.service';

import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {PlanningRepasDto} from 'src/app/controller/model/PlanningRepas.model';
import {JourDto} from 'src/app/controller/model/Jour.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-planning-list-admin',
  templateUrl: './planning-list-admin.component.html'
})
export class PlanningListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Planning';

    categoriePatients :Array<CategoriePatientDto>;
    jours :Array<JourDto>;
    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private planningService: PlanningService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private categoriePatientService: CategoriePatientService
        , private jourService: JourService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
      this.loadCategoriePatient();
      this.loadJour();
    }

    public async loadPlannings(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Planning', 'list');
        isPermistted ? this.planningService.findAll().subscribe(plannings => this.plannings = plannings,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.planningService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.plannings = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new PlanningCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'dateDebut', header: 'Date debut'},
            {field: 'dateFin', header: 'Date fin'},
            {field: 'categoriePatient?.libelle', header: 'Categorie patient'},
            {field: 'jour?.libelle', header: 'Jour'},
        ];
    }
    
    public async editPlanning(planning: PlanningDto){
        const isPermistted = await this.roleService.isPermitted('Planning', 'edit');
        if(isPermistted){
              this.planningService.findByIdWithAssociatedList(planning).subscribe(res => {
              this.selectedPlanning = res;
              this.selectedPlanning.dateDebut = new Date(planning.dateDebut);
              this.selectedPlanning.dateFin = new Date(planning.dateFin);

              this.editPlanningDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewPlanning(planning: PlanningDto){
        const isPermistted = await this.roleService.isPermitted('Planning', 'view');
        if(isPermistted){
           this.planningService.findByIdWithAssociatedList(planning).subscribe(res => {
           this.selectedPlanning = res;
           this.selectedPlanning.dateDebut = new Date(planning.dateDebut);
           this.selectedPlanning.dateFin = new Date(planning.dateFin);
            this.viewPlanningDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreatePlanning(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedPlanning = new PlanningDto();
            this.createPlanningDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('Planning', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.planningService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.planningSelections == null || this.planningSelections.length==0
    }


    public async deletePlanning(planning: PlanningDto){
       const isPermistted = await this.roleService.isPermitted('Planning', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Planning) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.planningService.delete(planning).subscribe(status=>{
              if(status > 0){
                  const position = this.plannings.indexOf(planning);
                  position > -1 ? this.plannings.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Planning Supprimé',
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

public async loadCategoriePatient(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Planning', 'list');
    isPermistted ? this.categoriePatientService.findAll().subscribe(categoriePatients => this.categoriePatients = categoriePatients,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadJour(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Planning', 'list');
    isPermistted ? this.jourService.findAll().subscribe(jours => this.jours = jours,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

    public async duplicatePlanning(planning: PlanningDto) {
        this.planningService.findByIdWithAssociatedList(planning).subscribe(
	    res => {
	       this.initDuplicatePlanning(res);
	       this.selectedPlanning = res;
	       this.selectedPlanning.id = null;


            this.createPlanningDialog = true;
        });

	}

	initDuplicatePlanning(res: PlanningDto) {
        if (res.planningRepass != null) {
             res.planningRepass.forEach(d => { d.planning = null; d.id = null; });
        }
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.plannings.map(e => {
            return {
                'Date debut': this.datePipe.transform(e.dateDebut , 'dd/MM/yyyy hh:mm'),
                'Date fin': this.datePipe.transform(e.dateFin , 'dd/MM/yyyy hh:mm'),
                'Categorie patient': e.categoriePatient?.libelle ,
                'Jour': e.jour?.libelle ,
            }
        });

        this.criteriaData = [{
            'Date debut Min': this.search.dateDebutFrom ? this.datePipe.transform(this.search.dateDebutFrom , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.search.dateDebutTo ? this.datePipe.transform(this.search.dateDebutTo , this.dateFormat) : environment.emptyForExport ,
            'Date fin Min': this.search.dateFinFrom ? this.datePipe.transform(this.search.dateFinFrom , this.dateFormat) : environment.emptyForExport ,
            'Date fin Max': this.search.dateFinTo ? this.datePipe.transform(this.search.dateFinTo , this.dateFormat) : environment.emptyForExport ,
        //'Categorie patient': this.search.categoriePatient?.libelle ? this.search.categoriePatient?.libelle : environment.emptyForExport ,
        //'Jour': this.search.jour?.libelle ? this.search.jour?.libelle : environment.emptyForExport ,
        }];
      }

    get plannings() : Array<PlanningDto> {
           return this.planningService.plannings;
    }
    set plannings(value: Array<PlanningDto>) {
        this.planningService.plannings = value;
    }

    get planningSelections() : Array<PlanningDto> {
           return this.planningService.planningSelections;
    }
    set planningSelections(value: Array<PlanningDto>) {
        this.planningService.planningSelections = value;
    }

    get selectedPlanning() : PlanningDto {
           return this.planningService.selectedPlanning;
    }
    set selectedPlanning(value: PlanningDto) {
        this.planningService.selectedPlanning = value;
    }
    
    get createPlanningDialog() :boolean {
           return this.planningService.createPlanningDialog;
    }
    set createPlanningDialog(value: boolean) {
        this.planningService.createPlanningDialog= value;
    }
    
    get editPlanningDialog() :boolean {
           return this.planningService.editPlanningDialog;
    }
    set editPlanningDialog(value: boolean) {
        this.planningService.editPlanningDialog= value;
    }
    get viewPlanningDialog() :boolean {
           return this.planningService.viewPlanningDialog;
    }
    set viewPlanningDialog(value: boolean) {
        this.planningService.viewPlanningDialog = value;
    }
       
     get search() : PlanningCriteria {
        return this.planningService.search;
     }
    set search(value: PlanningCriteria) {
        this.planningService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
