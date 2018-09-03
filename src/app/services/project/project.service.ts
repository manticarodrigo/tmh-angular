import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {}

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(
      `${environment.backendUrl}/api/v1/projects/${id}/`
    );
  }

  getProjects(): Observable<Array<Project>>  {
    return this.http.get<Array<Project>>(
      `${environment.backendUrl}/api/v1/projects/me/`
    );
  }

  getByStatus(status: string): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(
      `${environment.backendUrl}/api/v1/projects/`
    );
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(
      `${environment.backendUrl}/api/v1/projects/`,
      project,
    );
  }

  updateStatus(project: Project, status: string): Observable<Project> {
    return this.http.patch<Project>(
      `${environment.backendUrl}/api/v1/projects/${project.id}/`,
      { status }
    );
  }

  updateRevisionCount(project: Project, status: string): Observable<Project> {
    return this.http.patch<Project>(
      `${environment.backendUrl}/api/v1/projects/${project.id}/`,
      { status, revision_count: project.revision_count + 1 }
    );
  }
}