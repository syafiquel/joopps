import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  authGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor() { }

  ngOnInit(): void {
  }

}
