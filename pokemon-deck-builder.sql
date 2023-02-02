CREATE TYPE "card_attribute" AS ENUM (
  'type',
  'subtype'
);

CREATE TYPE "js_data_type" AS ENUM (
  'string',
  'integer',
  'float'
);

CREATE TABLE "player" (
  "email" varchar(255) PRIMARY KEY,
  "username" varchar(255) NOT NULL
);

CREATE UNIQUE INDEX player_email_case_insensitive_idx ON player (LOWER(email));
CREATE UNIQUE INDEX player_username_case_insensitive_idx ON player (LOWER(username));

CREATE TABLE "deck" (
  "id" SERIAL PRIMARY KEY,
  "player_email" varchar(255) NOT NULL REFERENCES player(email) ON UPDATE CASCADE ON DELETE CASCADE,
  "title" varchar(255) NOT NULL,
  "is_favorite" boolean NOT NULL DEFAULT false,
  "is_active" boolean NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "updated_at" timestamp,
  "copied_from_deck_id" integer
);


CREATE TABLE "card" (
  "id" varchar(255) PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "supertype" varchar(255) NOT NULL,
  "rarity" varchar(255) NOT NULL,
  "image_small_url" varchar(255),
  "is_favorite" boolean NOT NULL DEFAULT false
);

CREATE TABLE "decks_cards" (
  "deck_id" integer REFERENCES deck(id) ON UPDATE CASCADE ON DELETE CASCADE,
  "card_id" varchar(255) REFERENCES card(id) ON UPDATE CASCADE ON DELETE CASCADE,
  "is_card_pokemon" boolean NOT NULL DEFAULT false,
  "count" integer CHECK ((is_card_pokemon = true AND count BETWEEN 0 AND 5) OR (is_card_pokemon = false)) NOT NULL DEFAULT 1,
  PRIMARY KEY ("deck_id", "card_id")
);

CREATE TABLE "card_attributes" (
  "card_id" varchar(255) REFERENCES card(id) ON UPDATE CASCADE ON DELETE CASCADE,
  "attribute" card_attribute,
  "value" varchar(255),
  "data_type" js_data_type,
  PRIMARY KEY ("card_id", "attribute", "value")
);

CREATE TABLE "player_cards" (
  "player_email" varchar(255) NOT NULL REFERENCES player(email) ON UPDATE CASCADE ON DELETE CASCADE,
  "card_id" varchar(255) NOT NULL REFERENCES card(id) ON UPDATE CASCADE ON DELETE CASCADE
);


COMMENT ON COLUMN "card"."supertype" IS 'Energy, Pokemon, Trainer, etc.';
COMMENT ON COLUMN "card"."rarity" IS 'Promo, Rare, Rare Ultra, Uncommon, etc.';
COMMENT ON COLUMN "decks_cards"."count" IS 'if is_pokemon ensure no more than 4 are inserted';
COMMENT ON COLUMN "card_attributes"."attribute" IS 'E.G. Type,Subtype, etc.';
COMMENT ON COLUMN "card_attributes"."value" IS 'E.G. Water, Fire, Lightning, or Basic, V, V-MAX, etc., and more...';
COMMENT ON TABLE player_cards IS 'Essentially this is the (card) collection table'

-- reset
DROP TABLE decks_cards;
DROP TABLE deck;
DROP TABLE player_cards;
DROP TABLE player;
DROP TABLE card_attributes;
DROP TABLE card;
DROP TYPE card_attribute;
DROP TYPE js_data_type;




-----data
INSERT INTO player (username, email)
	VALUES ('goosemondude', 'gooserjg@hotmail.com');
INSERT INTO deck (title, player_email)
	VALUES ('My First Deck', 'gooserjg@hotmail.com');
-- charizard
INSERT INTO card (id, name, supertype, rarity, image_small_url)
	VALUES ('pgo-10', 'Charizard', 'Pokémon', 'Rare Holo', 'https://images.pokemontcg.io/pgo/10.png');
