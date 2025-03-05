import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PostsListComponent } from '../components/posts-list/posts-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
