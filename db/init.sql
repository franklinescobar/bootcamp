CREATE TABLE account (
	id serial4 NOT NULL,
	"number" varchar(50) NOT NULL,
	balance numeric(8, 4) NULL,
	description varchar(500) NOT NULL,
	opendate timestamp NULL,
	client varchar(50) NOT NULL,
	currency int8 NULL,
	status int8 NULL,
	cuenta_tipo int4 NULL,
	account_type int4 NULL,
	CONSTRAINT account_pkey PRIMARY KEY (id)
);
CREATE TABLE category (
	id serial4 NOT NULL,
	description varchar(50) NOT NULL,
	idcategory int4 NOT NULL,
	categorytype varchar(20) NOT NULL,
	CONSTRAINT category_description_key UNIQUE (description),
	CONSTRAINT category_pkey PRIMARY KEY (id)
);
CREATE TABLE cuenta_tipo (
	cuenta_tipo int4 NOT NULL,
	descripcion bpchar(50) NOT NULL,
	add_fecha timestamp NULL,
	CONSTRAINT cuenta_tipo_pkey PRIMARY KEY (cuenta_tipo)
);
CREATE TABLE currency_convertion (
	id serial4 NOT NULL,
	from_currency varchar(3) NOT NULL,
	to_currency varchar(3) NOT NULL,
	factor numeric(8, 2) NULL,
	CONSTRAINT currency_convertion_pkey PRIMARY KEY (id)
);
CREATE TABLE moneda (
	moneda serial4 NOT NULL,
	descripcion varchar(50) NOT NULL,
	add_fecha timestamp NULL,
	simbolo varchar(3) NULL,
	CONSTRAINT moneda_pkey PRIMARY KEY (moneda)
);
CREATE TABLE "transaction" (
	id serial4 NOT NULL,
	account_number varchar(50) NOT NULL,
	destination_account varchar(50) NOT NULL,
	amount numeric(8, 4) NULL,
	previus_balance numeric(8, 4) NULL,
	balance numeric(8, 4) NULL,
	client varchar(50) NOT NULL,
	transaction_date timestamp NULL,
	currency int8 NOT NULL,
	category_id int4 NULL,
	CONSTRAINT transaction_pkey PRIMARY KEY (id)
);

CREATE TABLE usuario (
	usuario varchar(500) NOT NULL,
	correo varchar(500) NOT NULL,
	add_fecha timestamp NULL
);
INSERT INTO moneda
(descripcion, add_fecha, simbolo)
VALUES('USD', CURRENT_TIMESTAMP, '$');
INSERT INTO moneda
(descripcion, add_fecha, simbolo)
VALUES('EUR', CURRENT_TIMESTAMP, '€');
INSERT INTO currency_convertion
(from_currency, to_currency, factor)
VALUES('USD', 'EUR', 0.862061);
INSERT INTO currency_convertion
(from_currency, to_currency, factor)
VALUES('EUR', 'USD', 1.159920);
INSERT INTO cuenta_tipo
(cuenta_tipo, descripcion, add_fecha)
VALUES(1, 'AHORRO', CURRENT_TIMESTAMP);
INSERT INTO cuenta_tipo
(cuenta_tipo, descripcion, add_fecha)
VALUES(2, 'CORRIENTE', CURRENT_TIMESTAMP);
INSERT INTO category
(description, idcategory, categorytype)
VALUES('Recepcion de remesa', 0, 'INCOME');
INSERT INTO category
(description, idcategory, categorytype)
VALUES('Movimiento hacia cuenta', 3, 'EXPENSE');
INSERT INTO category
(description, idcategory, categorytype)
VALUES('Recepcion de cuenta interna', 0, 'INCOME');