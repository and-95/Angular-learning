import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UsersArray } from '../../../shared/users-names';
import { ErrorHandlerService } from './error-handler.service';
import { IPostData } from '../../../shared/IPost';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private allnamesUsers = UsersArray;
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.showError('Произошла ошибка при загрузке всех постов.');
        return throwError(error);
      })
    );
  }

  getPost(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${postId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.showError('Произошла ошибка при загрузке поста с id - ' + postId);
        return throwError(error);
      })
    );
  }

  getComments(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${postId}/comments`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.showError('Произошла ошибка при загрузке комментариев');
        return throwError(error);
      })
    );
  }

  addPost(postData: IPostData): Observable<any> {
    return this.http.post(this.apiUrl, postData).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.showError('Произошла ошибка при добавлении поста! Попробуйте снова');
        return throwError(error);
      })
    );
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


