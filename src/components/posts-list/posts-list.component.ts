import { Component, signal} from '@angular/core';
import { SelectorComponent , } from './selector/selector.component';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { POSTS } from '../../shared/users-names'; 
import { IPost } from '../../shared/IPost'; 
import { PrizmPanelComponent,PrizmButtonComponent } from '@prizm-ui/components';


@Component({
  selector: 'app-posts-list',
  imports: [SelectorComponent,PrizmPanelComponent,RouterLink,PrizmButtonComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  providers: [PostsService],
})

export class PostsListComponent {
  allPosts: Array<IPost> = [];
  filtredPosts: Array<IPost> = [];
  authorId = signal(0);

  constructor(private postService:PostsService){}

  ngOnInit() {
    //ниже обращение к АПИ. В хроме не грузит данные, в сафари грузит всегда 
    //на главной странице реализована заглушка, на страницах с постами и добавлением - заглушек нет, только запросы
  // this.postService.getPosts().subscribe(  {  
  //   next: (posts) => {
  //     this.allPosts = posts;
  //     this.filterForPosts();  
  //   },
  //   error: (err) => {
  //     console.error('Error fetching data:', err);
  //   },
  // });
//ниже вывод данных из моков, когда АПИ не работает 
     this.allPosts= POSTS;  
     this.filterForPosts();
  }

  setAuthorId(authorId:any){
    this.authorId.set(authorId)
    this.filterForPosts();
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
