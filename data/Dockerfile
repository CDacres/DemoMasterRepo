FROM php:7.3.1-fpm-stretch
RUN apt-get update && apt-get install -y libxml2-dev libpng-dev libjpeg62-turbo-dev locales unzip vim
RUN docker-php-ext-configure gd --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install mysqli pdo_mysql soap gd bcmath
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer
ARG SITE_NAME=zipcube.com
ARG env=production
ENV SITE_NAME=${SITE_NAME}
ENV ENVIRONMENT=${env}
ENV LOG_STREAM="php://stdout"
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY ./composer* ./
COPY ./database ./database
COPY ./tests ./tests
RUN mkdir -p /var/www/app/vendor
RUN composer install --no-plugins --no-scripts
RUN curl https://curl.haxx.se/ca/cacert.pem --output /var/www/app/vendor/guzzle/guzzle/src/Guzzle/Http/Resources/cacert.pem
COPY . .
RUN mkdir -p /var/www/app/storage/downloads
RUN mkdir -p /var/www/app/storage/files/holding
RUN chown -R www-data:www-data /var/www/app/storage
RUN chown -R www-data:www-data /var/www/app/bootstrap/cache
VOLUME /var/www/app/storage/downloads
VOLUME /var/www/app/storage/files/holding
RUN echo "upload_max_filesize=8M" > /usr/local/etc/php/php.ini \
    && echo "post_max_size=8M" >> /usr/local/etc/php/php.ini
