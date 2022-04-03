import { ICar } from 'src/Models/car.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { filter, pipe } from 'rxjs';
import { BrasilApiService } from 'src/Services/brasilApi.services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchForm: FormGroup;
  public cars: ICar[];
  public gasOptions: string[];
  loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _brasilApiService: BrasilApiService,
    private _router: Router,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      codigoFipe: ['', [Validators.required]],
      anoReferencia: ['', [Validators.required]]
    });
  }

  handleSearch() {
    let codigoFipe = this.searchForm.get('codigoFipe')?.value;
    let anoReferencia = this.searchForm.get('anoReferencia')?.value;

    if (codigoFipe && anoReferencia) {
      this.loading = true;
      this._brasilApiService.getByCodigoFipe(
        codigoFipe
      )
        .subscribe(
          result => {
            const cars = result.filter(x => x.anoModelo == anoReferencia);

            if (cars.length == 0) {
              this._toast.info('Nenhum veículo encontrado!');
              return;
            }

            this.cars = [...cars];
            this.gasOptions = new Array<string>();
            if (this.cars.length > 1) {

              cars.map(car => {
                this.gasOptions.push(car.combustivel)
              })
            }
            else {
              this.gasOptions.push(this.cars[0].combustivel)
            }
            this._router.navigateByUrl('/register', {
              state: { cars: this.cars, gasOptions: this.gasOptions }
            })

          },
          (error) => {
            this._toast.warning(error.error.message)
          },
          () => { this.loading = false }
        )
    }
  }
}
