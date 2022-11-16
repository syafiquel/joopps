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
import { Subscription } from 'rxjs';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  profileCompletenessMap: ProfileCompleteness = {} as ProfileCompleteness;
  userProfile: UserProfile = {} as UserProfile;
  portfolio: Portfolio = {} as Portfolio;
  videoMeBlobUrl: string;
  poster: string;

  constructor(private profileService: ProfileService, private videoMeService: VideomeService, private homeService: HomeService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.profileService.getCompleteness().subscribe((res) => {
      this.value = res.percentage;
      this.profileCompletenessMap = res.profileCompletenessMap;
    });

    this.profileService.getProfile().subscribe((res) => {
      this.userProfile = res.object;
      this.userProfile.employmentType = getEmploymentTypeLabel(this.userProfile.employmentType as 'FULL_TIME' | 'PART_TIME');
      this.userProfile.startDate = moment(this.userProfile.startDate).format('DD-MM-YYYY');
    });

    this.profileService.getPortfolio().subscribe((res) => {
      this.portfolio = res;
    });

    this.videoMeService.getVideo().subscribe((res) => {
      this.videoMeBlobUrl = res.object.video.fileUrl;
      this.poster = res.object.poster.fileUrl;
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
