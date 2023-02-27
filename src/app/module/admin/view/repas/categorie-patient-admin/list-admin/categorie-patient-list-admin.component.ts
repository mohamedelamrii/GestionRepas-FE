import {Component, OnInit} from '@angular/core';
import {CategoriePatientService} from 'src/app/controller/service/CategoriePatient.service';
import {CategoriePatientDto} from 'src/app/controller/model/CategoriePatient.model';
import {CategoriePatientCriteria} from 'src/app/controller/criteria/CategoriePatientCriteria.model';
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
  selector: 'app-categorie-patient-list-admin',
  templateUrl: './categorie-patient-list-admin.component.html'
})
export class CategoriePatientListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategoriePatient';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private categoriePatientService: CategoriePatientService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadCategoriePatients(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategoriePatient', 'list');
        isPermistted ? this.categoriePatientService.findAll().subscribe(categoriePatients => this.categoriePatients = categoriePatients,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.categoriePatientService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.categoriePatients = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new CategoriePatientCriteria();
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
            {field: 'nombrePatientTotal', header: 'Nombre patient total'},
        ];
    }
    
    public async editCategoriePatient(categoriePatient: CategoriePatientDto){
        const isPermistted = await this.roleService.isPermitted('CategoriePatient', 'edit');
        if(isPermistted){
              this.categoriePatientService.findByIdWithAssociatedList(categoriePatient).subscribe(res => {
              this.selectedCategoriePatient = res;

              this.editCategoriePatientDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewCategoriePatient(categoriePatient: CategoriePatientDto){
        const isPermistted = await this.roleService.isPermitted('CategoriePatient', 'view');
        if(isPermistted){
           this.categoriePatientService.findByIdWithAssociatedList(categoriePatient).subscribe(res => {
           this.selectedCategoriePatient = res;
            this.viewCategoriePatientDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateCategoriePatient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedCategoriePatient = new CategoriePatientDto();
            this.createCategoriePatientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('CategoriePatient', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.categoriePatientService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.categoriePatientSelections == null || this.categoriePatientSelections.length==0
    }


    public async deleteCategoriePatient(categoriePatient: CategoriePatientDto){
       const isPermistted = await this.roleService.isPermitted('CategoriePatient', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Categorie patient) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.categoriePatientService.delete(categoriePatient).subscribe(status=>{
              if(status > 0){
                  const position = this.categoriePatients.indexOf(categoriePatient);
                  position > -1 ? this.categoriePatients.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Categorie patient Supprimé',
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


    public async duplicateCategoriePatient(categoriePatient: CategoriePatientDto) {
        this.categoriePatientService.findByIdWithAssociatedList(categoriePatient).subscribe(
	    res => {
	       this.initDuplicateCategoriePatient(res);
	       this.selectedCategoriePatient = res;
	       this.selectedCategoriePatient.id = null;


            this.createCategoriePatientDialog = true;
        });

	}

	initDuplicateCategoriePatient(res: CategoriePatientDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.categoriePatients.map(e => {
            return {
                 'Libelle': e.libelle ,
                 'Code': e.code ,
                 'Nombre patient total': e.nombrePatientTotal ,
                 'Description': e.description ,
            }
        });

        this.criteriaData = [{
            'Libelle': this.search.libelle ? this.search.libelle : environment.emptyForExport ,
            'Code': this.search.code ? this.search.code : environment.emptyForExport ,
            'Nombre patient total Min': this.search.nombrePatientTotalMin ? this.search.nombrePatientTotalMin : environment.emptyForExport ,
            'Nombre patient total Max': this.search.nombrePatientTotalMax ? this.search.nombrePatientTotalMax : environment.emptyForExport ,
            'Description': this.search.description ? this.search.description : environment.emptyForExport ,
        }];
      }

    get categoriePatients() : Array<CategoriePatientDto> {
           return this.categoriePatientService.categoriePatients;
    }
    set categoriePatients(value: Array<CategoriePatientDto>) {
        this.categoriePatientService.categoriePatients = value;
    }

    get categoriePatientSelections() : Array<CategoriePatientDto> {
           return this.categoriePatientService.categoriePatientSelections;
    }
    set categoriePatientSelections(value: Array<CategoriePatientDto>) {
        this.categoriePatientService.categoriePatientSelections = value;
    }

    get selectedCategoriePatient() : CategoriePatientDto {
           return this.categoriePatientService.selectedCategoriePatient;
    }
    set selectedCategoriePatient(value: CategoriePatientDto) {
        this.categoriePatientService.selectedCategoriePatient = value;
    }
    
    get createCategoriePatientDialog() :boolean {
           return this.categoriePatientService.createCategoriePatientDialog;
    }
    set createCategoriePatientDialog(value: boolean) {
        this.categoriePatientService.createCategoriePatientDialog= value;
    }
    
    get editCategoriePatientDialog() :boolean {
           return this.categoriePatientService.editCategoriePatientDialog;
    }
    set editCategoriePatientDialog(value: boolean) {
        this.categoriePatientService.editCategoriePatientDialog= value;
    }
    get viewCategoriePatientDialog() :boolean {
           return this.categoriePatientService.viewCategoriePatientDialog;
    }
    set viewCategoriePatientDialog(value: boolean) {
        this.categoriePatientService.viewCategoriePatientDialog = value;
    }
       
     get search() : CategoriePatientCriteria {
        return this.categoriePatientService.search;
     }
    set search(value: CategoriePatientCriteria) {
        this.categoriePatientService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
