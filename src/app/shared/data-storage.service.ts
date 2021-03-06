import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class DataStorageService{

    constructor(private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService
        ){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http
        .put(
            'https://recipe-75686.firebaseio.com/recipes.json', 
            recipes
            )
            .subscribe(responses =>{
                console.log(responses);
            });
    }

    fetchRecipes(){
            return this.http    //Switchs to a Http Obserbiable
            .get<Recipe[]>(
                'https://recipe-75686.firebaseio.com/recipes.json', 

            ).pipe(       
                 map(recipes=>{
                return recipes.map(recipe =>{
                    return {
                        ...recipe,
                         ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes =>{
                this.recipeService.setRecipes(recipes);
            }));
    }
    
}

