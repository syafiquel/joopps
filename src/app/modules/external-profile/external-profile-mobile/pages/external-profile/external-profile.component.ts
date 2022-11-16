import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import SwiperCore, { Pagination } from 'swiper';
import {ProfileService} from '@app/main/_services/profile.service';
import {ProfileCompleteness} from '@app/main/_models/Completness';
import {UserProfile} from '@app/main/_models/UserProfile';
import {getEmploymentTypeLabel} from '@app/shared/services/utils';
import {Portfolio} from '@app/main/_models/Portfolio';
import * as moment from 'moment';
import {VideomeService} from '@app/main/_services/videome.service';
import {HomeService} from '@app/main/_services/home.service';
import {ActivatedRoute} from '@angular/router';
import {ExternalProfileService} from "@app/main/_services/external-profile.service";
import {Subscription} from "rxjs";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-profile',
  templateUrl: './external-profile.component.html',
  styleUrls: ['./external-profile.component.scss']
})
export class ExternalProfileComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  userProfile: UserProfile = {} as UserProfile;
  portfolio: Portfolio = {} as Portfolio;
  videoMeBlobUrl: string;
  poster: string;
  private routeSub: Subscription;
  userId: number;

  constructor(
    private profileService: ProfileService,
    private externalProfileService: ExternalProfileService,
    private videoMeService: VideomeService,
    private homeService: HomeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params.id;
    });
  }

  ngAfterViewInit(): void {
    this.profileService.getPortfolio().subscribe((res) => {
      this.portfolio = res;
    });

    this.videoMeService.getExternalVideo(this.userId).subscribe((res) => {
      this.videoMeBlobUrl = res.object.video.fileUrl;
      this.poster = res.object.poster.fileUrl;
    });

    this.externalProfileService.getExternalProfile(this.userId).subscribe((res) => {
      this.userProfile = res.object;
      this.userProfile.employmentType = getEmploymentTypeLabel(this.userProfile.employmentType as 'FULL_TIME' | 'PART_TIME');
      this.userProfile.startDate = moment(this.userProfile.startDate).format('DD-MM-YYYY');
    });
  }

  toggleIsPublicProfile(isPublic: boolean) {
    this.userProfile.isPublic = isPublic;
    console.log('this.userProfile: ', this.userProfile);
    this.homeService.toggleIsPublic(isPublic).subscribe((val) => {
      console.log('is public: ', this.userProfile.isPublic);
    });
  }
}
