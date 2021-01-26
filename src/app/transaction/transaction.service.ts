import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { deliveryboyList } from './transaction.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class deliveryBoyService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('outletAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });

  httpHeadersImage = new HttpHeaders({
    'Content-Type': [],
    'Authorization': 'Bearer ' + this.accessToken

  });

  constructor(private http: HttpClient) {
  }

  getdeliveryBoyPage(page) {
    return this.http.get(this.baseUrl + 'listPayStaffDetails?page=' + page, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getDeliveryBoy(deliveryBoyId) {
    return this.http.get(this.baseUrl + 'getStaffDetail/' + deliveryBoyId, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getDeliveryBoyList(page): Observable<deliveryboyList[]> {

    return this.http
      .get(this.baseUrl + 'listPayStaffDetails?page=' + page, { headers: this.httpHeaders })
      .map((response: Response) => {
        return <deliveryboyList[]>response['listPayStaffDetails'];
      })
      .catch(this.handleError);
  }
  getPaystaff(data) {
    return this.http.post(this.baseUrl + 'getPayStaff', data, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }


  confirmDeliveryBoy(confirmData) {
    return this.http.post(this.baseUrl + 'staffApproval', confirmData, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  searchDeliveryBoy(deliveryBoyId) {
    return this.http.post(this.baseUrl + 'DeliveryBoySearch', deliveryBoyId, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  monthyear(deliveryBoyId) {
    return this.http.post(this.baseUrl + 'listSearchPayStaffDetails', deliveryBoyId, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
