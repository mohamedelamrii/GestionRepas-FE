import {Component, OnInit} from '@angular/core';
import {RepasCategoriePatientService} from 'src/app/controller/service/RepasCategoriePatient.service';
import {RepasCategoriePatientDto} from 'src/app/controller/model/RepasCategoriePatient.model';
import {RepasCategoriePatientCriteria} from 'src/app/controller/criteria/RepasCategoriePatientCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';



import { RepasService } from 'src/app/controller/service/Repas.service';
import { CategoriePatientService } from 'src/app/controller/service/CategoriePatient.service';

import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-repas-categorie-patient-list-responsable',
  templateUrl: './repas-categorie-patient-list-responsable.component.html'
})
export class RepasCategoriePatientListResponsableComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RepasCategoriePatient';

    repass :Array<RepasDto>;
    categoriePatients :Array<CategoriePatientDto>;
    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private repasCategoriePatientService: RepasCategoriePatientService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private repasService: RepasService
        , private categoriePatientService: CategoriePatientService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
      this.loadRepas();
      this.loadCategoriePatient();
    }

    public async loadRepasCategoriePatients(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RepasCategoriePatient', 'list');
        isPermistted ? this.repasCategoriePatientService.findAll().subscribe(repasCategoriePatients => this.repasCategoriePatients = repasCategoriePatients,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.repasCategoriePatientService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.repasCategoriePatients = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new RepasCategoriePatientCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'repas?.libelle', header: 'Repas'},
            {field: 'categoriePatient?.libelle', header: 'Categorie patient'},
        ];
    }
    
    public async editRepasCategoriePatient(repasCategoriePatient: RepasCategoriePatientDto){
        const isPermistted = await this.roleService.isPermitted('RepasCategoriePatient', 'edit');
        if(isPermistted){
              this.repasCategoriePatientService.findByIdWithAssociatedList(repasCategoriePatient).subscribe(res => {
              this.selectedRepasCategoriePatient = res;

              this.editRepasCategoriePatientDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewRepasCategoriePatient(repasCategoriePatient: RepasCategoriePatientDto){
        const isPermistted = await this.roleService.isPermitted('RepasCategoriePatient', 'view');
        if(isPermistted){
           this.repasCategoriePatientService.findByIdWithAssociatedList(repasCategoriePatient).subscribe(res => {
           this.selectedRepasCategoriePatient = res;
            this.viewRepasCategoriePatientDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateRepasCategoriePatient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedRepasCategoriePatient = new RepasCategoriePatientDto();
            this.createRepasCategoriePatientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('RepasCategoriePatient', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.repasCategoriePatientService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.repasCategoriePatientSelections == null || this.repasCategoriePatientSelections.length==0
    }


    public async deleteRepasCategoriePatient(repasCategoriePatient: RepasCategoriePatientDto){
       const isPermistted = await this.roleService.isPermitted('RepasCategoriePatient', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Repas categorie patient) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.repasCategoriePatientService.delete(repasCategoriePatient).subscribe(status=>{
              if(status > 0){
                  const position = this.repasCategoriePatients.indexOf(repasCategoriePatient);
                  position > -1 ? this.repasCategoriePatients.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Repas categorie patient Supprimé',
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

public async loadRepas(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RepasCategoriePatient', 'list');
    isPermistted ? this.repasService.findAll().subscribe(repass => this.repass = repass,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCategoriePatient(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RepasCategoriePatient', 'list');
    isPermistted ? this.categoriePatientService.findAll().subscribe(categoriePatients => this.categoriePatients = categoriePatients,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

    public async duplicateRepasCategoriePatient(repasCategoriePatient: RepasCategoriePatientDto) {
        this.repasCategoriePatientService.findByIdWithAssociatedList(repasCategoriePatient).subscribe(
	    res => {
	       this.initDuplicateRepasCategoriePatient(res);
	       this.selectedRepasCategoriePatient = res;
	       this.selectedRepasCategoriePatient.id = null;


            this.createRepasCategoriePatientDialog = true;
        });

	}

	initDuplicateRepasCategoriePatient(res: RepasCategoriePatientDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.repasCategoriePatients.map(e => {
            return {
                'Repas': e.repas?.libelle ,
                'Categorie patient': e.categoriePatient?.libelle ,
            }
        });

        this.criteriaData = [{
        //'Repas': this.search.repas?.libelle ? this.search.repas?.libelle : environment.emptyForExport ,
        //'Categorie patient': this.search.categoriePatient?.libelle ? this.search.categoriePatient?.libelle : environment.emptyForExport ,
        }];
      }

    get repasCategoriePatients() : Array<RepasCategoriePatientDto> {
           return this.repasCategoriePatientService.repasCategoriePatients;
    }
    set repasCategoriePatients(value: Array<RepasCategoriePatientDto>) {
        this.repasCategoriePatientService.repasCategoriePatients = value;
    }

    get repasCategoriePatientSelections() : Array<RepasCategoriePatientDto> {
           return this.repasCategoriePatientService.repasCategoriePatientSelections;
    }
    set repasCategoriePatientSelections(value: Array<RepasCategoriePatientDto>) {
        this.repasCategoriePatientService.repasCategoriePatientSelections = value;
    }

    get selectedRepasCategoriePatient() : RepasCategoriePatientDto {
           return this.repasCategoriePatientService.selectedRepasCategoriePatient;
    }
    set selectedRepasCategoriePatient(value: RepasCategoriePatientDto) {
        this.repasCategoriePatientService.selectedRepasCategoriePatient = value;
    }
    
    get createRepasCategoriePatientDialog() :boolean {
           return this.repasCategoriePatientService.createRepasCategoriePatientDialog;
    }
    set createRepasCategoriePatientDialog(value: boolean) {
        this.repasCategoriePatientService.createRepasCategoriePatientDialog= value;
    }
    
    get editRepasCategoriePatientDialog() :boolean {
           return this.repasCategoriePatientService.editRepasCategoriePatientDialog;
    }
    set editRepasCategoriePatientDialog(value: boolean) {
        this.repasCategoriePatientService.editRepasCategoriePatientDialog= value;
    }
    get viewRepasCategoriePatientDialog() :boolean {
           return this.repasCategoriePatientService.viewRepasCategoriePatientDialog;
    }
    set viewRepasCategoriePatientDialog(value: boolean) {
        this.repasCategoriePatientService.viewRepasCategoriePatientDialog = value;
    }
       
     get search() : RepasCategoriePatientCriteria {
        return this.repasCategoriePatientService.search;
     }
    set search(value: RepasCategoriePatientCriteria) {
        this.repasCategoriePatientService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
