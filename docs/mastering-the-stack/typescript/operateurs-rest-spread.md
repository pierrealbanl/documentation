---
id: operateurs-rest-spread
title: 4. Les opérateurs Rest et Spread
---

# Les opérateurs Rest et Spread

L’opérateur `...` a deux rôles différents selon le contexte dans lequel il est utilisé. Il peut servir à rassembler des valeurs (Rest operator) ou au contraire à les étaler (Spread operator).

## 4.1. Le Rest Operator

**Le Rest Operator** permet de rassembler plusieurs valeurs dans une seule variable. On l’utilise principalement dans les paramètres de fonction pour **regrouper un nombre variable d’arguments, automatiquement stockés dans un tableau, ou dans la déstructuration d’un tableau ou d’un objet.**

### 4.1.1. Regrouper un nombre variable d’arguments

```ts
function index(...n: number[]): number[] {
    return n;
}

const array: number[] = index(5, 5);
console.log(array);
```

Grâce à l’opérateur `...`, les valeurs `5` et `5` passées en argument sont automatiquement regroupées dans un tableau appelé `n`. 

:::info
Cela permet de créer un tableau sans avoir à le déclarer manuellement avec des crochets `[...]`. Sans l’opérateur Rest, il faut créer le tableau soi-même avant de l’envoyer à la fonction, comme dans l’exemple suivant :

```ts
function index(n: number[]): number[] {
    return n;
}

const array: number[] = index([5, 5]);
console.log(array);
```
:::

### 4.1.2. Déstructuration d’un tableau

### 4.1.3. Déstructuration d’un objet

## 4.2. Le Spread Operator

**Le Spread Operator** permet d'étaler le contenu d’un tableau ou d’un objet dans une nouvelle structure. On l’utilise pour copier ou fusionner des tableaux ; fusionner ou cloner des objets ; ou encore pour étaler les valeurs d’un tableau lors d’un appel de fonction.

### 4.2.1. Fusionner des tableaux

### 4.2.2. Fusionner des objets

### 4.2.3. Appel de fonction
