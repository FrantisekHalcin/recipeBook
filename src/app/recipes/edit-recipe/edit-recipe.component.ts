import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from "@angular/forms";
import { ToastService} from "../../toast.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {map, Subscription} from "rxjs";
import {add_recipe, update_recipe} from "../store/recipes.actions";

@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.component.html',
    styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, OnDestroy {
    id: number;
    editMode: boolean = false;
    recForm: FormGroup;
    storeSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private t: ToastService,
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        )
    }

    private initForm() {
        let name = '';
        let img = '';
        let des = '';
        let rings = new FormArray([])

        if (this.editMode) {
            // const recipe = this.rs.getRecipe(this.id);
            this.storeSub = this.store.select('recipes')
                .pipe(
                map(object => {
                    return object.recipes.find((recipe, index) => {
                        return index === this.id
                    })
                })
            ).subscribe((recipe) => {
                name = recipe.name;
                img = recipe.imageUrl;
                des = recipe.description;
                if (recipe.ingredients) {
                    for (let ing of recipe.ingredients) {
                        rings.push(
                            new FormGroup({
                                ingName: new FormControl(ing.ingName, Validators.required),
                                ingAmount: new FormControl(ing.ingAmount, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
                            })
                        )
                    }
                }
            })

        }

        this.recForm = this.fb.group({
            name: [name, Validators.required],
            imageUrl: [img, Validators.required],
            description: [des, Validators.required],
            ingredients: rings
        })
    }

    get controls() {
        return (this.recForm.get('ingredients') as FormArray).controls;
    }

    onSubmit() {
        if (this.editMode) {
            this.store.dispatch(update_recipe({recipe: this.recForm.value, id: this.id}))
            this.t.snack('The recipe was saved');
        } else {
            this.store.dispatch(add_recipe({recipe: this.recForm.value}))
            this.t.snack('The recipe was added to the list');
        }
        this.goAway();
    }

    addNewIng() {
        (<FormArray>this.recForm.get('ingredients')).push(
            new FormGroup({
                ingName: new FormControl('', Validators.required),
                ingAmount: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
            }))
    }

    deleteIng(index: number) {
        (<FormArray>this.recForm.get('ingredients')).removeAt(index )
    }

    goAway() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    ngOnDestroy() {
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

}