INSERT INTO card_attributes (card_id, attribute, value, data_type)
	VALUES ('pgo-10', 'type', 'Fire', 'string'), ('pgo-10', 'subtype', 'Stage 2', 'string');
INSERT INTO player_cards (player_email, card_id)
	VALUES ('gooserjg@hotmail.com', 'pgo-10');
INSERT INTO decks_cards (deck_id, card_id, is_card_pokemon)
	VALUES (1, 'pgo-10', true);

-- squirtle
INSERT INTO card (id, name, supertype, rarity, image_small_url)
	VALUES ('pgo-15', 'Squirtle', 'Pokémon', 'Common', 'https://images.pokemontcg.io/pgo/15.png');
INSERT INTO card_attributes (card_id, attribute, value, data_type)
	VALUES ('pgo-15', 'type', 'Water', 'string'), ('pgo-15', 'subtype', 'Basic', 'string');
INSERT INTO player_cards (player_email, card_id)
	VALUES ('gooserjg@hotmail.com', 'pgo-15');
INSERT INTO decks_cards (deck_id, card_id, is_card_pokemon)
	VALUES (1, 'pgo-15', true);

-- hop
INSERT INTO card (id, name, supertype, rarity, image_small_url)
	VALUES ('swsh1-165', 'Hop', 'Trainer', 'Uncommon', 'https://images.pokemontcg.io/swsh1/165.png');
INSERT INTO card_attributes (card_id, attribute, value, data_type)
	VALUES ('swsh1-165', 'subtype', 'Supporter', 'string');
INSERT INTO player_cards (player_email, card_id)
	VALUES ('gooserjg@hotmail.com', 'swsh1-165');
INSERT INTO decks_cards (deck_id, card_id, is_card_pokemon)
	VALUES (1, 'swsh1-165', true);
  
-- radiant blastoise
INSERT INTO card (id, name, supertype, rarity, image_small_url)
	VALUES ('pgo-18', 'Radiant Blastoise', 'Pokémon', 'Radiant Rare', 'https://images.pokemontcg.io/pgo/18.png');
INSERT INTO card_attributes (card_id, attribute, value, data_type)
	VALUES ('pgo-18', 'type', 'Water', 'string'), ('pgo-18', 'subtype', 'Basic', 'string'), ('pgo-18', 'subtype', 'Radiant', 'string');
INSERT INTO player_cards (player_email, card_id)
	VALUES ('gooserjg@hotmail.com', 'pgo-18');
INSERT INTO decks_cards (deck_id, card_id, is_card_pokemon)
	VALUES (1, 'pgo-18', true);
	
-- dragonite
INSERT INTO card (id, name, supertype, rarity, image_small_url)
	VALUES ('pgo-49', 'Dragonite V', 'Pokémon', 'Rare Holo V', 'https://images.pokemontcg.io/pgo/49.png');
INSERT INTO card_attributes (card_id, attribute, value, data_type)
	VALUES ('pgo-49', 'type', 'Dragon', 'string'), ('pgo-49', 'subtype', 'Basic', 'string'), ('pgo-49', 'subtype', 'V', 'string');
INSERT INTO player_cards (player_email, card_id)
	VALUES ('gooserjg@hotmail.com', 'pgo-49');
INSERT INTO decks_cards (deck_id, card_id, is_card_pokemon)
	VALUES (1, 'pgo-49', true);
	
-- mewtwo
INSERT INTO card (id, name, supertype, rarity, image_small_url)
	VALUES ('swshp-SWSH223', 'Mewtwo V', 'Pokémon', 'Promo', 'https://images.pokemontcg.io/swshp/SWSH223.png');
INSERT INTO card_attributes (card_id, attribute, value, data_type)
	VALUES ('swshp-SWSH223', 'type', 'Psychic', 'string'), ('swshp-SWSH223', 'subtype', 'Basic', 'string'), ('swshp-SWSH223', 'subtype', 'V', 'string');
