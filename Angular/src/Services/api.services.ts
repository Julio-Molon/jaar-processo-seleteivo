import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICar } from "src/Models/car.model";
import { Configuration } from "src/configuration";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private _http: HttpClient,
  ) {}

  public getUrl(): string {
    return Configuration.apiUrl;
  }

  public getByCarByPlaca(placa: string): Observable<ICar> {
    return this._http.get<ICar>(this.getUrl() + `v1/cars/${placa}`)
  }

  public insertNewCar(car: ICar): Observable<any> {
    let headers = new HttpHeaders({});
    const body = car;
    return this._http.post(this.getUrl() + 'v1/cars/', body, { headers: headers })
  }

  public updateCar(car: ICar, id: string): Observable<any> {
    let headers = new HttpHeaders({});
    const body = car;
    return this._http.put(this.getUrl() + 'v1/cars/' + id, body, { headers: headers });
  }

  public deleteCar(id: string): Observable<any> {
    return this._http.delete(this.getUrl() + 'v1/cars/ ' + id)
  }
}
