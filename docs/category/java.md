---
id: java
title: Java
sidebar_position: 2
---

# Java

<span style={{color: "#0f62fe"}}>**Java**</span> est un langage de programmation orienté objet, de haut niveau, conçu pour être portable, sécurisé et robuste. Il permet de développer une grande variété d’applications réutilisables, allant des applications mobiles aux systèmes d’entreprise.

### Préambule

La portabilité en Java signifie que le code source est compilé en bytecode, un format intermédiaire indépendant de la machine. Ce bytecode est ensuite exécuté par la Java Virtual Machine (JVM), un interpréteur universel présent sur toutes les plateformes (Windows, macOS, Linux, Android, etc.) :

| **Étape**   | **Quand ?**                  | **Fait par qui ?**            | **À quoi ça sert**                                                                                                                                                                     |
|:------------|:-----------------------------|:------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Compilation | Avant de lancer le programme | Le compilateur Java (`javac`) | Vérifie que le code est correct (syntaxe, types…) et le transforme en bytecode, c’est-à-dire un fichier `.class` contenant un code intermédiaire universel, indépendant de la machine. |
| Exécution   | Quand le programme tourne    | La JVM (Java Virtual Machine) | Lit et exécute le bytecode, c’est-à-dire : créer les objets, appeler les méthodes, effectuer les instructions écrites dans le programme.                                               |

## 1. Les classes et objets

**Un objet** est une structure de données dynamique qui regroupe des **valeurs nommées appelées propriétés** et des **fonctions appelées  méthodes**, exactement comme une structure en C, mais en plus puissant, car on peut y **stocker des valeurs et des comportements**.

**Une classe** est un modèle ou un plan qui décrit **les caractéristiques et les comportements** que posséderont les objets créés à partir d’elle.

:::info
Dans l’exemple qui suit, ne pas tenir compte des mots `public` et `static` et ni des types. L’important est de se concentrer uniquement sur les explications relatives aux propriétés, aux méthodes et au constructeur.
:::

```java
class Vehicle {
    double weight;
    double enginePower;

    Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);
        System.out.println("La ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
    }
}
```

`ferrari` est une variable qui référence un objet, autrement dit une **instance** de la classe `Vehicle`. Lorsque l’on parle d’instance, on fait référence à l’objet complet en mémoire, c’est-à-dire à une structure qui regroupe des propriétés et des méthodes :

> **Une instance** désigne le fait que cet objet a été créé à partir d'un modèle (une classe).

**Les propriétés** `weight` et `enginePower`, qui **stockent des données**.

**Les méthodes** `calculateSpeed(...)`, **définit une action** que l’objet peut effectuer.

**Le constructeur** `Vehicle(double weight, double enginePower) {...}` est une méthode spéciale utilisée pour créer une nouvelle instance (ou objet) de type `Vehicle`. Il sert à initialiser les propriétés de l'objet  (`weight` et `enginePower`) avec les valeurs fournies en paramètre, comme dans l’exemple `new Vehicle(1380, 570);`. Ainsi, dès sa création, l’objet contient déjà les informations de l’utilisateur.


## 2. Le polymorphisme : héritage, liaison dynamique et overloading

```java
class Vehicle {
    double weight;
    double enginePower;

    Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }
}

class Car extends Vehicle {
    Car (double weight, double enginePower) {
        super(weight, enginePower);
    }

    double calculateSpeed(float seconds) {
        return super.calculateSpeed(seconds);
    }
}

class Truck extends Vehicle {
    Truck (double weight, double enginePower) {
        super(weight, enginePower);
    }

    double calculateSpeed(float seconds) {
        return super.calculateSpeed(seconds);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Car(1380, 570);
        Vehicle mercedes = new Truck(11700, 625);

        System.out.println("La ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
        System.out.println("La mercedes après 10 secondes : " + mercedes.calculateSpeed(10) + " km/h");
    }
}
```

**L'héritage** permet à une sous-classe de réutiliser les propriétés et méthodes d'une super-classe :

```java
class Car extends Vehicle {...}

class Truck extends Vehicle {...}
```

