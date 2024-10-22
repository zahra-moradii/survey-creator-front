import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _Auth: PostService, private _router: Router) {}

  canActivate(): boolean {
    if (this._Auth.loggedin()) {
      return true;
    } else {
      this._router.navigate(['/Login']);
      return false;
    }
  }
}
