import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AudioRecordingService} from '@app/main/_services/audio-recording.service';
import {VideoRecordingService} from '@app/main/_services/video-recording.service';
import {FormControl} from '@angular/forms';
import {VideomeService} from '@app/main/_services/videome.service';

@Component({
  selector: 'app-videome-main',
  templateUrl: './videome-main.component.html',
  styleUrls: ['./videome-main.component.scss']
})
export class VideomeMainComponent implements OnInit, AfterViewInit {

  @ViewChild('videoElement') videoElement: ElementRef;
  timeClass = 'default';
  video: any;
  poster = '/assets/images/test-video.jpg';
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  audioRecordedTime;
  videoRecordedTime = '00';
  audioBlobUrl;
  videoBlobUrl;
  audioBlob;
  videoBlob;
  audioName;
  videoName;
  audioStream;
  videoStream: MediaStream;
  audioConf = { audio: true, echoCancellation: true};
  videoConf = { video: { facingMode: 'user', width: 320 }, audio: true};
  questionControl: FormControl = new FormControl({ value: '', disabled: true });

  question: { value: string, isFinish: boolean }[] = [
    {
      value: 'lorem ipsum 1',
      isFinish: false
    },
    {
      value: 'Lorem ipsum 2',
      isFinish: false
    },
    {
      value: 'lorem ipsum 3',
      isFinish: false
    },
    {
      value: 'lorem ipsum 4',
      isFinish: true
    }
  ];

  number = 0;
  selectedQuestion;
  fileToUpload: File | null = null;

  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingService,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer,
    private videomeService: VideomeService
  ) {

    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      if (Math.floor(parseInt(time)) >= 60 && Math.floor(parseInt(time)) <= 90) {
        this.timeClass = 'validTime';
      } else {
        this.timeClass = '';
      }
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);

      this.saveVideoMeFormData(this.videoName, 'video/mp4', this.videoBlob);

      this.ref.detectChanges();
    });

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.audioRecordedTime = time;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.audioBlob = data.blob;
      this.audioName = data.title;
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.ref.detectChanges();
    });
  }

  ngOnInit(): void {
    // this.questionControl.setValue(this.question[0].value);
    // this.selectedQuestion = this.question[this.number];
  }

  ngAfterViewInit(): void {
    this.videomeService.getVideoMeQuestions().subscribe((data) => {
      this.question = data.map((question, index) => {
        if (data.length - 1 === index) {
          return {
            value: question,
            isFinish: true
          };
        } else {
          return {
            value: question,
            isFinish: false
          };
        }
      });
    });

    this.videomeService.getVideo().subscribe((res: any) => {
      // WSthis.video.srcObject = res.video.fileUrl;
      this.video = this.videoElement.nativeElement;

      this.videoBlobUrl = res.video.fileUrl;
      this.poster = res.poster.fileUrl;
      this.video.src = this.videoBlobUrl;
    });
  }

  startVideoRecording(): void {
    this.video = this.videoElement.nativeElement;
    if (!this.isVideoRecording) {
      this.video.controls = false;
      this.isVideoRecording = true;
      this.video.muted = true;
      this.onNextQuestion();
      this.videoRecordingService.startRecording(this.videoConf)
        .then(stream => {
          // this.video.src = window.URL.createObjectURL(stream);
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch((err) => {
          console.log(err.name + ': ' + err.message);
        });
    }
  }

  abortVideoRecording(): void {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.ref.detectChanges();
    }
  }

  stopVideoRecording(): void {
    if (this.isVideoRecording) {
      this.videoRecordingService.stopRecording();
      this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;
      this.video.muted = false;
    }
  }

  TestBed(): void {
    // this.stopVideoRecording();
    this.abortVideoRecording();
    this.clearVideoRecordedData();
  }

  onNextQuestion(): void {
    if (this.selectedQuestion && this.selectedQuestion.isFinish) {
      this.number = 0;
      this.questionControl.reset();
      this.stopVideoRecording();
      this.selectedQuestion = this.question[this.number];
      return;
    }
    this.selectedQuestion = this.question[this.number];
    this.questionControl.setValue(this.selectedQuestion.value);
    this.number += 1;
  }

  clearVideoRecordedData(): void {
    console.log('clearVideoRecordedData', this.isVideoRecording);
    if (this.isVideoRecording) {
      this.stopVideoRecording();
      this.isVideoRecording = false;
    }
    this.videoRecordedTime = '00';
    this.number = 0;
    this.videoBlobUrl = null;
    this.video.srcObject = null;
    this.video.controls = false;
    this.ref.detectChanges();
  }

  downloadVideoRecordedData(): void {
    this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
  }

  startAudioRecording(): void {
    if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortAudioRecording(): void {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopAudioRecording(): void {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
    }
  }

  clearAudioRecordedData(): void {
    this.audioBlobUrl = null;
  }

  downloadAudioRecordedData(): void {
    this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
  }

  ngOnDestroy(): void {
    this.abortAudioRecording();
  }

  _downloadFile(data: any, type: string, filename: string): any {
    console.log('data', data);

    const blob = new Blob([data], {type});
    console.log('blob', blob);
    const url = window.URL.createObjectURL(blob);

    const formData = new FormData();
    formData.append('video', blob, filename);
    formData.append('duration', '25');
    // formData.append('video/mp4', [blob], filename+ '.' + blob.type.split('/')[1]);
    // formData.append(type, filename);
    // formData.append(type + '-blob', blob, filename);

    console.log('formData', formData);


    this.videomeService.postLoad(25, formData).subscribe(res => {
      console.log('res', res);
    });
    // this.video.srcObject = stream;
    // const url = data;
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  onloadPoster(files: FileList): void {
    this.fileToUpload = files.item(0);
    this.videomeService.onloadPost(this.fileToUpload).subscribe(res => {
      console.log('res', res);
    });
  }

  saveVideoMeFormData(filename: string, type: string, videoBlob: Blob): FormData {
    const blob = new Blob([videoBlob], {type: 'video/mp4'});

    const formData = new FormData();
    formData.append('video', blob, this.videoName);
    formData.append('duration', '25');
    formData.append('video/mp4', blob, filename + '.' + blob.type.split('/')[1]);
    formData.append(type, filename);
    formData.append(type + '-blob', blob, filename);

    this.videomeService.postLoad(25, formData).subscribe(res => {
      console.log('res', res);
    });

    return;
  }
}
