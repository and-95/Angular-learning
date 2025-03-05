import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersArray } from '../shared/users-names';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private allnamesUsers = UsersArray;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getPost(postId: number): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }

  getComments(postId: number): Observable<any> {
    return this.http.get(` https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  }

  addPost(postData:any): Observable<any> {
    return  this.http.post('https://jsonplaceholder.typicode.com/posts', postData);
  }

  nameById(userId: number) {
    let authorName = '';
    this.allnamesUsers.forEach(user => {
      if (user.id == userId) {
        authorName = user.name;
      }
    })
    return authorName;
  }

}


