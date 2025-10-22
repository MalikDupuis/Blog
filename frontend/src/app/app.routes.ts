import { Routes } from '@angular/router';
import { Articles } from './pages/articles/articles';
import { CreateArticle } from './pages/create-article/create-article';

export const routes: Routes = [
    { path: '', component: Articles },
    { path: 'create', component: CreateArticle }
];
