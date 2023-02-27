import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {PatientDto} from '../model/Patient.model';
import {PatientCriteria} from '../criteria/PatientCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/patient/';
        });
    }
     private _patients: Array<PatientDto> ;
     private _selectedPatient: PatientDto;
     private _patientSelections: Array<PatientDto>;
     private _createPatientDialog: boolean;
     private _editPatientDialog: boolean;
     private _viewPatientDialog: boolean;
     public editPatient$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: PatientCriteria ;




    public findPaginatedByCriteria(criteria: PatientCriteria): Observable<PaginatedList<PatientDto>>{
        return this.http.post<PaginatedList<PatientDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<PatientDto>>(this.API);
    }

    public save(): Observable<PatientDto> {
        return this.http.post<PatientDto>(this.API, this.selectedPatient);
    }

    delete(patient: PatientDto) {
         return this.http.delete<number>(this.API + 'id/' + patient.id);
    }


    public edit(): Observable<PatientDto> {
        return this.http.put<PatientDto>(this.API, this.selectedPatient);
    }


     public findByCriteria(patient: PatientCriteria): Observable<Array<PatientDto>>{
           return this.http.post<Array<PatientDto>>(this.API + 'find-by-criteria', patient);
    }

   public findByIdWithAssociatedList(patient:PatientDto):Observable<PatientDto>{
         return this.http.get<PatientDto>(this.API + 'id/' +patient.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.patientSelections);
   }



    get patients(): Array<PatientDto> {
        if(this._patients == null){
            this._patients = new Array<PatientDto>();
        }
        return this._patients;
     }

    set patients(value: Array<PatientDto>) {
        this._patients = value;
    }

    get selectedPatient(): PatientDto {
        if(this._selectedPatient == null){
            this._selectedPatient = new PatientDto();
        }
        return this._selectedPatient;
    }

    set selectedPatient(value: PatientDto) {
        this._selectedPatient = value;
    }

    get patientSelections(): Array<PatientDto> {
        if(this._patientSelections == null){
            this._patientSelections = new Array<PatientDto>();
        }
        return this._patientSelections;
    }


    set patientSelections(value: Array<PatientDto>) {
        this._patientSelections = value;
    }

    get createPatientDialog(): boolean {
        return this._createPatientDialog;
    }

    set createPatientDialog(value: boolean) {
        this._createPatientDialog = value;
    }

    get editPatientDialog(): boolean {
        return this._editPatientDialog;
    }

    set editPatientDialog(value: boolean) {
        this._editPatientDialog = value;
    }

    get viewPatientDialog(): boolean {
        return this._viewPatientDialog;
    }

    set viewPatientDialog(value: boolean) {
        this._viewPatientDialog = value;
    }

    get search(): PatientCriteria {
         if(this._search==null){
            this._search = new PatientCriteria();
        }
        return this._search;
    }

    set search(value: PatientCriteria) {
        this._search = value;
    }
}
