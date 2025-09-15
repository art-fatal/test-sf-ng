## Structure du Projet
- `backend/` - API Symfony avec API Platform
- `frontend/` - Application Angular
- `infra/` - Configuration Docker

## Prérequis
- Docker Desktop (inclut Docker et Docker Compose)

## Démarrage rapide (Docker)
1. Démarrer les services:
```bash
docker-compose up -d
```

2. Accéder aux services:
- Frontend (Angular): `http://localhost:4201`
- Backend API (Symfony): `http://localhost:8001`
- Base de données (MariaDB): `localhost:3307`

### Variables d'environnement (optionnel)
Un fichier d'exemple est disponible: `infra/env.example`.
Copiez-le en `.env` si vous souhaitez surcharger les valeurs par défaut (mots de passe, noms de BDD, etc.).

### Ports utilisés
- 4200 → Frontend (Nginx)
- 8001 → Backend (Nginx / Symfony)
- 3307 → MariaDB (mappé vers 3306 dans le conteneur)

## API Endpoints

- L'API est exposée à la racine (pas de préfixe `/api`).
- Authentification par JWT requise pour les routes protégées.

- `GET /exams` - Récupérer tous les examens (401 sans token = normal)
- `GET /exams/{id}` - Récupérer un examen par ID
- `POST /exams` - Créer un nouvel examen

Base URL en local: `http://localhost:8001`

## Fonctionnalités

- Affichage de la liste des examens
- États des examens : Confirmé, À organiser, Annulé, En recherche de place
- Interface responsive avec Tailwind CSS
- Gestion des erreurs et états de chargement
- Communication avec l'API Symfony via HTTP

---

## Mode manuel (optionnel, sans Docker)

Si vous préférez lancer chaque partie sans Docker, conservez les étapes classiques (Composer/NPM), mais la solution recommandée est: `docker-compose up -d`.
