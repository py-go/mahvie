import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  token: any;
  uid: any;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParamMap
      .subscribe((params: any) => {
        // console.log(params)
        this.token = params.params.token;
        this.uid = params.params.uid;
      })
  }

  ngOnInit(): void {
    this.authService.confirmEmail(this.token, this.uid).subscribe((data: any) => {
      if(data.status === 200) this.router.navigate(['/']);
    })
  }
}

