import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { AutoComplete } from 'primeng/autocomplete'
import { DatePicker } from 'primeng/datepicker'
import { ButtonModule } from 'primeng/button'
import { NumberFormatDirective } from '../../shared/directives/number-format';
import { FlowState, FlowStateService } from '../../core/services/flow-state.service';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-form-profile',
  imports: [FloatLabel, InputTextModule, ReactiveFormsModule, AutoComplete, DatePicker, NumberFormatDirective, ButtonModule],
  templateUrl: './form-profile.html',
})
export class FormProfile implements OnInit {

  flowStateService = inject(FlowStateService)

  form!:FormGroup
  mayorEdad:boolean = true

  items:string[] = ['Jugar Fútbol','Jugar Basquetball','Jugar Tennis','Jugar Voleibol','Jugar Fifa','Jugar videojuegos']
  itemsAux:string[] = []

  edad!: number

  ngOnInit(): void {
    this.itemsAux = this.items
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      pasatiempo: new FormControl([], [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required])
    })
  }

  search(event: AutoCompleteCompleteEvent){
    this.items = this.itemsAux.filter(i=>i.toLowerCase().includes(event.query.toLowerCase()))
  }

  isRequired(controlName: string): boolean {
    const control = this.form.get(controlName);

    return !!control?.hasError('required') && !!control?.touched;
  }

  onBirthDateSelected(date: Date): void {
    const today = new Date();

    let age = today.getFullYear() - date.getFullYear();

    const birthdayHasNotOccurred =
      today.getMonth() < date.getMonth() ||
      (today.getMonth() === date.getMonth() &&
        today.getDate() < date.getDate());

    if (birthdayHasNotOccurred) {
      age--;
    }

    this.edad = age

    if (age >= 18) {
      this.mayorEdad = true
      this.form.controls['documento'].addValidators(Validators.required)
      this.form.controls['documento'].updateValueAndValidity()
    } else {
      this.mayorEdad = false
      this.form.controls['documento'].removeValidators(Validators.required)
      this.form.controls['documento'].updateValueAndValidity()
    }
  }

  submitInfo(){
    this.form.markAllAsTouched()
    if(this.form.invalid) return
    
    const informacion = {
      nombre: this.form.get('nombre')?.value,
      pasatiempo: this.form.get('pasatiempo')?.value,
      birthday: this.form.get('birthday')?.value,
      documento: this.form.get('documento')?.value,
      edad: this.edad
    }

    sessionStorage.setItem('infoUser',JSON.stringify(informacion))
    this.flowStateService.setState(FlowState.InformationSaved)
  }
}
