import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { delay, first, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      first(),
      mergeMap(param => this.http.get(`/api/v1/public/user/registrationConfirm?token=${param['token']}`)),
      delay(2000)
    )
    .subscribe(val => {
      this.router.navigate(['/login']);
    });
  }

}
