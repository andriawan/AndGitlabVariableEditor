import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-primary',
  templateUrl: './input-primary.component.html',
  styleUrls: ['./input-primary.component.scss']
})
export class InputPrimaryComponent implements OnInit {

  @Output("change") emitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitValue(event: Event): void{
    let element: HTMLInputElement = (event.target as HTMLInputElement);
    this.emitter.emit(element.value)
  }

}
