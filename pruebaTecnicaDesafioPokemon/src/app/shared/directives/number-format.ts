
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[numberFormat]',
  standalone: true,
})
export class NumberFormatDirective {
  @Input() numberFormat = true;

  private readonly maxDigits = 9;

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.numberFormat) return;

    const input = this.elementRef.nativeElement;

    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
    ];

    if (
      allowedKeys.includes(event.key) ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    const currentDigits = input.value.replace(/\D/g, '');
    const selectedDigits = input.value
      .slice(input.selectionStart ?? 0, input.selectionEnd ?? 0)
      .replace(/\D/g, '').length;

    if (currentDigits.length - selectedDigits + 1 > this.maxDigits) {
      event.preventDefault();
    }
  }

  @HostListener('input')
  onInput(): void {
    if (!this.numberFormat) return;

    const input = this.elementRef.nativeElement;
    const numbers = input.value.replace(/\D/g, '').slice(0, this.maxDigits);

    const formatted =
      numbers.length >= 8
        ? `${numbers.slice(0, 8)}-${numbers.slice(8)}`
        : numbers;

    if (input.value !== formatted) {
      const cursorPosition = input.selectionStart ?? input.value.length;

      this.renderer.setProperty(input, 'value', formatted);

      input.dispatchEvent(new Event('input', { bubbles: true }));

      const position = Math.min(cursorPosition, formatted.length);
      input.setSelectionRange(position, position);
    }
  }
}
