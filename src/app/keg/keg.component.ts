import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from '../keg';

@Component({
  selector: 'app-keg',
  templateUrl: './keg.component.html',
  styleUrls: ['./keg.component.css']
})
export class KegComponent {
  @Input() isAdding: boolean;
  @Output() create = new EventEmitter();
  @Output() finish = new EventEmitter();


  addNew(name: string, brand: string, price: number,alcohol: number){
    this.isAdding = false;
    let addKeg = new Keg(name, brand, price, alcohol);
    this.create.emit(addKeg);
  }

  startAdd(){
    this.isAdding = true;
    console.log(this.isAdding);
    this.finish.emit(this.isAdding);
  }

}

