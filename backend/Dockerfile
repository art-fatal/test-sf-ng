FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nginx \
    supervisor \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /srv/api

COPY composer.json composer.lock ./

RUN composer install --optimize-autoloader --no-scripts

COPY . .

RUN chown -R www-data:www-data /srv/api \
    && chmod -R 755 /srv/api

COPY docker/nginx.conf /etc/nginx/sites-available/default

COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 9000 80

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
