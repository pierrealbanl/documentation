---
id: types-generiques
title: 5. Types génériques
---

# Types génériques

**Les types génériques** en TypeScript fonctionnent de manière similaire à ceux de Java. La principale différence est que TypeScript n’exécute pas les types à l’exécution (tout disparaît une fois le code compilé en JavaScript). Ils sont donc uniquement utilisés pour la vérification et la sécurité de type pendant la compilation.

## 5.1. Fonction générique simple

Pour une fonction, il suffit de déclarer un type générique entre chevrons `<T>` après le nom de la fonction. On peut ensuite réutiliser ce type dans les paramètres, dans le type de retour, ou même dans le corps de la fonction.

```ts
function index<T>(arg: T): T {
    return arg;
}

console.log(index("Bob"));
console.log(index(5));
```

Lors de l’appel de la fonction, TypeScript détermine automatiquement si `T` est un `string`, un `number`, etc.

## 5.2. Classe générique

Pour les classes, le fonctionnement est le même qu’en Java : on déclare un paramètre de type générique après le nom de la classe, puis on peut l’utiliser pour typer les propriétés et les méthodes de la classe.

```ts
class Vehicle<T> {
    constructor(private weight: T, private enginePower: T) {}

    public getWeight(): T {
        return this.weight;
    }

    public getEnginePower(): T {
        return this.enginePower;
    }
}

function index(): void {
    const ferrari = new Vehicle(1380, 570);

    console.log("La Ferrari après 10 secondes :", (((ferrari.getEnginePower() / ferrari.getWeight()) * 10) * 3.6), "km/h");
}

index();
```

:::warning
Comme en Java, il n’est pas possible d’effectuer des opérations arithmétiques directement sur un type générique, car le compilateur ne peut pas savoir s’il s’agit réellement d’un nombre.
:::

## 5.3. Typage réutilisable générique

Avec le mot-clé `type`, on peut créer des alias de types génériques. Cela permet de définir des structures réutilisables avec plusieurs paramètres de type (par exemple, un pour les chaînes de caractères, un autre pour les nombres, etc...). Lors de l’utilisation, il faut ensuite spécifier les types concrets.

```ts
type Vehicle<T, U> = {
    manufacturer: T;
    weight: U;
    enginePower: U;
}

function index(): void {
    const vehicleList: Vehicle<string, number>[] = [
        {manufacturer: "Ferrari", weight: 1380, enginePower: 570},
        {manufacturer: "Mercedes", weight: 11700, enginePower: 625}
    ];

    console.log(vehicleList);
}

index();
```

Ici, `T` représente le type du nom du constructeur `string`, et `U` celui des valeurs numériques `number`.

## 5.4. Interface générique

Pour les interfaces, le principe est identique : on déclare le type générique dans l’interface, puis on peut l’utiliser pour typer les propriétés ou les méthodes. Ensuite, une classe peut implémenter cette interface en précisant le type concret à utiliser.

```ts
interface Vehicle<T> {
    calculateSpeed(seconds: T): T;
}

class Car implements Vehicle<number> {
    constructor(private weight: number, private enginePower: number) {}

    calculateSpeed(seconds: number): number {
        return ((this.enginePower / this.weight) * seconds) * 3.6;
    }
}

function index(): void {
    const ferrari = new Car(1380, 570);
    console.log("La Ferrari après 10 secondes :", ferrari.calculateSpeed(10), "km/h");
}

index();
```

## 5.5. Contraintes sur les types génériques : `extends`

En TypeScript, on peut **imposer des restrictions** sur un type générique pour limiter ce qu’il peut représenter. On utilise pour cela le mot-clé `extends`.

C’est utile lorsque la fonction ou la classe générique **a besoin de certaines propriétés**, ou doit fonctionner **uniquement sur certains types.**

```ts
type Vehicle<T, U> = {
    manufacturer: T;
    weight: U;
    enginePower: U;
}

function index<T extends Vehicle<string, number>>(arg: T): void {
    console.log(arg.manufacturer, arg.weight, arg.enginePower);
}

index({manufacturer: "Ferrari", weight: 1380, enginePower: 570});
```

:::warning
L’exemple ci-dessus illustre simplement le fonctionnement des contraintes génériques. Avec `T extends Vehicle<string, number>`, on indique uniquement que `T` doit être un objet possédant au minimum ces trois propriétés.

Cependant, si l’on souhaitait obliger l’objet à correspondre exactement à la structure `Vehicle<T, U>` (et non un objet pouvant contenir d’autres propriétés supplémentaires), on pourrait tout à fait se passer du générique dans la fonction et typer directement le paramètre :

```ts
type Vehicle<T, U> = {
    manufacturer: T;
    weight: U;
    enginePower: U;
}

function index(arg: Vehicle<string, number>): void {
    console.log(arg.manufacturer, arg.weight, arg.enginePower);
}

index({manufacturer: "Ferrari", weight: 1380, enginePower: 570});
```
:::

### 5.5.1. Contraindre un générique à une famille de types

Il est possible de limiter un type générique à un ensemble précis de valeurs. Cette technique est utile lorsque l’on veut restreindre les valeurs autorisées, par exemple pour éviter les fautes de frappe ou imposer des valeurs métier spécifiques.

```ts
function index<T extends "Ferrari" | "Mercedes">(arg: T): T {
    return arg;
}

console.log(index("Ferrari"));
console.log(index("Mercedes"));
console.log(index("Lamborghini")); // Erreur : "Lamborghini" n’est pas assignable à "Ferrari" | "Mercedes"
```

:::info
Si l’on souhaite imposer à un type générique à la fois une structure (définie par `Vehicle<T>`) et une famille de valeurs possibles (pour la propriété `manufacturer`), on peut procéder ainsi :

```ts
type Vehicle<T> = {
    manufacturer: "Ferrari" | "Mercedes";
    weight: T;
    enginePower: T;
}

function index(arg: Vehicle<number>): Vehicle<number> {
    return arg;
}

console.log(index({manufacturer: "Ferrari", weight: 1380, enginePower: 570}));
console.log(index({manufacturer: "Mercedes", weight: 1380, enginePower: 570}));
console.log(index({manufacturer: "Lamborghini", weight: 1380, enginePower: 570})); // Erreur : "Lamborghini" n’est pas assignable à "Ferrari" | "Mercedes"
```
:::

### 5.5.2. Contraindre un générique à un autre type générique

Il est également possible de contraindre un type générique en fonction d’un autre type générique. C’est particulièrement utile lorsque l’on veut garantir qu’un type hérite ou respecte la structure d’un autre type.

```ts
function index<T, U extends T>(first: T, second: U): [T, U] {
    return [first, second];
}

console.log(index("Bob", "Alice"));
console.log(index(20, 25));
console.log(index("Bob", 20)); // Erreur : le second argument n’est pas du même type que le premier
```

`T` peut être n’importe quel type, et `U` doit être un type assignable à `T`, c’est-à-dire du même type.

## 5.6. Génériques avec `keyof` et `typeof`
