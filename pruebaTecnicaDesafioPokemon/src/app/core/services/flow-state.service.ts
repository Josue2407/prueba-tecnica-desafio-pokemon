import { Injectable, computed, signal } from '@angular/core';

export enum FlowState {
  Initial = 0,
  InformationSaved = 1,
  Confirmation = 2,
}

@Injectable({
  providedIn: 'root',
})
export class FlowStateService {
  private readonly storageKey = 'currentFlowState';

  private readonly _currentState = signal<FlowState>(
    this.getInitialState()
  );

  readonly currentState = this._currentState.asReadonly();

  readonly showNextComponent = computed(
    () => this._currentState() === FlowState.InformationSaved
  );

  private getInitialState(): FlowState {
    const savedState = sessionStorage.getItem(this.storageKey);

    if (savedState === null) {
      return FlowState.Initial;
    }

    const state = Number(savedState);

    if (
      Number.isInteger(state) &&
      Object.values(FlowState)
        .filter((value) => typeof value === 'number')
        .includes(state)
    ) {
      return state as FlowState;
    }

    return FlowState.Initial;
  }

  setState(state: FlowState): void {
    this._currentState.set(state);
    sessionStorage.setItem(this.storageKey, String(state));
  }
}