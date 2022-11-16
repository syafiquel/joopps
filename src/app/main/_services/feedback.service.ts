import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  getAdminPracticeVideo(): Observable<any> {
    return this.http.get('/api/v1/private/admin/practice-video');
  }
}
