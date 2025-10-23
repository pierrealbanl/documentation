---
id: reference-types
title: 3. Les types de référence
---

# Les types de référence

## 3.1. Classe fondamentale de Java : `String`

`String` est une classe du package `java.lang` utilisée pour représenter des chaînes de caractères. En Java, une chaîne de caractères est un objet de type String, et non un simple tableau de caractères.

```java
String s = "Hello World!";
```

| **Méthode d’instance**            | **Description**                                                                                              |
|:----------------------------------|:-------------------------------------------------------------------------------------------------------------|
| `length()`                        | Renvoie la **longueur** d’une chaîne de caractères (nombre total de caractères).                             |
| `charAt(int i)`                   | Retourne le **caractère** situé à la position indiquée dans une chaîne de caractères (l’index commence à 0). |
| `substring(int i, int j)`         | Extrait une **sous-chaîne de caractères** comprise entre les indices `start` (inclus) et `end` (exclu).      |
| `equals(Object obj)`              | Compare **le contenu** de deux chaînes de caractères et retourne `true` si elles sont identiques.            |
| `toUpperCase()` / `toLowerCase()` | Convertit une chaîne de caractères en **majuscules** ou en **minuscules**.                                   |
| `compareTo(String s)`             | Compare deux chaînes de caractères selon l’**ordre alphabétique** (résultat négatif, nul ou positif).        |
| `concat(String s)`                | Concatène une chaîne de caractères avec une autre et renvoie le **résultat combiné**.                        |

```java
public class Main {
    public static void main(String[] args) {
        String s = "Hello World";

        System.out.println(s.length());
        System.out.println(s.charAt(3));
        System.out.println(s.substring(0, 5));
        System.out.println(s.equals("hello world"));
        System.out.println(s.toUpperCase());
        System.out.println(s.compareTo("Hello Bob!"));
        System.out.println(s.concat("!"));
    }
}
```

## 3.2. Les interfaces

**Une interface** est un contrat qui définit un ensemble de méthodes que les classes qui l’implémentent doivent fournir.

```java
interface VehicleBehavior {
    void start();
    void stop();
}

public class Vehicle implements VehicleBehavior {
    public void start() {
        System.out.println("La voiture démarre !");
    }

    public void stop() {
        System.out.println("La voiture s'arrête.");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle();

        ferrari.start();
        ferrari.stop();
    }
}
```

:::warning
En Java, il est recommandé de placer chaque interface dans son propre fichier. Mettre une interface et une classe dans le même fichier est considéré comme une mauvaise pratique.

```java title="VehicleBehavior.java"
public interface VehicleBehavior {
    void start();
    void stop();
}
```
:::

### 3.2.1. Les interfaces multiple

Java permet à une classe d’implémenter plusieurs interfaces, contrairement à l’héritage simple entre classes.

```java title="VehicleBehavior.java"
public interface VehicleBehavior {
    void start();
    void stop();
}
```

```java title="ElectricBehavior.java"
public interface ElectricBehavior {
    void chargeBattery();
}
```

Il suffit de séparer les interfaces par une virgule lors de leur déclaration :

```java
public class Vehicle implements VehicleBehavior, ElectricBehavior {
    public void start() {
        System.out.println("Le véhicule démarre !");
    }

    public void stop() {
        System.out.println("Le véhicule s'arrête.");
    }

    public void chargeBattery() {
        System.out.println("La batterie est en charge...");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle tesla = new Vehicle();

        tesla.start();
        tesla.stop();
        tesla.chargeBattery();
    }
}
```

## 3.3. Les tableaux

**Un tableau** est une structure de données permettant de stocker plusieurs valeurs du même type dans une seule variable. Chaque valeur est accessible grâce à un indice numérique, qui commence toujours à 0.

Il existe deux manières principales de créer un tableau :

```java
public class Main {
    public static void main(String[] args) {
        int[] n = new int[3];
        n[0] = 10;
        n[1] = 15;
        n[2] = 20;

        for (int i = 0; i < n.length; i++) {
            System.out.println(n[i]);
        }
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        int[] n = {10, 15, 20};

        for (int i = 0; i < n.length; i++) {
            System.out.println(n[i]);
        }
    }
}
```

## 3.4. Les structures de données

Les structures de données servent à stocker et organiser les informations de façon à les rendre plus faciles et rapides à exploiter. Par exemple, un tableau est une structure de données qui permet de regrouper plusieurs éléments au sein d’une même variable.

Le langage Java propose de nombreuses autres structures de données dans le package `java.util`, chacune adaptée à un type de traitement ou de manipulation spécifique des données.

| Classe       | Particularités                                                 | Doublons autorisés  | Ordre conservé | Accès rapide             |
| :----------- | :------------------------------------------------------------- |:--------------------|:---------------|:-------------------------|
| `ArrayList`  | Tableau redimensionnable, accès par index                      | Oui                 | Oui            | Oui                      |
| `HashSet`    | Éléments uniques, non ordonnés                                 | Non                 | Non            | Oui                      |
| `LinkedList` | Éléments reliés entre eux (chaque nœud pointe vers le suivant) | Oui                 | Oui            | Non (parcours séquentiel)|
| `HashMap`    | Chaque clé est unique et associée à une valeur                 | Non (pour les clés) | Non            | Oui (par clé)            |

