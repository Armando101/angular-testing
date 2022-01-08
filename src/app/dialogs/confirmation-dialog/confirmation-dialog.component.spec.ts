import { ConfirmDialogComponent } from './confirmation-dialog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const matDialogRefMock = {
  close: () => null,
};

const matDialogData = {};

fdescribe('Confirm dialog component', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: matDialogRefMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogData,
        },
      ],
      schemas: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send true value', () => {
    // const service = fixture.debugElement.injector.get(MatDialogRef);
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');

    component.onConfirm();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should send false value', () => {
    // const service = fixture.debugElement.injector.get(MatDialogRef);
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');

    component.onDismiss();
    expect(spy).toHaveBeenCalledWith(false);
  });
});
