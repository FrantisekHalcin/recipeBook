import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipesService} from "../recipes.service";
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from "@angular/forms";
import { ToastService} from "../../toast.service";

@Component({
    selector: 'app-edit-recipe',
    templateUrl: './edit-recipe.component.html',
    styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
    id: number;
    editMode: boolean = false;
    recForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private rs: RecipesService,
        private fb: FormBuilder,
        private router: Router,
        private t: ToastService
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
            const recipe = this.rs.getRecipe(this.id);
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
        //     const recip: RecipeModel = new RecipeModel(
        //         this.recForm.value['name'],
        //         this.recForm.value['imageUrl'],
        //         this.recForm.value['description'],
        //         this.recForm.value['ingredients'],
        // )
        if (this.editMode) {
            this.rs.saveRecipe(this.recForm.value, this.id)
            this.t.snack('The recipe was saved');
        } else {
            this.rs.addRecipe(this.recForm.value)
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
}
