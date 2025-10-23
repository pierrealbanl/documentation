---
id: types
title: 2. Les types en Java
---

# Les types en Java

## 2.1 Types primitifs vs classes Wrapper

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

###  2.1.1. Tableau récapitulatif : des méthodes statiques dans les classes Wrapper

| **Méthode statique**                                                              | **Wrapper**                                       | **Description**                                                                           |
|:----------------------------------------------------------------------------------|:--------------------------------------------------|:------------------------------------------------------------------------------------------|
| `parseInt()`, `parseDouble()`, `parseFloat()`, `parseLong()`                      | Numériques (`Integer`, `Long`, `Float`, `Double`) | Transforment une **chaîne de caractères** en une valeur primitive.                        |
| `valueOf()`                                                                       | Tous                                              | Transforme une **chaîne de caractères** ou une **valeur primitive** en un objet wrapper.  |
| `toString(type)`                                                                  | Tous                                              | Transforme un **primitif** en une chaîne de caractères.                                   |

:::info
*En Java, String fait partie des types de référence. Pour une explication détaillée, consulte la section 3.1.*
:::

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

###  2.1.2. Tableau récapitulatif : des méthodes d’instances dans les classes Wrapper

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

## 2.2. Différence entre une variable locale et une variable d'instance (propriété)

Une **variable locale** représente un espace mémoire nommé servant à stocker
une valeur, tandis qu’une **variable d'instance (propriété)** correspond à une variable attachée à un objet ou à une classe. Contrairement aux variables, les propriétés doivent **obligatoirement être déclarées au sein d’une classe.**

Une **variable locale est déclarée à l’intérieur d’une méthode**, d’un constructeur ou d’un bloc (`if`, `for`, etc.).

```java
public class Main {
    public static void main(String[] args) {
        int i = 5;
        System.out.println(i);
    }
}
```

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
