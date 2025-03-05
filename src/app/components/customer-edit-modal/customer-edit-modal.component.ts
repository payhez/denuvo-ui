import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-edit-modal',
    imports: [ FormsModule ],
  templateUrl: './customer-edit-modal.component.html',
  styleUrls: ['./customer-edit-modal.component.css']
})
export class CustomerEditModalComponent {
  @Input() customer!: Customer;
  @Output() customerUpdated = new EventEmitter<Boolean>();

  constructor( private customerService: CustomerService, public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss();
  }

  save() {
    if (!this.customer.id) return;
    this.customerService.updateCustomer(this.customer.id, this.customer).subscribe(
      data => {
        this.customer = { id: 0, name: '', contact: '' };
        this.customerUpdated.emit(true);

      },
      err => {
        this.customerUpdated.emit(false);
        console.error(err);
      }
    );
    this.activeModal.close();
  }
}