Le mot-clé `extends` signifie *"hérite de"*, c’est-à-dire que les classes `Car`et `Truck` héritent des propriétés et méthodes de la super-classe `Vehicle`. Autrement dit les classes `Car` et `Truck` sont des sous-classes de la super-classe `Vehicle`.

**La liaison dynamique** est un mécanisme qui détermine quelle méthode redéfinie (overriding) doit être exécutée au moment de l’exécution, selon le type réel de l’objet référencé. Elle permet d’appeler la bonne méthode même si la variable est de type parent, mais que l’objet réel appartient à une sous-classe.
**Le constructeur** `Vehicle(double weight, double enginePower) {...}` est une méthode spéciale utilisée pour créer une nouvelle instance (ou objet) de type `Vehicle`. Il sert à initialiser les propriétés de l'objet  (`weight` et `enginePower`) avec les valeurs fournies en paramètre, comme dans l’exemple `new Vehicle(1380, 570);`. Ainsi, dès sa création, l’objet contient déjà les informations de l’utilisateur.


## 2. Le polymorphisme : héritage, liaison dynamique et overloading

```
class Vehicle {
    double weight;
    double enginePower;

    Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }
}

class Car extends Vehicle {
    Car (double weight, double enginePower) {
        super(weight, enginePower);
    }

    double calculateSpeed(float seconds) {
        return super.calculateSpeed(seconds);
    }
}

class Truck extends Vehicle {
    Truck (double weight, double enginePower) {
        super(weight, enginePower);
    }

    double calculateSpeed(float seconds) {
        return super.calculateSpeed(seconds);
    }
}
```

```
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Car(1380, 570);
        Vehicle mercedes = new Truck(11700, 625);

        System.out.println("La ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
        System.out.println("La mercedes après 10 secondes : " + mercedes.calculateSpeed(10) + " km/h");
    }
}
```

**L'héritage** permet à une sous-classe de réutiliser les propriétés et méthodes d'une super-classe :

```
class Car extends Vehicle {...}

class Truck extends Vehicle {...}
```

Le mot-clé `extends` signifie *"hérite de"*, c’est-à-dire que les classes `Car`et `Truck` héritent des propriétés et méthodes de la super-classe `Vehicle`. Autrement dit les classes `Car` et `Truck` sont des sous-classes de la super-classe `Vehicle`.

**La liaison dynamique** est un mécanisme qui détermine quelle méthode redéfinie (overriding) doit être exécutée au moment de l’exécution, selon le type réel de l’objet référencé. Elle permet d’appeler la bonne méthode même si la variable est de type parent, mais que l’objet réel appartient à une sous-classe.

:::info
**L’overriding** est un mécanisme qui permet à une sous-classe de fournir sa propre implémentation d’une méthode déjà définie dans la classe parente. La méthode redéfinie doit avoir **le même nom, les mêmes paramètres et le même type de retour** que celle du parent.

La classe `Vehicle` définit :

```java
double calculateSpeed(float seconds) { ... }
```

Dans les sous-classes `Car` et `Truck`, la même méthode est redéfinie :

```java
double calculateSpeed(float seconds) {
    return super.calculateSpeed(seconds);
}
```
**L’overriding** est un mécanisme qui permet à une sous-classe de fournir sa propre implémentation d’une méthode déjà définie dans la classe parente. La méthode redéfinie doit avoir **le même nom, les mêmes paramètres et le même type de retour** que celle du parent.

La classe `Vehicle` définit :
```
double calculateSpeed(float seconds) { ... }
```

Dans les sous-classes `Car` et `Truck`, la même méthode est redéfinie :

```
double calculateSpeed(float seconds) {
    return super.calculateSpeed(seconds);
}
```
:::

**L’overloading** est un mécanisme qui détermine quelle méthode appeler en fonction des paramètres passés. Il permet de définir plusieurs méthodes avec le même nom, mais avec des paramètres différents. Ce choix est fait au moment de la compilation, ce qui permet au compilateur de savoir exactement quelle version de la méthode exécuter.

