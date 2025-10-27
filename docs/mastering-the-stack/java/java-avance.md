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
