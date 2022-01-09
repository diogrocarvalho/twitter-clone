import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
  @Output()
  delete = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete() {
    this.delete.emit();
    this.activeModal.close();
  }
}
