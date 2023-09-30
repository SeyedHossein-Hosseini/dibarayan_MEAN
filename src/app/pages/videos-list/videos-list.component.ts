import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { VideosServiceService } from '../../services/videos-list/videos-service.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css'],
})
export class VideosListComponent {
  constructor(
    private localstorage: LocalstorageService,
    private videoService: VideosServiceService,
    private router: Router
  ) {}

  _videos: any = [];

  base64ToVideo = (base64String: string) => {
    const videoType = 'video/webm'; // Adjust the video format if different

    // Remove the data URL prefix (e.g., “data:image/png;base64,”)
    const base64WithoutPrefix = base64String.split(',')[2];

    const byteCharacters = atob(base64WithoutPrefix);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    const blob = new Blob([byteArray], { type: videoType });

    return URL.createObjectURL(blob);
  };

  ngOnInit() {
    if (this.localstorage.getLocalStorage('token')) {
      let userId = this.localstorage.getLocalStorage('userId');
      console.log({ userId });

      this.videoService.getAllVideos(userId).subscribe((videos) => {
        let videosFromServer = videos.res;
        for (let i = 0; i < videosFromServer.length; i++) {
          let videoBlob = this.base64ToVideo(videosFromServer[i].videoBase64);
          this._videos.push({ ...videosFromServer[i], videoBlob });
        }
        console.log(this._videos);
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}
