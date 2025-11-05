---
id: structures-donnees-et-poo
title: 2. Structures de données et programmation orientée objet
---

# Structures de données et programmation orientée objet

## 2.1. Les objets

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

## 2.2. Les tableaux

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

### 2.2.1. Transformation et filtrage des tableaux avec `.map()` et `.filter()`

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

## 2.3. Typage réutilisable avec `type`

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

## 2.4. Les classes, héritage, modificateurs et interface : différences par rapport à Java

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

### 2.4.1. Modificateurs d’accès

Pour les modificateurs d’accès, le fonctionnement est globalement le même qu’en Java, à une exception près : **TypeScript ne possède pas la notion de package**, et **les classes sont publiques par défaut**. Ainsi, la visibilité d’une classe ne se contrôle pas avec le mot-clé `public`, mais avec les mots-clés `export` et `import`, qui déterminent simplement si la classe peut être utilisée depuis un autre fichier :

```ts title="vehicle.ts"
export class Vehicle {
    public constructor(private weight: number, private enginePower: number) {}

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

### 2.4.2. Modificateurs non liés à l'accès

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

### 2.4.3. Les interfaces

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
