import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/starter', pathMatch: 'full'
    },
    {
        path: 'starter', component: LayoutComponent, loadChildren: './pages/starter/starter.module#StarterModule'
    },
    {
        path: 'back-office', component: LayoutComponent,
        children: [
            {
                path: 'visual-test',
                children: [
                    { path: 'question-set', loadChildren: './pages/back-office/visual-test/question-set-list/question-set-list.module#QuestionSetListModule' },
                    {
                        path: 'manage',
                        children: [
                            { path: '', loadChildren: './pages/back-office/visual-test/manage/manage.module#ManageModule' },
                            { path: ':mode/:id', loadChildren: './pages/back-office/visual-test/manage/manage.module#ManageModule' }
                        ]
                    },
                    { path: 'verify/:questionSetId/:userId', loadChildren: './pages/back-office/visual-test/verify/verify.module#VerifyModule' }
                ]
            }
        ]
    }, {
        path: 'career',
        children: [
            {path: 'visual-test', 
            children: [
                { path: 'question/:questionSetId/:userId', loadChildren: './pages/career/visual-test/question/question.module#QuestionModule' },
            ]
        }
            
        ]
    }

]