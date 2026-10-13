import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { PokemonDetail } from '../../core/models/pokemon.interface';
import { PokemonService } from '../../core/services/pokemon.service';
import { ButtonModule } from 'primeng/button';
import { FlowState, FlowStateService } from '../../core/services/flow-state.service';

@Component({
  selector: 'app-view-pokemon',
  imports: [ButtonModule],
  templateUrl: './view-pokemon.html',
})
export class ViewPokemon implements OnInit, OnDestroy {

  private readonly pokemonService = inject(PokemonService);
  private readonly destroy$ = new Subject<void>();

  readonly pokemonStats = signal<PokemonDetail[]>([]);
  readonly error = signal<string | null>(null);
  readonly Math = Math

  flowStateService = inject(FlowStateService)

  ngOnInit(): void {
    this.loadPokemonStats()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPokemonStats(): void {
    const storedIds = sessionStorage.getItem('selectedPokemonIds');

    if (!storedIds) {
      this.error.set('No hay Pokémon seleccionados.');
      return;
    }

    let ids: number[];

    try {
      const parsed: unknown = JSON.parse(storedIds);

      if (
        !Array.isArray(parsed) ||
        !parsed.every(
          (id: unknown) =>
            typeof id === 'number' &&
            Number.isInteger(id) &&
            id >= 1 &&
            id <= 151
        )
      ) {
        this.error.set('La selección guardada no es válida.');
        return;
      }

      ids = [...new Set(parsed)].slice(0, 3);
    } catch {
      this.error.set('No fue posible leer la selección guardada.');
      return;
    }

    if (ids.length === 0) {
      this.error.set('No hay Pokémon seleccionados.');
      return;
    }

    this.error.set(null);

    forkJoin(
      ids.map(id => this.pokemonService.getPokemonDetails(id))
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: stats => {
          this.pokemonStats.set(stats);
        },
        error: () => {
          this.error.set('No fue posible cargar las estadísticas.');
        },
      });
  }

  modificarPokemons(){
    this.flowStateService.setState(FlowState.InformationSaved)
  }
}
