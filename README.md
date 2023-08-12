# P07-Projet-Node-Express-MongoDB
Mon vieux grimoire - mise en place du back-end 

# 📖 **Mon Vieux Grimoire - Site de notation de livres**

## 📌 Menu
- [Description](#-description)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Spécifications de l'API](#-spécifications-de-lapi)
- [Sécurité](#-sécurité)
- [Progression du Projet](#-progression-du-projet)

## 📝 **Description**
Le site "Mon Vieux Grimoire" offre aux lecteurs la possibilité de créer des livres, de les noter et de consulter les livres existants ainsi que leurs notes.

## 🚀 **Fonctionnalités**
1. 🔐 **Inscription / Connexion** : Les utilisateurs peuvent s'inscrire et se connecter.
2. 🏠 **Accueil** : Présentation de tous les livres ajoutés par les utilisateurs.
3. 📘 **Page Livre** : Affiche toutes les informations sur un livre, y compris la possibilité de le noter.
4. ✏️ **Création de Livre** : Les utilisateurs peuvent ajouter de nouveaux livres à la plateforme.

## 💡 **Technologies utilisées**
- **Backend** : Node.js, Express, MongoDB.
- **Authentification** : Sécurisée avec token JWT.
- 🖼️ **Gestion d'images** : Utilisation de Multer pour le téléchargement et l'optimisation des images.

## 🌐 **Spécifications de l'API**
- 🔐 **Authentification** : Routes pour l'inscription et la connexion.
- 📚 **Livres** : Routes pour obtenir tous les livres, obtenir un livre par ID, ajouter un livre, mettre à jour un livre, supprimer un livre et noter un livre.

## 🔒 **Sécurité**
- 🔐 Hachage du mot de passe utilisateur.
- Authentification renforcée sur toutes les routes nécessaires.
- 📧 Adresses électroniques uniques dans la base de données.

## 🚧 **Progression du Projet**
Je travaille actuellement sur ce projet et je valide étape par étape en suivant le cours "Passez au Full Stack avec Node.js, Express et MongoDB". 

### Étape 1 : Mise en place de l’application
- [x] **Étape 1.1** : Créez un serveur Express simple - 20% de progression
- [x] **Étape 1.2** : Créez une API RESTful - 40% de progression
- [x] **Étape 1.3** : Mettez en place un système d'authentification sur votre application - 60% de progression
- [ ] **Étape 1.4** : Ajoutez une gestion des fichiers utilisateur sur l'application - 80% de progression

### Étape 2 : Fonctionnalité de notation
- [ ] **Étape 2.1** : Gestion de l’ajout d’une notation d’un livre - 90% de progression
- [ ] **Étape 2.2** : Gestion du calcul de la note moyenne d’un livre - 100% de progression
