import { Component, OnInit } from '@angular/core';
import { PostService } from './shared/mock-api-local-storage.service';
import { Post } from './post/post.model';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'My Journal';
  posts: Post[] = [];

  constructor(readonly postService: PostService, private readonly viewport: ViewportScroller) {}

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.posts = this.postService.getPosts();
  }

  postRemoved(post: Post) {
    this.getPosts();
  }

  postAdded(post: Post) {
    this.getPosts();
    this.viewport.scrollToPosition([0, 0]);
  }
}
