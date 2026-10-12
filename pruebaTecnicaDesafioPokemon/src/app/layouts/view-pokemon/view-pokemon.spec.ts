import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPokemon } from './view-pokemon';

describe('ViewPokemon', () => {
  let component: ViewPokemon;
  let fixture: ComponentFixture<ViewPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPokemon],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPokemon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