### 3.4.1. Liste dynamique ordonnée : `ArrayList`

`ArrayList` est une classe qui représente une liste dynamique d’éléments (comme un tableau, mais qui peut changer de taille). Les principales méthodes disponibles pour manipuler une `ArrayList` sont : `add`, `get`, `set`, `size`, `remove` et `clear` :

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> Vehicle = new ArrayList<String>();

        Vehicle.add("Ferrari");
        Vehicle.add("Lamborghini");
        Vehicle.add("Mercedes");
        System.out.println("Les véhicules disponibles dans la liste : " + Vehicle);

        System.out.println(Vehicle.get(0));

        Vehicle.set(2, "Audi");
        System.out.println("Les véhicules disponibles dans la liste : " + Vehicle);

        System.out.println("La taille de la liste est " + Vehicle.size());

        Vehicle.remove(1);
        Vehicle.remove(1);
        System.out.println("Les véhicules disponibles dans la liste : " + Vehicle);

        Vehicle.clear();
        System.out.println("Les véhicules disponibles dans la liste : " + Vehicle);
    }
}
```

Par ailleurs, la classe `Collections` propose la méthode `sort()` qui permet de trier une `ArrayList` en ordre alphabétique ou numérique.


```java
import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> vehicle = new ArrayList<String>();

        vehicle.add("Ferrari");
        vehicle.add("Lamborghini");
        vehicle.add("Mercedes");

        Collections.sort(vehicle);
        System.out.println("Les véhicules disponibles dans la liste après le tri : " + vehicle);
    }
}
```

###  3.4.2. Ensemble non ordonné d’éléments uniques : `HashSet`

La classe `HashSet` est une structure de données qui permet de stocker une collection d’éléments uniques, sans ordre particulier. Contrairement à une `ArrayList`, un `HashSet` ne conserve pas l’ordre d’insertion et n’autorise pas les doublons.

Les principales méthodes disponibles pour manipuler un `HashSet` sont : `add`, `contains`, `size`, `remove` et `clear` :

```java
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> vehicle = new HashSet<String>();

        vehicle.add("Ferrari");
        vehicle.add("Ferrari"); // Impossible d’ajouter un doublon
        vehicle.add("Lamborghini");
        vehicle.add("Mercedes");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        System.out.println(vehicle.contains("Mercedes"));

        System.out.println("La taille de la liste est " + vehicle.size());

        vehicle.remove("Mercedes");
        vehicle.remove("Lamborghini");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        vehicle.clear();
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);
    }
}
```

### 3.4.3. Liste chaînée dynamique : `LinkedList`

La classe `LinkedList` est une structure de données qui représente une liste chaînée. Une liste chaînée est une façon différente de stocker plusieurs éléments les uns à la suite des autres : elle est constituée d’une succession de nœuds reliés entre eux, où chaque élément pointe vers le suivant et le précédent.

Contrairement à une `ArrayList`, qui repose sur un tableau dynamique, une `LinkedList` facilite les insertions et suppressions fréquentes d’éléments, notamment au début ou au milieu de la liste. En revanche, l’accès direct à un élément par son index est plus lent, car il faut parcourir la chaîne maillon par maillon.

Les principales méthodes disponibles pour manipuler une `LinkedList` sont : `add`, `get`, `set`, `contains`, `size`, `sort`, `remove` et `clear` :

```java
import java.util.Collections;
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        LinkedList<String> vehicle = new LinkedList<String>();

        vehicle.add("Ferrari");
        vehicle.add("Lamborghini");
        vehicle.add("Mercedes");

        System.out.println(vehicle.get(0));

        vehicle.set(2, "Audi");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        System.out.println(vehicle.contains("Mercedes"));

        System.out.println("La taille de la liste est " + vehicle.size());

        Collections.sort(vehicle);
        System.out.println("Les véhicules disponibles dans la liste après le tri : " + vehicle);

        vehicle.remove("Audi");
        vehicle.remove("Lamborghini");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        vehicle.clear();
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);
    }
}
```

### 3.4.4. Table de correspondance : `HashMap`

La classe `HashMap` est une structure de données qui permet de stocker des paires clé/valeur. Chaque clé est unique et associée à une valeur correspondante. Cette structure fonctionne comme un dictionnaire : elle permet de retrouver rapidement une valeur à partir de sa clé, sans avoir à parcourir toute la collection. En revanche, l’ordre d’insertion des éléments n’est pas conservé.

Les principales méthodes disponibles pour manipuler un `HashMap` sont : `put`, `get`, `containsKey`, `containsValue`, `remove`, `size` et `clear` :

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> vehicle = new HashMap<String, Integer>();

        vehicle.put("Ferrari", 570);
        vehicle.put("Lamborghini", 740);
        vehicle.put("Mercedes", 625);
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        System.out.println(vehicle.get("Ferrari"));

        System.out.println(vehicle.containsKey("Ferrari"));
        System.out.println(vehicle.containsValue(570));

        System.out.println("La taille de la liste est " + vehicle.size());

        vehicle.remove("Mercedes");
        vehicle.remove("Lamborghini");
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);

        vehicle.clear();
        System.out.println("Les véhicules disponibles dans la liste : " + vehicle);
    }
}
```
