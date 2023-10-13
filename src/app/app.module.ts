import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AzureAdDemoService } from './azure-ad-demo.service';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule ,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId: '5227784a-9030-41b8-b197-3a9f9f4810b1',
            redirectUri: 'http://localhost:4200',
            authority: 'https://login.microsoftonline.com/8745ab49-fe44-4f01-9b41-6af720c5fd50'
          },
          cache:
          {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: false
          }
        }
      ),
      {
        interactionType: InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.read']],
            ['localhost',['api://1f047f5a-a5db-4d87-b301-29ab54d79672/api.scope']]
          ]
        )
      }
      )
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi: true
  },MsalGuard,AzureAdDemoService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
