FROM nginx:1.29.3-alpine

ENV TZ=Europe/Berlin

# nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# angular app
COPY dist/mh3-frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
