import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportProjectsComponent } from './export-projects.component';

describe('ExportProjectsComponent', () => {
  let component: ExportProjectsComponent;
  let fixture: ComponentFixture<ExportProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
