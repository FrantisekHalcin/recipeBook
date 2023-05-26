import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {IngredientModel} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import { ToastService} from "../../toast.service";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list-actions";
import * as fromAppStore from "../../store/app.reducer";



@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', {static: false}) myForm: NgForm;

    editMode= false;
    mySub: Subscription;
    editedIng: IngredientModel;

    constructor(
        private t: ToastService,
        private store: Store<fromAppStore.AppState>,
    ) {
    }

    ngOnInit() {
        this.mySub = this.store.select('shoppingList').subscribe(
            (state) => {
                if (state.editedIngIndex > -1){
                    this.editMode = true;
                    this.editedIng = state.editedIng;
                    this.myForm.setValue({
                        ingName: this.editedIng.ingName,
                        ingAmount: this.editedIng.ingAmount
                    })
                } else {
                    this.editMode = false;
                }
            }
        )
    }

    onAdd(f?: NgForm) {

        const newIng: IngredientModel = new IngredientModel(
            f.value.ingName,
            f.value.ingAmount)

        if (this.editMode) {
            this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIng))
            this.editMode = false;
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIng));
        }
        this.myForm.reset();
    }

    onClear() {
        this.myForm.reset();
        this.editMode = false;
        this.store.dispatch(new ShoppingListActions.StopEdit())
    }

    onDelete() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient())
        // this.sl.deleteIng(this.editIndex);
        this.t.snack('The ingredient was deleted','red');
        this.onClear();
    }

    snack(t:string, r?:string) {
        this.t.snack(t, r)
    }

    ngOnDestroy() {
        this.mySub.unsubscribe();
        this.store.dispatch(new ShoppingListActions.StopEdit())

    }

}
