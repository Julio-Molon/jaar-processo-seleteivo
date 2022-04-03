import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../Services/api.services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICar } from 'src/Models/car.model';

interface IData {
  cars: ICar[],
  gasOptions: string[]
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: IData;
  gasOption: string;
  carForm: FormGroup;
  car: ICar | undefined;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _toast: ToastrService
  ) {
    this.carForm = this._formBuilder.group({
      id: [''],
      fipe: [''],
      valor: [''],
      marca: [''],
      modelo: [''],
      anoModelo: [''],
      combustivel: [''],
      placa: ['', [Validators.required]],
      mesReferencia: [''],
      siglaCombustivel: [''],
      tipoVeiculo: [''],
      dataConsulta: ['']
    });

    const nav = this._router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.data = nav.extras.state as IData;

      if (this.data.cars.length == 1) {
        this.car = this.data.cars[0];
        this.gasOption = this.data.gasOptions[0];
        this.formCarSetValues(this.car)
      }
      else {
        this.gasOption = this.data.gasOptions[0];
        this.handleChageGasOption(this.gasOption);
      }

    }
  }

  ngOnInit(): void {
  }

  handleAddCar() {
    const car = new Object({
      id: this.carForm.get('id')?.value,
      valor: this.carForm.get('valor')?.value,
      marca: this.carForm.get('marca')?.value,
      modelo: this.carForm.get('modelo')?.value,
      anoModelo: this.carForm.get('anoModelo')?.value,
      combustivel: this.carForm.get('combustivel')?.value,
      mesReferencia: this.carForm.get('mesReferencia')?.value,
      tipoVeiculo: this.carForm.get('tipoVeiculo')?.value,
      siglaCombustivel: this.carForm.get('siglaCombustivel')?.value,
      dataConsulta: this.carForm.get('dataConsulta')?.value,
      codigoFipe: this.carForm.get('fipe')?.value,
      placa: this.carForm.get('placa')?.value
    }) as ICar;

    this._apiService.insertNewCar(car).subscribe(
      response => {
        this._toast.success('Novo veículo incluido com sucesso!');
        this._router.navigateByUrl("/");
      },
      error => {
        this._toast.error('Um erro inespereado ocorreu ao inseir um novo veículo!' + JSON.stringify(error));
      })
  }

  handleChageGasOption(combustivel: string) {
    this.car = this.data.cars.find(x => x.combustivel == combustivel);
    if (this.car) {
      this.formCarSetValues(this.car);
    }
  }

  formCarSetValues(car: ICar) {
    this.carForm.setValue({
      id: null,
      valor: this.car?.valor,
      marca: this.car?.marca,
      modelo: this.car?.modelo,
      anoModelo: this.car?.anoModelo,
      combustivel: this.car?.combustivel,
      fipe: this.car?.codigoFipe,
      mesReferencia: this.car?.mesReferencia,
      tipoVeiculo: this.car?.tipoVeiculo,
      siglaCombustivel: this.car?.siglaCombustivel,
      dataConsulta: this.car?.dataConsulta,
      placa: this.carForm.get('placa')?.value,
    })
  }

}
