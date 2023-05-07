import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";
import {ShopListService} from "../shop-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', {static: false}) myForm: NgForm;
    editMode = false;
    editIndex: number;
    mySub: Subscription;
    editedIng: IngredientModel;

    constructor(
        private sl: ShopListService
    ) {
    }

    ngOnInit() {
        this.mySub = this.sl.startEditing.subscribe(
            (i) => {
                this.editIndex = i;
                this.editMode = true;
                this.editedIng = this.sl.getIngredient(i);
                this.myForm.setValue({
                    ingName: this.editedIng.ingName,
                    ingAmount: this.editedIng.ingAmount
                })
            }
        )
    }

    onAdd(f?: NgForm) {

        const newIng: IngredientModel = new IngredientModel(
            f.value.ingName,
            f.value.ingAmount)

        if (this.editMode) {
            this.sl.saveIngredient(newIng, this.editIndex);
            this.editMode = false;
        } else {
            this.sl.addIn(newIng);
        }
        this.myForm.reset();
    }

    onClear() {
        this.myForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.sl.deleteIng(this.editIndex);
        this.onClear();
    }

    ngOnDestroy() {
        this.mySub.unsubscribe();
    }

}
