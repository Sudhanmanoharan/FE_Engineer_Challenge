import { Routes } from '@angular/router';
import { AuthorBooklistComponent } from './components/author-booklist/author-booklist.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'author-book-list'
     },
     {
         path: 'author-book-list',
         component: AuthorBooklistComponent
     },
];
