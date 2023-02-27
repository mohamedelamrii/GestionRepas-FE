
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



import { ResponsablePlanningListResponsableComponent } from './responsable-planning-responsable/list-responsable/responsable-planning-list-responsable.component';
import { RepasCategoriePatientListResponsableComponent } from './repas-categorie-patient-responsable/list-responsable/repas-categorie-patient-list-responsable.component';
import { PlanningRepasListResponsableComponent } from './planning-repas-responsable/list-responsable/planning-repas-list-responsable.component';
import { RepasListResponsableComponent } from './repas-responsable/list-responsable/repas-list-responsable.component';
import { TypeRepasListResponsableComponent } from './type-repas-responsable/list-responsable/type-repas-list-responsable.component';
import { JourListResponsableComponent } from './jour-responsable/list-responsable/jour-list-responsable.component';
import { PatientListResponsableComponent } from './patient-responsable/list-responsable/patient-list-responsable.component';
import { PlanningExecutionListResponsableComponent } from './planning-execution-responsable/list-responsable/planning-execution-list-responsable.component';
import { PlanningListResponsableComponent } from './planning-responsable/list-responsable/planning-list-responsable.component';
import { CategoriePatientListResponsableComponent } from './categorie-patient-responsable/list-responsable/categorie-patient-list-responsable.component';
@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'responsable-planning',
                            children: [
                                {
                                    path: 'list',
                                    component: ResponsablePlanningListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'repas-categorie-patient',
                            children: [
                                {
                                    path: 'list',
                                    component: RepasCategoriePatientListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'planning-repas',
                            children: [
                                {
                                    path: 'list',
                                    component: PlanningRepasListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'repas',
                            children: [
                                {
                                    path: 'list',
                                    component: RepasListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-repas',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeRepasListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'jour',
                            children: [
                                {
                                    path: 'list',
                                    component: JourListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'patient',
                            children: [
                                {
                                    path: 'list',
                                    component: PatientListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'planning-execution',
                            children: [
                                {
                                    path: 'list',
                                    component: PlanningExecutionListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'planning',
                            children: [
                                {
                                    path: 'list',
                                    component: PlanningListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-patient',
                            children: [
                                {
                                    path: 'list',
                                    component: CategoriePatientListResponsableComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class RepasResponsableRoutingModule { }
