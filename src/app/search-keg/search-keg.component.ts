import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KegComponent } from '../keg/keg.component';
import { Keg } from '../keg';
 
@Component({
  selector: 'app-search-keg',
  templateUrl: './search-keg.component.html',
  styleUrls: ['./search-keg.component.css']
})
export class SearchKegComponent {
  @Input() childKegList: Keg[];
  @Output() searchResult = new EventEmitter();

  searchKegClicked(criteria: string){
    let searchArray = [];
    for(let i = 0; i< this.childKegList.length; i++){
      if(this.childKegList[i].brand === criteria){
        searchArray.push(this.childKegList[i]);
      }
    }
    this.searchResult.emit(searchArray);
  }

}
