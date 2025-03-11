import { Component, signal,effect} from '@angular/core';
import { SelectorComponent } from './post-selector/selector.component';
import { RouterLink } from '@angular/router';
import { PostsService } from './services/posts.service';
import { POSTS } from '../../shared/users-names';
import { IPost } from '../../shared/IPost';
import { PrizmPanelComponent,PrizmButtonComponent,PrizmLoaderComponent } from '@prizm-ui/components';


@Component({
  selector: 'app-posts-list',
  imports: [SelectorComponent,PrizmPanelComponent,RouterLink,PrizmButtonComponent,PrizmLoaderComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  providers: [PostsService],
})

export class PostsListComponent {
  private allPosts: Array<IPost> = [];
  public filtredPosts: Array<IPost> = [];
  public authorId = signal<number>(0);

  constructor(private postService:PostsService){
    effect(() => {
      this.filterForPosts();
    });
  }

  ngOnInit() {
    //ниже обращение к АПИ. В хроме не грузит данные, в сафари грузит всегда 
    //на главной странице реализована заглушка, на страницах с постами и добавлением - заглушек нет, только запросы
  this.postService.getPosts().subscribe(  {  
    next: (posts) => {
      this.allPosts = posts;
      this.filterForPosts();  
    },
    error: (err) => {
      console.log(err);
    },
  });
//ниже вывод данных из моков, когда АПИ не работает 
    //  this.allPosts= POSTS;  
    //  this.filterForPosts();
  }
  nameById(userId:number){
    return this.postService.nameById(userId);
  }

  filterForPosts(){
    if (this.authorId() == 0) {this.filtredPosts = this.allPosts} else {
    this.filtredPosts = this.allPosts.filter(post =>{
      return post.userId == this.authorId() ;
    });}
  }
}
