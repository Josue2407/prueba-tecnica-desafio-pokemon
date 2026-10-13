import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon.interface';
import { Subject, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { FlowState, FlowStateService } from '../../core/services/flow-state.service';

@Component({
  selector: 'app-select-pokemon',
  imports: [ButtonModule, NgClass],
  templateUrl: './select-pokemon.html'
})
export class SelectPokemon implements OnInit, OnDestroy {

  private readonly pokemonService = inject(PokemonService)
  readonly pokemon = signal<Pokemon[]>([]);
  readonly error = signal<string | null>(null);

  readonly selectedPokemon = signal<number[]>([]);
  readonly maxSelection = 3;

  private readonly destroy$ = new Subject<void>();

  flowStateService = inject(FlowStateService)

  ngOnInit(): void {
    this.getPokemons()
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  getPokemons(){
    this.pokemonService.getFirstGeneration().pipe(takeUntil(this.destroy$)).subscribe({
      next:(data) => {
        this.pokemon.set(data);
        this.getPreviousLocal()
      },
      error:()=> {
        this.error.set('No fue posible cargar los Pokémon. Intenta nuevamente.')
      }
    })
  }

  getPreviousLocal(){
    const local = sessionStorage.getItem('selectedPokemonIds')
    if(local){
      this.selectedPokemon.set(JSON.parse(local))
    }
  }

  isSelected(id: number): boolean {
    return this.selectedPokemon().includes(id);
  }

  isSelectionLimitReached(): boolean {
    return this.selectedPokemon().length >= this.maxSelection;
  }

  togglePokemon(pokemon: Pokemon): void {
    this.selectedPokemon.update((selected) => {

      if (selected.includes(pokemon.id)) {
        return selected.filter((id) => id !== pokemon.id);
      }

      if (selected.length >= this.maxSelection) {
        return selected;
      }

      return [...selected, pokemon.id];
    });
  }

  submitPokemon(){
    sessionStorage.setItem('selectedPokemonIds', JSON.stringify(this.selectedPokemon()))
    this.flowStateService.setState(FlowState.Confirmation)
  }

}
