
import {BaseCriteria} from './BaseCriteria.model';

export class JourCriteria  extends BaseCriteria {

    public id: number;
    public libelle: string;
    public libelleLike: string;
    public code: string;
    public codeLike: string;

}
