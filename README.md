# Reina Beauty — Next.js / Vercel

Application Next.js 16 déployée nativement sur Vercel.

## Commandes

- `npm install`
- `npm run dev`
- `npm run build`
- `npm start`

Le build Vercel utilise `next build --webpack` et ne dépend ni de Vite, ni de vinext, ni de Nitro.

## Stockage Cloudflare historique

Certaines fonctions d'administration ont été écrites initialement pour Cloudflare D1/R2. Leur accès est maintenant isolé dans `lib/cloudflare-bindings.ts` afin que le build Next.js Vercel ne tente jamais de résoudre `cloudflare:workers`.

Sur Vercel, si aucun stockage équivalent n'est configuré, ces fonctions échouent proprement à l'exécution (réponse 503/500 selon la route) sans faire échouer la compilation ou le déploiement. Pour une administration persistante sur Vercel, il faudra brancher une base et un stockage compatibles Vercel.

## Variable d'environnement

`ADMIN_EMAIL` est utilisée pour limiter l'accès administrateur quand le mécanisme d'authentification attendu fournit l'identité de l'utilisateur.

## Vercel : stockage persistant pour l'admin

Les images modifiables, le catalogue produit et le bouton de maintenance utilisent **Vercel Blob** lorsque le site est déployé sur Vercel.

1. Dans Vercel, ouvrir le projet > **Storage** > **Create Database / Blob**.
2. Créer un **Blob Store** et le connecter au projet Reina Beauty.
3. Vérifier que Vercel a ajouté `BLOB_READ_WRITE_TOKEN` aux variables d'environnement du projet.
4. Redéployer la Production.

Les images sélectionnées depuis l'administration sont redimensionnées dans le navigateur (dimension maximale 1800 px) et converties en WebP à 82% avant l'upload. Cela réduit le poids, la bande passante et le temps de chargement.

Les variables d'authentification admin restent :
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
