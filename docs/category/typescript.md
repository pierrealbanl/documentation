---
id: typescript
title: TypeScript
sidebar_position: 3
---

# TypeScript

<span style={{color: "#9c96ff"}}>**TypeScript**</span> est un langage développé par Microsoft qui s’appuie sur JavaScript en l’enrichissant de nouvelles fonctionnalités. Il s’agit d’un sur-ensemble de JavaScript, ce qui signifie que tout code JavaScript valide peut être exécuté en TypeScript, mais l’inverse n’est pas vrai. 

**La particularité de TypeScript réside dans son système de typage statique** : là où JavaScript attribue les types dynamiquement à l’exécution, TypeScript oblige ou permet de définir les types à l’avance, ce qui permet de détecter de nombreuses erreurs avant même que le programme ne s’exécute. 

Contrairement à JavaScript, interprété directement par les navigateurs, **le code TypeScript doit être transpilé en JavaScript standard pour être compris et exécuté.** Grâce à ce fonctionnement, TypeScript apporte **une plus grande sécurité**, une meilleure lisibilité et une productivité accrue dans le développement de projets complexes, car il facilite l’autocomplétion, la maintenance et la collaboration entre développeurs.

### Préambule

Cette documentation recommande d’acquérir d’abord les bases de Java, en particulier la programmation orientée objet, afin de faciliter l’apprentissage de TypeScript.

## 1. Types primitifs et spéciaux

| **Type**    | **Description**                            |
| :---------- |:-------------------------------------------|
| `string`    | Chaîne de caractères                       |
| `number`    | Nombres (entiers, flottants)               |
| `bigint`    | Entiers très grands                        |
| `boolean`   | Valeur logique (`true` ou `false`)         |
| `null`      | Valeur nulle volontaire                    |
| `undefined` | Valeur non définie                         |
| `void`      | Absence de valeur de retour                |
| `any`       | Type qui accepte tout, désactive le typage |
| `unknown`   | Type inconnu, plus sûr que `any`           |

En TypeScript, comme en Java, il existe des **classes wrapper** mais il n’est pas nécessaire de les utiliser pour accéder aux méthodes associées. 

En effet, les types primitifs (`string`, `number`, `boolean`, etc.) **permettent déjà d’appeler directement ces méthodes**. Cela est rendu possible grâce à un mécanisme interne appelé **auto-boxing** : lorsqu’une méthode est invoquée sur un primitif, le langage **convertit automatiquement et temporairement ce primitif** en son objet wrapper correspondant, exécute la méthode, puis retourne le résultat sous forme primitive. 

Ainsi, même si les classes wrapper existent, elles ne sont pratiquement jamais utilisées car les primitives suffisent pour accéder aux fonctionnalités offertes.

## 2. Les différentes manières de déclarer une variable en TypeScript

En **JavaScript**, lorsqu’on déclare une variable, son type est implicite et peut changer au fil des réassignations : une variable initialisée avec une chaîne peut ensuite recevoir un nombre, sans que le langage ne s’y oppose.

En revanche, en **TypeScript**, une variable déclarée avec un type explicite ne pourra être réassignée qu’avec une valeur compatible avec ce type. Ainsi, si une variable est définie comme `string`, elle ne pourra plus contenir un `number` ou un `boolean`. Cela permet de prévenir des erreurs courantes dès la phase de compilation.

### 2.1. `const`

Déclare une **variable constante**, c’est-à-dire une variable qui **ne peut pas être réassignée une fois initialisée**.

```ts
function main(): void {
    const s: string = '';
    s = "Hello World!"; // Erreur : réaffectation interdite
    console.log(s);
}

main();
```

:::warning
Petite particularité : avec un objet ou un tableau, `const` empêche seulement de **changer la variable**, mais **pas de modifier l’objet** :

```ts
function allowed(): void {
    const obj: { name: string, age: number } = {
        name: "Bob",
        age: 20
    };
    obj.name = "Alice";
    obj.age = 25;
    console.log(obj);
}

allowed();

function notAllowed(): void {
    const obj: { name: string, age: number } = {
        name: "Bob",
        age: 20
    };
    obj = { name: "Alice", age: 25 } // Erreur : réaffectation interdite
    console.log(obj);
}

notAllowed();
```
:::

:::info
Si la notion d’objet n’est pas encore claire, il est possible d’ignorer cette exemple pour le moment. *Il est préférable de poursuivre avec la partie 3 sur **les objets et tableaux**, puis d’y revenir une fois ces notions acquises.*
:::

### 2.2. `let`

Déclare une **variable mutable**, c’est-à-dire une variable qui **peut être réassignée avec une nouvelle valeur**.

```ts
function main(): void {
    let s: string = '';
    s = "Hello World!";
    console.log(s);
}

main();
```

## 3. Les objets et tableaux

**Un objet** est une structure de données qui permet de regrouper plusieurs valeurs sous forme de paires clé / valeur, avec un type précis pour chaque clé :

```ts
function main(): void {
    const obj: {name: string, age: number} = {
        name: "Bob",
        age: 20
    };
    console.log(obj);
}

main();
```

