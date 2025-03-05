import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { PrizmPanelComponent,PrizmButtonComponent } from '@prizm-ui/components';


@Component({
  selector: 'app-post',
  imports: [PrizmPanelComponent,PrizmButtonComponent,RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [PostsService, ],
})
export class PostComponent {
  routeId = 0;
  thisPost = {
    "userId": 0,
    "id": 0,
    "title": '',
    "body": ''
  };
  commentsForPost = [
    {
      "postId": 0,
      "id": 0,
      "name": "",
      "email": "",
      "body": ""
    }];

  constructor(private route: ActivatedRoute, private postService: PostsService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.routeId = paramsId['id']; // Получаем значение параметра
    });
    this.postService.getPost(this.routeId).subscribe(posts => { this.thisPost = posts; })
    this.postService.getComments(this.routeId).subscribe(comments => { this.commentsForPost = comments; })
  }

  nameById(userId: any) {
    if (userId == null) { return } else { return this.postService.nameById(userId); }
  }
}
