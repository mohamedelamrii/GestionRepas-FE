import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {RepasCategoriePatientDto} from '../model/RepasCategoriePatient.model';
import {RepasCategoriePatientCriteria} from '../criteria/RepasCategoriePatientCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class RepasCategoriePatientService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/repasCategoriePatient/';
        });
    }
     private _repasCategoriePatients: Array<RepasCategoriePatientDto> ;
     private _selectedRepasCategoriePatient: RepasCategoriePatientDto;
     private _repasCategoriePatientSelections: Array<RepasCategoriePatientDto>;
     private _createRepasCategoriePatientDialog: boolean;
     private _editRepasCategoriePatientDialog: boolean;
     private _viewRepasCategoriePatientDialog: boolean;
     public editRepasCategoriePatient$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: RepasCategoriePatientCriteria ;




    public findPaginatedByCriteria(criteria: RepasCategoriePatientCriteria): Observable<PaginatedList<RepasCategoriePatientDto>>{
        return this.http.post<PaginatedList<RepasCategoriePatientDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<RepasCategoriePatientDto>>(this.API);
    }

    public save(): Observable<RepasCategoriePatientDto> {
        return this.http.post<RepasCategoriePatientDto>(this.API, this.selectedRepasCategoriePatient);
    }

    delete(repasCategoriePatient: RepasCategoriePatientDto) {
         return this.http.delete<number>(this.API + 'id/' + repasCategoriePatient.id);
    }


    public edit(): Observable<RepasCategoriePatientDto> {
        return this.http.put<RepasCategoriePatientDto>(this.API, this.selectedRepasCategoriePatient);
    }


     public findByCriteria(repasCategoriePatient: RepasCategoriePatientCriteria): Observable<Array<RepasCategoriePatientDto>>{
           return this.http.post<Array<RepasCategoriePatientDto>>(this.API + 'find-by-criteria', repasCategoriePatient);
    }

   public findByIdWithAssociatedList(repasCategoriePatient:RepasCategoriePatientDto):Observable<RepasCategoriePatientDto>{
         return this.http.get<RepasCategoriePatientDto>(this.API + 'id/' +repasCategoriePatient.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.repasCategoriePatientSelections);
   }



    get repasCategoriePatients(): Array<RepasCategoriePatientDto> {
        if(this._repasCategoriePatients == null){
            this._repasCategoriePatients = new Array<RepasCategoriePatientDto>();
        }
        return this._repasCategoriePatients;
     }

    set repasCategoriePatients(value: Array<RepasCategoriePatientDto>) {
        this._repasCategoriePatients = value;
    }

    get selectedRepasCategoriePatient(): RepasCategoriePatientDto {
        if(this._selectedRepasCategoriePatient == null){
            this._selectedRepasCategoriePatient = new RepasCategoriePatientDto();
        }
        return this._selectedRepasCategoriePatient;
    }

    set selectedRepasCategoriePatient(value: RepasCategoriePatientDto) {
        this._selectedRepasCategoriePatient = value;
    }

    get repasCategoriePatientSelections(): Array<RepasCategoriePatientDto> {
        if(this._repasCategoriePatientSelections == null){
            this._repasCategoriePatientSelections = new Array<RepasCategoriePatientDto>();
        }
        return this._repasCategoriePatientSelections;
    }


    set repasCategoriePatientSelections(value: Array<RepasCategoriePatientDto>) {
        this._repasCategoriePatientSelections = value;
    }

    get createRepasCategoriePatientDialog(): boolean {
        return this._createRepasCategoriePatientDialog;
    }

    set createRepasCategoriePatientDialog(value: boolean) {
        this._createRepasCategoriePatientDialog = value;
    }

    get editRepasCategoriePatientDialog(): boolean {
        return this._editRepasCategoriePatientDialog;
    }

    set editRepasCategoriePatientDialog(value: boolean) {
        this._editRepasCategoriePatientDialog = value;
    }

    get viewRepasCategoriePatientDialog(): boolean {
        return this._viewRepasCategoriePatientDialog;
    }

    set viewRepasCategoriePatientDialog(value: boolean) {
        this._viewRepasCategoriePatientDialog = value;
    }

    get search(): RepasCategoriePatientCriteria {
         if(this._search==null){
            this._search = new RepasCategoriePatientCriteria();
        }
        return this._search;
    }

    set search(value: RepasCategoriePatientCriteria) {
        this._search = value;
    }
}
