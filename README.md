# Application de Gestion d'Examens

Cette application permet de gérer les examens avec un backend Symfony et un frontend Angular.

## Structure du Projet

- `backend/` - API Symfony avec API Platform
- `frontend/` - Application Angular
- `infra/` - Configuration Docker

## Prérequis

- PHP 8.4
- Composer
- Node.js 18+
- npm
- PostgreSQL (pour la base de données)

## Installation et Démarrage

### Backend (Symfony)

1. Aller dans le dossier backend :
```bash
cd backend
```

2. Installer les dépendances :
```bash
composer install
```

3. Configurer la base de données dans `.env` :
```env
DATABASE_URL="postgresql://username:password@127.0.0.1:5432/exam_db?serverVersion=15&charset=utf8"
```

4. Créer la base de données et exécuter les migrations :
```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

5. Démarrer le serveur :
```bash
php bin/console server:start
```

L'API sera disponible sur `https://localhost:8000`

### Frontend (Angular)

1. Aller dans le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur de développement :
```bash
npm start
```

L'application sera disponible sur `http://localhost:4200`

## API Endpoints

- `GET /exams` - Récupérer tous les examens
- `GET /exams/{id}` - Récupérer un examen par ID
- `POST /exams` - Créer un nouvel examen

## Fonctionnalités

- Affichage de la liste des examens
- États des examens : Confirmé, À organiser, Annulé, En recherche de place
- Interface responsive avec Tailwind CSS
- Gestion des erreurs et états de chargement
- Communication avec l'API Symfony via HTTP

## Configuration

L'URL de l'API peut être modifiée dans `frontend/src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:8000'
};
```

## Dépannage

Si l'application affiche des données de test au lieu des données de l'API, vérifiez que :
1. Le serveur Symfony est démarré
2. La base de données est configurée et accessible
3. L'URL de l'API dans l'environnement est correcte
4. Les certificats SSL sont valides (pour HTTPS)
