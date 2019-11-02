import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    //where we mange our recipes

    private recipes: Recipe[] = [
        new Recipe('Steak', 'less than half an hour of cook time and a prep time',
        'https://www.thespruceeats.com/thmb/hl4lkmdLO7tj1eDCsGbakfk97Co=/3088x2055/filters:fill(auto,1)/marinated-top-round-steak-3060302-hero-02-ed071d5d7e584bea82857112aa734a94.jpg'),
    
        new Recipe('Sandwich', 'A nice BLT',
        'data:image/jpeg;base64,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')    
    ];

    //getting the Recipes that are private
    getRecipe(){
          //Slice returns a new array is an exact copy
        return this.recipes.slice();
    }
}