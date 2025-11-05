---
id: typescript
title: TypeScript
---

# TypeScript

<span style={{color: "#0f62fe"}}>**TypeScript**</span> est un langage développé par Microsoft qui s’appuie sur JavaScript en l’enrichissant de nouvelles fonctionnalités. Il s’agit d’un sur-ensemble de JavaScript, ce qui signifie que tout code JavaScript valide peut être exécuté en TypeScript, mais l’inverse n’est pas vrai. 

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

## 2. Les différentes manières de déclarer une variable

En **JavaScript**, lorsqu’on déclare une variable, son type est implicite et peut changer au fil des réassignations : une variable initialisée avec une chaîne peut ensuite recevoir un nombre, sans que le langage ne s’y oppose.

En revanche, en **TypeScript**, une variable déclarée avec un type explicite ne pourra être réassignée qu’avec une valeur compatible avec ce type. Ainsi, si une variable est définie comme `string`, elle ne pourra plus contenir un `number` ou un `boolean`. Cela permet de prévenir des erreurs courantes dès la phase de compilation.

### 2.1. `const`

Déclare une **variable constante**, c’est-à-dire une variable qui **ne peut pas être réassignée une fois initialisée**.

```ts
function index(): void {
    const s: string = '';
    s = "Hello World!"; // Erreur : réaffectation interdite
    console.log(s);
}

index();
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
*Si la notion d’objet n’est pas claire, des explications sont proposées dans la section 5.*
:::

### 2.2. `let`

Déclare une **variable mutable**, c’est-à-dire une variable qui **peut être réassignée avec une nouvelle valeur**.

```ts
function index(): void {
    let s: string = '';
    s = "Hello World!";
    console.log(s);
}

index();
```

## 3. Les fonctions régulières : déclaration et expression de fonction

En TypeScript, il y a plusieurs manières d’écrire une fonction régulière :

```ts
function index(a: number, b: number): number {
    return a + b;
}

const functionInVariable = function(a: number, b: number): number {
    return a + b;
}

console.log(index(5, 5));
console.log(functionInVariable(5, 5));
```

Les deux formes réalisent exactement la même opération : elles définissent une fonction régulière qui peut être exécutée de la même manière. La distinction principale entre **une déclaration de fonction** et **une expression de fonction** réside dans le comportement de hoisting :

Le **hoisting** est un mécanisme de JavaScript dans lequel certaines déclarations sont traitées avant l’exécution du code. Concrètement, le moteur JavaScript déplace en mémoire les déclarations de fonctions au début de leur portée (scope). Cela signifie qu’une fonction déclarée avec la syntaxe `function` peut être appelée avant sa définition dans le code source, car elle a déjà été enregistrée par le moteur. Les variables déclarées avec `let` et `const` ne bénéficient pas du hoisting de la même manière : elles sont placées en mémoire mais ne sont accessibles qu’après leur ligne de déclaration (zone dite de Temporal Dead Zone).

- Déclaration de fonction : accessible dans tout le scope, y compris avant sa définition.
- Expression de fonction : accessible uniquement après son assignation à une variable.

## 4. Fonctions fléchées

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

### 4.1. Retour implicite vs retour explicite

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


## 5. Les objets

En TypeScript, **un objet** est une structure de données qui regroupe plusieurs valeurs sous forme de paires clé-valeur, chaque clé étant associée à un type précis. Il peut être créé librement sans passer par une classe, tandis qu’en Java, un objet provient toujours d’une classe définie à l’avance.

```ts
function index(): void {
    const obj: {name: string, age: number} = {
        name: "Bob",
        age: 20
    };
    console.log(obj);
}

index();
```

## 6. Les tableaux

**Les tableaux** sont plus simples à manipuler grâce aux méthodes intégrées directement dans le langage, tandis qu’en Java, leur utilisation est plus stricte et leur taille fixe dès la création.

```ts
function index(): void {
    const arrayNumbers: number[] = [5, 5];
    arrayNumbers[0] = 10;
    arrayNumbers[1] = 10;
    console.log(arrayNumbers);

    const arrayString: string[] = ["Bob", "Alice"];
    arrayString[0] = "Eve"
    arrayString[1] = "Alisson"
    console.log(arrayString);
}

index();
```

### 6.1. Transformation et filtrage des tableaux avec `.map()` et `.filter()`

La méthode `.map()` parcourt chaque élément d’un tableau, applique une fonction à chacun d’eux et renvoie un nouveau tableau contenant les valeurs transformées. Le tableau d’origine reste inchangé, car les modifications sont stockées dans une nouvelle variable :

```ts
function index(): void {
    const arrayNumbers: number[] = [5, 5];
    const doubledNumbers: number[] = arrayNumbers.map(function (n: number): number {
        return n * 2;
    });
    console.log(doubledNumbers);

    const arrayString: string[] = ["Bob", "Alice"];
    const upperCaseNames: string[] = arrayString.map(function (s: string): string {
        return s.toUpperCase();
    });
    console.log(upperCaseNames);
}

