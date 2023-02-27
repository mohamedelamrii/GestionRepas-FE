import {Component, OnInit} from '@angular/core';
import {PatientService} from 'src/app/controller/service/Patient.service';
import {PatientDto} from 'src/app/controller/model/Patient.model';
import {PatientCriteria} from 'src/app/controller/criteria/PatientCriteria.model';
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
  selector: 'app-patient-list-admin',
  templateUrl: './patient-list-admin.component.html'
})
export class PatientListAdminComponent implements OnInit {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Patient';

    private _totalRecords = 0;

    get totalRecords(): number {
        return this._totalRecords;
     }

    set totalRecords(value: number) {
        this._totalRecords = value
    }
    constructor(private datePipe: DatePipe, private patientService: PatientService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.searchRequest();
      this.initExport();
      this.initCol();
    }

    public async loadPatients(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Patient', 'list');
        isPermistted ? this.patientService.findAll().subscribe(patients => this.patients = patients,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }



    public searchRequest(){
        this.patientService.findPaginatedByCriteria(this.search).subscribe(paginatedItems=>{
            this.patients = paginatedItems.list;
            this.totalRecords= paginatedItems.dataSize;
            // this.search = new PatientCriteria();
        },error=>console.log(error));
    }

    public onPage(event: any) {
        this.search.page = event.page;
        this.search.maxResults = event.rows;
        this.searchRequest();
    }

    private initCol() {
        this.cols = [
            {field: 'ipp', header: 'Ipp'},
            {field: 'nom', header: 'Nom'},
            {field: 'prenom', header: 'Prenom'},
            {field: 'cin', header: 'Cin'},
            {field: 'codeRamed', header: 'Code ramed'},
        ];
    }
    
    public async editPatient(patient: PatientDto){
        const isPermistted = await this.roleService.isPermitted('Patient', 'edit');
        if(isPermistted){
              this.patientService.findByIdWithAssociatedList(patient).subscribe(res => {
              this.selectedPatient = res;

              this.editPatientDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

   public async viewPatient(patient: PatientDto){
        const isPermistted = await this.roleService.isPermitted('Patient', 'view');
        if(isPermistted){
           this.patientService.findByIdWithAssociatedList(patient).subscribe(res => {
           this.selectedPatient = res;
            this.viewPatientDialog = true;
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
   }
    
    public async openCreatePatient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
            this.selectedPatient = new PatientDto();
            this.createPatientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteMultiple(){
        const isPermistted = await this.roleService.isPermitted('Patient', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ces éléments ?',
            header: 'Confirmation',
                        icon: 'pi pi-exclamation-triangle',
                        accept: () => {
                        this.patientService.deleteMultiple().subscribe();
                        }
                        });
        }else{
            this.messageService.add({
            severity: 'error',summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public isSelectionDisabled(): boolean {
        return this.patientSelections == null || this.patientSelections.length==0
    }


    public async deletePatient(patient: PatientDto){
       const isPermistted = await this.roleService.isPermitted('Patient', 'delete');
        if(isPermistted){
            this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet élément (Patient) ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.patientService.delete(patient).subscribe(status=>{
              if(status > 0){
                  const position = this.patients.indexOf(patient);
                  position > -1 ? this.patients.splice(position, 1) : false;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Patient Supprimé',
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


    public async duplicatePatient(patient: PatientDto) {
        this.patientService.findByIdWithAssociatedList(patient).subscribe(
	    res => {
	       this.initDuplicatePatient(res);
	       this.selectedPatient = res;
	       this.selectedPatient.id = null;


            this.createPatientDialog = true;
        });

	}

	initDuplicatePatient(res: PatientDto) {
	}

    initExport(): void {
        this.excelPdfButons = [
            {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
            {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
        ];
    }

    prepareColumnExport() : void {
        this.exportData = this.patients.map(e => {
            return {
                 'Ipp': e.ipp ,
                 'Nom': e.nom ,
                 'Prenom': e.prenom ,
                 'Cin': e.cin ,
                 'Code ramed': e.codeRamed ,
            }
        });

        this.criteriaData = [{
            'Ipp': this.search.ipp ? this.search.ipp : environment.emptyForExport ,
            'Nom': this.search.nom ? this.search.nom : environment.emptyForExport ,
            'Prenom': this.search.prenom ? this.search.prenom : environment.emptyForExport ,
            'Cin': this.search.cin ? this.search.cin : environment.emptyForExport ,
            'Code ramed': this.search.codeRamed ? this.search.codeRamed : environment.emptyForExport ,
        }];
      }

    get patients() : Array<PatientDto> {
           return this.patientService.patients;
    }
    set patients(value: Array<PatientDto>) {
        this.patientService.patients = value;
    }

    get patientSelections() : Array<PatientDto> {
           return this.patientService.patientSelections;
    }
    set patientSelections(value: Array<PatientDto>) {
        this.patientService.patientSelections = value;
    }

    get selectedPatient() : PatientDto {
           return this.patientService.selectedPatient;
    }
    set selectedPatient(value: PatientDto) {
        this.patientService.selectedPatient = value;
    }
    
    get createPatientDialog() :boolean {
           return this.patientService.createPatientDialog;
    }
    set createPatientDialog(value: boolean) {
        this.patientService.createPatientDialog= value;
    }
    
    get editPatientDialog() :boolean {
           return this.patientService.editPatientDialog;
    }
    set editPatientDialog(value: boolean) {
        this.patientService.editPatientDialog= value;
    }
    get viewPatientDialog() :boolean {
           return this.patientService.viewPatientDialog;
    }
    set viewPatientDialog(value: boolean) {
        this.patientService.viewPatientDialog = value;
    }
       
     get search() : PatientCriteria {
        return this.patientService.search;
     }
    set search(value: PatientCriteria) {
        this.patientService.search = value;
    }
    get dateFormat(){
        return environment.dateFormatList;
    }

}