INSERT INTO player_cards (player_email, card_id)
	VALUES ('gooserjg@hotmail.com', 'swshp-SWSH223');
INSERT INTO decks_cards (deck_id, card_id, is_card_pokemon)
	VALUES (1, 'swshp-SWSH223', true);
	
-- venusaur v
INSERT INTO card (id, name, supertype, rarity, image_small_url)
	VALUES ('swshp-SWSH100', 'Venusaur V', 'Pokémon', 'Promo', 'https://images.pokemontcg.io/swshp/SWSH100.png');
INSERT INTO card_attributes (card_id, attribute, value, data_type)
	VALUES ('swshp-SWSH100', 'type', 'Grass', 'string'), ('swshp-SWSH100', 'subtype', 'Basic', 'string'), ('swshp-SWSH100', 'subtype', 'V', 'string');
INSERT INTO player_cards (player_email, card_id)
	VALUES ('gooserjg@hotmail.com', 'swshp-SWSH100');
INSERT INTO decks_cards (deck_id, card_id, is_card_pokemon)
	VALUES (1, 'swshp-SWSH100', true);

-- apis
-- just a random get all cards query prob remove idk
SELECT c.id, c.supertype, c.rarity, c.image_small_url, c.is_favorite, ca.attribute, ca.value
FROM card c
JOIN card_attributes ca
	ON c.id = ca.card_id;

-- get user info
SELECT *
FROM player p
WHERE email = 'gooserjg@hotmail.com';
-- post user info
-- create user info
-- delete user info

-- get user decks
SELECT * 
FROM deck
WHERE player_email = 'gooserjg@hotmail.com';
-- update user decks
-- delete user decks
-- insert user decks

-- get deck cards
SELECT dc.deck_id, dc.card_id, dc.is_card_pokemon, 
	dc.count,	c.supertype, c.rarity, c.image_small_url, c.is_favorite
FROM decks_cards dc
JOIN card c
	ON dc.card_id = c.id
WHERE dc.deck_id = 1;
-- update deck cards
-- delete deck cards
-- insert deck cards

-- get all cards in player_cards
SELECT c.*
FROM player_cards co
JOIN card c
	ON co.card_id = c.id
WHERE co.player_email = 'gooserjg@hotmail.com'

-- get deck cards by attribute [type]
--SELECT c.image_small_url
SELECT dc.deck_id, dc.card_id, dc.is_card_pokemon, 
	dc.count,	c.supertype, c.rarity, c.image_small_url, c.is_favorite,
  a.attribute, a.value
FROM card_attributes a
JOIN decks_cards dc
	ON a.card_id = dc.card_id
JOIN deck d
	ON dc.deck_id = d.id
JOIN card c
	ON c.id = a.card_id
WHERE a.attribute = 'type' AND value = 'Water' AND d.player_email = 'gooserjg@hotmail.com';

-- get player cards by attribute [type]
--SELECT c.image_small_url
SELECT *
FROM card_attributes a
JOIN player_cards co
	ON a.card_id = co.card_id
JOIN card c
	ON c.id = a.card_id
WHERE a.attribute = 'type' AND a.value = 'Water' AND co.player_email = 'gooserjg@hotmail.com';


-- app flow
-- on app load
-- 1. log user in/create user
-- 2. retrieve user info
-- 3 get all options for supertypes, types, subtypes and store globally

-- requirements
-- allow user to view decks
-- allow user to create deck
-- allow user to view all cards at one time
-- allow user to view all cards by certain types, subtypes, supertypes
-- allow user to search for cards by name and types, subtypes, supertypes
-- allow user to view a friend's decks
-- allow user to copy a friend's deckss (if you dont have the cards though, what then??)
-- if you dont own a card, grey it out
-- allow user to search decks vs owned cards
-- have a wanted cards section . . .
-- move cards between decks
