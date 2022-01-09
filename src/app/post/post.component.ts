import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from './post.model';
import { PostService } from '../shared/mock-api-local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Observable, Observer } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [DatePipe],
})
export class PostComponent implements OnInit {
  @Input()
  post!: Post;

  @Output()
  postRemoved = new EventEmitter();
  timePosted$!: Observable<string | null>;

  constructor(private readonly postService: PostService, private modalService: NgbModal, private datePipe: DatePipe) {}

  ngOnInit() {
    this.timePosted$ = new Observable((observer: Observer<string | null>) => {
      const interval = setInterval(() => {
        const timeElapsed = this.getTimeElapsed();
        observer.next(timeElapsed);
      }, 10);

      return () => clearInterval(interval);
    });
  }

  remove() {
    this.postService.remove(this.post.id).subscribe((resp) => {
      this.postRemoved.emit(resp);
    });
  }

  confirmDelete() {
    const modalRef = this.modalService.open(ConfirmDeleteComponent);
    modalRef.componentInstance.delete.subscribe(() => {
      this.remove();
    });
  }

  private getTimeElapsed(): string {
    const now = new Date().getTime();
    let timeDiff = now - this.post.timePosted;
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);

    if (seconds > 60) {
      return this.datePipe.transform(this.post.timePosted, 'yyyy-MM-dd HH:mm:ss')!;
    } else {
      return timeDiff.toFixed(0) + `s`;
    }
  }
}
