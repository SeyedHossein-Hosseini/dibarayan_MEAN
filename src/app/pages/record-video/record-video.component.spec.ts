import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordVideoComponent } from './record-video.component';

describe('RecordVideoComponent', () => {
  let component: RecordVideoComponent;
  let fixture: ComponentFixture<RecordVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordVideoComponent]
    });
    fixture = TestBed.createComponent(RecordVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
