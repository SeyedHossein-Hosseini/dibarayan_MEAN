import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

// Pages
import { RecordVideoComponent } from './pages/record-video/record-video.component';
import { VideosListComponent } from './pages/videos-list/videos-list.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { SignupComponent } from './pages/signup/signup.component';

// Routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'videos-list', component: VideosListComponent },
  { path: 'record-video', component: RecordVideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {}

  redirectToVideosList() {
    this.router.navigate(['videos-list']);
  }
}
