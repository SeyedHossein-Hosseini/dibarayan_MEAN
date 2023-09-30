import { Injectable } from '@angular/core';
import { Video, VideoResponse } from '../../schemas/uploadVideo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { urls } from '../../environment/Urls';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class VideosServiceService {
  constructor(private http: HttpClient) {}

  uploadVideoUrl: string = urls.host + urls.uploadVideo;
  getVideosUrl: string = urls.host + urls.getVideos;
  getVideoUrl: string = urls.host + urls.getVideo;

  uploadVideo(video: Video): Observable<VideoResponse> {
    return this.http.post<VideoResponse>(
      this.uploadVideoUrl,
      video,
      httpOptions
    );
  }

  getAllVideos(userId: any): Observable<any> {
    return this.http.post<any>(
      this.getVideosUrl,
      { userId: userId },
      httpOptions
    );
  }

  getSpecificVideo(userId: string, title: string): Observable<any> {
    return this.http.post<any>(
      this.getVideoUrl,
      { userId, title },
      httpOptions
    );
  }
}
