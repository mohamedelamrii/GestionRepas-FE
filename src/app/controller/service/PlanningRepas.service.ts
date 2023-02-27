import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {PlanningRepasDto} from '../model/PlanningRepas.model';
import {PlanningRepasCriteria} from '../criteria/PlanningRepasCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class PlanningRepasService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/planningRepas/';
        });
    }
     private _planningRepass: Array<PlanningRepasDto> ;
     private _selectedPlanningRepas: PlanningRepasDto;
     private _planningRepasSelections: Array<PlanningRepasDto>;
     private _createPlanningRepasDialog: boolean;
     private _editPlanningRepasDialog: boolean;
     private _viewPlanningRepasDialog: boolean;
     public editPlanningRepas$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: PlanningRepasCriteria ;




    public findPaginatedByCriteria(criteria: PlanningRepasCriteria): Observable<PaginatedList<PlanningRepasDto>>{
        return this.http.post<PaginatedList<PlanningRepasDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<PlanningRepasDto>>(this.API);
    }

    public save(): Observable<PlanningRepasDto> {
        return this.http.post<PlanningRepasDto>(this.API, this.selectedPlanningRepas);
    }

    delete(planningRepas: PlanningRepasDto) {
         return this.http.delete<number>(this.API + 'id/' + planningRepas.id);
    }


    public edit(): Observable<PlanningRepasDto> {
        return this.http.put<PlanningRepasDto>(this.API, this.selectedPlanningRepas);
    }


     public findByCriteria(planningRepas: PlanningRepasCriteria): Observable<Array<PlanningRepasDto>>{
           return this.http.post<Array<PlanningRepasDto>>(this.API + 'find-by-criteria', planningRepas);
    }

   public findByIdWithAssociatedList(planningRepas:PlanningRepasDto):Observable<PlanningRepasDto>{
         return this.http.get<PlanningRepasDto>(this.API + 'id/' +planningRepas.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.planningRepasSelections);
   }



    get planningRepass(): Array<PlanningRepasDto> {
        if(this._planningRepass == null){
            this._planningRepass = new Array<PlanningRepasDto>();
        }
        return this._planningRepass;
     }

    set planningRepass(value: Array<PlanningRepasDto>) {
        this._planningRepass = value;
    }

    get selectedPlanningRepas(): PlanningRepasDto {
        if(this._selectedPlanningRepas == null){
            this._selectedPlanningRepas = new PlanningRepasDto();
        }
        return this._selectedPlanningRepas;
    }

    set selectedPlanningRepas(value: PlanningRepasDto) {
        this._selectedPlanningRepas = value;
    }

    get planningRepasSelections(): Array<PlanningRepasDto> {
        if(this._planningRepasSelections == null){
            this._planningRepasSelections = new Array<PlanningRepasDto>();
        }
        return this._planningRepasSelections;
    }


    set planningRepasSelections(value: Array<PlanningRepasDto>) {
        this._planningRepasSelections = value;
    }

    get createPlanningRepasDialog(): boolean {
        return this._createPlanningRepasDialog;
    }

    set createPlanningRepasDialog(value: boolean) {
        this._createPlanningRepasDialog = value;
    }

    get editPlanningRepasDialog(): boolean {
        return this._editPlanningRepasDialog;
    }

    set editPlanningRepasDialog(value: boolean) {
        this._editPlanningRepasDialog = value;
    }

    get viewPlanningRepasDialog(): boolean {
        return this._viewPlanningRepasDialog;
    }

    set viewPlanningRepasDialog(value: boolean) {
        this._viewPlanningRepasDialog = value;
    }

    get search(): PlanningRepasCriteria {
         if(this._search==null){
            this._search = new PlanningRepasCriteria();
        }
        return this._search;
    }

    set search(value: PlanningRepasCriteria) {
        this._search = value;
    }
}