index();
```

:::info
De plus, les fonctions fléchées peuvent être utilisées :

```ts
function index(): void {
    const arrayNumbers: number[] = [5, 5];
    const doubledNumbers: number[] = arrayNumbers.map((n: number): number => n * 2);
    console.log(doubledNumbers);

    const arrayString: string[] = ["Bob", "Alice"];
    const upperCaseNames: string[] = arrayString.map((s: string): string => s.toUpperCase());
    console.log(upperCaseNames);
}

index();
```
:::

La méthode `.filter()` parcourt chaque élément d’un tableau, applique une condition à chacun d’eux et renvoie un nouveau tableau contenant uniquement les éléments qui remplissent cette condition. Le tableau d’origine reste inchangé, car le filtrage est enregistré dans une nouvelle variable.

```ts
function index(): void {
    const arrayNumbers: number[] = [5, 5];
    const doubledNumbers: number[] = arrayNumbers.filter((n: number): boolean => n < 5);
    console.log(doubledNumbers);

    const arrayString: string[] = ["Bob", "Alice"];
    const upperCaseNames: string[] = arrayString.filter((s: string): boolean => s.startsWith('A'));
    console.log(upperCaseNames);
}

index();
```

## 7. Typage réutilisable avec `type`

`type` permet de donner un alias à une forme de donnée (objet, tableau, fonction, etc...) afin de la réutiliser facilement dans le code.

```ts
function index(): void {
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

index();
```

## 8. Les classes, héritage, modificateurs et interface : différences par rapport à Java

Le fonctionnement des classes et de l’héritage en TypeScript est très proche de celui de Java : on utilise également le mot-clé `class`, ainsi que `extends` pour créer une classe dérivée. 

En revanche, le constructeur doit toujours être défini avec le mot-clé `constructor`, et la déclaration des propriétés se fait en indiquant d’abord un modificateur d’accès (par défaut `public`), suivi du nom de la propriété puis de son type, par exemple : `public weight: number;` :

```ts
class Vehicle {
    weight: number;
    enginePower: number;

    constructor(weight: number, enginePower: number) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Vehicle(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

En TypeScript, il existe une **syntaxe abrégée** permettant de déclarer les propriétés directement dans la signature du constructeur. Cette écriture remplace à la fois la déclaration des propriétés et leur affectation dans le constructeur.

Le comportement reste exactement le même, mais la syntaxe est simplement plus concise :

```ts
class Vehicle {
    constructor(public weight: number, public enginePower: number) {}

    calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Vehicle(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

### 8.1. Modificateurs d’accès

Pour les modificateurs d’accès, le fonctionnement est globalement le même qu’en Java, à une exception près : **TypeScript ne possède pas la notion de package**, et **les classes sont publiques par défaut**. Ainsi, la visibilité d’une classe ne se contrôle pas avec le mot-clé `public`, mais avec les mots-clés `export` et `import`, qui déterminent simplement si la classe peut être utilisée depuis un autre fichier :

```ts title="vehicle.ts"
export class Vehicle {
    public constructor(public weight: number, public enginePower: number) {}

    public calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}
```

```ts title="index.ts"
import {Vehicle} from "./vehicle";

function index(): void {
    const ferrari = new Vehicle(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

:::info
Si la classe n’est utilisée que dans le même fichier, il n’est pas nécessaire de l’exporter.
:::

### 8.2. Modificateurs non liés à l'accès

Pour les **modificateurs non liés à l’accès**, une différence importante est à noter : **TypeScript ne dispose pas de l’équivalent du modificateur `final` appliqué à une classe**, ce qui signifie qu’on ne peut pas empêcher l’héritage comme en Java. 

En revanche, pour les propriétés, TypeScript fournit le modificateur `readonly`, qui joue un rôle similaire à `final` :

| **Modificateur** | **Description**                                                 |
| :--------------- |:----------------------------------------------------------------|
| `readonly`       | Empêche une propriété d'être réassignée après l’initialisation. |

```ts
class Vehicle {
    public constructor(readonly weight: number, readonly enginePower: number) {}

    public ferrariWeight(): number {
        return this.weight = 1380; // Erreur de compilation
    }

    public calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Vehicle(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

### 8.3. Les interfaces

En TypeScript, **une interface** sert à décrire la structure d’un objet pour le typage, alors qu’en Java, elle sert à imposer un comportement que les classes doivent implémenter.

```ts
interface Vehicle {
    weight: number,
    enginePower: number,
}

function index(): void {
    const ferrari: Vehicle = {
        weight: 1380,
        enginePower: 570,
    };
    console.log(ferrari);
}

index();
```

Ici, l’interface permet de décrire un objet simple, tout comme le mot-clé `type` peut le faire. La différence apparaît à partir du moment où l’on manipule des **classes** : une `interface` peut en effet **définir des méthodes** qui seront ensuite **implémentées dans une classe** pour créer des **instances** (des objets) :

```ts
interface Vehicle {
    weight: number,
    enginePower: number,
    calculateSpeed(seconds: number): number,
}

class Car implements Vehicle {
    public constructor(public weight: number, public enginePower: number) {}

    public calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Car(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```
