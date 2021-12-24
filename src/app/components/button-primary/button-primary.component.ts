import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent implements OnInit {

  @Input() label:string = 'Button';

  constructor() { }

  ngOnInit(): void {
  }

}
