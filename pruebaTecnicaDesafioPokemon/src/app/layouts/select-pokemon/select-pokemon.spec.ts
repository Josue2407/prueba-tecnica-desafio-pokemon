import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPokemon } from './select-pokemon';

describe('SelectPokemon', () => {
  let component: SelectPokemon;
  let fixture: ComponentFixture<SelectPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPokemon],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPokemon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
