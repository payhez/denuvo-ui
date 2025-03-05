import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerEditModalComponent } from '../customer-edit-modal/customer-edit-modal.component';
import { ProjectEditModalComponent } from '../project-edit-modal/project-edit-modal.component';

@Component({
  selector: 'app-project',
  imports: [ FormsModule ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  selectedProject: Project | null = null;
  newProject: Project = { name: '', description: '', customerId: 0 };
  queryId: number = 0;
  message: string = '';

  constructor(private projectService: ProjectService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  openEditModal(project: Project) {
    const modalRef = this.modalService.open(ProjectEditModalComponent);
    modalRef.componentInstance.project = { ...project };

    modalRef.componentInstance.projectUpdated.subscribe((isProjectUpdated: Boolean) => {

      if (isProjectUpdated) {
        this.message = 'Project updated successfully!';
      } else {
        alert("Project update failed!");
        this.message = 'Project update failed!';
      }
      this.loadProjects();
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      data => this.projects = data,
      err => console.error(err)
    );
  }

  queryProject() {
    if (!this.queryId) return;
    this.projectService.getProject(this.queryId).subscribe(
      data => this.selectedProject = data,
      err => {
        console.error(err);
        alert("Project not found!");
        this.message = 'Project not found';
        this.selectedProject = null;
      }
    );
  }

  createProject() {
    if (!this.newProject.name) return;
    this.projectService.createProject(this.newProject).subscribe(
      data => {
        this.message = 'Project created successfully!';
        this.newProject = { name: '', description: '', customerId: 0 };
        this.loadProjects();
      },
      err => {
        console.error(err);
        this.message = 'Error creating project';
      }
    );
  }

  deleteProject(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    this.projectService.deleteProject(id).subscribe(
      data => {
        this.message = 'Project deleted successfully!';
        this.loadProjects();
      },
      err => {
        console.error(err);
        alert("Error deleting project");
        this.message = 'Error deleting project';
      }
    );
  }
}
