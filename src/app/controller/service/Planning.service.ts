import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {PlanningDto} from '../model/Planning.model';
import {PlanningCriteria} from '../criteria/PlanningCriteria.model';



@Injectable({
  providedIn: 'root'
})
export class PlanningService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/planning/';
        });
    }
     private _plannings: Array<PlanningDto> ;
     private _selectedPlanning: PlanningDto;
     private _planningSelections: Array<PlanningDto>;
     private _createPlanningDialog: boolean;
     private _editPlanningDialog: boolean;
     private _viewPlanningDialog: boolean;
     public editPlanning$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: PlanningCriteria ;




    public findPaginatedByCriteria(criteria: PlanningCriteria): Observable<PaginatedList<PlanningDto>>{
        return this.http.post<PaginatedList<PlanningDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<PlanningDto>>(this.API);
    }

    public save(): Observable<PlanningDto> {
        return this.http.post<PlanningDto>(this.API, this.selectedPlanning);
    }

    delete(planning: PlanningDto) {
         return this.http.delete<number>(this.API + 'id/' + planning.id);
    }


    public edit(): Observable<PlanningDto> {
        return this.http.put<PlanningDto>(this.API, this.selectedPlanning);
    }


     public findByCriteria(planning: PlanningCriteria): Observable<Array<PlanningDto>>{
           return this.http.post<Array<PlanningDto>>(this.API + 'find-by-criteria', planning);
    }

   public findByIdWithAssociatedList(planning:PlanningDto):Observable<PlanningDto>{
         return this.http.get<PlanningDto>(this.API + 'id/' +planning.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.planningSelections);
   }



    get plannings(): Array<PlanningDto> {
        if(this._plannings == null){
            this._plannings = new Array<PlanningDto>();
        }
        return this._plannings;
     }

    set plannings(value: Array<PlanningDto>) {
        this._plannings = value;
    }

    get selectedPlanning(): PlanningDto {
        if(this._selectedPlanning == null){
            this._selectedPlanning = new PlanningDto();
        }
        return this._selectedPlanning;
    }

    set selectedPlanning(value: PlanningDto) {
        this._selectedPlanning = value;
    }

    get planningSelections(): Array<PlanningDto> {
        if(this._planningSelections == null){
            this._planningSelections = new Array<PlanningDto>();
        }
        return this._planningSelections;
    }


    set planningSelections(value: Array<PlanningDto>) {
        this._planningSelections = value;
    }

    get createPlanningDialog(): boolean {
        return this._createPlanningDialog;
    }

    set createPlanningDialog(value: boolean) {
        this._createPlanningDialog = value;
    }

    get editPlanningDialog(): boolean {
        return this._editPlanningDialog;
    }

    set editPlanningDialog(value: boolean) {
        this._editPlanningDialog = value;
    }

    get viewPlanningDialog(): boolean {
        return this._viewPlanningDialog;
    }

    set viewPlanningDialog(value: boolean) {
        this._viewPlanningDialog = value;
    }

    get search(): PlanningCriteria {
         if(this._search==null){
            this._search = new PlanningCriteria();
        }
        return this._search;
    }

    set search(value: PlanningCriteria) {
        this._search = value;
    }
}
