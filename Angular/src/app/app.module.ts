import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrasilApiService } from 'src/Services/brasilApi.services';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { FilterComponent } from './pages/filter/filter.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const toastrConfig = {
  timeOut: 5000,
  enableHtml: true,
  autoDismiss: true,
  preventDupicates: true,
  positionClass: 'toast-top-right',
  progressBar: true,
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    FilterComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ToastrModule.forRoot(toastrConfig),
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [BrasilApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
