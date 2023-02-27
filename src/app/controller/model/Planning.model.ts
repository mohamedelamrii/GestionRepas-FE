import {CategoriePatientDto} from './CategoriePatient.model';
import {PlanningRepasDto} from './PlanningRepas.model';
import {JourDto} from './Jour.model';



export class PlanningDto {

    public id: number;

    public dateDebut: Date;
    public dateFin: Date;
     public dateDebutMax: string ;
     public dateDebutMin: string ;
     public dateFinMax: string ;
     public dateFinMin: string ;
      public categoriePatient: CategoriePatientDto ;
      public jour: JourDto ;
      public planningRepass: Array<PlanningRepasDto>;

}
