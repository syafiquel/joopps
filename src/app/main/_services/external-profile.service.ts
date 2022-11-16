import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserProfile} from '@app/main/_models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class ExternalProfileService {

  constructor(private http: HttpClient) {
  }

  getExternalProfile(id: number): Observable<{object: UserProfile, viewsCount: number}> {
    return this.http.get<{object: UserProfile, viewsCount: number}>(`/api/v1/private/profile/info/${id}`);
  }
}
