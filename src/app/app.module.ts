import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { ActivitiesModule } from './activities/activities.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventsModule } from './events/events.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    EventsModule,
    ActivitiesModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
    EventsModule /* keep this last in list of routing modules */
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
