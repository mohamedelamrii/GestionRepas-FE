import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {CategoriePatientDto} from '../model/CategoriePatient.model';
import {CategoriePatientCriteria} from '../criteria/CategoriePatientCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriePatientService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categoriePatient/';
        });
    }
     private _categoriePatients: Array<CategoriePatientDto> ;
     private _selectedCategoriePatient: CategoriePatientDto;
     private _categoriePatientSelections: Array<CategoriePatientDto>;
     private _createCategoriePatientDialog: boolean;
     private _editCategoriePatientDialog: boolean;
     private _viewCategoriePatientDialog: boolean;
     public editCategoriePatient$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: CategoriePatientCriteria ;




    public findPaginatedByCriteria(criteria: CategoriePatientCriteria): Observable<PaginatedList<CategoriePatientDto>>{
        return this.http.post<PaginatedList<CategoriePatientDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<CategoriePatientDto>>(this.API);
    }

    public save(): Observable<CategoriePatientDto> {
        return this.http.post<CategoriePatientDto>(this.API, this.selectedCategoriePatient);
    }

    delete(categoriePatient: CategoriePatientDto) {
         return this.http.delete<number>(this.API + 'id/' + categoriePatient.id);
    }


    public edit(): Observable<CategoriePatientDto> {
        return this.http.put<CategoriePatientDto>(this.API, this.selectedCategoriePatient);
    }


     public findByCriteria(categoriePatient: CategoriePatientCriteria): Observable<Array<CategoriePatientDto>>{
           return this.http.post<Array<CategoriePatientDto>>(this.API + 'find-by-criteria', categoriePatient);
    }

   public findByIdWithAssociatedList(categoriePatient:CategoriePatientDto):Observable<CategoriePatientDto>{
         return this.http.get<CategoriePatientDto>(this.API + 'id/' +categoriePatient.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.categoriePatientSelections);
   }



    get categoriePatients(): Array<CategoriePatientDto> {
        if(this._categoriePatients == null){
            this._categoriePatients = new Array<CategoriePatientDto>();
        }
        return this._categoriePatients;
     }

    set categoriePatients(value: Array<CategoriePatientDto>) {
        this._categoriePatients = value;
    }

    get selectedCategoriePatient(): CategoriePatientDto {
        if(this._selectedCategoriePatient == null){
            this._selectedCategoriePatient = new CategoriePatientDto();
        }
        return this._selectedCategoriePatient;
    }

    set selectedCategoriePatient(value: CategoriePatientDto) {
        this._selectedCategoriePatient = value;
    }

    get categoriePatientSelections(): Array<CategoriePatientDto> {
        if(this._categoriePatientSelections == null){
            this._categoriePatientSelections = new Array<CategoriePatientDto>();
        }
        return this._categoriePatientSelections;
    }


    set categoriePatientSelections(value: Array<CategoriePatientDto>) {
        this._categoriePatientSelections = value;
    }

    get createCategoriePatientDialog(): boolean {
        return this._createCategoriePatientDialog;
    }

    set createCategoriePatientDialog(value: boolean) {
        this._createCategoriePatientDialog = value;
    }

    get editCategoriePatientDialog(): boolean {
        return this._editCategoriePatientDialog;
    }

    set editCategoriePatientDialog(value: boolean) {
        this._editCategoriePatientDialog = value;
    }

    get viewCategoriePatientDialog(): boolean {
        return this._viewCategoriePatientDialog;
    }

    set viewCategoriePatientDialog(value: boolean) {
        this._viewCategoriePatientDialog = value;
    }

    get search(): CategoriePatientCriteria {
         if(this._search==null){
            this._search = new CategoriePatientCriteria();
        }
        return this._search;
    }

    set search(value: CategoriePatientCriteria) {
        this._search = value;
    }
}
