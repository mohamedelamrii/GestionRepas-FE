import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {JourDto} from '../model/Jour.model';
import {JourCriteria} from '../criteria/JourCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class JourService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/jour/';
        });
    }
     private _jours: Array<JourDto> ;
     private _selectedJour: JourDto;
     private _jourSelections: Array<JourDto>;
     private _createJourDialog: boolean;
     private _editJourDialog: boolean;
     private _viewJourDialog: boolean;
     public editJour$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: JourCriteria ;




    public findPaginatedByCriteria(criteria: JourCriteria): Observable<PaginatedList<JourDto>>{
        return this.http.post<PaginatedList<JourDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<JourDto>>(this.API);
    }

    public save(): Observable<JourDto> {
        return this.http.post<JourDto>(this.API, this.selectedJour);
    }

    delete(jour: JourDto) {
         return this.http.delete<number>(this.API + 'id/' + jour.id);
    }


    public edit(): Observable<JourDto> {
        return this.http.put<JourDto>(this.API, this.selectedJour);
    }


     public findByCriteria(jour: JourCriteria): Observable<Array<JourDto>>{
           return this.http.post<Array<JourDto>>(this.API + 'find-by-criteria', jour);
    }

   public findByIdWithAssociatedList(jour:JourDto):Observable<JourDto>{
         return this.http.get<JourDto>(this.API + 'id/' +jour.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.jourSelections);
   }



    get jours(): Array<JourDto> {
        if(this._jours == null){
            this._jours = new Array<JourDto>();
        }
        return this._jours;
     }

    set jours(value: Array<JourDto>) {
        this._jours = value;
    }

    get selectedJour(): JourDto {
        if(this._selectedJour == null){
            this._selectedJour = new JourDto();
        }
        return this._selectedJour;
    }

    set selectedJour(value: JourDto) {
        this._selectedJour = value;
    }

    get jourSelections(): Array<JourDto> {
        if(this._jourSelections == null){
            this._jourSelections = new Array<JourDto>();
        }
        return this._jourSelections;
    }


    set jourSelections(value: Array<JourDto>) {
        this._jourSelections = value;
    }

    get createJourDialog(): boolean {
        return this._createJourDialog;
    }

    set createJourDialog(value: boolean) {
        this._createJourDialog = value;
    }

    get editJourDialog(): boolean {
        return this._editJourDialog;
    }

    set editJourDialog(value: boolean) {
        this._editJourDialog = value;
    }

    get viewJourDialog(): boolean {
        return this._viewJourDialog;
    }

    set viewJourDialog(value: boolean) {
        this._viewJourDialog = value;
    }

    get search(): JourCriteria {
         if(this._search==null){
            this._search = new JourCriteria();
        }
        return this._search;
    }

    set search(value: JourCriteria) {
        this._search = value;
    }
}
