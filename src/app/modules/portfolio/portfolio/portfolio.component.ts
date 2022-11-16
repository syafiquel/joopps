import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import SwiperCore, {EffectCoverflow} from 'swiper';
import {HomeService} from '@app/main/_services/home.service';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

SwiperCore.use([EffectCoverflow]);

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  // config: SwiperOptions = {
  //   slidesPerView: 3,
  //   spaceBetween: 50,
  //   navigation: true,
  //   pagination: { clickable: true },
  //   scrollbar: { draggable: true },
  // };

  // config: SwiperOptions = {
  //   slidesPerView: 3,
  //   spaceBetween: 50,
  //   navigation: true,
  //   pagination: { clickable: true },
  //   scrollbar: { draggable: true },
  //   coverflowEffect: true
  // };

  constructor(
    private home: HomeService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  linkGroup: FormGroup = new FormGroup({
    link: new FormControl(),
    extraLink: new FormControl()
  });
  urls = [];
  slides = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.home.getPortfolio().subscribe(res => {
      res.files.forEach(item => {
        this.urls.push(item.fileUrl);
      });
      this.linkGroup.patchValue({
        link: res.link,
        extraLink: res.extraLink
      });
    });
  }

  onSwiper(swiper) {
    console.log('sss', swiper);
  }

  onSlideChange(ev) {
    console.log('ev', ev);
  }

  onRemovePicture(url) {
    const id = url.substring(
      url.indexOf('=') + 1,
      url.lastIndexOf('&')
    );

    this.home.removeFile(id)
      .subscribe(_ => {
        this.snackBar.open('Image removed', null, {
          verticalPosition: 'top',
          duration: 3000
        });

        this.loadProfile();
      });
  }

  uploadPhoto(list: FileList) {
    if (list.length === 0) {
      return;
    }
    // 2 megabytes
    if (list[0].size > 1024 * 1024 * 2) {
      return;
    }

    this.isLoading = true;

    const reader = new FileReader();
    reader.readAsDataURL(list[0]);

    reader.onload = (_event) => {
      this.urls.push(reader.result);
    };

    this.home.uploadPortfolioPhoto(list[0]).subscribe((da) => {
      this.isLoading = false;
      this.snackBar.open('Image uploaded', null, {
        verticalPosition: 'top',
        duration: 3000
      });
      this.loadProfile();
    });
  }

  onSubmit(data) {
    this.home.uploadPortfolioLink(this.linkGroup.value).subscribe((da) => {
      console.log(da);
      this.router.navigate(['profile']);
    });
  }
}
