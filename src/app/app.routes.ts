import { Routes } from '@angular/router';
import { PostsListComponent } from '../components/posts-list/posts-list.component';
import { PostComponent } from '../components/posts-list/post/post.component';
import { PostAddComponent } from '../components/posts-list/post-add/post-add.component';

export const routes: Routes = [
    { path: '', component: PostsListComponent },
    { path: 'post/:id', component: PostComponent },
    { path: 'post-add', component: PostAddComponent },
];
