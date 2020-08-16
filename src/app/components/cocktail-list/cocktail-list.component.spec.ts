import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailListComponent } from './cocktail-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { By } from '@angular/platform-browser';
import { Populate } from 'src/app/state/cocktail.actions';
import { CocktailService } from 'src/app/services/cocktail.service';
import { of } from 'rxjs';

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let store: Store;
  let cocktailService: CocktailService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState]),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    cocktailService = TestBed.inject(CocktailService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a search field', () => {
    const element: HTMLElement = fixture.nativeElement;
    const searchField = element.querySelector('input');
    expect(searchField.placeholder).toEqual('Search for a cocktail');
  });

  it('should have a search button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.search-button');
    expect(button.innerHTML.trim()).toEqual('Search');
  });

  it('should have a previous button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.previous');
    expect(button.innerHTML.trim()).toEqual('Previous');
  });

  it('should have a next button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.next');
    expect(button.innerHTML.trim()).toEqual('Next');
  });

  // it('should have a category dropdown', () => {});

  // it('should have an ingredient dropdown', () => {});

  // it('should have an alcoholic dropdown', () => {});

  // it('should have a glass dropdown', () => {});

  it('should search for cocktails by name', () => {
    spyOn(component, 'searchCocktails');
    const button = fixture.debugElement.query(By.css('.search-button'))
      .nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.searchCocktails).toHaveBeenCalled();
  });

  it('should paginate forward', () => {
    spyOn(component, 'nextPage');
    const button = fixture.debugElement.query(By.css('.next')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalled();
  });

  it('should paginate backward', () => {
    spyOn(component, 'previousPage');
    const button = fixture.debugElement.query(By.css('.previous'))
      .nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.previousPage).toHaveBeenCalled();
  });

  // learning how to test state-related functions
  // both of these would appear after state is filled
  // it('should display a list of cocktails', () => {
  //   const cocktailList = [
  //     {
  //       idDrink: '1',
  //       strDrinkThumb: '/abc.jpg',
  //       strDrink: 'Abc',
  //       strCategory: 'shot',
  //       strAlcoholic: 'non',
  //     },
  //     {
  //       idDrink: '2',
  //       strDrinkThumb: '/123.jpg',
  //       strDrink: 'Bcd',
  //       strCategory: 'shot',
  //       strAlcoholic: 'non',
  //     },
  //   ];

  //   spyOn(cocktailService, 'paginateCocktails').and.returnValue(
  //     of(cocktailList)
  //   );
  //   store.dispatch(new Populate({})).toPromise();
  //   expect(cocktailService.paginateCocktails).toHaveBeenCalled();
  //   const cocktails = store.selectSnapshot(CocktailsState.getCocktails);
  //   expect(cocktails).toEqual(cocktailList);
  //   const element: HTMLElement = fixture.nativeElement;
  //   const cards = element.querySelectorAll('.mat-card');
  //   expect(cards.length).toBeGreaterThan(0);
  // });

  // it('should navigate to a recipe', () => {
  //   spyOn(component, 'viewRecipe');
  //   const button = fixture.debugElement.query(By.css('.recipe-button'))
  //     .nativeElement;
  //   button.click();
  //   fixture.detectChanges();
  //   expect(component.viewRecipe).toHaveBeenCalled();
  // });

  // it('should populate cocktail list', () => {
  //   store.dispatch(new Populate({}));
  //   const cocktailList = store.selectSnapshot(
  //     (state) => state.cocktails.cocktailList
  //   );

  //   console.log(cocktailList);

  //   expect(cocktailList.length).toBeGreaterThan(0);
  // });
});
