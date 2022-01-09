import { Component, EventEmitter, Output } from '@angular/core';
import { PostService } from '../shared/mock-api-local-storage.service';
import { Post } from '../post/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  post: Post = new Post();
  maxPostLength: number = 130;

  @Output()
  postAdded = new EventEmitter();

  constructor(private readonly postService: PostService) {}

  newPost() {
    this.postService.add(this.post).subscribe((post: Post) => {
      this.post = new Post();
      this.postAdded.emit(post);
    });
  }
}
