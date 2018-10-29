import { Routes } from '@angular/router';
import { BasicLayoutComponent } from './shared/layouts/basicLayout.component';
import { GuardGuard } from './guards/guard.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: '/starter', pathMatch: 'full'
    },
    {
        path: 'starter', 
        component: BasicLayoutComponent, 
        loadChildren: './pages/starter/starter.module#StarterModule',
        canActivate: [GuardGuard]
    },
    {
        path: 'back-office', component: BasicLayoutComponent,
        children: [
            {
                path: 'visual-test',
                children: [
                    {
                        path: 'question-set',
                        loadChildren: './pages/back-office/visual-test/question-set-list/question-set-list.module#QuestionSetListModule'
                    },
                    {
                        path: 'manage',
                        children: [
                            { path: '', loadChildren: './pages/back-office/visual-test/manage/manage.module#ManageModule' },
                            { path: ':mode/:id', loadChildren: './pages/back-office/visual-test/manage/manage.module#ManageModule' }
                        ]
                    },
                    {
                        path: 'verify/:questionSetId/:userId',
                        loadChildren: './pages/back-office/visual-test/verify/verify.module#VerifyModule'
                    }
                ]
            }
        ],
        canActivate: [GuardGuard]
    }, {
        path: 'career',
        children: [
            {
                path: 'visual-test',
                children: [
                    {
                        path: 'question/:questionSetId/:userId',
                        loadChildren: './pages/career/visual-test/question/question.module#QuestionModule'
                    }
                ]
            }
        ]
    }
]