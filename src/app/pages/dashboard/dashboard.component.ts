import { Component, OnInit } from '@angular/core';
import { SearchResult } from 'src/app/interfaces/search-result';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  result: SearchResult = {loading : false};

  constructor() { }

  ngOnInit(): void {}

  setResult(data: SearchResult): void {
    this.result = data
  }

}
