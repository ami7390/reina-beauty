# Reina Beauty — Next.js / Vercel / Supabase

Application Next.js 16 déployée nativement sur Vercel.

## Build

- `npm install`
- `npm run dev`
- `npm run build`
- `npm start`

Le build Vercel utilise `next build --webpack`. Le projet ne dépend plus de vinext, Vite, Nitro, Cloudflare D1/R2 ou Vercel Blob.

## Supabase

La persistance est centralisée dans Supabase :

- `catalog_products` : produits et page de vente
- `contact_messages` : messages reçus depuis le site
- `site_settings` : mode maintenance
- `site_media` : remplacements d'images depuis l'admin
- Storage bucket `reina-media` : images optimisées uploadées depuis l'admin

Exécuter une fois `supabase-setup.sql` dans **Supabase > SQL Editor**.

### Variables d'environnement

Le fichier `.env` fourni contient déjà :

- `NEXT_PUBLIC_SUPABASE_URL=https://aeiukbwjjjxulhyhvkqk.supabase.co`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_uecR7LdJ1n2BfRiVwf-MHQ_14wpMWt2`
- Google Analytics et Microsoft Clarity

À compléter :

- `SUPABASE_SECRET_KEY` : clé `sb_secret_...` dans Supabase > Settings > API Keys. **Ne jamais l'exposer côté navigateur ni la publier dans Git.**
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Ajouter les mêmes variables dans **Vercel > Settings > Environment Variables**, puis redéployer.

> `.env` est volontairement ignoré par Git pour protéger les secrets. `.env.example` peut être versionné.

## Images

Depuis l'administration, les images locales sont redimensionnées côté navigateur à 1800 px maximum et converties en WebP à environ 82 % avant upload. Elles sont ensuite stockées dans le bucket Supabase `reina-media` et servies par le CDN Supabase.

## Maintenance

Le bouton de maintenance écrit maintenant dans `site_settings` sur Supabase. L'admin reste accessible pendant la maintenance.
