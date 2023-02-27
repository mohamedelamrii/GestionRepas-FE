import {Component, OnInit} from '@angular/core';
import {RepasService} from 'src/app/controller/service/Repas.service';
import {RepasDto} from 'src/app/controller/model/Repas.model';
import {RepasCriteria} from 'src/app/controller/criteria/RepasCriteria.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/Role.service';
import {DatePipe} from '@angular/common';



import { TypeRepasService } from 'src/app/controller/service/TypeRepas.service';

import {RepasCategoriePatientDto} from 'src/app/controller/model/RepasCategoriePatient.model';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-repas-list-admin',
  templateUrl: './repas-list-admin.component.html'
})
export class RepasListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Repas';

    typeRepass :Array<TypeRepasDto>;
    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private repasService: RepasService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private typeRepasService: TypeRepasService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
      this.loadTypeRepas();
    }

    public async loadRepass(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Repas', 'list');
        isPermistted ? this.repasService.findAll().subscribe(repass => this.repass = repass,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.repasService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.repass = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new RepasCriteria();
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
            {field: 'typeRepas?.libelle', header: 'Type repas'},
            {field: 'image', header: 'Image'},
        ];
    }
    
    public async editRepas(repas: RepasDto){
        const isPermistted = await this.roleService.isPermitted('Repas', 'edit');
        if(isPermistted){
              this.repasService.findByIdWithAssociatedList(repas).subscribe(res => {
              this.selectedRepas = res;

              this.editRepasDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewRepas(repas: RepasDto){
        const isPermistted = await this.roleService.isPermitted('Repas', 'view');
        if(isPermistted){
           this.repasService.findByIdWithAssociatedList(repas).subscribe(res => {
           this.selectedRepas = res;
            this.viewRepasDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateRepas(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedRepas = new RepasDto();
            this.createRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('Repas', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.repasService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.repasSelections == null || this.repasSelections.length==0
    }


    public async deleteRepas(repas: RepasDto){
       const isPermistted = await this.roleService.isPermitted('Repas', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Repas) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.repasService.delete(repas).subscribe(status=>{
              if(status > 0){
                  const position = this.repass.indexOf(repas);
                  position > -1 ? this.repass.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Repas Supprimé',
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

public async loadTypeRepas(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Repas', 'list');
    isPermistted ? this.typeRepasService.findAll().subscribe(typeRepass => this.typeRepass = typeRepass,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

    public async duplicateRepas(repas: RepasDto) {
        this.repasService.findByIdWithAssociatedList(repas).subscribe(
	    res => {
	       this.initDuplicateRepas(res);
	       this.selectedRepas = res;
	       this.selectedRepas.id = null;


            this.createRepasDialog = true;
        });

	}

	initDuplicateRepas(res: RepasDto) {
        if (res.repasCategoriePatients != null) {
             res.repasCategoriePatients.forEach(d => { d.repas = null; d.id = null; });
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
        this.exportData = this.repass.map(e => {
            return {
                 'Libelle': e.libelle ,
                'Type repas': e.typeRepas?.libelle ,
                 'Image': e.image ,
                 'Description': e.description ,
            }
        });

        this.criteriaData = [{
            'Libelle': this.search.libelle ? this.search.libelle : environment.emptyForExport ,
        //'Type repas': this.search.typeRepas?.libelle ? this.search.typeRepas?.libelle : environment.emptyForExport ,
            'Image': this.search.image ? this.search.image : environment.emptyForExport ,
            'Description': this.search.description ? this.search.description : environment.emptyForExport ,
        }];
      }

    get repass() : Array<RepasDto> {
           return this.repasService.repass;
    }
    set repass(value: Array<RepasDto>) {
        this.repasService.repass = value;
    }

    get repasSelections() : Array<RepasDto> {
           return this.repasService.repasSelections;
    }
    set repasSelections(value: Array<RepasDto>) {
        this.repasService.repasSelections = value;
    }

    get selectedRepas() : RepasDto {
           return this.repasService.selectedRepas;
    }
    set selectedRepas(value: RepasDto) {
        this.repasService.selectedRepas = value;
    }
    
    get createRepasDialog() :boolean {
           return this.repasService.createRepasDialog;
    }
    set createRepasDialog(value: boolean) {
        this.repasService.createRepasDialog= value;
    }
    
    get editRepasDialog() :boolean {
           return this.repasService.editRepasDialog;
    }
    set editRepasDialog(value: boolean) {
        this.repasService.editRepasDialog= value;
    }
    get viewRepasDialog() :boolean {
           return this.repasService.viewRepasDialog;
    }
    set viewRepasDialog(value: boolean) {
        this.repasService.viewRepasDialog = value;
    }
       
     get search() : RepasCriteria {
        return this.repasService.search;
     }
    set search(value: RepasCriteria) {
        this.repasService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