```java
class Vehicle {
    double weight;
    double enginePower;

    Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }

    double calculateSpeed(float seconds, double traction) {
        return (enginePower / weight) * seconds * traction;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);

        System.out.println("La ferrari avec adhérence après 10 secondes : " + ferrari.calculateSpeed(10, 0.9) + " km/h");
    }
}
```

**Le polymorphisme** est le concept global qui dit qu’un même objet peut avoir plusieurs comportements différents selon le contexte. Il est rendu possible grâce à la combinaison de l’overloading (polymorphisme statique) et de la liaison dynamique (polymorphisme dynamique).

## 3. Types primitifs vs classes Wrapper

En Java, un type définit la nature d’une donnée, les valeurs qu’elle peut prendre et les opérations qu’on peut lui appliquer. On distingue les **types primitifs**, qui stockent directement des valeurs en mémoire, et les **classes wrapper**, qui stockent des adresses pointant vers des objets.

**L’overloading** est un mécanisme qui détermine quelle méthode appeler en fonction des paramètres passés. Il permet de définir plusieurs méthodes avec le même nom, mais avec des paramètres différents. Ce choix est fait au moment de la compilation, ce qui permet au compilateur de savoir exactement quelle version de la méthode exécuter.

```
class Vehicle {
    double weight;
    double enginePower;

    Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }

    double calculateSpeed(float seconds, double traction) {
        return (enginePower / weight) * seconds * traction;
    }
}
```

```
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);

        System.out.println("La ferrari avec adhérence après 10 secondes : " + ferrari.calculateSpeed(10, 0.9) + " km/h");
    }
}
```

**Le polymorphisme** est le concept global qui dit qu’un même objet peut avoir plusieurs comportements différents selon le contexte. Il est rendu possible grâce à la combinaison de l’overloading (polymorphisme statique) et de la liaison dynamique (polymorphisme dynamique).

## 3. Types primitifs vs classes Wrapper

En Java, un type définit la nature d’une donnée, les valeurs qu’elle peut prendre et les opérations qu’on peut lui appliquer. On distingue les **types primitifs**, qui stockent directement des valeurs en mémoire, et les **classes wrapper**, qui stockent des adresses pointant vers des objets.

| **Type primitif** | **Taille (bits)** | **Classe wrapper** | **Description**                                            |
| :---------------- | :---------------- | :----------------- | :--------------------------------------------------------- |
| `int`             | 32                | `Integer`          | Entier relatif (de -2³¹ à 2³¹-1)                           |
| `long`            | 64                | `Long`             | Entier relatif long (de -2⁶³ à 2⁶³-1)                      |
| `float`           | 32                | `Float`            | Nombre réel en virgule flottante simple précision          |
| `double`          | 64                | `Double`           | Nombre réel en virgule flottante double précision          |
| `char`            | 16                | `Character`        | Caractère Unicode (un seul symbole, codé sur 16 bits)      |
| `boolean`         | (dépend VM)       | `Boolean`          | Valeur logique (`true` ou `false`)                         |
| `void`            | —                 | `Void`             | Absence de valeur de retour (uniquement pour les méthodes) |

Les **types primitifs** ne sont pas des objets, ce qui signifie qu’ils ne possèdent pas de méthodes. À l’inverse, les **classes wrapper** sont des classes spéciales qui encapsulent les types primitifs. Elles permettent donc de manipuler ces valeurs comme des objets et offrent, en plus, des méthodes utilitaires utiles, par exemple pour faire des comparaisons ou encore transformer une chaîne de caractères en valeur numérique.

:::warning
Petite particularité : `void` n’est pas un type de valeur utilisable pour des variables. Il s’emploie uniquement comme type de retour, signifiant *“aucune valeur”*.
:::

###  3.1. Tableau récapitulatif : des méthodes statiques dans les classes Wrapper

