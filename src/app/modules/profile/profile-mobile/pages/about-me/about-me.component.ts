import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownOption } from 'src/app/shared/interfaces/dropdown-option';
import { HomeService } from '@app/main/_services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  aboutForm: FormGroup = new FormGroup({
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required]),
    linkedInLink: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    employmentType: new FormControl('', Validators.required),
    travelRequirements: new FormControl('', Validators.required),
    educationLevel: new FormControl('', Validators.required),
    workLocation: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
  });

  timeOptions: DropdownOption[] = [
    {value: 'Full time', label: 'Full time'},
    {value: 'Part time', label: 'Part time'},
  ];

  travelOptions: DropdownOption[] = [
    {value: '50% Travel', label: '50% Travel'},
    {value: '25% Travel', label: '25% Travel'},
  ];

  educationOptions: DropdownOption[] = [
    {value: 'A1', label: 'A1'},
    {value: 'A2', label: 'A2'},
    {value: 'B1', label: 'B1'},
    {value: 'B2', label: 'B2'},
    {value: 'C1', label: 'C1'},
  ];

  workLocationOptions: DropdownOption[] = [
    {value: 'Degree', label: 'Degree'},
    {value: 'Agree', label: 'Agree'},
  ];

  specializationOptions: DropdownOption[] = [
    {value: 'IT', label: 'IT'},
    {value: 'Finance', label: 'Finance'},
    {value: 'Education', label: 'Education'},
  ];

  expectedSalaryOptions: DropdownOption[] = [
    {value: '1000', label: '1000'},
    {value: '5000', label: '5000'},
    {value: '10000', label: '10000'},
  ];

  UploadFileService: any;
  url: any = '/assets/images/avatar-test.jpg';
  constructor(private http: HttpClient, private home: HomeService, private router: Router) { }

  ngOnInit(): void {
    // this.http.post(`/api/v1/public/user/auth`, body).subscribe((res)=> {
    //   console.log('res', res);
    // })
    this.home.getCurrentUserProfileInfo().subscribe((val) => {
      this.url = val.object.profileImage.fileUrl;
      for (const key in val) {
        if (val[key]) {
          this.aboutForm.get(key)?.patchValue(val[key]);
        }
      }
    });
  }

  uploadPhoto(list: FileList) {
    if (list.length === 0) {
        return;
    }
    // 2 megabytes
    if (list[0].size > 1024 * 1024 * 2) {
        // this.growlService.logWarn('Файл не может быть больше 2 мб');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(list[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
    };

    this.home.uploadPhoto(list[0]).subscribe((da) => {
      console.log(da);

    });

  }

  onSubmit() {
    this.home.pollutedAboutMe(this.aboutForm.value).subscribe((val) => {
      this.router.navigate(['profile']);
    });
  }

}
