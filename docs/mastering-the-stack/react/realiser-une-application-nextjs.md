---
id: realiser-une-application-nextjs
title: 2. Réaliser une application de A à Z avec Next.js
---

# Réaliser une application de A à Z avec Next.js

## 2.1. Point d’entrée global dans une application Next.js

Dans Next.js, toute application commence par un composant spécial : `RootLayout`.

```tsx title="Next.js"
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
```

Ici, `{children}: Readonly<{children: React.ReactNode}>` sert à afficher la page correspondant à la route actuelle, tout en conservant les éléments principaux du layout (comme un header ou un footer). Il n’est pas nécessaire de comprendre en détail `React.ReactNode` : ce qu’il faut retenir, c’est son rôle. Ainsi, l’utilité de RootLayout est d’organiser la structure globale du site, c’est-à-dire son squelette.

## 2.2. Créer des animations fluides avec Motion

## À venir

- Composant `Link` / `Image`
- Comment créer un style : `className={styles.header}` avec l'import `import styles from "./header.module.css"`
