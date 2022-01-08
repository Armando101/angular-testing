import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookService } from 'src/app/services/book.service';
import { CartComponent } from './cart.component';
import { Book } from '../../models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const listBook: Book[] = [
  {
    name: 'Harry potter',
    author: 'J.K Rowling',
    isbn: '',
    price: 14,
    amount: 2,
  },
  {
    name: 'Harry potter',
    author: 'J.K Rowling',
    isbn: '',
    price: 14,
    amount: 2,
  },
  {
    name: 'Harry potter',
    author: 'J.K Rowling',
    isbn: '',
    price: 14,
    amount: 2,
  },
];

const matDialogMock = {
  open() {
    return {
      afterClosed: () => of(true),
    };
  },
};

describe('Cart component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [
        BookService,
        {
          provide: MatDialog,
          useValue: matDialogMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);
    spyOn(service, 'getBooksFromCart').and.callFake(() => listBook);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should returns an amount', () => {
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBeNull();
  });

  it('onInputNumberChange increments correctly', () => {
    const actions = 'plus';
    const book = { ...listBook[0] };

    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toBe(2);
    component.onInputNumberChange(actions, book);

    expect(book.amount).toBe(3);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onInputNumberChange decrements correctly', () => {
    const actions = 'minus';
    const book = { ...listBook[0] };

    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toBe(2);

    component.onInputNumberChange(actions, book);
    expect(book.amount).toBe(1);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onClearBooks works', () => {
    component.listCartBook = [...listBook];
    const serviceSpy = spyOn(
      component as any,
      '_clearListCartBook'
    ).and.callThrough();

    component.onClearBooks();
    expect(component.listCartBook.length).toBe(0);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should not title "The cart is empty" display when there is a list', () => {
    component.listCartBook = listBook;
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('#emptyTitle')
    );

    expect(debugElement).toBeFalsy();
  });

  it('should title "The cart is empty" display when there is not a list', () => {
    component.listCartBook = [];
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('#emptyTitle')
    );

    expect(debugElement).toBeTruthy();

    if (debugElement) {
      const element: HTMLElement = debugElement.nativeElement;
      expect(element.innerHTML).toContain('The cart is empty');
    }
  });
});
