import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICar } from "src/Models/car.model";
import { Configuration } from "src/configuration";

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {
  constructor(
    private _http: HttpClient,
  ) {}

  public getUrl(): string {
    return Configuration.brasilApiBaseURL;
  }

  public getByCodigoFipe(codigoFipe: string): Observable<ICar[]> {

    return this._http.get<ICar[]>(this.getUrl() + `api/fipe/preco/v1/${codigoFipe}`)
  }
}