**Un tableau** est une structure de données ordonnée qui permet de stocker plusieurs valeurs du même type sous un même nom de variable, accessibles grâce à leur indice numérique (commençant à 0) :

```ts
function main(): void {
    const arrayNumbers: number[] = [5, 5];
    arrayNumbers[0] = 10;
    arrayNumbers[1] = 10;
    console.log(arrayNumbers);

    const arrayString: string[] = ["Bob", "Alice"];
    arrayString[0] = "Eve"
    arrayString[1] = "Alisson"
    console.log(arrayString);
}

main();
```

### 3.1. Typage réutilisable avec `type`

`type` permet de donner un alias à une forme de donnée (objet, tableau, fonction, etc.) afin de la réutiliser facilement dans le code.

```ts
function main(): void {
    type User = {
        name: string,
        age: number
    };

    const obj: User = {
        name: "Bob",
        age: 20
    };
    console.log(obj);

    const arrayObj: User[] = [
        {name: "Bob", age: 20},
        {name: "Alice", age: 25}
    ];
    console.log(arrayObj);
}

main();
```

## 4. Les interfaces

**Une interface** permet de définir un contrat de structure. Elle décrit les propriétés et les méthodes qu’une entité (objet, classe ou fonction) doit implémenter.

```ts
interface Vehicle {
    weight: number,
    enginePower: number,
}

function main(): void {
    const ferrari: Vehicle = {
        weight: 1380,
        enginePower: 570,
    };
    console.log(ferrari);
}

main();
```

Ici, l’interface permet de décrire un objet simple, tout comme le mot-clé `type` peut le faire. La différence apparaît à partir du moment où l’on manipule des **classes** : une `interface` peut en effet **définir des méthodes** qui seront ensuite **implémentées dans une classe** pour créer des **instances** (des objets) :

```ts
interface Vehicle {
    weight: number,
    enginePower: number,
    calculateSpeed(seconds: number): number,
}

class Car implements Vehicle {
    constructor(public weight: number, public enginePower: number) {}

    calculateSpeed(seconds: number): number {
        return (this.enginePower / this.weight) * seconds;
    }
}

function main(): void {
    const ferrari = new Car(1380, 570);
    console.log(ferrari.calculateSpeed(10));
}

main();
```

Comme évoqué dans le préambule, il est recommandé de consulter la documentation Java pour bien comprendre le fonctionnement des classes. Cette documentation TypeScript **n’aborde pas en détail la programmation orientée objet.**

## 5. Types génériques

## 6. Les fonctions régulières : déclaration et expression de fonction

En TypeScript, il y a plusieurs manières d’écrire une fonction régulière :

```ts
function main(a: number, b: number): number {
    return a + b;
}

const functionInVariable = function(a: number, b: number): number {
    return a + b;
}

console.log(main(5, 5));
console.log(functionInVariable(5, 5));
```

Les deux formes réalisent exactement la même opération : elles définissent une fonction régulière qui peut être exécutée de la même manière. La distinction principale entre **une déclaration de fonction** et **une expression de fonction** réside dans le comportement de hoisting :

Le **hoisting** est un mécanisme de JavaScript dans lequel certaines déclarations sont traitées avant l’exécution du code. Concrètement, le moteur JavaScript déplace en mémoire les déclarations de fonctions au début de leur portée (scope). Cela signifie qu’une fonction déclarée avec la syntaxe `function` peut être appelée avant sa définition dans le code source, car elle a déjà été enregistrée par le moteur. Les variables déclarées avec `let` et `const` ne bénéficient pas du hoisting de la même manière : elles sont placées en mémoire mais ne sont accessibles qu’après leur ligne de déclaration (zone dite de Temporal Dead Zone).

- Déclaration de fonction : accessible dans tout le scope, y compris avant sa définition.
- Expression de fonction : accessible uniquement après son assignation à une variable.

## 7. Fonctions fléchées

Les fonctions fléchées (arrow functions) sont une manière raccourcie d’écrire des fonctions en TypeScript. Elles utilisent la syntaxe `(): type => {...}` au lieu du mot-clé `function`.

Elles sont généralement assignées à une variable : cela permet de manipuler la fonction comme une donnée. On peut la stocker, la transmettre en paramètre ou la renvoyer en résultat. Cette approche rend le code plus flexible, réutilisable et modulaire.

```ts
function functionInVariable(a: number, b: number): number {
    return a + b;
}

const ArrowFunction = (a: number, b: number): number => a + b;

console.log(functionInVariable(5,5));
console.log(ArrowFunction(5,5));
```

### 7.1. Retour implicite vs retour explicite

Une fonction fléchée peut utiliser deux formes de retour :

```ts
const ArrowFunctionImplicit = (a: number, b: number): number => a + b;

const ArrowFunctionExplicit = (a: number, b: number): number => {
    return a + b;
}

console.log(ArrowFunctionImplicit(5,5));
console.log(ArrowFunctionExplicit(5,5));
```

- Retour implicite : lorsque le corps de la fonction est écrit sans accolades `{...}`, la valeur de l’expression est automatiquement retournée.
- Retour explicite : lorsque le corps est entouré d’accolades `{...}`, l’utilisation du mot-clé `return` est nécessaire pour renvoyer une valeur.
