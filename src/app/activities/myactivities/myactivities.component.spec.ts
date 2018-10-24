import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MyactivitiesComponent } from './myactivities.component';
import { ActivityDetailComponent } from '../activity-detail/activity-detail.component';

describe('MyactivitiesComponent', () => {
  let component: MyactivitiesComponent;
  let fixture: ComponentFixture<MyactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ MyactivitiesComponent, ActivityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
