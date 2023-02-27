//import {PlanningRepasDto} from './PlanningRepas.model';

import {BaseCriteria} from './BaseCriteria.model';
import {PlanningRepasCriteria} from "./PlanningRepasCriteria.model";

export class PlanningExecutionCriteria  extends BaseCriteria {

    public id: number;
    public datePlanningExecution: Date;
    public datePlanningExecutionFrom: Date;
    public datePlanningExecutionTo: Date;
     public quantiteExecution: number;
     public quantiteExecutionMin: number;
     public quantiteExecutionMax: number;
    public commentaire: string;
    public commentaireLike: string;
      public planningRepas: PlanningRepasCriteria ;

}
