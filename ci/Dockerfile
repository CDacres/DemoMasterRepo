FROM gcr.io/zipcube-143312/ci-server
ARG SITE_NAME=zipcube.com
ARG env=production
ENV SITE_NAME=${SITE_NAME} ENVIRONMENT=${env}
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY ./composer* ./
RUN composer install --no-plugins --no-scripts
COPY . .
RUN mkdir -p /var/www/html/lang
RUN php lang_script.php
RUN chown -R www-data:www-data /var/www/html
VOLUME /var/www/html/images/users
VOLUME /var/www/html/lang
