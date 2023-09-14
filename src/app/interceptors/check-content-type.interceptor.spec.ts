import { TestBed } from '@angular/core/testing';

import { CheckContentTypeInterceptor } from './check-content-type.interceptor';

describe('CheckContentTypeInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CheckContentTypeInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CheckContentTypeInterceptor = TestBed.inject(CheckContentTypeInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
