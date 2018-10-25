import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  //refer angular.io canActivate interface
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) return true;

    //if user access this router with out auth, redirect to login page.
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

    //passing state snapshot, redirect user to the router where there were before loggin in.
    return false;
  }
}
