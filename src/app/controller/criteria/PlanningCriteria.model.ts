//import {CategoriePatientDto} from './CategoriePatient.model';
//import {PlanningRepasDto} from './PlanningRepas.model';
//import {JourDto} from './Jour.model';

import {BaseCriteria} from './BaseCriteria.model';
import {CategoriePatientCriteria} from "./CategoriePatientCriteria.model";
import {JourCriteria} from "./JourCriteria.model";
import {PlanningRepasCriteria} from "./PlanningRepasCriteria.model";

export class PlanningCriteria  extends BaseCriteria {

    public id: number;
    public dateDebut: Date;
    public dateDebutFrom: Date;
    public dateDebutTo: Date;
    public dateFin: Date;
    public dateFinFrom: Date;
    public dateFinTo: Date;
      public categoriePatient: CategoriePatientCriteria ;
      public jour: JourCriteria ;
      public planningRepass: Array<PlanningRepasCriteria>;

}
