import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ActivitiesModule } from './activities/activities.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventsModule } from './events/events.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    EventsModule,
    ActivitiesModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
