import {trigger, state, style, transition, animate} from '@angular/animations';
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AuthenticationService} from '@app/main/_services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {
  AuthDialogOverViewComponent
} from '@app/shared/components/auth-dialog-over-view/auth-dialog-over-view.component';
import SwiperCore, {Pagination} from 'swiper';
import {ChartConfiguration, ChartData, ChartType} from 'chart.js';
import {HomeService} from '@app/main/_services/home.service';
import {DropdownOption} from '@app/shared/interfaces/dropdown-option';
import {SwiperComponent} from 'swiper/angular';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, map, startWith} from 'rxjs/operators';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss'],
  animations: [
    trigger('toggleHeight', [
      state('false', style({
        height: '0px',
        opacity: '0',
        overflow: 'hidden',
      })),
      state('true', style({
        height: '*',
        opacity: '1',
      })),
      transition('1 => 0', animate('200ms ease-in')),
      transition('0 => 1', animate('200ms ease-out'))
    ])
  ],
  styles: [`animation {
    display: block;
  }`]
})
export class HomeMainComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private homeService: HomeService) {
  }

  isShow = false;
  currentUser;
  @ViewChildren('swiper') swiper?: QueryList<SwiperComponent>;

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  times: DropdownOption[] = [
    {value: 'FULL_TIME', label: 'full-time'},
    {value: 'PART_TIME', label: 'part-time'},
  ];

  specialize: DropdownOption[] = [
    {value: 'List', label: 'List'},
    {value: 'List 2', label: 'List2'},
  ];

  public radarChartLabels: string[] = [
    'Commucation',
    'Creativity',
    'Business Acumen',
    'Critical Thinking',
    'Result Achievement ',
    'People Managment',
    'Customer Orientation',
    'Coalition Building',
    'Strategic Thinking'
  ];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {data: [65, 59, 90, 81, 56, 55, 40, 15, 90], label: ''},
    ]
  };
  public radarChartType: ChartType = 'radar';

  listItems: any[] = [];


  searchControl = new FormControl();
  searchGroup = new FormGroup({
    employmentType: new FormControl('FULL_TIME'),
    specializations: new FormControl(),
  });

  test = {
    name: 'Ivan Ivanov',
    avatar: '/assets/images/avatar.png',
    poster: '/assets/images/video.jpg',
    video: 'http://www.example.com/waterfall-video.mp4',
    chartData: this.radarChartData,
    resume: null,
  };

  currentPage = 0;
  testArray = [];
  advers = false;
  scrolling = false;
  withAssessment = false;
  withPortfolio = false;

  ngOnInit(): void {
    this.testArray = [...this.listItems];
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300)
      )
      .subscribe((value) => {
        this._filter(value);
        this.loadPortfolioList();
      });

    this.searchGroup.get('specializations').valueChanges.pipe()
      .subscribe(value => {
        this.loadPortfolioList();
      });

    this.searchGroup.get('employmentType').valueChanges.pipe()
      .subscribe(value => {
        this.loadPortfolioList();
      });

    this.loadPortfolioList();
  }

  _filter(value) {
    const filterValue = value.toString().toLowerCase();
    if (value.length) {
      this.listItems = this.listItems.filter(item => item.name.toLowerCase().includes(filterValue));
    } else {
      this.listItems = this.testArray;
    }
  }

  onClick(event) {
    if (!this.currentUser) {
      this.opendDialog();
    }
    event.preventDefault();
  }

  opendDialog() {
    const dialogRef = this.dialog.open(AuthDialogOverViewComponent, {
      width: '250px',
    });
  }

  scrollHandler(e) {
    console.log('e', e);
    e !== 'someScroll' ? this.authService.onScroll(true) : this.authService.onScroll(false);
    if (e === 'bottom') {
      this.currentPage++;
      if (this.currentPage < 7) {
        this.listItems.push(this.test);
      } else {
        this.advers = true;
      }
    }
  }

  onNextSlide(index) {
    this.swiper.toArray()[index].swiperRef.slideNext();
  }

  onLikeClick(videoMeId, isLiked) {
    if (isLiked) {
      this.homeService.dislikeVideoMe(videoMeId)
        .subscribe(value => {
          console.log(value)
        })
    } else {
      this.homeService.likeVideoMe(videoMeId)
        .subscribe(value => {
          console.log(value)
        })
    }
  }

  loadPortfolioList() {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log('x', x);
      console.log('x', this.searchGroup.get('employmentType'));
      console.log('x', this.searchGroup.get('specializations'));
      const params = {
        searchText: this.searchControl.value || '',
        isWithAssessment: this.withAssessment,
        iswithPortfolio: this.withPortfolio,
        specializations: this.searchGroup.get('specializations').value,
        employmentType: this.searchGroup.get('employmentType').value
      };
      if (this.currentUser) {
        this.homeService.getUserShortList(params).subscribe((val: any[]) => {
          val.forEach(element => {
            console.log('element,', element);
            if (element.fullName) {
              this.listItems.push({
                name: element?.fullName,
                avatar: element?.profileImage?.fileUrl,
                poster: '/assets/images/video.jpg',
                video: element?.video,
                chartData: this.radarChartData,
                userProfileId: element?.userProfileId,
                resume: element?.resume?.fileUrl
              });
            }
          });
        });
      } else {
        this.homeService.getUserShortListPublic().subscribe((val: any[]) => {
          val.forEach(element => {
            console.log('element,', element);
            if (element.fullName) {
              this.listItems.push({
                name: element?.fullName,
                avatar: element?.profileImage?.fileUrl,
                poster: '/assets/images/video.jpg',
                video: element?.videoCV?.fileUrl,
                chartData: this.radarChartData,
                userProfileId: element?.userProfileId,
                resume: element?.resume?.fileUrl
              });
            }
          });
        });
      }
    });
  }

  removeFileFromMinio(id) {
    this.homeService.removeFile(id);
  }

  changeAssessment() {
    this.withAssessment = !this.withAssessment;
    this.loadPortfolioList();
  }

  changePortfolio() {
    this.withPortfolio = !this.withPortfolio;
    this.loadPortfolioList();
  }

}
