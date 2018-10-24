import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivitiesModule } from './activities/activities.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    ActivitiesModule,
    AppRoutingModule /* keep this last in list of routing modules */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
