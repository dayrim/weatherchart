import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <h1>This is not the page you were looking for!</h1>
    `
})
export class PageNotFoundComponent implements OnInit {
  ngOnInit() {
    throw new Error('Page not found');
  }
}
