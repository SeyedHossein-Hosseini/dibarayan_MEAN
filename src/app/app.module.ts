import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordVideoComponent } from './pages/record-video/record-video.component';
import { VideosListComponent } from './pages/videos-list/videos-list.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CardComponent } from './components/card/card.component';

// videogular
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VideoPlayerComponent } from './components/videogular/video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordVideoComponent,
    VideosListComponent,
    AuthenticationComponent,
    SignupComponent,
    CardComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
