import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent implements OnInit {

  @Output('click-action') emitter = new EventEmitter<void>();

  @Input() label:string = 'Button';

  constructor() { }

  ngOnInit(): void {
  }

  emitAction(): void {
    this.emitter.emit();
  }

}
