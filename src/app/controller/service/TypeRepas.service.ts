import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {PaginatedList} from '../model/PaginatedList.model';

import {TypeRepasDto} from '../model/TypeRepas.model';
import {TypeRepasCriteria} from '../criteria/TypeRepasCriteria.model';


@Injectable({
  providedIn: 'root'
})
export class TypeRepasService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeRepas/';
        });
    }
     private _typeRepass: Array<TypeRepasDto> ;
     private _selectedTypeRepas: TypeRepasDto;
     private _typeRepasSelections: Array<TypeRepasDto>;
     private _createTypeRepasDialog: boolean;
     private _editTypeRepasDialog: boolean;
     private _viewTypeRepasDialog: boolean;
     public editTypeRepas$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _search: TypeRepasCriteria ;




    public findPaginatedByCriteria(criteria: TypeRepasCriteria): Observable<PaginatedList<TypeRepasDto>>{
        console.log('haaa  liennn :::: ' + this.API + 'find-paginated-by-criteria');
        console.log('o criteria '+ criteria);
        return this.http.post<PaginatedList<TypeRepasDto>>(this.API + 'find-paginated-by-criteria', criteria);
    }

    public findAll(){
     return this.http.get<Array<TypeRepasDto>>(this.API);
    }

    public save(): Observable<TypeRepasDto> {
        return this.http.post<TypeRepasDto>(this.API, this.selectedTypeRepas);
    }

    delete(typeRepas: TypeRepasDto) {
         return this.http.delete<number>(this.API + 'id/' + typeRepas.id);
    }


    public edit(): Observable<TypeRepasDto> {
        return this.http.put<TypeRepasDto>(this.API, this.selectedTypeRepas);
    }


     public findByCriteria(typeRepas: TypeRepasCriteria): Observable<Array<TypeRepasDto>>{
           return this.http.post<Array<TypeRepasDto>>(this.API + 'find-by-criteria', typeRepas);
    }

   public findByIdWithAssociatedList(typeRepas:TypeRepasDto):Observable<TypeRepasDto>{
         return this.http.get<TypeRepasDto>(this.API + 'id/' +typeRepas.id);
    }

   public deleteMultiple() {
        return this.http.post<void>(this.API + 'multiple',this.typeRepasSelections);
   }



    get typeRepass(): Array<TypeRepasDto> {
        if(this._typeRepass == null){
            this._typeRepass = new Array<TypeRepasDto>();
        }
        return this._typeRepass;
     }

    set typeRepass(value: Array<TypeRepasDto>) {
        this._typeRepass = value;
    }

    get selectedTypeRepas(): TypeRepasDto {
        if(this._selectedTypeRepas == null){
            this._selectedTypeRepas = new TypeRepasDto();
        }
        return this._selectedTypeRepas;
    }

    set selectedTypeRepas(value: TypeRepasDto) {
        this._selectedTypeRepas = value;
    }

    get typeRepasSelections(): Array<TypeRepasDto> {
        if(this._typeRepasSelections == null){
            this._typeRepasSelections = new Array<TypeRepasDto>();
        }
        return this._typeRepasSelections;
    }


    set typeRepasSelections(value: Array<TypeRepasDto>) {
        this._typeRepasSelections = value;
    }

    get createTypeRepasDialog(): boolean {
        return this._createTypeRepasDialog;
    }

    set createTypeRepasDialog(value: boolean) {
        this._createTypeRepasDialog = value;
    }

    get editTypeRepasDialog(): boolean {
        return this._editTypeRepasDialog;
    }

    set editTypeRepasDialog(value: boolean) {
        this._editTypeRepasDialog = value;
    }

    get viewTypeRepasDialog(): boolean {
        return this._viewTypeRepasDialog;
    }

    set viewTypeRepasDialog(value: boolean) {
        this._viewTypeRepasDialog = value;
    }

    get search(): TypeRepasCriteria {
         if(this._search==null){
            this._search = new TypeRepasCriteria();
        }
        return this._search;
    }

    set search(value: TypeRepasCriteria) {
        this._search = value;
    }
}
