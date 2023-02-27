import {Component, OnInit} from '@angular/core';
import {TypeRepasService} from 'src/app/controller/service/TypeRepas.service';
import {TypeRepasDto} from 'src/app/controller/model/TypeRepas.model';
import {TypeRepasCriteria} from 'src/app/controller/criteria/TypeRepasCriteria.model';
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
  selector: 'app-type-repas-list-admin',
  templateUrl: './type-repas-list-admin.component.html'
})
export class TypeRepasListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeRepas';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private typeRepasService: TypeRepasService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadTypeRepass(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeRepas', 'list');
        isPermistted ? this.typeRepasService.findAll().subscribe(typeRepass => this.typeRepass = typeRepass,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.typeRepasService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.typeRepass = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new TypeRepasCriteria();
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
    
    public async editTypeRepas(typeRepas: TypeRepasDto){
        const isPermistted = await this.roleService.isPermitted('TypeRepas', 'edit');
        if(isPermistted){
              this.typeRepasService.findByIdWithAssociatedList(typeRepas).subscribe(res => {
              this.selectedTypeRepas = res;

              this.editTypeRepasDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewTypeRepas(typeRepas: TypeRepasDto){
        const isPermistted = await this.roleService.isPermitted('TypeRepas', 'view');
        if(isPermistted){
           this.typeRepasService.findByIdWithAssociatedList(typeRepas).subscribe(res => {
           this.selectedTypeRepas = res;
            this.viewTypeRepasDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreateTypeRepas(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedTypeRepas = new TypeRepasDto();
            this.createTypeRepasDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('TypeRepas', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.typeRepasService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.typeRepasSelections == null || this.typeRepasSelections.length==0
    }


    public async deleteTypeRepas(typeRepas: TypeRepasDto){
       const isPermistted = await this.roleService.isPermitted('TypeRepas', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Type repas) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.typeRepasService.delete(typeRepas).subscribe(status=>{
              if(status > 0){
                  const position = this.typeRepass.indexOf(typeRepas);
                  position > -1 ? this.typeRepass.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Type repas Supprimé',
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


    public async duplicateTypeRepas(typeRepas: TypeRepasDto) {
        this.typeRepasService.findByIdWithAssociatedList(typeRepas).subscribe(
	    res => {
	       this.initDuplicateTypeRepas(res);
	       this.selectedTypeRepas = res;
	       this.selectedTypeRepas.id = null;


            this.createTypeRepasDialog = true;
        });

	}

	initDuplicateTypeRepas(res: TypeRepasDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.typeRepass.map(e => {
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

    get typeRepass() : Array<TypeRepasDto> {
           return this.typeRepasService.typeRepass;
    }
    set typeRepass(value: Array<TypeRepasDto>) {
        this.typeRepasService.typeRepass = value;
    }

    get typeRepasSelections() : Array<TypeRepasDto> {
           return this.typeRepasService.typeRepasSelections;
    }
    set typeRepasSelections(value: Array<TypeRepasDto>) {
        this.typeRepasService.typeRepasSelections = value;
    }

    get selectedTypeRepas() : TypeRepasDto {
           return this.typeRepasService.selectedTypeRepas;
    }
    set selectedTypeRepas(value: TypeRepasDto) {
        this.typeRepasService.selectedTypeRepas = value;
    }
    
    get createTypeRepasDialog() :boolean {
           return this.typeRepasService.createTypeRepasDialog;
    }
    set createTypeRepasDialog(value: boolean) {
        this.typeRepasService.createTypeRepasDialog= value;
    }
    
    get editTypeRepasDialog() :boolean {
           return this.typeRepasService.editTypeRepasDialog;
    }
    set editTypeRepasDialog(value: boolean) {
        this.typeRepasService.editTypeRepasDialog= value;
    }
    get viewTypeRepasDialog() :boolean {
           return this.typeRepasService.viewTypeRepasDialog;
    }
    set viewTypeRepasDialog(value: boolean) {
        this.typeRepasService.viewTypeRepasDialog = value;
    }
       
     get search() : TypeRepasCriteria {
        return this.typeRepasService.search;
     }
    set search(value: TypeRepasCriteria) {
        this.typeRepasService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
