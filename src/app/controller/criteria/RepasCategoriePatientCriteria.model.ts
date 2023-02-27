//import {CategoriePatientDto} from './CategoriePatient.model';
//import {RepasDto} from './Repas.model';

import {BaseCriteria} from './BaseCriteria.model';
import {RepasCriteria} from "./RepasCriteria.model";
import {CategoriePatientCriteria} from "./CategoriePatientCriteria.model";

export class RepasCategoriePatientCriteria  extends BaseCriteria {

    public id: number;
      public repas: RepasCriteria ;
      public categoriePatient: CategoriePatientCriteria ;

}
