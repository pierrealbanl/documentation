---
id: css
title: CSS
sidebar_position: 6
---

# CSS

<span style={{color: "#0f62fe"}}>**Le CSS (Cascading Style Sheets)**</span> est un langage qui permet de définir l’apparence et la mise en page d’un document HTML. Alors que le HTML s’occupe de la structure et du contenu, le CSS vient préciser comment ces éléments doivent s’afficher : couleurs, tailles, marges, polices, alignements, positions, animations, etc. Grâce au CSS, on peut séparer le fond (le contenu) de la forme (la présentation), ce qui facilite la maintenance d’un site et permet d’obtenir des interfaces modernes, élégantes et adaptées à différents écrans (ordinateurs, tablettes, smartphones).

Voici quelques tableaux illustrant les principales possibilités offertes par le CSS :

## 1. Position

### 1.1. `static`

| **Valeur**  | **Description**                                                                                                                                                                                                                                                                                        | 
|:------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `static`    | Appliquée par défaut à tous les éléments. L’élément **s’insère de façon naturelle** dans le flux de la page, **sans appliquer de positionnement spécifique.** Dans ce mode, les propriétés de décalage comme top, left, right ou bottom sont inactives et n’ont aucun effet sur sa position à l’écran. |

```css
.static {
   position: static;
}
```

### 1.2. `relative`

| **Valeur**    | **Description**                                                                                                                                                                                                                                                                  | 
|:--------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `relative`    | L’élément **conserve son emplacement** dans le flux normal de la page. Autrement dit, même s’il est déplacé visuellement grâce aux propriétés `top`, `left`, `right` ou `bottom`, les autres éléments continuent de se comporter comme s’il occupait toujours sa place initiale. |

```css
.relative {
   position: relative;
   left: 10px
}
```

### 1.3. `absolute`
| **Valeur** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                               | 
|:-----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `absolute` | L’élément **ne conserve pas son emplacement** dans le flux normal de la page : il est retiré de la mise en page et les autres éléments se comportent comme s’il n’existait plus. **Son positionnement dépend alors du premier ancêtre qui possède une position définie** (`relative`, `absolute`, `fixed` ou `sticky`). S’il n’existe aucun ancêtre positionné, il se place par rapport à la page entière, c’est-à-dire à la balise `<html>`. |

```css
.parent {
   display: flex;
   position: relative;
   left: 10px;
}

.relative {
   position: relative;
}

.absolute {
   position: absolute;
   left: 10px
}
```

### 1.3. `fixed`
| **Valeur** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                     | 
|:-----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fixed`    | L’élément **reste figé dans la fenêtre d’affichage** et conserve sa position, même lorsque l’on fait défiler la page. Comme pour `absolute`, il est retiré du flux normal, ce qui signifie que les autres éléments s’organisent comme s’il n’était pas présent. La différence essentielle est qu’un élément en `fixed` **se positionne toujours par rapport au viewport (la zone visible de l’écran), et non par rapport à un ancêtre positionné.** |

```css
.parent {
   display: flex;
   position: relative;
   left: 10px;
}

.relative {
   position: relative;
}

.fixed {
   position: fixed;
   left: 10px;
}
```

### 1.3. `sticky`
| **Valeur**  | **Description** | 
|:------------|:----------------|
| `sticky`    |                 |
