import axios from "axios";
import {ROUTE} from "../Routes";
import {action, computed, observable} from "mobx";
import {PizzaModel} from "../models/PizzaModel";

export class PizzaStore {
    @observable pizzas: PizzaModel[];
    @action setPizzas = (p: PizzaModel[]) => (this.pizzas = p);

    async listPizzas() {
        try {
            const pizzas = await axios.get(ROUTE.Pizza.List);
            this.setPizzas(pizzas.data.data.map((pizza: any) => (new PizzaModel(pizza))));
        } catch (e) {
            console.log(e);
        }
    }


    @computed
    get pizzasInCart() {
        return this.pizzas.filter((pizza: any) => {
            return !!(pizza.quantity);
        });
    }

    @computed
    get pizzaCountInCart() {
        return this.pizzasInCart.reduce((count, pizza: any) => {
            return (pizza.quantity || 0) + count;
        }, 0);
    }
}
