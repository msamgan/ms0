FROM php:8.4-fpm-alpine

# Install required system packages
RUN apk add --no-cache \
    curl \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    oniguruma-dev \
    icu-dev \
    linux-headers \
    openssh-client \
    git \
    nginx \
    supervisor \
    nodejs \
    npm

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    intl \
    zip

# Copy Composer binary from official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files with ownership www-data:www-data
COPY --chown=www-data:www-data . /var/www

# Configure shell aliases for convenience
RUN echo 'alias art="php artisan"' >> /root/.profile && \
    echo 'alias dep="./vendor/bin/dep"' >> /root/.profile && \
    echo 'alias art="php artisan"' >> /root/.shrc && \
    echo 'alias dep="./vendor/bin/dep"' >> /root/.shrc && \
    echo 'alias art="php artisan"' >> /etc/profile.d/aliases.sh && \
    echo 'alias dep="./vendor/bin/dep"' >> /etc/profile.d/aliases.sh

# Set up runtime directories
RUN mkdir -p /run/nginx /var/log/supervisor /etc/nginx/http.d /etc/supervisor/conf.d

# Copy Nginx and Supervisor configuration files
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose application and Vite dev server ports
EXPOSE 8082 5173

# Start supervisor with supervisord.conf as PID 1
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
