import {Component, OnInit} from '@angular/core';
import {XhrService} from './services/xhr.service';
import {RequestMethod, RequestOptions, RequestOptionsArgs} from '@angular/http';
import {Configs} from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cities: Array<any> = [];
  activeId: number;
  hotelData: Array<any> = [];
  constructor(private xhrService: XhrService){
  }

  ngOnInit(){
    let _requestOptionsArgs = <RequestOptionsArgs>{
      method: RequestMethod.Get,
      url: Configs.apiUrl.concat(`hotel`),
    };
    this.xhrService.request(_requestOptionsArgs)
      .subscribe( (resp: any)=> {
          this.cities = resp;
        },
        (error)=>{
          console.log(error);
        })
  }

  update(city: any){
    this.activeId = city.id;
    let _requestOptionsArgs = <RequestOptionsArgs>{
      method: RequestMethod.Get,
      url: Configs.apiUrl.concat(`city/${city.id}`),
    };
    this.xhrService.request(_requestOptionsArgs)
      .subscribe( (resp)=> {
        this.hotelData = resp['data'];
      },
        (error)=>{
          console.log(error);
        })
  }
}
