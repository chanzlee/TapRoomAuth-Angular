import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean; 

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService) { }

  signIn(credentials) {
    // returns observable (use post method inside service)
    this.authService.login(credentials)
      .subscribe(result => { 
        //depend on whether this is true or not, navigate or throw error.
        if (result) {
          //instead of redirect hompage every user, check whether there are queryparam passed along as argument and try redirect them to the url.
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else  
          this.invalidLogin = true; 
      });
  }
}
