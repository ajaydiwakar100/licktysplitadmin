import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-mail',
  templateUrl: './register-mail.component.html',
  styleUrls: ['./register-mail.component.css']
})
export class RegisterMailComponent implements OnInit {

  registerMailList: any;
  selected: any;
  mailToken: any;

  constructor(
    private mailService: MailService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.mailService.getRegisterMailList().subscribe(
      response => {

        if (response.body['error'] === 'false') {
          this.registerMailList = response.body['mail']['signup'];

        } else {
          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });
        }

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

  updateStatus(key, status, templateId) {

    const statusData = {key: key, status: status, templdateId: templateId};

    this.mailService.updateStatus(statusData).subscribe(
      response => {

        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: response.body['errorMessage'],
            type: 'success',
            confirmButtonText: 'Ok',
          });

        } else {
          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });
        }

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