| **Méthode statique**                                                              | **Wrapper**                                       | **Description**                                                                           |
|:----------------------------------------------------------------------------------|:--------------------------------------------------|:------------------------------------------------------------------------------------------|
| `parseInt()`, `parseDouble()`, `parseFloat()`, `parseLong()`                      | Numériques (`Integer`, `Long`, `Float`, `Double`) | Transforment une **chaîne de caractères** en une valeur primitive.                        |
| `valueOf()`                                                                       | Tous                                              | Transforme une **chaîne de caractères** ou une **valeur primitive** en un objet wrapper.  |
| `toString(type)`                                                                  | Tous                                              | Transforme un **primitif** en une chaîne de caractères.                                   |

```java
public class Main {
    public static void main(String[] args) {
        int i = Integer.parseInt("5");
        System.out.println(i);

        Integer j = Integer.valueOf(5);
        System.out.println(j);

        String s = Integer.toString(5);
        System.out.println(s);
    }
}
```

###  3.2. Tableau récapitulatif : des méthodes d’instances dans les classes Wrapper

| **Méthode d’instance**                                       | **Wrapper**                                             | **Description**                                                                                                                   |
|:-------------------------------------------------------------|:--------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------|
| `toString()`                                                 | Tous                                                    | Transforme **l’objet wrapper** en une chaîne de caractères.                                                                       |
| `equals()`                                                   | Tous                                                    | Compare le contenu de deux **objets wrapper** et retourne un résultat booléen (`true` si les valeurs sont égales, `false` sinon). |
| `hashCode()`                                                 | Tous                                                    | Transforme **l’objet wrapper** en un code numérique (utile pour les tables de hachage).                                           |
| `intValue()`, `doubleValue()`, `floatValue()`, `longValue()` | Numériques <br/>(`Integer`, `Long`, `Float`, `Double`)  | Transforment **l’objet wrapper** en une valeur primitive.                                                                         |
| `compareTo()`                                                | Tous                                                    | Compare deux **objets wrapper** du même type (`0` si égal, `<0` si plus petit, `>0` si plus grand).                               |

```java
public class Main {
    public static void main(String[] args) {
        Integer i = 5;
        String s1 = i.toString();
        System.out.println(s1);

        Integer j = 10;
        System.out.println(j.equals(i));

        String s2 = "Hello World!";
        int hashCode = s2.hashCode();
        System.out.println(hashCode);

        long k = i.longValue();
        System.out.println(k);

        System.out.println(i.compareTo(j));
    }
}
```

## 4. Classe fondamentale de Java : `String`

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

## 5. Les tableaux

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

## 6. Différence entre une variable locale et une variable d'instance (propriété)

Une **variable locale** représente un espace mémoire nommé servant à stocker 
une valeur, tandis qu’une **variable d'instance (propriété)** correspond à une variable attachée à un objet ou à une classe. Contrairement aux variables, les propriétés doivent **obligatoirement être déclarées au sein d’une classe.**

### 6.1. Variable locale

Une **variable locale est déclarée à l’intérieur d’une méthode**, d’un constructeur ou d’un bloc (`if`, `for`, etc.).

```java
public class Main {
    public static void main(String[] args) {
        int i = 5;
        System.out.println(i);
    }
}
```

### 6.2. Variable d'instance

Une **variable d'instance est déclarée dans une classe**, en dehors de toute méthode.

```java
public class Main {
    int i;

    Main(int i) {
        this.i = i;
    }

    public static void main(String[] args) {
        Main main = new Main(5);
        System.out.println(main.i);
    }
}
```

## 7. Modificateurs d’accès

**Les modificateurs d’accès** permettent de contrôler qui peut accéder à une classe, une méthode, une propriété ou un constructeur. Ils jouent un rôle essentiel pour organiser le code, protéger les données sensibles et structurer la visibilité entre les différentes parties d’un programme. 

### 7.1. Pour les classes : `public`

| **Modificateur**  | **Description**                                                |
|:------------------|:---------------------------------------------------------------|
| `public`          | La classe est accessible depuis n’importe quelle autre classe. |

```java
public class Vehicle {}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle vehicle = new Vehicle();
    }
}
```

---

