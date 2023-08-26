import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PopupService {


  constructor(private modalService: NgbModal) {}

  openPopup(component, data, options): NgbModalRef {
    const modalRef = this.modalService.open(component, options);
    modalRef.componentInstance.ngModalRef = modalRef;
    if (data) {
      modalRef.componentInstance.data = data;
    }
    return modalRef;
  }

}
