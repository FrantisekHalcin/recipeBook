"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[592],{9985:(h,s,n)=>{n.d(s,{U:()=>i});class i{constructor(d,g){this.ingName=d,this.ingAmount=g}}},4513:(h,s,n)=>{n.d(s,{L:()=>g});var i=n(9985),r=n(7579),d=n(9523);let g=(()=>{class t{getIngredients(){return this.ingredients.slice()}getIngredient(e){return this.ingredients[e]}saveIngredient(e,c){this.ingredients[c]=e,this.ingredientsChanged.next(this.ingredients.slice())}addIn(e){this.ingredients.push(e),this.ingredientsChanged.next(this.ingredients.slice())}addAllIngs(e){this.ingredients.push(...e),this.ingredientsChanged.next(this.ingredients.slice())}deleteIng(e){this.ingredients.splice(e,1),this.ingredientsChanged.next(this.ingredients.slice())}constructor(){this.ingredientsChanged=new r.x,this.startEditing=new r.x,this.ingredients=[new i.U("spaghetti",1),new i.U("egg",2),new i.U("beef",1),new i.U("tomatoes",3)]}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=d.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);