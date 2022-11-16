import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient) {
  }

  loadResume(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('resume', fileToUpload, fileToUpload.name);
    return this.http
      .post('/api/v1/private/profile/resume', formData)
      .pipe(
        map((res) => res),
      );
  }
}
