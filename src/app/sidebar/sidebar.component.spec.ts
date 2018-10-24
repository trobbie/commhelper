import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MyactivitiesComponent } from '../activities/myactivities/myactivities.component';
import { ActivityDetailComponent } from '../activities/activity-detail/activity-detail.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        MyactivitiesComponent,
        ActivityDetailComponent
      ],
      imports: [ AppRoutingModule, FormsModule ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
