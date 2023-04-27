import { Component, OnInit } from '@angular/core';
import {RecipeModel} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [
    new RecipeModel('Spaghetti', 'How to prepare delicious dinner','https://media.istockphoto.com/id/1341564316/photo/spaghetti-and-meatballs.jpg?b=1&s=170667a&w=0&k=20&c=bSfMJCKXDP2qeFZxlfp6vZDiWCy0Uhhx6v53xZJE5HI='),
    new RecipeModel('Spaghetti', 'How to prepare delicious dinner','https://media.istockphoto.com/id/1341564316/photo/spaghetti-and-meatballs.jpg?b=1&s=170667a&w=0&k=20&c=bSfMJCKXDP2qeFZxlfp6vZDiWCy0Uhhx6v53xZJE5HI=')
  ];
ngOnInit() {

}
}