| **Modificateur**  | **Description**                                                                                   |
|:------------------|:--------------------------------------------------------------------------------------------------|
| *(aucun mot-clé)* | La classe est accessible uniquement depuis les classes du même package (modificateur par défaut). |

:::info
Un package sert à organiser le code (comme des dossiers pour les classes) et à définir des zones de visibilité.

Lorsqu’un fichier Java est placé à la racine de `src/`, il appartient au package par défaut, c’est-à-dire qu’il n’est dans aucun package nommé. Toutes les classes placées à la racine de `src/` seront donc dans ce même package par défaut et pourront s’accéder entre elles sans import particulier.

Pour créer un vrai package, on ajoute un sous-dossier dans `src/`. Donc créer un dossier `example` dans `src`, toutes les classes à l’intérieur devront commencer : `package example;`.
:::

```java
package example;

class Vehicle {}
```

```java
package example;

public class Main {
    public static void main(String[] args) {
        Vehicle vehicle = new Vehicle();
    }
}
```

### 7.2. Pour les propriétés, méthodes et constructeurs : `public`, `private` et `protected`

| **Modificateur**  | **Description**                                      |
|:------------------|:-----------------------------------------------------|
| `public`          | Le code est accessible depuis toutes les classes.    |

```java
class Vehicle {
    public double weight;
    public double enginePower;

    public Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    public double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);
        System.out.println("La ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
    }
}
```

---

| **Modificateur**  | **Description**                                                                |
|:------------------|:-------------------------------------------------------------------------------|
| `private`         | Le code est accessible uniquement à l’intérieur de la classe où il est défini. |

```java
class Vehicle {
    private double weight;
    private double enginePower;

    private Vehicle(double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    private double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);
        // Erreur de compilation

        System.out.println("La ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
        // Erreur de compilation
    }
}
```

:::danger
Ici, il est impossible d’instancier un objet lorsque le constructeur de `Vehicle` est privé, et il est également impossible d’appeler une méthode privée depuis une autre classe.
:::

:::info
Pour rendre la classe utilisable, il faut rendre le constructeur et les méthodes publiques. *Cela sera expliqué plus en détail dans la suite, notamment avec le concept de JavaBean, un modèle d’encapsulation dans la partie 6.*
:::

---

| **Modificateur**  | **Description**                                                                                                                                                         |
|:------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `protected`       | Le code est accessible à l’intérieur de la classe où il est défini, dans le même package, et dans les sous-classes, même si celles-ci appartiennent à un autre package. |

```java
package example;

class Vehicle {
    protected double weight;
    protected double enginePower;

    protected Vehicle (double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    protected double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }
}

class Car extends Vehicle {

    Car (double weight, double enginePower) {
        super(weight, enginePower);
    }

    protected double calculateSpeed(float seconds) {
        return super.calculateSpeed(seconds);
    }
}
```

```java
package example;

public class Main {
    public static void main(String[] args) {
        Car ferrari = new Car(1380, 570);
        System.out.println("La ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
    }
}
```

:::warning
Petite particularité : lorsqu’une méthode est redéfinie dans une sous-classe, on ne peut pas réduire la visibilité de la méthode héritée. C’est une règle fondamentale en Java, ce qui signifie que la méthode redéfinie doit conserver au moins le même niveau d’accès que celle de la classe parente, ou bien l’élargir (par exemple, en la déclarant `protected` ou `public`).
:::

---

| **Modificateur**  | **Description**                                                                               |
|:------------------|:----------------------------------------------------------------------------------------------|
| *(aucun mot-clé)* | Le code est accessible uniquement dans les classes du même package (modificateur par défaut). |

```java
package example;

class Vehicle {
    double weight;
    double enginePower;

    Vehicle (double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }
}
```

```java
package example;

public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle(1380, 570);
        System.out.println("La ferrari après 10 secondes : " + ferrari.calculateSpeed(10) + " km/h");
    }
}
```

## 8. Modificateurs non liés à l'accès

**Les modificateurs non liés à l’accès** permettent de préciser le comportement, l’héritage ou l’utilisation d’une classe, d’une méthode ou d’une propriété, sans pour autant influencer leur visibilité. 

