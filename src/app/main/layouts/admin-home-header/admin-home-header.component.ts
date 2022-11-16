import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@app/main/_models/user';
import { AuthenticationService } from '@app/main/_services/authentication.service';
import { HelpDialogOverviewComponent } from '@app/shared/components/help-dialog-overview/help-dialog-overview.component';
import {HomeService} from '@app/main/_services/home.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './admin-home-header.component.html',
  styleUrls: ['./admin-home-header.component.scss']
})
export class AdminHomeHeaderComponent implements OnInit {
  currentUser: User;
  isAbsolute = false;
  avatar: string;

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private homeService: HomeService
  ){}

  getRoute(): string {
    if (this.router.url === '/profile'){
      return 'bg-white';
    }
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.authService.isScroll.subscribe(res => {
      this.isAbsolute = res;
    });

    this.homeService.getCurrentUserProfileInfo().subscribe((res) => {
      this.avatar = res.object.profileImage.fileUrl;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HelpDialogOverviewComponent, {
      width: '250px',
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

}
