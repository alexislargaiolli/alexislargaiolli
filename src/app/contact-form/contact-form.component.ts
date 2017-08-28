import { contactFormAnim } from './contact-form.animation';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [contactFormAnim]
})
export class ContactFormComponent implements OnInit {

  public readonly STATUS_IDLE = 'IDLE';
  public readonly STATUS_SENDING = 'SENDING';
  public readonly STATUS_SUCCESS = 'SUCCESS';
  public readonly STATUS_ERROR = 'ERROR';

  status: string;

  constructor(private http: HttpClient) {
    this.status = this.STATUS_IDLE;
  }

  ngOnInit() {
  }

  sendMessage(form: NgForm) {
    if (form.valid) {
      this.status = this.STATUS_SENDING;
      setTimeout(() => {
        this.status = this.STATUS_SUCCESS;
      }, 2000);
      this.http.post('/api/developers/add', form.value)
        .subscribe(res => {
          console.log(res);
          // status = this.STATUS_SENT;
        }, (error: HttpErrorResponse) => {
          console.log(error.statusText);
          console.log(this.status);
        });
    }
  }

  reset(form: NgForm) {
    this.status = this.STATUS_IDLE;
    form.reset();
    form.resetForm();
  }

}
