import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICar } from 'src/Models/car.model';
import { ApiService } from 'src/Services/api.services';
import { BrasilApiService } from 'src/Services/brasilApi.services';

interface IData {
  placa: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  data: IData;
  gasOption: string;
  carForm: FormGroup;
  car: ICar | undefined;
  loading: boolean;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _toast: ToastrService,
    private _brasilApiSerivice: BrasilApiService,
  ) {
    this.carForm = this._formBuilder.group({
      id: [''],
      fipe: [''],
      valor: [''],
      marca: [''],
      modelo: [''],
      anoModelo: [''],
      combustivel: [''],
      placa: [''],
      mesReferencia: [''],
      siglaCombustivel: [''],
      tipoVeiculo: [''],
      dataConsulta: ['']
    });

    const nav = this._router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.data = nav.extras.state as IData;
    }
  }

  async ngOnInit(): Promise<void> {

    this.loading = true;
    await this._apiService.getByCarByPlaca(this.data.placa).toPromise()
      .then(response => {
        if (response == null) {
          this._toast.warning('Nenhum veículo localizado para esta placa!')
          this._router.navigateByUrl('/filter');
        }
        this.car = response;

        if (this.car) {
          this.formCarSetValues(this.car)
        }
      })
      .catch(error => {
        this._toast.error(JSON.stringify(error));
        this._router.navigateByUrl('/filter');
      })
      .finally(() => this.loading = false)
  }

  async handleUpateCar() {
    const anoReferencia = this.carForm.get('anoModelo')?.value;
    const combustivel = this.carForm.get('combustivel')?.value;
    this.loading = true;
    await this._brasilApiSerivice.getByCodigoFipe(this.carForm.get('fipe')?.value)
      .toPromise()
      .then(response => {
        const car = response?.find(x => x.anoModelo === anoReferencia && x.combustivel === combustivel);

        if (car) {
          this.car = { ...car, id: this.carForm.get('id')?.value, placa: this.carForm.get('placa')?.value };

          this.carForm.get('valor')?.setValue(this.car?.valor);
          this.carForm.get('anoModelo')?.setValue(this.car?.anoModelo);
          this.carForm.get('fipe')?.setValue(this.car?.codigoFipe);
          this.carForm.get('combustivel')?.setValue(this.car?.combustivel);
          this.carForm.get('dataConsulta')?.setValue(this.car?.dataConsulta);
          this.carForm.get('marca')?.setValue(this.car?.marca);
          this.carForm.get('mesReferencia')?.setValue(this.car?.mesReferencia);
          this.carForm.get('modelo')?.setValue(this.car?.modelo);
          this.carForm.get('siglaCombustivel')?.setValue(this.car?.siglaCombustivel);
          this.carForm.get('tipoVeiculo')?.setValue(this.car?.tipoVeiculo);

          const carModel = this.formCarToModel();

          if (carModel.id) {
            this._apiService.updateCar(carModel, carModel.id).subscribe(response => {
              this._toast.success('Veículo atualizado com sucesso!');
            })
          }
        }
        else {
          this._toast.error('Veículo nao localizado para atualização!')
        }
      })
      .catch(error => {
        this._toast.error(error.error);
        this._router.navigateByUrl('/filter');
      })
      .finally(() => this.loading = false)
  }

  formCarSetValues(car: ICar) {
    this.carForm.setValue({
      id: this.car?.id,
      anoModelo: this.car?.anoModelo,
      fipe: this.car?.codigoFipe,
      combustivel: this.car?.combustivel,
      dataConsulta: this.car?.dataConsulta,
      marca: this.car?.marca,
      mesReferencia: this.car?.mesReferencia,
      modelo: this.car?.modelo,
      siglaCombustivel: this.car?.siglaCombustivel,
      tipoVeiculo: this.car?.tipoVeiculo,
      placa: this.car?.placa,
      valor: this.car?.valor,
    })
  }

  formCarToModel(): ICar {
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

    return car;
  }

  handleDeleteCar() {
    if (this.car?.id) {
      this._apiService.deleteCar(this.car.id).subscribe(
        response => {
          this._toast.info('Veículo excluido com sucesso!');
          this._router.navigateByUrl("");
        },
        error => {
          this._toast.error('Falha ao realizar a exclusão do veículo')
        }
      )
    }
  }
}
