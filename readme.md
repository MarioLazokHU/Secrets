# Secrets Projekt

Ez a projekt egy egyszerű titokkezelő alkalmazás, amely frontend és backend szolgáltatásokból áll. Az alkalmazás Docker Compose segítségével futtatható.

## Előfeltételek

- [Docker](https://www.docker.com/get-started) telepítése
- [Docker Compose](https://docs.docker.com/compose/install/) telepítése

## Indítás

1. Klónozd a projektet a gépedre:

   ```sh
   git clone <repository-url>
   cd Secrets

2. Hozd létre a szükséges .env fájlokat a frontend és backend mappákban, ha még nem léteznek. Például:

    frontend/.env (VITE_API_BASE_URL=http://localhost:3000)
    backend/.env (MONGO_URL=mongodb://mongo:27017/secrets)

    docker-compose esetén nem szükséges

3. Indítsd el az alkalmazást Docker Compose segítségével:

    docker-compose up --build


# Szolgáltatások
    MongoDB: Az adatbázis szolgáltatás, amely a titkokat tárolja.
    Backend: A Node.js alapú backend szolgáltatás, amely a titkok kezeléséért felelős.
    Frontend: A Vue.js alapú frontend szolgáltatás, amely a felhasználói felületet biztosítja.
