import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../services/posts.service'; 
import { PrizmButtonComponent,PrizmInputTextModule,PrizmAutoResizeDirective } from '@prizm-ui/components';
import { SelectorComponent } from '../selector/selector.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-add',
  imports: [RouterLink,ReactiveFormsModule,PrizmButtonComponent,PrizmInputTextModule,PrizmAutoResizeDirective,SelectorComponent],
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.scss',
  providers: [PostsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostAddComponent {
  postForm: FormGroup;
  formData = {
    userId: 0,
    title: ['', Validators.required],
    text: ['', Validators.required]
  };

  constructor(private fb: FormBuilder,private postService:PostsService) {
    this.postForm = this.fb.group(this.formData);
  }

  setAuthorId(authorId:number){
    this.formData.userId = authorId;
    console.log( this.formData.userId)
  }

  submitPost() {
    if (this.postForm.invalid || this.formData.userId == 0) {
      return;
    }
    const postData = this.postForm.value;
    postData.userId = this.formData.userId;
    this.postService.addPost(postData).subscribe({
        next: (response) => {
          console.log('Post successfully sent', response);
          alert('Пост успешно добавлен! (ответ API в консоле)')
          this.postForm.reset();
        },
        error: (error) => {
          console.error('Error sending post', error);
        }
      });
  }
}
