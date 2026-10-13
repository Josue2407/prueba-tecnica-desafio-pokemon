
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import {
  Pokemon,
  PokemonApiResponse,
} from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getFirstGeneration(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonApiResponse>(`${this.apiUrl}?limit=151&offset=0`)
      .pipe(
        map((response) =>
          response.results.map((pokemon) => {
            const id = Number(
              pokemon.url.match(/\/pokemon\/(\d+)\/?$/)?.[1]
            );

            return {
              id,
              name: pokemon.name,
              url: pokemon.url,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
            };
          })
        )
      );
  }
}
