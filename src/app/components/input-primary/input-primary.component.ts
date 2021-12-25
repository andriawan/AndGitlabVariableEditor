import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-primary',
  templateUrl: './input-primary.component.html',
  styleUrls: ['./input-primary.component.scss']
})
export class InputPrimaryComponent implements OnInit {

  @Output("change") emitter = new EventEmitter<string>();
  @Input("placeholder") placeholder:string = "";
  @Input("value") value:string = "";
  @Input("type") type:string = "text";

  constructor() { }

  ngOnInit(): void {
  }

  emitValue(event: Event): void{
    let element: HTMLInputElement = (event.target as HTMLInputElement);
    this.emitter.emit(element.value)
  }

}
