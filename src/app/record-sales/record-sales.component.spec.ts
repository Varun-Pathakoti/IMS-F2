import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSalesComponent } from './record-sales.component';

describe('RecordSalesComponent', () => {
  let component: RecordSalesComponent;
  let fixture: ComponentFixture<RecordSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
