import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Completeness} from '@app/main/_models/Completness';
import {UserProfile} from '@app/main/_models/UserProfile';
import {Portfolio} from '@app/main/_models/Portfolio';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('/api/v1/public/user/test', { username, password })
        .pipe(map(val => {

        }));
  }

  getCompleteness(): Observable<Completeness> {
    return this.http.get<Completeness>('/api/v1/private/profile/completeness');
  }

  getProfile(): Observable<{object: UserProfile, viewsCount: number}> {
    return this.http.get<{object: UserProfile, viewsCount: number}>('/api/v1/private/profile/info');
  }

  getPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>('/api/v1/private/portfolio');
  }
}
