import { Injectable } from '@angular/core';
import {  of, delay, tap, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;

  // store the URL so we can redirect after logging in
  redirectUrl!: string;

  login(isAdmin: boolean = false): Observable<boolean> {
    console.log(isAdmin);
    return of(true).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = val;
        this.isAdmin = isAdmin;
      })
    );
  }

  getRole(): boolean {
    return this.isAdmin;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
