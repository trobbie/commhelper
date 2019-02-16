import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRoutes, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminComponent } from './admin.component';

// TODO: eventually need to test the routing within admin
@Component({
  selector: 'app-test-cmp',
  templateUrl: './admin.component.html'
})
class TestRouterComponent {
}

const config: Routes = [
  {
      path: '', component: TestRouterComponent
  }
];

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: provideRoutes(config) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
