import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../post/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly key = 'my-journal';

  constructor() {
    this.init();
  }

  init() {
    const posts = this.getPostsFromStorage();
    if (!posts) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }
  }

  getPostsFromStorage(): Post[] {
    return JSON.parse(localStorage.getItem(this.key)!) || [];
  }

  getPosts(): Post[] {
    return this.getPostsFromStorage();
  }

  add(post: Post): Observable<Post> {
    const posts: Post[] = this.getPostsFromStorage();
    post.id = new Date().getTime();
    post.timePosted = post.id;
    posts.unshift(post);
    localStorage.setItem(this.key, JSON.stringify(posts));
    return of(post);
  }

  remove(postId: number): Observable<boolean> {
    let posts = JSON.parse(localStorage.getItem(this.key)!!) || [];
    posts = posts.filter((p: Post) => p.id !== postId);
    localStorage.setItem(this.key, JSON.stringify(posts));
    return of(true);
  }

  edit(post: Post) {
    const posts = JSON.parse(localStorage.getItem(this.key)!!) || [];
    const index = posts.findIndex((p: Post) => p.id === post.id);

    if (index === -1) {
      return;
    }

    posts[index] = post;
    localStorage.setItem(this.key, JSON.stringify(posts));
  }
}
