import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesPricesComponent } from './articles-prices.component';

describe('ArticlesPricesComponent', () => {
  let component: ArticlesPricesComponent;
  let fixture: ComponentFixture<ArticlesPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
