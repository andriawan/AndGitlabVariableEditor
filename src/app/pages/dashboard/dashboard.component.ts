import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setResult(data: any): void {
    this.loading = data.loading
  }

}
