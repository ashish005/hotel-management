import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {XhrService} from '../services/xhr.service';
import {RequestMethod, RequestOptions, RequestOptionsArgs} from '@angular/http';
import {Configs} from '../config';

class HotelModel{
  name:string;
  description:string;

  constructor(data:{
    name?:string,
    description?:string
  } = {}){
    this.name = data.name || '';
    this.description = data.description || '';
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss({ data: null })">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-control">
        <div>
          <label>Name</label>
          <input type="text" [(ngModel)]="model['name']">
        </div>
        <div>
          <label>Description</label>
          <input type="text"  [(ngModel)]="model['description']">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close({ data: model })">Submit</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close({ data: null })">Close</button>
    </div>
  `
})
export class NgbdModalContent{
  @Input() model: HotelModel;
  @Input() title: string;
  constructor(public activeModal: NgbActiveModal) {
  }
}

@Component({
  selector: 'hotel-details',
  templateUrl: './hotel-details.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;   
    }
  `]
})
export class HotelDetailsComponent implements OnInit{
  @ViewChild('content') content: ElementRef;
  @Input() id:number;
  @Input() data:Array<any>;
  constructor(private modalService: NgbModal, private xhrService: XhrService) {}

  ngOnInit(){
  }

  performAddOperation(data: any){
    let _requestOptionsArgs = <RequestOptionsArgs>{
      method: RequestMethod.Post,
      url: Configs.apiUrl.concat(`city/${this.id}`),
      data: data
    };
   this.xhrService.request(_requestOptionsArgs)
      .subscribe(
        (resp)=> {
          this.data.push(resp);
          },
        (error)=>{ console.log(error);}
        )
  }

  performEditOperation(data: any){
    let _requestOptionsArgs = <RequestOptionsArgs>{
      method: RequestMethod.Put,
      url: Configs.apiUrl.concat(`city/${this.id}/${data.id}`),
      data: data,
      header: new Headers({ "Content-Type": "application/json"})
    };
    this.xhrService.request(_requestOptionsArgs)
      .subscribe(
        (resp)=> { this.data.push(resp); },
        (error)=>{ console.log(error);}
      )
  }

  addHotel(){
    const modalRef = this.modalService.open(NgbdModalContent, { windowClass: 'dark-modal' });
    modalRef.componentInstance.model = new HotelModel();
    modalRef.componentInstance.title = "Add Hotel";
    modalRef.result.then((result) => {
      if(result.data){
        this.performAddOperation(result.data);
      }
    }, (reason) => {});
  }
  edit(item: HotelModel){
    const modalRef = this.modalService.open(NgbdModalContent, { windowClass: 'dark-modal' });
    modalRef.componentInstance.model = Object.assign({}, item);
    modalRef.componentInstance.title = "Edit Hotel";
    modalRef.result.then((result) => {
      if(result.data){
        this.performEditOperation(result.data);
      }
    }, (reason) => {});
  }
}
