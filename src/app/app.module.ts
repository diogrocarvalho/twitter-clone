import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { PostService } from './shared/mock-api-local-storage.service';

@NgModule({
  declarations: [AppComponent, PostComponent, NewPostComponent, ConfirmDeleteComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule],
  providers: [NgbActiveModal, PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
