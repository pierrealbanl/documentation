---
id: react
title: React
---

# React

<span style={{color: "#0f62fe"}}>**React**</span> est une bibliothèque JavaScript utilisée pour construire des interfaces web, souvent associée à un framework qui enrichit ses fonctionnalités. Dans cette documentation, nous allons nous concentrer sur l’un des frameworks les plus populaires avec React : <span style={{color: "#0f62fe"}}>**Remix**</span>. Conçu pour développer des applications web full-stack, Remix permet de créer les interfaces avec des composants React, tout en offrant des fonctionnalités avancées et des optimisations de performance.

### Préambule

Dans cette documentation, chaque exemple de code précise s’il s’agit de React pur ou de l’utilisation du framework Remix. Même si la différence est faible, pour les explications théoriques il est plus pertinent de se baser sur React seul, afin de mieux comprendre les concepts fondamentaux sans ajouter la complexité d’un framework.

## 1. Point d’entrée global dans une application Remix

Dans une application Remix, le fichier `root.tsx` est le point d’entrée global d'une application. Il remplace le traditionnel `index.html` des projets React classiques.

Ce fichier définis :

- La structure HTML globale : `<html>`, `<head>`, `<body>`.
- Les éléments communs à toutes les pages (métadonnées, styles, scripts).
- L’endroit où le contenu des routes va s’afficher : `<Outlet />`.

```tsx title="Remix"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./global.css";

export default function Root() {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <body>
            <Outlet />
    
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
        </body>
        </html>
    );
}
```

- `<Meta />` : injecte les balises `<meta>` (titre, description, etc.) définies dans les routes.
- `<Links />` : ajoute automatiquement les fichiers CSS (globaux ou spécifiques à une route).
- `<Outlet />` : emplacement où s’affiche le contenu de la route active.
- `<ScrollRestoration />` : enregistre et restaure la position du scroll lors de la navigation (pratique lorsqu’on utilise le bouton *Retour* du navigateur).
- `<Scripts />` : insère les fichiers JavaScript générés par Remix et gère l’hydratation de l’application. Il fait le lien entre le rendu serveur (HTML statique) et le rendu client (React interactif), rendant l’application dynamique sans configuration supplémentaire.
- `<LiveReload />` : recharge automatiquement la page en développement dès qu’une modification est détectée dans le code (hot reload).

## 2. Le Data Binding et ses différentes formes en React

  Le data binding (liaison de données) est un mécanisme qui permet de synchroniser les données du code (logique) à leur représentation visuelle dans l’interface utilisateur (UI), et inversement.

  Il assure que toute modification d’une donnée dans le code se reflète automatiquement dans l’affichage, et, dans certains cas, qu’une modification effectuée dans l’interface se répercute également sur la donnée dans le code :

- Quand les données changent dans le code → l’affichage se met automatiquement à jour.
- Dans certains cas → quand l’utilisateur agit dans l’interface (saisie, clic…), la donnée du code est aussi modifiée.

| **Type de binding** | **Syntaxe**             | **Exemple**                                                      |
| :------------------ |:------------------------|:-----------------------------------------------------------------|
| Interpolation       | `{ data }`              | `<h1>{data}</h1>`                                                |
| Property binding    | `property={expression}` | `<img src={imageUrl} />`                                         |
| Event binding       | `onEvent={openDialog}`  | `<button onClick={() => openDialog()}>Click</button>`            |

## 4. Gestion d’état

Un état en React, c’est comme une mémoire pour ton composant. C’est une petite boîte où il peut **stocker une information** (un nombre, un texte, vrai/faux, etc.).

### 4.1. `useState`

`useState` est un outil qui permet de créer une valeur que le composant peut mémoriser, ainsi qu’une fonction pour la mettre à jour.

```tsx
const [count, setCount] = useState(0);
```

On donne une valeur de départ à `count` avec `useState(...)`, et on récupère aussi une fonction `setCount(...)` qui permet de changer cette valeur.

```tsx title="React pur"
import {useState} from "react"

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click here!</button>
            <p>Count = {count}</p>
        </div>
    );
}

export default Counter;
```
À chaque fois que `setCount(...)` est appelé, React met à jour la valeur et réaffiche le composant avec la nouvelle donnée.

## 5. Rendu conditionnel

Le rendu conditionnel permet d’afficher un élément uniquement si une condition est remplie. Plusieurs techniques existent, chacune adaptée à des situations différentes.

### 5.1. Avec `&&`

```tsx title="React pur"
import { useState } from 'react';

function ToggleText() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Click Here!</button>
      {isVisible && <p>Hello World!</p>}
    </div>
  );
}

export default ToggleText;
```

Si `isVisible` vaut `true`, le paragraphe `<p>` est rendu. Si `isVisible` vaut `false`, rien n’est affiché.

Cette approche est particulièrement adaptée pour des cas simples où l’on souhaite afficher un élément uniquement dans une situation précise et rien sinon.

Elle est concise et lisible, mais limitée lorsqu’il s’agit de prévoir une alternative (par exemple afficher un autre contenu quand la condition est fausse).

### 5.2. Avec l’opérateur ternaire `?` `:`

L’opérateur ternaire permet d’exprimer une condition et de définir deux résultats possibles : l’un si la condition est vraie, l’autre si elle est fausse.

```tsx title="React pur"
import { useState } from 'react';

function ToggleText() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>Click Here!</button>
            {isVisible ? <p>Hello World!</p> : <p>Goodbye!</p>}
        </div>
    );
}

export default ToggleText;
```

Dans cet exemple, si `isVisible` vaut `true`, le texte affiché sera *"Hello World!"*. Sinon, *"Goodbye!"* apparaîtra. Cette méthode est idéale lorsqu’il existe deux cas distincts à gérer.

### 5.3. Variable préparée

Une autre technique consiste à préparer le contenu avant le return du composant. On déclare une variable, initialisée le plus souvent à null, puis un if classique est utilisé pour lui attribuer du JSX en fonction de la condition :

```ts
let content = null;
if (isOpen) {
  content = <p>Ouvert</p>;
}
return <div>{content}</div>;
```

Avec cette méthode, la logique conditionnelle est séparée du rendu. Le `return` reste clair puisqu’il ne contient que la variable. Cette approche devient particulièrement intéressante lorsque les conditions se complexifient (plusieurs `if` / `else if` / `else`) ou lorsque la lisibilité doit primer, notamment pour éviter des expressions trop lourdes dans le JSX.

## 6. Créer des animations fluides avec Motion

## 7. Mise en pratique des notions dans la conception d’un header
