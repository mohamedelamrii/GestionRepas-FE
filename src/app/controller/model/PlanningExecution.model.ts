import {PlanningRepasDto} from './PlanningRepas.model';



export class PlanningExecutionDto {

    public id: number;

    public datePlanningExecution: Date;
     public quantiteExecution: number;
    public commentaire: string;
     public datePlanningExecutionMax: string ;
     public datePlanningExecutionMin: string ;
     public quantiteExecutionMax: string ;
     public quantiteExecutionMin: string ;
      public planningRepas: PlanningRepasDto ;

}
