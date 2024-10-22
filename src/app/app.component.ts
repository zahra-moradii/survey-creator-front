import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import { SharedInfo } from './services/shared.info.service';
/**
 * @title Tab group where the tab content is loaded lazily (when activated)
 */
@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dynamic-survay-front';

  constructor(
    private authService: PostService,
    private sharedService: SharedInfo
  ) {
    if(localStorage.getItem('user')){
    this.sharedService.userInfo.next(

      JSON.parse(localStorage.getItem('user') || "")
    );}
  }
}
