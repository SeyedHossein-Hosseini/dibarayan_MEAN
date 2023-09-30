import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { VideoRecordingService } from '../../services/record-video/record-video.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { VideosServiceService } from '../../services/videos-list/videos-service.service';

import { Video } from '../../schemas/uploadVideo';

import * as uuid from 'uuid';

@Component({
  selector: 'my-app',
  templateUrl: './record-video.component.html',
  styleUrls: ['./record-video.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RecordVideoComponent {
  @ViewChild('videoElement', { static: true }) videoElement!: any;

  video: any;
  isPlaying = false;
  displayControls = true;
  isVideoRecording = false;
  videoRecordedTime;
  videoBlobUrl;
  videoBlob;
  videoName;
  videoStream: MediaStream;
  videoConf = { video: { facingMode: 'user', width: 320 }, audio: true };

  videoTitle: string = '';
  userId: string = '';

  serverResponse: any = '';

  constructor(
    private ref: ChangeDetectorRef,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer,
    private Localstorage: LocalstorageService,
    private videoService: VideosServiceService
  ) {
    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      this.ref.detectChanges();
    });
  }

  ngOnInit(): void {
    console.log(this.videoElement);
    this.video = this.videoElement.nativeElement;
  }

  startVideoRecording() {
    if (!this.isVideoRecording) {
      this.video.controls = false;
      this.isVideoRecording = true;
      this.videoRecordingService
        .startRecording(this.videoConf)
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch(function (err) {
          console.log(err.name + ': ' + err.message);
        });
    }
  }

  abortVideoRecording() {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.video.controls = false;
    }
  }

  stopVideoRecording() {
    if (this.isVideoRecording) {
      this.videoRecordingService.stopRecording();
      this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;
    }
  }

  clearVideoRecordedData() {
    this.videoBlobUrl = null;
    this.video.srcObject = null;
    this.video.controls = false;
    this.ref.detectChanges();
  }

  downloadVideoRecordedData() {
    console.log(this.videoBlob);
    console.log(this.videoBlobUrl);
    this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
  }

  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    console.log({ url });
  }

  uploadVideo() {
    console.log(this.videoRecordedTime);

    const blob = new Blob([this.videoBlob], {
      type: 'video/webm;codecs=vp8,opus',
    });

    const videoId = uuid.v4();

    this.blobToBase64(blob)
      .then((videoBase64) => {
        console.log('Base64 string:', videoBase64);
        let video: Video = {
          title: this.videoTitle,
          video: videoBase64,
          userId: this.Localstorage.getLocalStorage('userId'),
          videoId: videoId,
          videoTime: this.videoRecordedTime,
        };
        this.videoService.uploadVideo(video).subscribe((res) => {
          this.serverResponse = res.res;
          this.videoTitle = '';
          this.clearVideoRecordedData();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  blobToBase64(blob: any) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}
