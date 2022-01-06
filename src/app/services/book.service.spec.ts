import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import swal from 'sweetalert2';

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

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

    storage = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        return (storage[key] = value);
      }
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('shoul be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks returns a list of books and does a get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });

  it('should get books from cart, return empty array when localStorage is empty', () => {
    const listBookFromCart = service.getBooksFromCart();
    expect(listBookFromCart.length).toBe(0);
  });

  it('should add a book successfully when the list does not exists in localStorage', () => {
    const toast = { fire: () => null } as any;
    const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
      return toast;
    });
    let cartListBook = service.getBooksFromCart();

    expect(cartListBook.length).toBe(0);

    service.addBookToCart(listBook[0]);

    cartListBook = service.getBooksFromCart();
    expect(cartListBook.length).toBe(1);
    expect(spy1).toHaveBeenCalled();
  });

  it('should remove books from localStorage list', () => {
    service.addBookToCart(listBook[0]);
    let listCartBooks = service.getBooksFromCart();
    expect(listCartBooks.length).toBe(1);

    service.removeBooksFromCart();
    listCartBooks = service.getBooksFromCart();
    expect(listCartBooks.length).toBe(0);
  });
});
