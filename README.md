# Projet : Utilisation des API OpenWeather et OpenLibrary avec Node.js

## Description

Ce projet illustre comment interagir avec des API REST en utilisant Node.js et le module `request`. Il comprend :

- **OpenWeather API** : Permet d'obtenir des informations météorologiques en fonction du nom d'une ville.
- **OpenLibrary API** : Permet de rechercher des livres à partir d'un titre donné.

## Utilisation

### 1. Récupération des données météorologiques (OpenWeather API)

L'API OpenWeather permet d'obtenir des informations météorologiques via un appel HTTP GET.

#### 🔹 Code source :

```js
const request = require("request");

const API_KEY = "VOTRE_CLE_API"; // Remplacez par votre clé API OpenWeather
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?appid=" + API_KEY + "&q=";

function getWeatherData(city, callback) {
  const url = BASE_URL + encodeURIComponent(city);
  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
    } else {
      try {
        const weatherData = JSON.parse(body);
        callback(null, weatherData);
      } catch (parseError) {
        callback(parseError, null);
      }
    }
  });
}

getWeatherData("Sousse", (error, data) => {
  if (!error) {
    console.log("Description :" + data.weather[0].description);
    console.log("Température :" + data.main.temp);
    console.log("Humidité :" + data.main.humidity);
  } 
});
```

#### 🔹 Exemple de sortie :

```
Description : few clouds
Température : 290.15
Humidité : 65
```

### 2. Recherche de livres avec OpenLibrary API

L'API OpenLibrary permet de rechercher des livres en effectuant un appel HTTP GET avec un paramètre de requête.

#### 🔹 Code source :

```js
const request = require("request");

const BASE_URL = "https://openlibrary.org/search.json?q=";

function getBookData(query, callback) {
    const url = BASE_URL + encodeURIComponent(query);
    request(url, function (error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            try {
                const bookData = JSON.parse(body);
                callback(null, bookData);
            } catch (parseError) {
                callback(parseError, null);
            }
        }
    });
}

getBookData("The Lord of the Rings", (error, data) => {
    if (error) {
        console.error("Erreur lors de la récupération des données :", error);
    } else {
        console.log("Total de livres trouvés :", data.numFound);
        console.log("Titre :", data.docs[0].title);
        console.log("Auteur :", data.docs[0].author_name);
        console.log("Année de publication :", data.docs[0].first_publish_year);
        console.log("Langues :", data.docs[0].language);
    }
});
```

#### 🔹 Exemple de sortie :

```
Total de livres trouvés : 12345
Titre : The Lord of the Rings
Auteur : J.R.R. Tolkien
Année de publication : 1954
Langues : ["eng"]
```

## Explication du Code

### Consommation des API

1. **Requête HTTP** : On utilise le module `request` pour envoyer une requête GET à l'API cible.
2. **Encodage des paramètres** : On encode les paramètres utilisateur (nom de la ville ou titre du livre) avec `encodeURIComponent`.
3. **Traitement de la réponse** : On parse la réponse JSON et on extrait les données utiles.
4. **Gestion des erreurs** : On capture les erreurs potentielles lors des requêtes et du parsing JSON.

## Conclusion

Ce projet illustre comment récupérer et traiter des données d'API en temps réel avec Node.js.

🚀 N'hésitez pas à améliorer ce projet en ajoutant d'autres fonctionnalités comme la conversion d'unités météorologiques ou l'affichage de plusieurs résultats pour les livres !

