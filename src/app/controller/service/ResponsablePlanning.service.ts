import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {ResponsablePlanningDto} from '../model/ResponsablePlanning.model';
import {ResponsablePlanningCriteria} from '../criteria/ResponsablePlanningCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class ResponsablePlanningService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/responsablePlanning/';
        });
    }
     private _responsablePlannings: Array<ResponsablePlanningDto> ;
     private _selectedResponsablePlanning: ResponsablePlanningDto;
     private _responsablePlanningSelections: Array<ResponsablePlanningDto>;
     private _createResponsablePlanningDialog: boolean;
     private _editResponsablePlanningDialog: boolean;
     private _viewResponsablePlanningDialog: boolean;
     public editResponsablePlanning$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: ResponsablePlanningCriteria ;




    public findPaginatedByCriteria(criteria: ResponsablePlanningCriteria): Observable<PaginatedList<ResponsablePlanningDto>>{
        return this.http.post<PaginatedList<ResponsablePlanningDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<ResponsablePlanningDto>>(this.API);
    }

    public save(): Observable<ResponsablePlanningDto> {
        return this.http.post<ResponsablePlanningDto>(this.API, this.selectedResponsablePlanning);
    }

    delete(responsablePlanning: ResponsablePlanningDto) {
         return this.http.delete<number>(this.API + 'id/' + responsablePlanning.id);
    }


    public edit(): Observable<ResponsablePlanningDto> {
        return this.http.put<ResponsablePlanningDto>(this.API, this.selectedResponsablePlanning);
    }


     public findByCriteria(responsablePlanning: ResponsablePlanningCriteria): Observable<Array<ResponsablePlanningDto>>{
           return this.http.post<Array<ResponsablePlanningDto>>(this.API + 'find-by-criteria', responsablePlanning);
    }

   public findByIdWithAssociatedList(responsablePlanning:ResponsablePlanningDto):Observable<ResponsablePlanningDto>{
         return this.http.get<ResponsablePlanningDto>(this.API + 'id/' +responsablePlanning.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.responsablePlanningSelections);
   }



    get responsablePlannings(): Array<ResponsablePlanningDto> {
        if(this._responsablePlannings == null){
            this._responsablePlannings = new Array<ResponsablePlanningDto>();
        }
        return this._responsablePlannings;
     }

    set responsablePlannings(value: Array<ResponsablePlanningDto>) {
        this._responsablePlannings = value;
    }

    get selectedResponsablePlanning(): ResponsablePlanningDto {
        if(this._selectedResponsablePlanning == null){
            this._selectedResponsablePlanning = new ResponsablePlanningDto();
        }
        return this._selectedResponsablePlanning;
    }

    set selectedResponsablePlanning(value: ResponsablePlanningDto) {
        this._selectedResponsablePlanning = value;
    }

    get responsablePlanningSelections(): Array<ResponsablePlanningDto> {
        if(this._responsablePlanningSelections == null){
            this._responsablePlanningSelections = new Array<ResponsablePlanningDto>();
        }
        return this._responsablePlanningSelections;
    }


    set responsablePlanningSelections(value: Array<ResponsablePlanningDto>) {
        this._responsablePlanningSelections = value;
    }

    get createResponsablePlanningDialog(): boolean {
        return this._createResponsablePlanningDialog;
    }

    set createResponsablePlanningDialog(value: boolean) {
        this._createResponsablePlanningDialog = value;
    }

    get editResponsablePlanningDialog(): boolean {
        return this._editResponsablePlanningDialog;
    }

    set editResponsablePlanningDialog(value: boolean) {
        this._editResponsablePlanningDialog = value;
    }

    get viewResponsablePlanningDialog(): boolean {
        return this._viewResponsablePlanningDialog;
    }

    set viewResponsablePlanningDialog(value: boolean) {
        this._viewResponsablePlanningDialog = value;
    }

    get search(): ResponsablePlanningCriteria {
         if(this._search==null){
            this._search = new ResponsablePlanningCriteria();
        }
        return this._search;
    }

    set search(value: ResponsablePlanningCriteria) {
        this._search = value;
    }
}
