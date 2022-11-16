import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideomeService {

  constructor(private http: HttpClient) { }


  postLoad(duration: any, video: any): Observable<any> {
    console.log('vvv', video);
    return this.http.post<any>('/api/v1/private/videome', video)
        .pipe(map(val => {

          return val;
        }));
  }

  postLoadVideoPRactise(duration: any, video: any) {
    console.log('vvv', video);
    return this.http.post<any>('/api/v1/private/interview/video', video)
        .pipe(map(val => {

        }));
  }

  onloadPost(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('poster', fileToUpload, fileToUpload.name);
    return this.http
      .post('/api/v1/private/videome/poster', formData)
      .pipe(
        map(() => true),
      );

  }

  getVideo() {
    return this.http.get<any>('/api/v1/private/videome')
        .pipe(map(val => {


          return val;
        }));
  }

  getQuestions(): Observable<string[]> {
    return this.http.get<string[]>('/api/v1/private/interview/questions?level=EASY&profession=Teacher')
        .pipe(map(val => {

          return val;
        }));
  }

  getVideoMeQuestions(): Observable<string[]> {
    return this.http.get<string[]>('/api/v1/private/videome/questions')
        .pipe(map(val => {
          return val;
        }));
  }

  getPracticeInterviewVideo(): Observable<any> {
    return this.http.get<any>('/api/v1/private/interview/video')
      .pipe(map(val => {


        return val;
      }));
  }

  getExternalVideo(id: number) {
    return this.http.get<any>(`/api/v1/private/videome/${id}`)
      .pipe(map(val => {


        return val;
      }));
  }

}
