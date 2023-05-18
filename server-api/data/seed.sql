BEGIN;
-- psql -U attitude -d attitude -f ./data/seed.s

INSERT INTO status (
    name
) VALUES 
('Contact'), 
('Relance'),
('Client'),
('Renseignement / pas de projet'),
('pas ou plus intérésser'); 

INSERT INTO contact (
    firstname,
    lastname,
    phone,
    mail,
    company,
    re_contact
) VALUES (
    'Vandal',
    'William',
    '0130543820',
    'vandal.william@hotmail.com',
    'Naturalia',
    TRUE
), (
    'Matheo',
    'Charle',
    '0631554025',
    'Matheo.Charle@gmail.com',
    'Boursorama',
    TRUE
);

INSERT INTO question (
    content
) VALUES 
('Avez-vous déjà rencontré des problèmes de communication entre les membres de votre équipe ?'), 
('Rencontrez-vous régulièrement des conflits interpersonnels ou des tensions entre les membres de votre équipe ?'),
('Avez-vous remarqué une baisse de la motivation ou de l''engagement des employés dans votre entreprise récemment ?'),
('Avez-vous récemment embauché de nouveaux employés ou intégré de nouveaux membres dans votre équipe ?'),
('Avez-vous remarqué une différence de style de travail ou de culture entre les membres de votre équipe ?'),
('Avez-vous des difficultés à atteindre vos objectifs en raison de problèmes de collaboration ou de coordination entre les membres de votre équipe ?'),
('Avez-vous des difficultés à retenir vos employés ou à maintenir un taux de rétention élevé ?'),
('Avez-vous remarqué une baisse de la productivité ou de la qualité du travail dans votre entreprise récemment ?'),
('Pensez-vous que la diversité et l''inclusion sont des priorités importantes pour votre entreprise ?');

INSERT INTO answer (
    question_id,
    response
) VALUES 
(1, 'Des retards dans les projets dus à des erreurs de communication entre les membres de l''équipe.'),
(1, 'Des malentendus entre les membres de l''équipe qui peuvent entraîner des conflits.'),
(1, 'Des e-mails ou des messages non répondus ou non lus.'),
(2, 'Des membres de l''équipe qui évitent de travailler ensemble.'),
(2, 'Des retards dans les projets dus à des conflits non résolus.'),
(2, 'Des plaintes ou des signalements de comportements inappropriés de la part d''un membre de l''équipe envers un autre.'),
(3, 'Des employés absents ou qui arrivent en retard.'),
(3, 'Des employés qui ne participent pas à des activités de formation ou de développement professionnel.'),
(3, 'Des employés qui ne proposent plus de nouvelles idées ou d''améliorations pour l''entreprise.'),
(4, 'Des périodes d''intégration plus longues que prévues.'),
(4, 'Des retards dans les projets liés à l''intégration des nouveaux membres de l''équipe.'),
(4, 'Des membres de l''équipe qui se sentent exclus ou ignorés par les nouveaux venus.'),
(5, 'Des membres de l''équipe qui ont des attentes différentes en termes de travail ou de communication.'),
(5, 'Des membres de l''équipe qui ne respectent pas les normes culturelles de l''entreprise.'),
(5, 'Des membres de l''équipe qui ont des différences de perspectives ou de valeurs qui entraînent des conflits.'),
(6, 'Des projets qui sont en retard en raison de retards ou de confusion dans la communication entre les membres de l''équipe.'),
(6, 'Des membres de l''équipe qui travaillent sur des tâches similaires ou contradictoires sans coordination.'),
(6, 'Des membres de l''équipe qui ne se rendent pas compte qu''ils ont besoin d''aide ou de ressources supplémentaires pour accomplir leurs tâches.'),
(7, 'Un taux de rotation élevé des employés.'),
(7, 'Des plaintes concernant les salaires ou les avantages sociaux.'),
(7, 'Des employés qui ont l''impression qu''ils ne peuvent pas progresser dans leur carrière au sein de l''entreprise.'),
(8, 'Des retards dans les projets ou des tâches qui ne sont pas terminées dans les délais impartis.'),
(8, 'Des erreurs ou des incohérences dans le travail des employés.'),
(8, 'Des clients insatisfaits ou des plaintes concernant la qualité des produits ou services.'),
(9, 'Une faible représentation de certains groupes au sein de l''entreprise.'),
(9, 'Des plaintes ou des signalements de comportements discriminatoires ou harcelants.'),
(9, 'Des employés qui ne se sentent pas à l''aise de partager leurs opinions ou leurs idées en raison de leur identité ou de leur expérience.');

INSERT INTO contact_answer (
    contact_id,
    answer_id
) VALUES 
(1, 2), 
(1, 5),
(2, 10),
(2, 20);

INSERT INTO meet (
    date,
    time,
    subject,
    contact_id
) VALUES 
('2023-08-07', '10:00:00', 'Premier contact', 1),
('2023-10-09', '9:00:00', '2eme contact présentation du devi', 1),
('2023-12-10', '11:00:00', 'signature du contrat', 1),
('2023-06-07', '09:30:00', 'Premier contact', 2);

INSERT INTO type (
    name
) VALUES 
('Formation'),
('Coaching'),
('Médiation'),
('Ateliers');

INSERT INTO theme (
    name
) VALUES 
('Communication'),
('Baisse de motivation'),
('Intégrations'),
('Collaboration et coordination'),
('Rétention des employés'),
('Baisse de la Productivité'),
('Culture et diversitée'),
('Diversité et inclusion');

INSERT INTO training (
    type_id,
    theme_id,
    name,
    price,
    duration,
    objective,
    target
) VALUES 
(
    1, 
    1, 
    'Communication interpersonnelle', 
    100, 
    24, 
    'résoudre les conflits lier a la communication au sein d''une entreprise', 
    'salarié'
),
(
    2, 
    1, 
    'Résolution de conflits', 
    80, 
    10, 
    'Evité les conflits et les gérer plus éfficacement', 
    'salarié'
),
(
    3, 
    1, 
    'Intelligence émotionnelle', 
    150, 
    8, 
    'identifier et gérer ces émotions', 
    'salarié/employeur'
),
(
    4, 
    1, 
    'Communication non violente', 
    50, 
    3, 
    'adopter une communication éfficace', 
    'salarié/employeur'
);

INSERT INTO contract (
    start_date,
    end_date,
    status,
    contact_id
) VALUES 
('2023-09-08', '2023-10-10', 'en cours', 1 );


INSERT INTO contract_training (
    training_id,
    contract_id
) VALUES 
(1, 1 ),
(2, 1 ),
(3, 1 );

INSERT INTO quotation (
    contact_id
) VALUES 
(1);


INSERT INTO quotation_training (
    quotation_id,
    training_id
) VALUES 
(1, 1),
(1, 2),
(1, 3);

INSERT INTO levy (
    amount,
    date,
    status,
    reference,
    contact_id,
    contract_id
) VALUES 
(1035, '2023-09-08', 'En attente', 'RGB789D600C780M', 1, 1),
(1035, '2023-10-10', 'En attente', 'RCC680E800B240X', 1, 1);

COMMIT;