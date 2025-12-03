# MiniHackathon 3.0

Unsere Interpretation des MiniHackathon 3.0

## Technologien

- Spring Boot 4 mit Kotlin
- Angular 21 mit Tailwind CSS
- MariaDB
- Docker
- Github Actions

## Lokales Setup

### Backend (Port 8087)

1. Lokale Datenbank starten mit Docker `npm run localdb:up`
1. Backend bauen mit Maven Wrapper `npm run backend:build`
1. Backend starten entweder über IntelliJ RUN oder über `npm run backend:start`

### Frontend (Port 4200)

1. Frontend starten über `npm run frontend:start`

## DEV Setup (alles als Docker ausführen)

1. Backend bauen mit Maven Wrapper `npm run backend:build`
1. Frontend bauen mit npm `npm run frontend:build-dev`
1. docker compose für dev stage ausführen `npm run devstage:up`
1. Backend hat weiterhin Port 8087 und Frontend hat nun Port 8080

## Fachlicher Ablauf (grob)

### User
1. User anlegen
2. Uer bearbeiten (alles außer Vorname)

### Job (überall uniqueCode von User benötigt)

1. Job analysieren 
2. Analysierter Job speichern
3. Job anpassen (aktuell Urls)
4. Alle Jobs auflisten

## Maintainer

* Michael W. [m1well](https://github.com/m1well)
* Sascha N. [cyborg-s](https://github.com/cyborg-s)
