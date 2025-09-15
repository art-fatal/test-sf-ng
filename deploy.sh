#!/bin/bash

# Script de déploiement pour l'application Marwaa
set -e

echo "🚀 Démarrage du déploiement de l'application Marwaa..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

# Aller dans le dossier infra
cd infra

# Copier le fichier d'environnement exemple si .env n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env à partir de env.example..."
    cp env.example .env
    echo "⚠️  Veuillez modifier le fichier .env avec vos configurations avant de continuer."
    echo "   Fichier créé: infra/.env"
    read -p "Appuyez sur Entrée quand vous avez terminé la configuration..."
fi

# Construire et démarrer les conteneurs
echo "🔨 Construction et démarrage des conteneurs..."
docker-compose up --build -d

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
sleep 30

# Exécuter les migrations Symfony
echo "🗄️  Exécution des migrations de base de données..."
docker-compose exec backend php bin/console doctrine:migrations:migrate --no-interaction

# Charger les fixtures si nécessaire
echo "📊 Chargement des données de test..."
docker-compose exec backend php bin/console doctrine:fixtures:load --no-interaction

# Générer les clés JWT si elles n'existent pas
echo "🔑 Génération des clés JWT..."
docker-compose exec backend php bin/console lexik:jwt:generate-keypair --overwrite

echo "✅ Déploiement terminé!"
echo ""
echo "🌐 Votre application est maintenant disponible:"
echo "   Frontend (Angular): http://localhost:4200"
echo "   Backend (Symfony API): http://localhost:8000"
echo "   Base de données: localhost:3306"
echo ""
echo "📋 Commandes utiles:"
echo "   Arrêter: docker-compose down"
echo "   Voir les logs: docker-compose logs -f"
echo "   Accéder au shell backend: docker-compose exec backend bash"
echo "   Accéder au shell DB: docker-compose exec db mysql -u marwaa -p marwaa"