### 8.1. Pour les classes : `final` et `abstract`

| **Modificateur** | **Description**                                       |
|:-----------------|:------------------------------------------------------|
| `final`          | Empêche toute autre classe d’hériter de cette classe. |

```java
final class Vehicle {}

class Car extends Vehicle {} // Erreur de compilation
```

---

| **Modificateur** | **Description**                                                 |
|:-----------------|:----------------------------------------------------------------|
| `abstract`       | Interdit la création directe d’objets à partir de cette classe. |

```java
abstract class Vehicle {}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle vehicle = new Vehicle(); // Erreur de compilation
    }
}
```

:::warning
Une classe abstraite doit être obligatoirement héritée par une autre classe pour être utilisée :

```java
abstract class Vehicle {}

class Car extends Vehicle {}
```

```java
public class Main {
    public static void main(String[] args) {
        Car car = new Car();
    }
}
```
:::

### 8.2. Pour les propriétés et méthodes : `final`, `abstract` et `static`

| **Modificateur** | **Description**                                                                                                                                                                   |
|:-----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `final`          | Empêche toute modification ou redéfinition : une propriété `final` ne peut être assigné qu’une seule fois et une méthode `final` ne peut pas être redéfinie dans une sous-classe. |

```java
class Vehicle {
    final double weight;
    final double enginePower;

    Vehicle (double weight, double enginePower) {
        this.weight = weight;
        this.enginePower = enginePower;
    }

    final double ferrariWeight() {
        return this.weight = 1380; // Erreur de compilation
    }

    final double calculateSpeed(float seconds) {
        return (enginePower / weight) * seconds;
    }
}

class Car extends Vehicle {
    Car(double weight, double enginePower) {
        super(weight, enginePower);
    }

    double ferrariWeight() { // Erreur de compilation
        return this.weight;
    }

    double calculateSpeed(float seconds) { // Erreur de compilation
        return (enginePower / weight) * seconds;
    }
}
```

---

| **Modificateur** | **Description**                                                                                                                                                                                                |
|:-----------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `abstract`       | Utilisé uniquement dans une classe abstraite, et uniquement pour des **méthodes**. Une méthode abstraite ne possède pas de corps (ex. `abstract void run();`). Elle doit être implémentée dans la sous-classe. |

```java
abstract class Vehicle {
    abstract void startEngine(); // Méthode abstraite : pas de corps
}

class Car extends Vehicle {
    void startEngine() {
        System.out.println("La voiture a démarré !");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Car ferrari = new Car();
        ferrari.startEngine();
    }
}
```

---

| **Modificateur** | **Description**                                                                  |
|:-----------------|:---------------------------------------------------------------------------------|
| `static`         | Associe la propriété ou la méthode à la classe elle-même, et non à une instance. |


```java
class Vehicle {
    static String category;

    static double releaseDate(double date) {
        return date;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle ferrari = new Vehicle();
        Vehicle lamborghini = new Vehicle();
        Vehicle.category = "A1";

        System.out.println("Date de sortie des voitures : " + Vehicle.releaseDate(2024));
        System.out.println("Catégorie de la Ferrari : " + ferrari.category);
        System.out.println("Catégorie de la Lamborghini : " + lamborghini.category);
    }
}
```

:::warning
Même si on écrit `ferrari.category = "A2";`, la valeur changera aussi pour l’objet `lamborghini`. En effet, une propriété `static` est partagée par tous les objets de la classe : elle n’appartient pas à une instance, mais à la classe elle-même.
:::

## 9. JavaBean : modèle d'encapsulation pour structurer de données

**L'encapsulation** est une règle essentielle en programmation orientée objet. Elle consiste à protéger les données internes d’un objet en les rendant inaccessibles directement depuis l’extérieur.

**Un JavaBean** est une classe Java qui respecte un ensemble de conventions spécifiques, et qui est principalement conçue pour encapsuler des données. Il s’agit d’un objet standardisé, largement utilisé pour faciliter la gestion et l’échange de données, notamment au sein de frameworks comme Spring.

