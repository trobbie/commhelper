import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ActivitiesModule } from './activities/activities.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventsModule } from './events/events.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    EventsModule,
    ActivitiesModule,
    SharedModule,
    AppRoutingModule,
    EventsModule
  ],
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
