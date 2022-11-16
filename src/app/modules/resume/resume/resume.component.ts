import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import SwiperCore, { EffectCoverflow } from 'swiper';
import { HomeService } from '@app/main/_services/home.service';
import {ResumeService} from '@app/main/_services/resume.service';
import {ProfileService} from '@app/main/_services/profile.service';
import {File as LocalFile} from '@app/main/_models/File';
import {DomSanitizer} from '@angular/platform-browser';
SwiperCore.use([EffectCoverflow]);

@Component({
  selector: 'app-portfolio',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor(
    private home: HomeService,
    private resumeService: ResumeService,
    private profileService: ProfileService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  @ViewChild('pdfViewerComponent') pdfViewerComponent: any;
  fileToUpload: File | null = null;
  resumeFile: LocalFile = null as LocalFile;
  fileUrl: any;

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(async (result) => {
      this.fileUrl = result.object.resume.fileUrl.replace('http', 'https');
      const resume = Object.assign({}, result.object.resume);
      resume.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resume.fileUrl) as any;
      this.resumeFile = result.object.resume;
    });
  }

  onloadResume(files: FileList): void {
    this.fileToUpload = files.item(0);
    this.resumeService.loadResume(this.fileToUpload).subscribe(res => {
      const resume = Object.assign({}, res.resume);
      resume.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resume.fileUrl) as any;
      this.resumeFile = res.resume;
      this.changeDetectorRef.detectChanges();
      this.fileUrl = res.resume.fileUrl.replace('http', 'https');
    });
  }
}
