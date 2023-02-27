import {CategoriePatientDto} from './CategoriePatient.model';
import {RepasDto} from './Repas.model';



export class RepasCategoriePatientDto {

    public id: number;

      public repas: RepasDto ;
      public categoriePatient: CategoriePatientDto ;

}
