---
id: operateurs-rest-spread
title: 4. Les opérateurs Rest et Spread
---

# Les opérateurs Rest et Spread

L’opérateur `...` a deux rôles différents selon le contexte dans lequel il est utilisé. Il peut servir à rassembler des valeurs (Rest operator) ou au contraire à les étaler (Spread operator).

Cela sera particulièrement utile dans des frameworks comme Angular ou React, où les opérateurs Rest et Spread sont très fréquemment utilisés (leurs documentations proposent d’ailleurs de nombreux exemples concrets). Ici, nous nous concentrons uniquement sur la théorie et sur des cas simples pour bien comprendre le fonctionnement de base.

## 4.1. Le Rest Operator

**Le Rest Operator** permet de rassembler plusieurs valeurs dans une seule variable. On l’utilise principalement dans les paramètres de fonction pour **regrouper un nombre variable d’arguments, automatiquement stockés dans un tableau, ou dans la déstructuration d’un tableau ou d’un objet.**

### 4.1.1. Paramètres de fonction

**Le regroupement d’un nombre variable d’arguments** permet à une fonction d’accepter autant de valeurs que nécessaire, sans connaître leur quantité à l’avance. Grâce à l’opérateur Rest, tous les arguments passés à la fonction sont automatiquement réunis dans un tableau.

```ts
function index(...vehicles: string[]): string[] {
    return vehicles;
}

const vehicleList: string[] = index("Ferrari", "Mercedes", "Lamborghini");
console.log(vehicleList);
```

Grâce à l’opérateur `...`, les valeurs `Ferrari`, `Mercedes` et `Lamborghini` passées en argument sont automatiquement regroupées dans un tableau appelé `vehicles`.

### 4.1.2. Déstructuration d’un tableau

**La déstructuration d’un tableau** permet d’extraire des éléments d’un tableau dans des variables distinctes. L’opérateur Rest `...` permet quant à lui de récupérer tous les éléments restants dans un nouveau tableau.

```ts
function index(): void {
    const vehicle: string[] = ["Ferrari", "Mercedes", "Lamborghini", "Audi"];
    const [first, ...others] = vehicle;

    console.log(first);
    console.log(others);
}

index();
```

Lors de la déstructuration d’un tableau, le premier élément est stocké dans une variable `first`, tandis que `...others` contient tous les éléments restants du tableau.

### 4.1.3. Déstructuration d’un objet

**La déstructuration d’un objet** permet d’extraire des propriétés d’un objet dans des variables distinctes. L’opérateur Rest `...` permet quant à lui de récupérer toutes les propriétés restantes dans un nouvel objet.

```ts
function index(): void {
    const vehicle = {
        manufacturer: "Ferrari",
        weight: 1380,
        enginePower: 570
    };
    const {manufacturer, ...others} = vehicle;

    console.log(manufacturer);
    console.log(others);
}

index();
```

Lors de la déstructuration d’un objet, la variable `manufacturer` récupère la propriété `manufacturer` de l’objet `vehicle`, et `...others` regroupe toutes les autres propriétés dans un nouvel objet.

:::info
À noter que l’ordre n’a aucune importance lors de la déstructuration d’un objet, car celle-ci se fait par nom de propriété. Ainsi, others contiendra les propriétés `weight` et `enginePower`.
:::

## 4.2. Le Spread Operator

**Le Spread Operator** permet d’étendre le contenu d’un tableau ou d’un objet au sein d’une nouvelle structure. Il est notamment utilisé pour copier ou fusionner des tableaux et objets, ou encore pour déployer les éléments d’un tableau lors de l’appel d’une fonction.

### 4.2.1. Copier et fusionner des tableaux

Le Spread operator permet de créer une copie indépendante d’un tableau en l’étalant dans un nouveau tableau :

```ts
function index(): void {
    const vehicleList: string[] =  ["Ferrari", "Mercedes", "Lamborghini"];

    const cpy: string[] = [...vehicleList];
    console.log(cpy);
}

index();
```

Il permet également de fusionner plusieurs tableaux en un seul en combinant leurs éléments :

```ts
function index(): void {
    const car: string[] =  ["Ferrari"];
    const truck: string[] =  ["Mercedes"];

    const vehicleList: string[] = [...car, ...truck];
    console.log(vehicleList);
}

index();
```

### 4.2.2. Copier et fusionner des objets

Le Spread operator peut aussi cloner un objet en recopiant toutes ses propriétés dans un nouvel objet :

```ts
function index(): void {
    const vehicle = {
        manufacturer: "Ferrari",
        weight: 1380,
        enginePower: 570
    };

    const cpy = {...vehicle};
    console.log(cpy);
}
```

Il peut également fusionner plusieurs objets en un seul : en cas de propriétés identiques, celles du dernier objet écrasent les précédentes :

```ts
function index(): void {
    const car = {
        manufacturer: "Ferrari",
        weight: 1380,
        enginePower: 570
    };

    const truck = {
        manufacturer: "Mercedes",
        weight: 11700,
        enginePower: 625
    };

    const vehicle = {...car, ...truck};
    console.log(vehicle);
}

index();
```

### 4.2.3. Appel de fonction

Le Spread operator permet de passer un tableau comme une liste d’arguments individuels à une fonction :

```ts
function index(...vehicles: string[]): string[] {
    return vehicles;
}

const vehicleList: string[] = ["Ferrari", "Mercedes", "Lamborghini"];
index(...vehicleList);
```

:::info
Dans cet exemple, `index(...vehicleList)` utilise le Spread pour déployer les éléments du tableau en arguments séparés, tandis que `index(...vehicles)` utilise le Rest pour regrouper ces arguments dans un tableau à l’intérieur de la fonction.

> Rest   : Arguments → Tableau

> Spread : Tableau → Arguments
:::
