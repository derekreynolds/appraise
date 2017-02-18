import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { SelectModule } from 'angular2-select';
import { routes } from './app.router';
import { validateUserName } from './common/validator';

import { AppComponent } from './app.component';
import { LoginComponent } from './security/user/login/login.component';
import { AuthenticationService, AuthenticationGuard } from './security';
import { AdminComponent } from './admin/admin.component';
import { ListUserComponent } from './admin/user/list/list-user.component';
import { CreateUserComponent } from './admin/user/create/create-user.component';
import { PageTitleComponent } from './common/ui/view/page-title/page-title.component';
import { MainPanelComponent } from './common/ui/view/main-panel/main-panel.component';
import { FeedbackService } from './common/ui/view/feedback';
import { ShowUserComponent } from './admin/user/show/show-user.component';
import { EditUserComponent } from './admin/user/edit/edit-user.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDGlJ1wE9pV_cMn3_tLzv7HKKa_JgA5wWo",
  authDomain: "appraise-908d5.firebaseapp.com",
  databaseURL: "https://appraise-908d5.firebaseio.com",
  storageBucket: "appraise-908d5.appspot.com",
  messagingSenderId: "349832084666"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ListUserComponent,
    CreateUserComponent,
    PageTitleComponent,
    MainPanelComponent,
    ShowUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    SelectModule,
    routes
  ],
  providers: [AuthenticationService, AuthenticationGuard, FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
