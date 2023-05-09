import {Component} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {ToastService} from "../toast.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(
        private ds: DataStorageService,
        private t: ToastService,
    ) {
    }

    saveData() {
        this.ds.storeRecipes();
        this.t.snack('Data was saved on the server');
    }

    getData() {
        this.ds.fetchRecipes().subscribe();
    }

}
