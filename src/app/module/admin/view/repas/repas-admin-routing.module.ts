
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



import { ResponsablePlanningListAdminComponent } from './responsable-planning-admin/list-admin/responsable-planning-list-admin.component';
import { RepasCategoriePatientListAdminComponent } from './repas-categorie-patient-admin/list-admin/repas-categorie-patient-list-admin.component';
import { PlanningRepasListAdminComponent } from './planning-repas-admin/list-admin/planning-repas-list-admin.component';
import { RepasListAdminComponent } from './repas-admin/list-admin/repas-list-admin.component';
import { TypeRepasListAdminComponent } from './type-repas-admin/list-admin/type-repas-list-admin.component';
import { JourListAdminComponent } from './jour-admin/list-admin/jour-list-admin.component';
import { PatientListAdminComponent } from './patient-admin/list-admin/patient-list-admin.component';
import { PlanningExecutionListAdminComponent } from './planning-execution-admin/list-admin/planning-execution-list-admin.component';
import { PlanningListAdminComponent } from './planning-admin/list-admin/planning-list-admin.component';
import { CategoriePatientListAdminComponent } from './categorie-patient-admin/list-admin/categorie-patient-list-admin.component';
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
                                    component: ResponsablePlanningListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'repas-categorie-patient',
                            children: [
                                {
                                    path: 'list',
                                    component: RepasCategoriePatientListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'planning-repas',
                            children: [
                                {
                                    path: 'list',
                                    component: PlanningRepasListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'repas',
                            children: [
                                {
                                    path: 'list',
                                    component: RepasListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-repas',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeRepasListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'jour',
                            children: [
                                {
                                    path: 'list',
                                    component: JourListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'patient',
                            children: [
                                {
                                    path: 'list',
                                    component: PatientListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'planning-execution',
                            children: [
                                {
                                    path: 'list',
                                    component: PlanningExecutionListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'planning',
                            children: [
                                {
                                    path: 'list',
                                    component: PlanningListAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-patient',
                            children: [
                                {
                                    path: 'list',
                                    component: CategoriePatientListAdminComponent ,
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
export class RepasAdminRoutingModule { }