Pour être considéré comme un JavaBean, une classe doit **posséder un constructeur sans argument, définir ses propriétés `private`, et fournir des méthodes `public` de type getter et setter pour accéder ou modifier ces propriétés :**

```java
public class Vehicle {
    private double weight;
    private double enginePower;

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getEnginePower() {
        return enginePower;
    }

    public void setEnginePower(double enginePower) {
        this.enginePower = enginePower;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Vehicle Ferrari = new Ferrari();

        Ferrari.setWeight(1380);
        Ferrari.setEnginePower(570);
        double weight = Ferrari.getWeight();
        double power = Ferrari.getEnginePower();
    }
}
```

## 10. Les structures de données

Les structures de données servent à stocker et organiser les informations de façon à les rendre plus faciles et rapides à exploiter. Par exemple, un tableau est une structure de données qui permet de regrouper plusieurs éléments au sein d’une même variable.

Le langage Java propose de nombreuses autres structures de données dans le package `java.util`, chacune adaptée à un type de traitement ou de manipulation spécifique des données.

| Classe       | Particularités                                                 | Doublons autorisés  | Ordre conservé | Accès rapide             |
| :----------- | :------------------------------------------------------------- |:--------------------|:---------------|:-------------------------|
| `ArrayList`  | Tableau redimensionnable, accès par index                      | Oui                 | Oui            | Oui                      |
| `HashSet`    | Éléments uniques, non ordonnés                                 | Non                 | Non            | Oui                      |
| `LinkedList` | Éléments reliés entre eux (chaque nœud pointe vers le suivant) | Oui                 | Oui            | Non (parcours séquentiel)|
| `HashMap`    | Chaque clé est unique et associée à une valeur                 | Non (pour les clés) | Non            | Oui (par clé)            |

### 10.1. Liste dynamique ordonnée : `ArrayList`

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

###  10.2. Ensemble non ordonné d’éléments uniques : `HashSet`

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

### 10.3. Liste chaînée dynamique : `LinkedList`

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

### 10.4. Table de correspondance : `HashMap`

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

## 11. Les interfaces

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

### 11.1. Les interfaces multiple

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

## 12. Inner Class : les classes imbriquées

En Java, on peut déclarer une classe à l'intérieur d'une autre classe. Cela s'appelle une **classe imbriquée**. Ce mécanisme sert à organiser le code : on regroupe des classes qui sont étroitement liées, ce qui rend le programme plus clair et plus facile à entretenir.

Pour utiliser une classe interne, on crée d’abord un objet de la classe externe. Ensuite, à partir de cet objet, on crée un objet de la classe interne :

```java
class OuterClass {
   int x = 10;

   class InnerClass {
       int y = 5;
   }
}
```

```java
public class Main {
   public static void main(String[] args) {
       OuterClass myOuter = new OuterClass();
       OuterClass.InnerClass myInner = myOuter.new InnerClass();
       System.out.println(myInner.y + myOuter.x);
   }
}
```

### 12.1. Classe interne statique

Une classe interne peut également être déclarée comme `static`, ce qui permet d'y accéder sans avoir besoin de créer une instance de la classe externe :

```java
class OuterClass {
  int x = 10;

  static class InnerClass {
    int y = 5;
  }
}
```

```java
public class Main {
  public static void main(String[] args) {
    OuterClass.InnerClass myInner = new OuterClass.InnerClass();
    System.out.println(myInner.y);
  }
}
```

### 12.2. Accéder à la classe externe depuis une classe interne

L’un des principaux avantages des classes internes est leur capacité à accéder directement aux propriétés et méthodes de leur classe externe :

```java
class OuterClass {
   int x = 10;

   class InnerClass {
       public int myInnerMethod() {
           return x;
       }
   }
}
```

```java
public class Main {
   public static void main(String[] args) {
       OuterClass myOuter = new OuterClass();
       OuterClass.InnerClass myInner = myOuter.new InnerClass();
       System.out.println(myInner.myInnerMethod());
   }
}
```
