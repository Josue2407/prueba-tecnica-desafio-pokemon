import { Component, inject, signal } from '@angular/core';
import { Header } from './layouts/header/header';
import { Profile } from './layouts/profile/profile';
import { FormProfile } from './layouts/form-profile/form-profile';
import { FlowState, FlowStateService } from './core/services/flow-state.service';
import { SelectPokemon } from './layouts/select-pokemon/select-pokemon';
import { ViewPokemon } from './layouts/view-pokemon/view-pokemon';


@Component({
  selector: 'app-root',
  imports: [Header, Profile, FormProfile, SelectPokemon, ViewPokemon],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pruebaTecnicaDesafioPokemon');

  readonly flowStateService = inject(FlowStateService)

  readonly flowState = FlowState
}
