# P07-Projet-Node-Express-MongoDB
Mon vieux grimoire - mise en place du back-end 

## 📌 Menu
- [Description](#-description)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Spécifications de l'API](#-spécifications-de-lapi)
- [Sécurité](#-sécurité)
- [Progression du Projet](#-progression-du-projet)
- [Évaluation et Soutenance](#-évaluation-et-soutenance)

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
- **Hachage du password**: Sécurisée avec bcrypt.
- 🖼️ **Gestion d'images** : Utilisation de Multer pour le téléchargement et l'optimisation des images.

## 🌐 **Spécifications de l'API**
- 🔐 **Authentification** : Routes pour l'inscription et la connexion.
- 📚 **Livres** : Routes pour obtenir tous les livres, obtenir un livre par ID, ajouter un livre, mettre à jour un livre, supprimer un livre et noter un livre.

## 🔒 **Sécurité**
- 🔐 Hachage du mot de passe utilisateur.
- Authentification renforcée sur toutes les routes nécessaires.(à faire)
- 📧 Adresses électroniques uniques dans la base de données.

## 🚧 **Progression du Projet**
Je travaille actuellement sur ce projet et je valide étape par étape en suivant le cours "Passez au Full Stack avec Node.js, Express et MongoDB" de OpenClassRooms. 

### Étape 1 : Mise en place de l’application
- [x] **Étape 1.1** : Créez un serveur Express simple - 20% de progression
- [x] **Étape 1.2** : Créez une API RESTful - 40% de progression
- [x] **Étape 1.3** : Mettez en place un système d'authentification sur votre application - 60% de progression
- [x] **Étape 1.4** : Ajoutez une gestion des fichiers utilisateur sur l'application - 80% de progression

### Étape 2 : Fonctionnalité de notation
- [x] **Étape 2.1** : Gestion de l’ajout d’une notation d’un livre - 90% de progression
- [x] **Étape 2.2** : Gestion du calcul de la note moyenne d’un livre - 100% de progression

## 🎓 **Évaluation et Soutenance**
Remarques sur l'évaluation et la soutenance par l'évaluateur Yves Mitaine.

### Compétences évaluées
1. **Implémenter un modèle logique de données conformément à la réglementation**
   - ✔️ Validé : L'application utilise un serveur Node.js et le framework Express.js connecté à une base de données MongoDb Atlas. L'application est fonctionnelle, ne déclenche aucune erreur, toutes les routes énumérées sont utilisées et les images stockées sont optimisées.

2. **Stocker des données de manière sécurisée**
   - ✔️ Validé : L'unicité de l'email est vérifiée par un plugin, les mots de passe sont stockés hachés dans la base, la solidtié du mot de passe et la validité de l'email sont vérifiés aussi. Les routes nécessitant une authentification sont respectées, la configuration de la base permet de s'y connecter et les erreurs sont remontées.

3. **Mettre en œuvre des opérations CRUD de manière sécurisée**
   - ✔️ Validé : Toutes les opérations de base d'un CRUD sont effectuées et expliquées, toutes les routes énoncées (9 routes) dans les spécifications techniques sont utilisées et les explications des middlewares sont pertinentes.

### Livrable
- **Points forts** : Le code est propre, bien indenté, le projet est bien découpé pour améliorer la maintenabilité.
- **Axes d'amélioration** : Aller plus loin encore dans la sécurisation en protégeant la base des injections NoSql avec mongo sanityze par exemple.

### Soutenance
Rodric a fait une excellente présentation, très bien structuré, la demonstration du site fonctionnel était efficace, les explications sur le code étaient claires et tous les points de la mission ont été abordés, en passant par l'authentification, la validation du mot de passe et l'email et l'aspect green code du projet dans la gestion des fichiers images. Les compétences évaluées sur ce projet sont acquises, bon travail.
