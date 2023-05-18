BEGIN;


DROP TABLE IF EXISTS "status", "contact", "question", "type", "theme", "training", "contract", "contract_training", "quotation", "quotation_training", "quotation_contract",  "answer", "meet", "levy", "program", "skill", "category", "publication", "rubric", "book", "subscriber", "bank_card", "subscription", "contact_answer", "admin_connect" CASCADE;

CREATE TABLE status (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE contact (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "company_adress" TEXT NOT NULL DEFAULT '',
    "company_zip_code" TEXT NOT NULL DEFAULT '',
    "company_city" TEXT NOT NULL DEFAULT '',
    "status_id" INTEGER NOT NULL DEFAULT 1 REFERENCES status("id") ON DELETE CASCADE,
    "re_contact" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE question (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE contract (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "responsible" TEXT NOT NULL DEFAULT 'Changer d''attitude',
    "contact_id" INTEGER NOT NULL REFERENCES contact("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE type (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE theme (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE training (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type_id" INTEGER NOT NULL REFERENCES type("id") ON DELETE CASCADE,
    "theme_id" INTEGER NOT NULL REFERENCES theme("id") ON DELETE CASCADE,
    "name" VARCHAR(255) NOT NULL,
    "price" FLOAT NOT NULL,
    "duration" INTEGER NOT NULL,
    "objective" TEXT NOT NULL,
    "target" VARCHAR(255) NOT NULL,
    "format" VARCHAR(255) NOT NULL DEFAULT 'Sur le site de l''entreprise',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE contract_training (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "training_id" INTEGER NOT NULL REFERENCES training("id") ON DELETE CASCADE,
    "contract_id" INTEGER NOT NULL REFERENCES contract("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);


CREATE TABLE quotation (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "responsible" TEXT NOT NULL DEFAULT 'Changer d''attitude',
    "contact_id" INTEGER NOT NULL REFERENCES contact("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE quotation_training (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "quotation_id" INTEGER NOT NULL REFERENCES quotation("id") ON DELETE CASCADE,
    "training_id" INTEGER NOT NULL REFERENCES training("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE quotation_contract (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "quotation_id" INTEGER NOT NULL REFERENCES quotation("id") ON DELETE CASCADE,
    "contract_id" INTEGER NOT NULL REFERENCES contract("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE answer (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "question_id" INTEGER NOT NULL REFERENCES question("id") ON DELETE CASCADE,
    "response" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE meet (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "subject" TEXT NOT NULL,
    "contact_id" INTEGER NOT NULL REFERENCES contact("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE levy (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "amount" FLOAT NOT NULL,
    "date" DATE NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "reference" VARCHAR(255) NOT NULL,
    "contact_id" INTEGER NOT NULL REFERENCES contact("id") ON DELETE CASCADE,
    "contract_id" INTEGER NOT NULL REFERENCES contract("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE program (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "program-content" VARCHAR(255) NOT NULL DEFAULT '',
    "training_id" INTEGER NOT NULL REFERENCES training("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE skill (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "skill-content" VARCHAR(255) NOT NULL,
    "training_id" INTEGER NOT NULL REFERENCES training("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE category (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE publication (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "main-title" VARCHAR(255) NOT NULL,
    "objective" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL REFERENCES category("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE rubric (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "publication_id" INTEGER NOT NULL REFERENCES publication("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE book (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "resume" TEXT NOT NULL,
    "price" FLOAT NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'PDF',
    "picture" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE subscriber (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "adress" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(10) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE bank_card (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "number" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "secret_code" VARCHAR(4) NOT NULL,
    "subscriber_id" INTEGER NOT NULL REFERENCES subscriber("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE subscription (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "start-date" DATE NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT FALSE,
    "subscriber_id" INTEGER NOT NULL REFERENCES subscriber("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE contact_answer (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "contact_id" INTEGER NOT NULL REFERENCES contact("id") ON DELETE CASCADE,
    "answer_id" INTEGER NOT NULL REFERENCES answer("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE admin_connect (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;