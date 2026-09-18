# TaskFlow - DevOps Production-Style Project

A simple full-stack task manager used to learn:

- AWS EC2
- Linux
- Docker
- Docker Compose
- Nginx
- MySQL
- Git/GitHub
- CI/CD
- HTTPS
- Monitoring and production hardening

## Architecture

Browser -> Nginx -> React frontend
                  -> Spring Boot backend -> MySQL

## Run locally

Requirements:
- Docker
- Docker Compose

Run:

```bash
docker compose up --build -d
```

Open:

http://localhost

Check:

```bash
docker compose ps
docker compose logs -f
```

Health:

http://localhost/api/health

Stop:

```bash
docker compose down
```

The MySQL data remains in the Docker volume.

## Important

This starter project intentionally keeps secrets in docker-compose.yml so it is easy to understand locally.

Before a real public deployment, move secrets to environment variables / a secrets manager, restrict the database, configure HTTPS, backups, monitoring, and CI/CD.
