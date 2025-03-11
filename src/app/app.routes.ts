import { Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostComponent } from './components/posts-list/post/post.component';
import { PostAddComponent } from './components/posts-list/post-add/post-add.component';
import { ForumPageComponent } from './components/forum-page/forum-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path: 'posts', component: ForumPageComponent,
        children: [
            { path: '', component: PostsListComponent }, 
            { path: 'add', component: PostAddComponent }, 
            { path: ':id', component: PostComponent }
          ]
     },
];
