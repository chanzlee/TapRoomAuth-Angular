import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Keg } from '../keg';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  constructor(private authService: AuthService) { }

  title = 'TapRoom';
  name: string;

  kegOne = new Keg("Kenneth Dream", "kennyG", 4, 3);
  kegTwo = new Keg("Kenneth Hope", "kennyG", 7, 8);
  kegThree = new Keg("Kenneth Korean Dream", "kennyG", 10, 15);

  kegFour = new Keg("AJ Horse Milk", "Jaenbai co.", 1, 99);
  kegFive= new Keg("Mel Sakura Bomb", "Gibson", 99, 1);
  kegSix = new Keg("Julius Asiana Hijack", "BADE", 99, 6);
  
  kegs: Keg[] = [this.kegOne, this.kegTwo, this.kegThree, this.kegFour, this.kegFive, this.kegSix]

  selectedKeg: Keg = null;
  isAdding: boolean = false;
  editingKeg: Keg = null;
  isHappyHour: boolean = false;
  searchedKegs: Keg[] = this.kegs;

  sellPint(clickedKeg){
    clickedKeg.kegVol += clickedKeg.kegVol > 10 ? -1 : 0;
  }

  sellGrowler(clickedKeg){
    clickedKeg.kegVol += clickedKeg.kegVol > 10 ? -2 : 0;
  }

  sellLargeGrowler(clickedKeg){
    clickedKeg.kegVol += clickedKeg.kegVol > 10 ? -4 : 0;
  }

  addNewKeg(keg: Keg){
    this.kegs.unshift(keg);
    this.isAdding = false;
  }

  doneAddNewKeg(isDone: boolean) {
    console.log(isDone);
    this.isAdding = isDone;
  }

  editKeg(currentKeg) {
    this.editingKeg = currentKeg;
  }

  doneEdit() {
    this.editingKeg = null;
  }

  deleteKeg(currentKeg) {
    let currentIndex: number;
    this.kegs.forEach(function(keg, index){
      if (keg.name === currentKeg.name) {
        currentIndex = index;
      }
    });
    this.kegs.splice(currentIndex,1);
  }

  pintColor(currentKeg){
    if(currentKeg.price >= 10){
      return "price-high";
    }else if(currentKeg.price >= 5){
      return "price-medium";
    }
    else{
      return "price-low";
    }
  }

  kegVolColor(currentKeg) {
    if (currentKeg.kegVol < 10) {
      return true;
    } else {
      return false;
    }
  }

  alcConColor(currentKeg) {
    if (currentKeg.alcohol >= 10) {
      return "alcohol-high"
    } else if (currentKeg.alcohol >=5 ) {
      return "alcohol-medium";
    } else {
      return "alcohol-low"
    }
  }

  isSale(currentKeg) {
    this.selectedKeg = currentKeg;
    // if (this.selectedKeg !== null)
   if (this.selectedKeg.sale === true) {
    return true;
    } else {
      return false;
    }
    // console.log(this.selectedKeg.sale);
    // this.selectedKeg.price *= 0.5;
  }

  throwSale(currentKeg) {
    this.selectedKeg = currentKeg;
    if (this.selectedKeg.sale === true) {
      this.selectedKeg.price /= 0.5;
    } else {
      this.selectedKeg.price *= 0.5;
    }
    this.selectedKeg.sale = !this.selectedKeg.sale;
  }

  happyHour() {
    if (this.isHappyHour === false) {
      this.isHappyHour = true;

      this.kegs.forEach(function(currentKeg){
        console.log(currentKeg);
        if (currentKeg.sale === false) {
          
          currentKeg.sale = true;
          currentKeg.price *= 0.5;
        }
      });
    } else {
      this.isHappyHour = false;

      this.kegs.forEach(function(currentKeg){
        console.log(currentKeg);
        if (currentKeg.sale === true) {

          currentKeg.sale = false;
          currentKeg.price /= 0.5;
        }
      });
    }
  }

  searchKeg (kegList: Keg[]) {
    console.log(kegList);
    this.searchedKegs = kegList;
  }
}
