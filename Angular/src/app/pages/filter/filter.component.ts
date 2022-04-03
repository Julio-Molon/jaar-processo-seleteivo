import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  placa: FormControl;
  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placa = new FormControl('');
  }

  handleSearch() {
    let placa = this.placa.value;
    this._router.navigateByUrl('/detail', {
      state: { placa: placa }
    });
  }
}
