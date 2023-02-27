
import {BaseCriteria} from './BaseCriteria.model';

export class ResponsablePlanningCriteria  extends BaseCriteria {

    public id: number;
    public nom: string;
    public nomLike: string;
    public prenom: string;
    public prenomLike: string;
    public cin: string;
    public cinLike: string;
    public code: string;
    public codeLike: string;
    public email: string;
    public emailLike: string;
    public adresse: string;
    public adresseLike: string;

}
