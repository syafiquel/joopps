import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {UserProfile} from "@app/main/_models/UserProfile";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getUserShortList(params): Observable<any> {
    return this.http.get('/api/v1/private/profile/info/list', {
      params
    });
  }

  getUserShortListPublic(): Observable<any> {
    return this.http.get('/api/v1/public/profile/info/list');
  }

  pollutedAboutMe(body) {
    return this.http.post('/api/v1/private/profile/info', body);
  }

  removeFile(fileId) {
    return this.http.delete(`/api/v1/private/portfolio/file?fileId=${fileId}`);
  }

  toggleIsPublic(isPublic: boolean) {
    return this.http.post(`/api/v1/private/profile/public?isPublic=${isPublic}`, {});
  }

  getCurrentUserProfileInfo(): Observable<{object: UserProfile}> {
    return this.http.get<{object: UserProfile}>('/api/v1/private/profile/info');
  }

  getPortfolio(): Observable<any> {
    return this.http.get('/api/v1/private/portfolio');
  }

  uploadPhoto(file: File) {
    const extension = file.name.slice(file.name.lastIndexOf('.') + 1);
    const headers: HttpHeaders = new HttpHeaders().append(
            'Content-type',
            'image/jpeg; charset=utf-8'
        );
    console.log(file, headers, extension);
    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post('/api/v1/private/profile/photo', formData);
      // .pipe(tap(() => this.photoUrl$.emit()));
  }

  uploadPortfolioPhoto(file: File) {
    const extension = file.name.slice(file.name.lastIndexOf('.') + 1);
    const headers: HttpHeaders = new HttpHeaders().append(
            'Content-type',
            'image/jpeg; charset=utf-8'
        );
    console.log(file, headers, extension);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post('/api/v1/private/portfolio/file', formData);
      // .pipe(tap(() => this.photoUrl$.emit()));
  }

  uploadPortfolioLink(links) {
    console.log('links', links);
    return this.http.post('/api/v1/private/portfolio', links);
      // .pipe(tap(() => this.photoUrl$.emit()));
  }

  likeVideoMe(videomeId) {
    return this.http.post(`/api/v1/private/profile/statistics/videome/like?videomeId=${videomeId}`, null);
  }

  dislikeVideoMe(videomeId) {
    return this.http.post(`/api/v1/private/profile/statistics/videome/dislike?videomeId=${videomeId}`, null);
  }

}
