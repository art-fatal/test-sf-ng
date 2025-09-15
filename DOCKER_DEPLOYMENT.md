# 🐳 Déploiement Docker - Application Marwaa

Ce guide vous explique comment déployer l'application Marwaa (Symfony + Angular) en utilisant Docker.

## 📋 Prérequis

- Docker (version 20.10 ou plus récente)
- Docker Compose (version 2.0 ou plus récente)

### Installation Docker sur macOS

```bash
# Installer Docker Desktop
brew install --cask docker

# Ou télécharger depuis https://www.docker.com/products/docker-desktop
```

## 🚀 Déploiement rapide

### Option 1: Script automatique (recommandé)

```bash
# Depuis la racine du projet
./deploy.sh
```

### Option 2: Commandes manuelles

```bash
# 1. Aller dans le dossier infra
cd infra

# 2. Copier et configurer les variables d'environnement
cp env.example .env
# Modifier le fichier .env selon vos besoins

# 3. Démarrer les services
docker-compose up --build -d

# 4. Attendre que la base de données soit prête (30 secondes)

# 5. Exécuter les migrations
docker-compose exec backend php bin/console doctrine:migrations:migrate --no-interaction

# 6. Charger les données de test
docker-compose exec backend php bin/console doctrine:fixtures:load --no-interaction

# 7. Générer les clés JWT
docker-compose exec backend php bin/console lexik:jwt:generate-keypair --overwrite
```

## 🌐 Accès aux services

Une fois déployé, votre application sera disponible sur :

- **Frontend (Angular)**: http://localhost:4200
- **Backend API (Symfony)**: http://localhost:8000
- **Base de données**: localhost:3306

## 📊 Architecture des services

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Angular)     │◄──►│   (Symfony)     │◄──►│   (MariaDB)     │
│   Port: 4200    │    │   Port: 8001    │    │   Port: 3307    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Commandes utiles

### Gestion des conteneurs

```bash
# Voir le statut des conteneurs
docker-compose ps

# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ supprime les données)
docker-compose down -v
```

### Accès aux conteneurs

```bash
# Accéder au shell du backend
docker-compose exec backend bash

# Accéder au shell de la base de données
docker-compose exec db mysql -u marwaa -p marwaa

# Exécuter des commandes Symfony
docker-compose exec backend php bin/console cache:clear
docker-compose exec backend php bin/console doctrine:schema:validate
```

### Maintenance

```bash
# Reconstruire les images
docker-compose build --no-cache

# Redémarrer un service spécifique
docker-compose restart backend

# Mettre à jour les dépendances PHP
docker-compose exec backend composer install

# Mettre à jour les dépendances Node
docker-compose exec frontend npm install
```

## 🔧 Configuration

### Variables d'environnement

Le fichier `infra/.env` contient toutes les variables de configuration :

```env
# Base de données
DB_ROOT_PASSWORD=root
DB_NAME=marwaa
DB_USER=marwaa
DB_PASSWORD=marwaa123

# Application
APP_SECRET=your-secret-key
JWT_PASSPHRASE=your-jwt-passphrase
```

### Personnalisation des ports

Pour changer les ports, modifiez le fichier `infra/docker-compose.yml` :

```yaml
services:
  backend:
    ports:
      - '8080:80'  # Changer 8080 pour un autre port
  frontend:
    ports:
      - '3000:80'  # Changer 3000 pour un autre port
```

## 🐛 Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   ```bash
   # Vérifier quels ports sont utilisés
   lsof -i :4200
   lsof -i :8001
   
   # Changer les ports dans docker-compose.yml
   ```

2. **Base de données non accessible**
   ```bash
   # Vérifier que le conteneur DB fonctionne
   docker-compose ps db
   
   # Voir les logs de la DB
   docker-compose logs db
   ```

3. **Erreurs de permissions**
   ```bash
   # Réparer les permissions
   sudo chown -R $USER:$USER .
   ```

4. **Cache Symfony corrompu**
   ```bash
   # Vider le cache
   docker-compose exec backend php bin/console cache:clear --env=prod
   ```

### Logs et débogage

```bash
# Logs détaillés
docker-compose logs --tail=100 -f

# Logs avec timestamps
docker-compose logs -t -f

# Logs d'un conteneur spécifique
docker-compose logs backend | grep ERROR
```

## 📈 Monitoring

### Utilisation des ressources

```bash
# Voir l'utilisation des ressources
docker stats

# Voir l'espace disque utilisé
docker system df
```

### Nettoyage

```bash
# Nettoyer les images inutilisées
docker image prune

# Nettoyer tout (⚠️ attention)
docker system prune -a
```

## 🔒 Sécurité en production

Pour un déploiement en production :

1. **Changer tous les mots de passe par défaut**
2. **Utiliser des certificats SSL/TLS**
3. **Configurer un reverse proxy (nginx/traefik)**
4. **Limiter l'accès aux ports de base de données**
5. **Utiliser des secrets Docker pour les variables sensibles**

## 📞 Support

En cas de problème :

1. Vérifiez les logs : `docker-compose logs -f`
2. Vérifiez le statut : `docker-compose ps`
3. Consultez cette documentation
4. Contactez l'équipe de développement
