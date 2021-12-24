import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVarGitlabComponent } from './single-var-gitlab.component';

describe('SingleVarGitlabComponent', () => {
  let component: SingleVarGitlabComponent;
  let fixture: ComponentFixture<SingleVarGitlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleVarGitlabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVarGitlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
