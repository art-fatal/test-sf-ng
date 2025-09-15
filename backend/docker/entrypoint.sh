#!/bin/sh
set -e

echo "[entrypoint] Bootstrapping Symfony app..."

# Move to app dir
cd /srv/api

# Wait for DB to be ready using Doctrine (no mysql client needed)
echo "[entrypoint] Waiting for database..."
MAX_RETRIES=30
RETRY=0
until php bin/console doctrine:query:sql "SELECT 1" >/dev/null 2>&1; do
  RETRY=$((RETRY+1))
  if [ "$RETRY" -ge "$MAX_RETRIES" ]; then
    echo "[entrypoint] Database not ready after $MAX_RETRIES attempts. Exiting."
    exit 1
  fi
  echo "[entrypoint] Database not ready yet. Retry $RETRY/$MAX_RETRIES..."
  sleep 2
done

# Run migrations (idempotent)
echo "[entrypoint] Running migrations..."
php bin/console doctrine:migrations:migrate --no-interaction || true

# Generate JWT keys if missing
if [ ! -f "config/jwt/private.pem" ] || [ ! -f "config/jwt/public.pem" ]; then
  echo "[entrypoint] Generating JWT keypair..."
  php bin/console lexik:jwt:generate-keypair --overwrite || true
else
  echo "[entrypoint] JWT keys already present."
fi

# Load fixtures in dev or when explicitly enabled
if [ "${APP_ENV}" = "dev" ] || [ "${ENABLE_FIXTURES}" = "1" ] || [ "${ENABLE_FIXTURES}" = "true" ]; then
  if php bin/console list doctrine:fixtures 2>/dev/null | grep -q "doctrine:fixtures:load"; then
    echo "[entrypoint] Loading fixtures..."
    php bin/console doctrine:fixtures:load --no-interaction || true
  else
    echo "[entrypoint] Fixtures bundle not installed; skipping."
  fi
else
  echo "[entrypoint] Fixtures disabled."
fi

echo "[entrypoint] Starting services (supervisord)..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf


