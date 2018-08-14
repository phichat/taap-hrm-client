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
        path: 'career', component: LayoutComponent,
        children: [
            {
                path: 'visual-test',
                children: [
                    { path: 'question', loadChildren: './pages/visual-test/question/question.module#QuestionModule' },
                    { path: 'manage', loadChildren: './pages/visual-test/manage/manage.module#ManageModule' },
                    { path: 'verify', loadChildren: './pages/visual-test/verify/verify.module#VerifyModule' }
                ]
            }
        ]
    }

]