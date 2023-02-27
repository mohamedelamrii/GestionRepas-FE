
import {BaseCriteria} from './BaseCriteria.model';

export class PatientCriteria  extends BaseCriteria {

    public id: number;
    public ipp: string;
    public ippLike: string;
    public nom: string;
    public nomLike: string;
    public prenom: string;
    public prenomLike: string;
    public cin: string;
    public cinLike: string;
    public codeRamed: string;
    public codeRamedLike: string;

}
