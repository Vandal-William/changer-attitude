BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- dans le terminal pour utiliser la variable d'environement :
-- export $(cat .env | xargs)
-- psql -U attitude -d attitude -a -v mot_de_passe="$MOT_DE_PASSE" -f ./data/seed.sql

DO $$
DECLARE
  password VARCHAR(255);
  hashed_password VARCHAR(255);
BEGIN
  password :='mot_de_passe';
  hashed_password := crypt(password, gen_salt('bf'));
  
  INSERT INTO admin_connect (username, password)
  VALUES ('m_viersac', hashed_password);
END $$;

COMMIT;




