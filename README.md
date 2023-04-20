# API

## Mise en place de la BDD

### 1. Créer un utilisateur et une base de donnée

Se connecter à PostgreSQL :

```bash
sudo -u postgres psql
```
Créer un utilisateur :

```sql
CREATE USER exemple WITH PASSWORD 'exemple';
```

Créer une base de données :

```sql
CREATE DATABASE exemple WITH OWNER exemple;
```

Quitter PostgreSQL : 

```sql
\q
```

### 2. Créer les tables et les enregistrement

Se placer dans le dossier server-api :

```shell
cd server-api
```

Se connecter à l'utilisateur exemple et exécuter le fichier SQL exemple :

```shell
psql -U exemple -d exemple -a -f ./data/exemple.sql
```

### 3. Vérifier les enregistrements

Voir les tables :

```sql
\dt
```

Exécuter une requéte sql pour vérifier le contenue :

```sql
SELECT * FROM pokemon;
```

## Déployer avec PM2 automatiquement 

1. Générez une paire de clés SSH sur votre ordinateur local.

```shell
ssh-keygen
```
2. Copiez la clé publique SSH (id_rsa.pub) sur votre serveur distant. 

```shell
ssh-copy-id user@server
```
3. Testez la connexion SSH en utilisant la commande suivante :

```shell
ssh user@server
```