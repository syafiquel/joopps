import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rests } from 'src/app/shared/config/rests';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private photoUrl$ = new EventEmitter();
  public photoUrlChange: Observable<{}>;
  
  constructor(private httpClient: HttpClient) {
      this.photoUrlChange = this.photoUrl$.asObservable();
  }
  
  uploadPhoto(file: File): Observable<Object> {
      const extension = file.name.slice(file.name.lastIndexOf('.') + 1);
      const headers: HttpHeaders = new HttpHeaders().append(
          'Content-type',
          'image/*; charset=utf-8'
      );

      return this.httpClient
          .post(rests.user.uploadPhoto(extension), file, {
              headers
          })
          .pipe(tap(() => this.photoUrl$.emit()));
  }


}
