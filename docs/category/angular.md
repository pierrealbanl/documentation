---
id: angular
title: Angular
sidebar_position: 5
---

# Angular

<span style={{color: "#9c96ff"}}>**Angular**</span> est un framework pour créer des applications web modernes, dynamiques et modulaires. Basé sur TypeScript, il facilite le développement d’interfaces utilisateur riches grâce à son architecture en composants, son système de liaison de données (data binding) et ses outils intégrés pour la gestion des formulaires, des services et du routage.

**Angular ou React ?**

- React est généralement privilégié pour des applications orientées client (client-facing), grâce à sa légèreté, sa rapidité de mise en place et la grande liberté qu’il offre dans l’architecture. 
- Angular, lui, est souvent retenu pour des applications de type back-office, car il propose un cadre robuste et très structuré, idéal pour les projets complexes et de grande envergure.

### Préambule

Avant d’aborder Angular, il est essentiel de bien maîtriser **TypeScript** afin de comprendre pleinement les concepts qui en découlent. Dans ce document, je m’appuie sur l’expérience acquise lors d’un stage de 6 mois au sein d’une banque au Luxembourg (BGL BNP Paribas), ainsi que sur les notions que j’y ai approfondies.

Il s’agit d’une documentation unique qui met en lumière les problématiques rencontrées dans le cadre de projets bancaires complexes.

## 1. Le Data Binding et ses différentes formes en Angular

Pour comprendre la notion de data binding (liaison de données), une définition claire est disponible dans la documentation de React.

| **Type de binding** | **Syntaxe**               | **Exemple**                                     |
|:--------------------|:--------------------------|:------------------------------------------------|
| Interpolation       | `{{ data }}`              | `<h1>{{ data }}</h1>`                           |
| Property binding    | `[property]="expression"` | `<img [src]="imageUrl">`                        |
| Event binding       | `(event)="function()"`    | `<button (click)="openDialog()">Click</button>` |
| Two-way binding     | `[(ngModel)]="variable"`  | `<input [(ngModel)]="data">`                    |

## 2. Utilisation de RxJS pour la gestion des flux de données

### 2.1. Service de communication entre composants

J’ai rencontré un cas où je devais faire transiter une donnée d’un composant vers un autre. On m’a alors conseillé de mettre en place un service de communication entre composants à l’aide de `BehaviorSubject` pour partager des données réactives.

Angular repose sur la bibliothèque **RxJS (Reactive Extensions for JavaScript)** pour gérer les sujets (`Subject`, `BehaviorSubject`). Avant d’aller plus loin, il est important de comprendre quelques notions clés.

| **Terme**       | **Description**                                                                                               |
|:----------------|:--------------------------------------------------------------------------------------------------------------|
| `Observable`    | Source de données asynchrones (HTTP, événements utilisateur, flux en temps réel…).                            |
| `.subscribe()`  | Permet de s'abonner à l'Observable quand ce dernier émet une valeur, une erreur ou signale qu'il est terminé. |

Qu’est-ce qu’un `BehaviorSubject` ?

Un `BehaviorSubject` est un type **d’Observable** spécial qui permet d'émettre manuellement des valeurs avec `.next(...)`  et de permettre à plusieurs abonnés d’écouter ces valeurs (multicast). Un `BehaviorSubject` requiert une valeur initiale et il mémorise la dernière valeur émise. Tout nouvel abonné reçoit immédiatement cette dernière valeur (même s’il s’abonne après l’émission) :

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
    private dataSubject = new BehaviorSubject<string>('');
    public data$ = this.dataSubject.asObservable();

    setData(data: string): void {
        this.dataSubject.next(data);
    }
}
```

Ici on déclare un `BehaviorSubject`, qui contient initialement `''`.

- `BehaviorSubject` stocke et émet la dernière valeur connue à chaque nouvel abonné. 
- `data$` est un observable accessible publiquement (lecture seule). Le nommage des observables avec un dollar `$` est une convention qui les distingue des autres variables et aide ainsi à prévenir les erreurs
- `setData(...)` permet de mettre à jour la valeur du `BehaviorSubject`, donc de notifier tous les abonnés.

Contrairement à un `Subject` classique, un `BehaviorSubject` renvoie immédiatement la dernière valeur connue à chaque nouvel abonné.

```ts
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-emitter',
    templateUrl: './emitter.component.html'
})
export class EmitterComponent {
    data: string = 'Hello World!';

    constructor(private dataService: DataService) {}

