import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appAlphabetsOnly]'
})
export class AlphabetsOnlyDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onKeyPress(event:any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
