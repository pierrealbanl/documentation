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

### 5.5.1. Génériques avec plusieurs contraintes

## 5.6. Génériques avec `keyof` et `typeof`
