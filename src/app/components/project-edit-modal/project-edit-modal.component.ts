import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-edit-modal',
  imports: [ FormsModule ],
  templateUrl: './project-edit-modal.component.html',
  styleUrl: './project-edit-modal.component.css'
})
export class ProjectEditModalComponent {
    @Input() project!: Project;
    @Output() projectUpdated = new EventEmitter<Boolean>();
  
    constructor( private projectService: ProjectService, public activeModal: NgbActiveModal) {}
  
    close() {
      this.activeModal.dismiss();
    }
  
    save() {
      if (!this.project.id) return;
      this.projectService.updateProject(this.project.id, this.project).subscribe(
        data => {
          this.project = { id: 0, name: '', description: '', customerId: 0 };
          this.projectUpdated.emit(true);
  
        },
        err => {
          this.projectUpdated.emit(false);
          console.error(err);
        }
      );
      this.activeModal.close();
    }

}