    updateData(): void {
        this.dataService.setData(this.data);
    }
}
```

`constructor(private dataService: DataService) {}` permet d'injecter le service `DataService` dans le composant. Grâce à cela, on pourra appeler `setData()` pour récupérer les données.

Ici la méthode `updateData(...)` envoie `data` au `DataService` via `setData(...)`. Donc, c’est ce composant émetteur qui déclenche un changement de donnée.

```ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-subscriber',
    templateUrl: './subscriber.component.html'
})
export class SubscriberComponent implements OnInit {
    data: string = '';

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.dataService.data$.subscribe(value => {
            this.data = value;
        });
    }
}
```

Lors de l’initialisation `ngOnInit`, on s’abonne à l’Observable `data$` grâce à `data$.subscribe(value => {...})`. Cela permet de récupérer la valeur émise et de la stocker dans une propriété locale du composant. Ainsi, chaque fois qu’une nouvelle string est envoyée par l’`EmitterComponent`, la propriété `data` du composant est automatiquement mise à jour. Donc, c’est un composant récepteur des données partagées.

Ce pattern est typique en Angular pour **partager des données entre composants qui ne sont pas liés directement (parent-enfant).** Il permet **d'éviter des dépendances complexes** entre composants et d’utiliser RxJS et **programmation réactive** pour une meilleure gestion des flux de données.

### 2.2. Service de récupération de données depuis une base de données

On m’a demandé de récupérer des données depuis une base de données pour les afficher côté front-end. Pour cela, une API côté serveur a été mise en place afin d’exposer les données. Ma tâche consistait à créer un service Angular utilisant HttpClient pour consommer cette API.

La première étape consiste à créer une classe de service qui sera chargée de gérer la communication avec l'API pour récupérer les données des environments :
    
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Data {
    id: string;
    name: string;
    age: number;
}

@Injectable({ providedIn: 'root' })
export class DataService {
    private url = 'http://localhost:3000/datafetch';

    constructor(private http: HttpClient) {}

    fetchData(): Observable<Data[]> {
        return this.http.get<Data[]>(this.url);
    }
}
```

- `private url = 'http://localhost:3000/api/environments';` permet de stocker l’URL de l’API.
- `fetchData(): Observable<Data> {...}` permet d'effectuer une requête GET vers l’API. Elle retourne un Observable de `Data`.

Ensuite on crée une classe qui est responsable de récupérer des données en s'abonnant à  l’Observable au moment de l'initialisation, de les stocker dans une propriété, puis de les afficher dans la vue HTML :

```ts
import { Component, OnInit } from '@angular/core';
import { DataFetchService, Data } from '../services/data-fetch.service';

@Component({
    selector: 'app-data-fetch',
    templateUrl: './data-fetch.component.html'
})
export class DataFetchComponent implements OnInit {
    dataItem: Data[] = [];

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.dataService.fetchData().subscribe(response => {
            this.dataItem = response;
        });
    }
}
```

### 2.3. Partager des données entre un composant et un `Dialog`

Un `dialog` est une fenêtre (composant non routable) qui peut être ouverte depuis un autre composant. Il permet d’afficher différents types de contenus selon les besoins : un formulaire, un tableau, une interface CRUD ou encore des données à analyser.

Contrairement à l’échange de données classique entre composants, les dialogs offrent une méthode plus directe. En effet, lors de leur création, il est possible de transmettre des données directement via l’objet de configuration du `MatDialog` :

```ts
data: { dataItem: this.dataItem }
```

```ts
import { Component, inject, OnInit } from '@angular/core';
import { DataService, Data } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog.component';

@Component({
    selector: 'app-data-fetch',
    templateUrl: './data-fetch.component.html'
})
export class DataFetchComponent implements OnInit {
    dataItem: Data[] = [];
    readonly dialog = inject(MatDialog);

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.dataService.fetchData().subscribe(response => {
            this.dataItem = response;
        });
    }

    openDialog(): void {
        this.dialog.open(DialogOverviewExampleDialog, {
            width: '600px',
            data: { dataItem: this.dataItem }
        });
    }
}
```

Cette approche permet de partager des données entre le composant qui ouvre le `dialog` et le composant du `dialog` lui-même, sans avoir besoin de se réabonner à un observable.

Dans le composant du dialog, les données transmises peuvent être récupérées facilement grâce à l’injection du jeton `MAT_DIALOG_DATA` :

```ts
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '../services/data.service';

@Component({
    selector: 'app-dialog-overview-example-dialog',
    templateUrl: './dialog-overview-example-dialog.component.html'
})
export class DialogOverviewExampleDialog {
    readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);

    constructor(@Inject(MAT_DIALOG_DATA) public data: { dataItem: Data[] }) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
```

Ainsi, les données deviennent accessibles dans tout le composant via `this.data`, ce qui simplifie la manipulation et l’affichage de ces informations.

## 3. Affichage d’un composant enfant dans un composant parent

En Angular, un composant enfant peut être intégré dans un composant parent à l’aide de son sélecteur `selector`. Le sélecteur est une balise personnalisée (similaire à une balise HTML) définie dans le décorateur `@Component` :

```ts
@Component({
    selector: 'app-example',
    templateUrl: './example.component.html'
})
```

Il suffit d’intégrer le composant enfant dans le composant HTML parent :

```html
<app-example></app-example>
```

Le composant enfant doit être déclaré dans le fichier `.module.ts` (dans la section `declarations`) afin d’être reconnu et utilisé dans l’application :

```ts
@NgModule({
    declarations: [
        RegistryComponent,
        EnvironmentComponent
    ],
    imports: []
})

export class PagesModule {}
```

À noter que certains objets, tels que dialogRef, ne peuvent pas être rendus dans un template de composant et provoquent une erreur s’ils le sont.
