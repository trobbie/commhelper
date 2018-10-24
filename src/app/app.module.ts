import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MyactivitiesComponent } from './myactivities/myactivities.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MyactivitiesComponent,
    ActivityDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
