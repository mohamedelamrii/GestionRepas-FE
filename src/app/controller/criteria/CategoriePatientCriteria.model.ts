
import {BaseCriteria} from './BaseCriteria.model';

export class CategoriePatientCriteria  extends BaseCriteria {

    public id: number;
    public libelle: string;
    public libelleLike: string;
    public code: string;
    public codeLike: string;
     public nombrePatientTotal: number;
     public nombrePatientTotalMin: number;
     public nombrePatientTotalMax: number;
    public description: string;
    public descriptionLike: string;

}
