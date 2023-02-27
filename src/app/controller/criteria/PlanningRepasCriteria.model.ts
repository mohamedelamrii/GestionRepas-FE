//import {PlanningDto} from './Planning.model';
//import {RepasDto} from './Repas.model';
//import {TypeRepasDto} from './TypeRepas.model';

import {BaseCriteria} from './BaseCriteria.model';
import {PlanningCriteria} from "./PlanningCriteria.model";
import {TypeRepasCriteria} from "./TypeRepasCriteria.model";
import {RepasCriteria} from "./RepasCriteria.model";

export class PlanningRepasCriteria  extends BaseCriteria {

    public id: number;
     public quantite: number;
     public quantiteMin: number;
     public quantiteMax: number;
    public description: string;
    public descriptionLike: string;
      public planning: PlanningCriteria ;
      public repas: RepasCriteria ;
      public typeRepas: TypeRepasCriteria ;

}
