
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput() {
    const value = this.el.nativeElement.value;
    this.el.nativeElement.value = this.capitalizeFirstLetter(value);
  }

  capitalizeFirstLetter(value: string): string {
    if (value.length > 0) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
}