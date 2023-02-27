import {PlanningDto} from './Planning.model';
import {RepasDto} from './Repas.model';
import {TypeRepasDto} from './TypeRepas.model';



export class PlanningRepasDto {

    public id: number;

     public quantite: number;
    public description: string;
     public quantiteMax: string ;
     public quantiteMin: string ;
      public planning: PlanningDto ;
      public repas: RepasDto ;
      public typeRepas: TypeRepasDto ;

}
