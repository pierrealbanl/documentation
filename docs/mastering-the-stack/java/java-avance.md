---
id: java-avance
title: 3. Java avancé
---

# Java avancé

## 3.1. Gérer les erreurs avec `try` et `catch`

Le bloc `try`-`catch` sert à gérer les erreurs qui peuvent survenir pendant l’exécution du programme. Le mot-clé `try` signifie que le programme va essayer d’exécuter le code qui se trouve à l’intérieur. Si tout se passe bien, le code dans le `try` s’exécute normalement. En revanche, si une erreur (appelée exception) se produit, le programme interrompt le `try` et exécute le bloc `catch`, qui permet de gérer cette erreur sans faire planter le programme :

```java
public class Main {
    public static void main(String[] args) {
        int i = 0;
        try {
            i = i / 0;
            System.out.println(i);
        } catch (ArithmeticException e) {
            System.out.println(e);
        }
    }
}
```

:::warning
À noter qu'il est important de définir le bon type d’exception dans le paramètre du `catch`. Si le type ne correspond pas à l’erreur réellement levée, le programme plantera.

```java
public class Main {
    public static void main(String[] args) {
        int i = 0;
        try {
            i = i / 0;
            System.out.println(i);
        } catch (NullPointerException e) { // Mauvais type d’exception
            System.out.println(e);
        }
    }
}
```
:::

Voici un tableau récapitulatif des exceptions les plus courantes en Java :

| **Exception**                     | **Description**                                                                                                     |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `IOException`                     | Se produit lors d’une **erreur d’entrée ou de sortie**, par exemple pendant la lecture ou l’écriture d’un fichier.  |
| `FileNotFoundException`           | Levée lorsqu’on tente d’**ouvrir un fichier qui n’existe pas** ou dont le chemin est invalide.                      |
| `SQLException`                    | Indique une **erreur liée à une base de données**, comme une requête incorrecte ou un problème de connexion.        |
| `ClassNotFoundException`          | Survient quand le programme **ne trouve pas une classe** demandée pendant le chargement dynamique.                  |
| `InterruptedException`            | Levée lorsqu’un **thread en cours d’exécution est interrompu** avant d’avoir terminé son travail.                   |
| `ParseException`                  | Se produit quand un **texte ne peut pas être analysé ou converti**, par exemple lors du parsing d’une date.         |
| `ArithmeticException`             | Levée lors d’une **erreur arithmétique**, comme une division par zéro.                                              |
| `NullPointerException`            | Se produit lorsqu’on **tente d’utiliser un objet qui vaut `null`** (ex. : appeler une méthode sur `null`).          |
| `ArrayIndexOutOfBoundsException`  | Levée quand on **accède à un indice inexistant** dans un tableau.                                                   |
| `StringIndexOutOfBoundsException` | Levée quand on **tente d’accéder à un caractère inexistant** dans une chaîne de caractères.                         |
| `NumberFormatException`           | Se produit lorsqu’on **essaie de convertir un texte en nombre**, mais que le texte n’est pas dans un format valide. |
| `IllegalArgumentException`        | Levée lorsqu’une **méthode reçoit un argument non valide** ou incohérent avec ce qu’elle attend.                    |
| `IllegalStateException`           | Indique qu’une méthode a été **appelée dans un état inapproprié** pour l’objet concerné.                            |


## 3.2. Les threads : utilisation et différence entre `Thread` et `Runnable`

**Un thread** est une partie d’un programme qui s’exécute en parallèle avec d’autres parties. Autrement dit, c’est un flux d’instructions qui fonctionne simultanément avec le reste du programme.

L’objectif d’utiliser un thread est d’améliorer la rapidité et la réactivité d’une application en permettant, par exemple, d’exécuter une tâche en arrière-plan sans bloquer le reste du programme. Cela rend les applications plus efficaces et plus agréables à utiliser, surtout lorsqu’elles doivent gérer plusieurs opérations en même temps.

```java
public class Vehicle extends Thread {
    private double weight;
    private double enginePower;
    private float seconds;

    public Vehicle(double weight, double enginePower, float seconds) {
        this.weight = weight;
        this.enginePower = enginePower;
        this.seconds = seconds;
    }

    public double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }

    public void run() {
        System.out.println("La " + Thread.currentThread().getName() + " après " + seconds + " secondes : " + calculateSpeed(seconds) + " km/h");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Thread ferrari  = new Thread(new Vehicle(1380, 570, 10), "Ferrari");
        Thread mercedes = new Thread(new Vehicle(11700, 625, 10), "Mercedes");

        ferrari.start();
        mercedes.start();
    }
}
```

Lorsqu’une classe hérite de `Thread`, elle devient directement un thread. Cependant, cette approche a un inconvénient : la classe ne peut pas hériter d’une autre classe, car Java n’autorise qu’un seul héritage. 

En revanche, lorsqu’une classe implémente l’interface `Runnable`, elle ne devient pas elle-même un thread, mais définit le code que le thread exécutera. Cette méthode est plus flexible, car elle permet à la classe d’hériter d’une autre classe tout en pouvant être utilisée comme thread :

```java
public class Vehicle implements Runnable {
    private double weight;
    private double enginePower;
    private float seconds;

    public Vehicle(double weight, double enginePower, float seconds) {
        this.weight = weight;
        this.enginePower = enginePower;
        this.seconds = seconds;
    }

    public double calculateSpeed(float seconds) {
        return ((enginePower / weight) * seconds) * 3.6;
    }

    public void run() {
        System.out.println("La " + Thread.currentThread().getName() + " après " + seconds + " secondes : " + calculateSpeed(seconds) + " km/h");
    }
}

class Car extends Vehicle {
    public Car(double weight, double enginePower, float seconds) {
        super(weight, enginePower, seconds);
    }
}

class Truck extends Vehicle {
    public Truck(double weight, double enginePower, float seconds) {
        super(weight, enginePower, seconds);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Thread ferrari  = new Thread(new Car(1380, 570, 10), "Ferrari");
        Thread mercedes = new Thread(new Truck(11700, 625, 10), "Mercedes");

        ferrari.start();
        mercedes.start();
    }
}
```
