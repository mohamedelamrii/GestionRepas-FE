import {RepasCategoriePatientDto} from './RepasCategoriePatient.model';
import {TypeRepasDto} from './TypeRepas.model';



export class RepasDto {

    public id: number;

    public libelle: string;
    public image: string;
    public description: string;
      public typeRepas: TypeRepasDto ;
      public repasCategoriePatients: Array<RepasCategoriePatientDto>;

}
