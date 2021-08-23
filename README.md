# Bakery pre-order vizsgaremek
A Bakery pre-order egy full-stack alkalmazás egy pékség vásárlóinak és alkalmazottainak, az előrendelések kezelésére. [Link az eredeti GitHub repository-hoz](https://github.com/green-fox-academy/sabalazs_masterwork)

## Tartalomjegyzék
* [Összefoglalás](#összefoglalás)
* [Funkciók](#funkciók)
* [Technológiák](#technológiák)
* [Az alkalmazás használata](#az-alkalmazás-használata)
* [Készítők](#készítők)
* [Licensz](#licensz)

## Összefoglalás

A pékség vásárlói, regisztráció után, leadhatnak előrendeléseket az elérhető termékekre, és megtekinthetik a korábban leadott előrendeléseiket. Az adminisztrátorok hozzáadhatnak, szerkeszthetnek és törölhetnek termékeket, látják a beérkezett előrendeléseket, illetve módosíthatják ezek státuszát.

## Funkciók
### Vásárlók:
- tudnak regisztrálni, bejelentkezni és kijelentkezni
- megtekinthetik az elérhető termékek listáját
- leadhatnak rendelést
- megtekinthetik a korábban leadott rendeléseiket
### Adminisztrátorok:
- tudnak bejelentkezni, kijelentkezni
- megtekinthetik az összes terméket tartalmazó listát
- tudnak új terméket létrehozni, vagy meglévőt szerkeszteni illetve törölni
- megtekinthetik az összes leadott rendelést
- szerkeszthetik egy rendelés státuszát, illetve törölhetnek rendeléseket

## Technológiák
### Backend
- Node
- Express
- MongoDB
- Json Web Token
- Docker
### Frontend
- React

### API dokumentáció
- Swagger

## Az alkalmazás használata

Az alkalmazás az alábbi paranccsal indítható:
```
docker-compose up
```
Ezután az alkalmazás elérhető a böngészőből a ```http://localhost:3000/``` címen. Az alkalmazás a (képzeletbeli) "La Merienda" pékség nevében fut. Az adatbázis fel lett töltve példa adatokkal (felhasználók, termékek, rendelések). Az alábbi bejelentkezési adatokkal használható az alkalmazás:

Vásárló:
```
customer@customer.customer
Password123
```
Adminisztrátor:
```
admin@admin.admin
Password123
```
Az API dokumentáció elérhető a böngészőből a```http://localhost:4000/``` címen.

A frontend, backend, image-server és documentáció külön-külön futtatásához itt találhatók instrukciók:
- [Frontend](frontend/README.md)
- [Backend](backend/README.md)
- [Image server](image-server/README.md)
- [API dokumentáció](api-documentation/README.md)

## Készítők

Balázs Sághy
ex. [@sabalazs](https://github.com/sabalazs)

## Licensz

This project is licensed under the MIT License - see the LICENSE.md file for details.