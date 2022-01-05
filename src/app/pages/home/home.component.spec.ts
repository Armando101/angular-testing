import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { of } from 'rxjs';

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
const bookServiceMock = {
  getBooks: () => of(listBook),
};

describe('Home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be crated', () => {
    expect(component).toBeTruthy();
  });

  it('should get books fromt subscription', () => {
    component.getBooks();

    expect(component.listBook.length).toEqual(3);
  });
});
