import {Component, OnInit} from '@angular/core';
import {JourService} from 'src/app/controller/service/Jour.service';
import {JourDto} from 'src/app/controller/model/Jour.model';
import {JourCriteria} from 'src/app/controller/criteria/JourCriteria.model';
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
  selector: 'app-jour-list-admin',
  templateUrl: './jour-list-admin.component.html'
})
export class JourListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Jour';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private jourService: JourService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadJours(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Jour', 'list');
        isPermistted ? this.jourService.findAll().subscribe(jours => this.jours = jours,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.jourService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.jours = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new JourCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editJour(jour: JourDto){
        const isPermistted = await this.roleService.isPermitted('Jour', 'edit');
        if(isPermistted){
              this.jourService.findByIdWithAssociatedList(jour).subscribe(res => {
              this.selectedJour = res;

              this.editJourDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewJour(jour: JourDto){
        const isPermistted = await this.roleService.isPermitted('Jour', 'view');
        if(isPermistted){
           this.jourService.findByIdWithAssociatedList(jour).subscribe(res => {
           this.selectedJour = res;
            this.viewJourDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateJour(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedJour = new JourDto();
            this.createJourDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('Jour', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.jourService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.jourSelections == null || this.jourSelections.length==0
    }


    public async deleteJour(jour: JourDto){
       const isPermistted = await this.roleService.isPermitted('Jour', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Jour) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.jourService.delete(jour).subscribe(status=>{
              if(status > 0){
                  const position = this.jours.indexOf(jour);
                  position > -1 ? this.jours.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Jour Supprimé',
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


    public async duplicateJour(jour: JourDto) {
        this.jourService.findByIdWithAssociatedList(jour).subscribe(
	    res => {
	       this.initDuplicateJour(res);
	       this.selectedJour = res;
	       this.selectedJour.id = null;


            this.createJourDialog = true;
        });

	}

	initDuplicateJour(res: JourDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.jours.map(e => {
            return {
                 'Libelle': e.libelle ,
                 'Code': e.code ,
            }
        });

        this.criteriaData = [{
            'Libelle': this.search.libelle ? this.search.libelle : environment.emptyForExport ,
            'Code': this.search.code ? this.search.code : environment.emptyForExport ,
        }];
      }

    get jours() : Array<JourDto> {
           return this.jourService.jours;
    }
    set jours(value: Array<JourDto>) {
        this.jourService.jours = value;
    }

    get jourSelections() : Array<JourDto> {
           return this.jourService.jourSelections;
    }
    set jourSelections(value: Array<JourDto>) {
        this.jourService.jourSelections = value;
    }

    get selectedJour() : JourDto {
           return this.jourService.selectedJour;
    }
    set selectedJour(value: JourDto) {
        this.jourService.selectedJour = value;
    }
    
    get createJourDialog() :boolean {
           return this.jourService.createJourDialog;
    }
    set createJourDialog(value: boolean) {
        this.jourService.createJourDialog= value;
    }
    
    get editJourDialog() :boolean {
           return this.jourService.editJourDialog;
    }
    set editJourDialog(value: boolean) {
        this.jourService.editJourDialog= value;
    }
    get viewJourDialog() :boolean {
           return this.jourService.viewJourDialog;
    }
    set viewJourDialog(value: boolean) {
        this.jourService.viewJourDialog = value;
    }
       
     get search() : JourCriteria {
        return this.jourService.search;
     }
    set search(value: JourCriteria) {
        this.jourService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
