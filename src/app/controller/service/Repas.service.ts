import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {RepasDto} from '../model/Repas.model';
import {RepasCriteria} from '../criteria/RepasCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class RepasService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/repas/';
        });
    }
     private _repass: Array<RepasDto> ;
     private _selectedRepas: RepasDto;
     private _repasSelections: Array<RepasDto>;
     private _createRepasDialog: boolean;
     private _editRepasDialog: boolean;
     private _viewRepasDialog: boolean;
     public editRepas$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: RepasCriteria ;




    public findPaginatedByCriteria(criteria: RepasCriteria): Observable<PaginatedList<RepasDto>>{
        return this.http.post<PaginatedList<RepasDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<RepasDto>>(this.API);
    }

    public save(): Observable<RepasDto> {
        return this.http.post<RepasDto>(this.API, this.selectedRepas);
    }

    delete(repas: RepasDto) {
         return this.http.delete<number>(this.API + 'id/' + repas.id);
    }


    public edit(): Observable<RepasDto> {
        return this.http.put<RepasDto>(this.API, this.selectedRepas);
    }


     public findByCriteria(repas: RepasCriteria): Observable<Array<RepasDto>>{
           return this.http.post<Array<RepasDto>>(this.API + 'find-by-criteria', repas);
    }

   public findByIdWithAssociatedList(repas:RepasDto):Observable<RepasDto>{
         return this.http.get<RepasDto>(this.API + 'id/' +repas.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.repasSelections);
   }



    get repass(): Array<RepasDto> {
        if(this._repass == null){
            this._repass = new Array<RepasDto>();
        }
        return this._repass;
     }

    set repass(value: Array<RepasDto>) {
        this._repass = value;
    }

    get selectedRepas(): RepasDto {
        if(this._selectedRepas == null){
            this._selectedRepas = new RepasDto();
        }
        return this._selectedRepas;
    }

    set selectedRepas(value: RepasDto) {
        this._selectedRepas = value;
    }

    get repasSelections(): Array<RepasDto> {
        if(this._repasSelections == null){
            this._repasSelections = new Array<RepasDto>();
        }
        return this._repasSelections;
    }


    set repasSelections(value: Array<RepasDto>) {
        this._repasSelections = value;
    }

    get createRepasDialog(): boolean {
        return this._createRepasDialog;
    }

    set createRepasDialog(value: boolean) {
        this._createRepasDialog = value;
    }

    get editRepasDialog(): boolean {
        return this._editRepasDialog;
    }

    set editRepasDialog(value: boolean) {
        this._editRepasDialog = value;
    }

    get viewRepasDialog(): boolean {
        return this._viewRepasDialog;
    }

    set viewRepasDialog(value: boolean) {
        this._viewRepasDialog = value;
    }

    get search(): RepasCriteria {
         if(this._search==null){
            this._search = new RepasCriteria();
        }
        return this._search;
    }

    set search(value: RepasCriteria) {
        this._search = value;
    }
}
