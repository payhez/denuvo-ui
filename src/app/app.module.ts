import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExportProjectsComponent } from './components/export-projects/export-projects.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerComponent } from './components/customer/customer.component';
import { ProjectComponent } from './components/project/project.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerEditModalComponent } from './components/customer-edit-modal/customer-edit-modal.component';


@NgModule({
  imports: [
    CustomerComponent,
    ProjectComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HomeComponent,
    NgbModule,
    ExportProjectsComponent,
    AppComponent,
    CustomerEditModalComponent
  ],
})

export class AppModule { }
