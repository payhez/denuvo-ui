import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerEditModalComponent } from '../customer-edit-modal/customer-edit-modal.component';

@Component({
  selector: 'app-customer',
  imports: [ FormsModule ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  newCustomer: Customer = { name: '', contact: '' };
  queryId: number = 0;
  message: string = '';

  constructor(private customerService: CustomerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  openEditModal(customer: Customer) {
    const modalRef = this.modalService.open(CustomerEditModalComponent);
    modalRef.componentInstance.customer = { ...customer };

    modalRef.componentInstance.customerUpdated.subscribe((isCustomerUpdated: Boolean) => {

      if (isCustomerUpdated) {
        this.message = 'Customer updated successfully!';
      } else {
        this.message = 'Customer update failed!';
      }
      this.loadCustomers();
    });
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(
      data => this.customers = data,
      err => console.error(err)
    );
  }

  queryCustomer() {
    if (!this.queryId) return;
    this.customerService.getCustomer(this.queryId).subscribe(
      data => this.selectedCustomer = data,
      err => {
        console.error(err);
        this.message = 'Customer not found';
        this.selectedCustomer = null;
      }
    );
  }

  createCustomer() {
    if (!this.newCustomer.name || !this.newCustomer.contact) return;
    this.customerService.createCustomer(this.newCustomer).subscribe(
      data => {
        this.message = 'Customer created successfully!';
        this.newCustomer = { name: '', contact: '' };
        this.loadCustomers();
      },
      err => {
        console.error(err);
        this.message = 'Error creating customer';
      }
    );
  }

  deleteCustomer(id: number) {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    this.customerService.deleteCustomer(id).subscribe(
      data => {
        this.message = 'Customer deleted successfully!';
        this.loadCustomers();
      },
      err => {
        console.error(err);
        this.message = 'Error deleting customer';
      }
    );
  }
}
