import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/project`;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProjectsOfCustomer(customerId: number): Observable<Project[]> {
    const params = new HttpParams().set('customerId', customerId.toString());
    return this.http.get<Project[]>(`${this.apiUrl}/customer`,  { params });
  }

  downloadProjectsAsZip(fromDate: string, toDate: string) {
    const url = `/between-dates/zip?fromDate=${fromDate}&toDate=${toDate}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}