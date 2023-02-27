import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {PlanningExecutionDto} from '../model/PlanningExecution.model';
import {PlanningExecutionCriteria} from '../criteria/PlanningExecutionCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class PlanningExecutionService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/planningExecution/';
        });
    }
     private _planningExecutions: Array<PlanningExecutionDto> ;
     private _selectedPlanningExecution: PlanningExecutionDto;
     private _planningExecutionSelections: Array<PlanningExecutionDto>;
     private _createPlanningExecutionDialog: boolean;
     private _editPlanningExecutionDialog: boolean;
     private _viewPlanningExecutionDialog: boolean;
     public editPlanningExecution$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: PlanningExecutionCriteria ;




    public findPaginatedByCriteria(criteria: PlanningExecutionCriteria): Observable<PaginatedList<PlanningExecutionDto>>{
        return this.http.post<PaginatedList<PlanningExecutionDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<PlanningExecutionDto>>(this.API);
    }

    public save(): Observable<PlanningExecutionDto> {
        return this.http.post<PlanningExecutionDto>(this.API, this.selectedPlanningExecution);
    }

    delete(planningExecution: PlanningExecutionDto) {
         return this.http.delete<number>(this.API + 'id/' + planningExecution.id);
    }


    public edit(): Observable<PlanningExecutionDto> {
        return this.http.put<PlanningExecutionDto>(this.API, this.selectedPlanningExecution);
    }


     public findByCriteria(planningExecution: PlanningExecutionCriteria): Observable<Array<PlanningExecutionDto>>{
           return this.http.post<Array<PlanningExecutionDto>>(this.API + 'find-by-criteria', planningExecution);
    }

   public findByIdWithAssociatedList(planningExecution:PlanningExecutionDto):Observable<PlanningExecutionDto>{
         return this.http.get<PlanningExecutionDto>(this.API + 'id/' +planningExecution.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.planningExecutionSelections);
   }



    get planningExecutions(): Array<PlanningExecutionDto> {
        if(this._planningExecutions == null){
            this._planningExecutions = new Array<PlanningExecutionDto>();
        }
        return this._planningExecutions;
     }

    set planningExecutions(value: Array<PlanningExecutionDto>) {
        this._planningExecutions = value;
    }

    get selectedPlanningExecution(): PlanningExecutionDto {
        if(this._selectedPlanningExecution == null){
            this._selectedPlanningExecution = new PlanningExecutionDto();
        }
        return this._selectedPlanningExecution;
    }

    set selectedPlanningExecution(value: PlanningExecutionDto) {
        this._selectedPlanningExecution = value;
    }

    get planningExecutionSelections(): Array<PlanningExecutionDto> {
        if(this._planningExecutionSelections == null){
            this._planningExecutionSelections = new Array<PlanningExecutionDto>();
        }
        return this._planningExecutionSelections;
    }


    set planningExecutionSelections(value: Array<PlanningExecutionDto>) {
        this._planningExecutionSelections = value;
    }

    get createPlanningExecutionDialog(): boolean {
        return this._createPlanningExecutionDialog;
    }

    set createPlanningExecutionDialog(value: boolean) {
        this._createPlanningExecutionDialog = value;
    }

    get editPlanningExecutionDialog(): boolean {
        return this._editPlanningExecutionDialog;
    }

    set editPlanningExecutionDialog(value: boolean) {
        this._editPlanningExecutionDialog = value;
    }

    get viewPlanningExecutionDialog(): boolean {
        return this._viewPlanningExecutionDialog;
    }

    set viewPlanningExecutionDialog(value: boolean) {
        this._viewPlanningExecutionDialog = value;
    }

    get search(): PlanningExecutionCriteria {
         if(this._search==null){
            this._search = new PlanningExecutionCriteria();
        }
        return this._search;
    }

    set search(value: PlanningExecutionCriteria) {
        this._search = value;
    }
}
