import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Request, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class XhrService {
  constructor(private http: Http) {
  }

  request(_requestOptionsArgs: RequestOptionsArgs): Observable<Response>{
    //noinspection TypeScriptValidateTypes
    return this.http
      .request(new Request(new RequestOptions(_requestOptionsArgs)))
      .map(this.extractArray)
  }

  protected extractArray(res: Response) {
    let data = res.json();
    return data || [];
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  protected handleErrorPromise(error: any): Promise<void> {
    try {
      error = JSON.parse(error._body);
    } catch (e) {}

    let errMsg = error.errorMessage
      ? error.errorMessage
      : error.message
        ? error.message
        : error._body
          ? error._body
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'unknown server error';

    console.error(errMsg);
    return Promise.reject(errMsg);
  }
  getHeader(obj?: any) {
    let _header: any = {};
    if (obj) {
      Object.keys(obj).forEach((key: string) => {
        _header[key] = obj[key];
      });
    }

    return new Headers(_header);
  }
}
