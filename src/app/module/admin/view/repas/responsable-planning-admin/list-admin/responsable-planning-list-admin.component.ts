import {Component, OnInit} from '@angular/core';
import {ResponsablePlanningService} from 'src/app/controller/service/ResponsablePlanning.service';
import {ResponsablePlanningDto} from 'src/app/controller/model/ResponsablePlanning.model';
import {ResponsablePlanningCriteria} from 'src/app/controller/criteria/ResponsablePlanningCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';




import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-responsable-planning-list-admin',
  templateUrl: './responsable-planning-list-admin.component.html'
})
export class ResponsablePlanningListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ResponsablePlanning';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private responsablePlanningService: ResponsablePlanningService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadResponsablePlannings(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsablePlanning', 'list');
        isPermistted ? this.responsablePlanningService.findAll().subscribe(responsablePlannings => this.responsablePlannings = responsablePlannings,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.responsablePlanningService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.responsablePlannings = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new ResponsablePlanningCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'nom', header: 'Nom'},
            {field: 'prenom', header: 'Prenom'},
            {field: 'cin', header: 'Cin'},
            {field: 'code', header: 'Code'},
            {field: 'email', header: 'Email'},
            {field: 'adresse', header: 'Adresse'},
        ];
    }
    
    public async editResponsablePlanning(responsablePlanning: ResponsablePlanningDto){
        const isPermistted = await this.roleService.isPermitted('ResponsablePlanning', 'edit');
        if(isPermistted){
              this.responsablePlanningService.findByIdWithAssociatedList(responsablePlanning).subscribe(res => {
              this.selectedResponsablePlanning = res;

              this.editResponsablePlanningDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewResponsablePlanning(responsablePlanning: ResponsablePlanningDto){
        const isPermistted = await this.roleService.isPermitted('ResponsablePlanning', 'view');
        if(isPermistted){
           this.responsablePlanningService.findByIdWithAssociatedList(responsablePlanning).subscribe(res => {
           this.selectedResponsablePlanning = res;
            this.viewResponsablePlanningDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateResponsablePlanning(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedResponsablePlanning = new ResponsablePlanningDto();
            this.createResponsablePlanningDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('ResponsablePlanning', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.responsablePlanningService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.responsablePlanningSelections == null || this.responsablePlanningSelections.length==0
    }


    public async deleteResponsablePlanning(responsablePlanning: ResponsablePlanningDto){
       const isPermistted = await this.roleService.isPermitted('ResponsablePlanning', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Responsable planning) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.responsablePlanningService.delete(responsablePlanning).subscribe(status=>{
              if(status > 0){
                  const position = this.responsablePlannings.indexOf(responsablePlanning);
                  position > -1 ? this.responsablePlannings.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Responsable planning Supprimé',
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


    public async duplicateResponsablePlanning(responsablePlanning: ResponsablePlanningDto) {
        this.responsablePlanningService.findByIdWithAssociatedList(responsablePlanning).subscribe(
	    res => {
	       this.initDuplicateResponsablePlanning(res);
	       this.selectedResponsablePlanning = res;
	       this.selectedResponsablePlanning.id = null;


            this.createResponsablePlanningDialog = true;
        });

	}

	initDuplicateResponsablePlanning(res: ResponsablePlanningDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.responsablePlannings.map(e => {
            return {
                 'Nom': e.nom ,
                 'Prenom': e.prenom ,
                 'Cin': e.cin ,
                 'Code': e.code ,
                 'Email': e.email ,
                 'Adresse': e.adresse ,
            }
        });

        this.criteriaData = [{
            'Nom': this.search.nom ? this.search.nom : environment.emptyForExport ,
            'Prenom': this.search.prenom ? this.search.prenom : environment.emptyForExport ,
            'Cin': this.search.cin ? this.search.cin : environment.emptyForExport ,
            'Code': this.search.code ? this.search.code : environment.emptyForExport ,
            'Email': this.search.email ? this.search.email : environment.emptyForExport ,
            'Adresse': this.search.adresse ? this.search.adresse : environment.emptyForExport ,
        }];
      }

    get responsablePlannings() : Array<ResponsablePlanningDto> {
           return this.responsablePlanningService.responsablePlannings;
    }
    set responsablePlannings(value: Array<ResponsablePlanningDto>) {
        this.responsablePlanningService.responsablePlannings = value;
    }

    get responsablePlanningSelections() : Array<ResponsablePlanningDto> {
           return this.responsablePlanningService.responsablePlanningSelections;
    }
    set responsablePlanningSelections(value: Array<ResponsablePlanningDto>) {
        this.responsablePlanningService.responsablePlanningSelections = value;
    }

    get selectedResponsablePlanning() : ResponsablePlanningDto {
           return this.responsablePlanningService.selectedResponsablePlanning;
    }
    set selectedResponsablePlanning(value: ResponsablePlanningDto) {
        this.responsablePlanningService.selectedResponsablePlanning = value;
    }
    
    get createResponsablePlanningDialog() :boolean {
           return this.responsablePlanningService.createResponsablePlanningDialog;
    }
    set createResponsablePlanningDialog(value: boolean) {
        this.responsablePlanningService.createResponsablePlanningDialog= value;
    }
    
    get editResponsablePlanningDialog() :boolean {
           return this.responsablePlanningService.editResponsablePlanningDialog;
    }
    set editResponsablePlanningDialog(value: boolean) {
        this.responsablePlanningService.editResponsablePlanningDialog= value;
    }
    get viewResponsablePlanningDialog() :boolean {
           return this.responsablePlanningService.viewResponsablePlanningDialog;
    }
    set viewResponsablePlanningDialog(value: boolean) {
        this.responsablePlanningService.viewResponsablePlanningDialog = value;
    }
       
     get search() : ResponsablePlanningCriteria {
        return this.responsablePlanningService.search;
     }
    set search(value: ResponsablePlanningCriteria) {
        this.responsablePlanningService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
