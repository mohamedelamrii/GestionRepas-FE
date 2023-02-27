//import {RepasCategoriePatientDto} from './RepasCategoriePatient.model';
//import {TypeRepasDto} from './TypeRepas.model';

import {BaseCriteria} from './BaseCriteria.model';
import {TypeRepasCriteria} from "./TypeRepasCriteria.model";
import {RepasCategoriePatientCriteria} from "./RepasCategoriePatientCriteria.model";

export class RepasCriteria extends BaseCriteria {

    public id: number;
    public libelle: string;
    public libelleLike: string;
    public image: string;
    public imageLike: string;
    public description: string;
    public descriptionLike: string;
    public typeRepas: TypeRepasCriteria;
    public repasCategoriePatients: Array<RepasCategoriePatientCriteria>;

}
