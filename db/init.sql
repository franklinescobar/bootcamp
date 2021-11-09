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
CREATE OR REPLACE PROCEDURE public.insert_transaction(IN account_number_in character varying, IN destination_account_in character varying, IN amount_in numeric, IN category_in integer)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
   _first_id varchar(50);
    _destination_account_id varchar(50);
       _is_income varchar(50);
  _category_for_destination int;
  _is_income_for_destination  varchar(50);
  _first_id_for_destination varchar(50);
   _currency_symbol_account int;
  _currency_symbol_destination_account  int;
   _client_account  varchar(50);
   _client_destination_account  varchar(50); 
    _currency_from    varchar(3);
    _currency_to    varchar(3);
       _rate    decimal(8,6);
begin
   SELECT account_number from transaction where account_number  = account_number_in INTO _first_id;
     SELECT "number" from account where "number"  =destination_account_in  INTO _destination_account_id;
     SELECT categorytype  from category where id =category_in INTO _is_income;
       SELECT currency from account where "number"  = account_number_in INTO _currency_symbol_account;
        SELECT client from account where "number"  = account_number_in INTO _client_account;
           select m.descripcion from account a , moneda m
where a.currency  =  m.moneda  and a."number"  =  account_number_in  into _currency_from;
       -- SELECT currency from account where "number"  = destination_account_in INTO _currency_symbol_destination_account;
      --  SELECT client from account where "number"  = destination_account_in INTO _client_destination_account;
  -- VALIDAR SI HAY REGISTROS DE LA CUENTA
  -- VALIDAR QUE EXISTA LA CUENTA DESTINO Y VALIDAR QUE TENGA TRANSACCION.
 if  _first_id !='' then 
  INSERT INTO transaction  (account_number, destination_account, amount, previus_balance, balance, client, transaction_date  , currency, category_id)
    select  account_number_in,destination_account_in ,amount_in, balance   ,(case when _is_income ='INCOME' THEN balance + amount_in else balance - amount_in END) , client, CURRENT_TIMESTAMP  , currency, category_in
    from transaction t where t.account_number= account_number  ORDER BY t.id  DESC    LIMIT 1; 
  elsE 
  INSERT INTO transaction  (account_number, destination_account, amount, previus_balance, balance, client, transaction_date  , currency, category_id)
   values(  account_number_in,destination_account_in ,amount_in, 0   , amount_in, _client_account, CURRENT_TIMESTAMP  ,_currency_symbol_account, category_in);
  end if;
 update account set balance  = (select balance  
 from transaction t where t.account_number= account_number_in  ORDER BY t.id  DESC    LIMIT 1
 ) where "number" = account_number_in;
 -- DEBITO O CREDITO SI EXISTE LA OTRA CUENTA 
 if _destination_account_id != '' then
      SELECT idcategory  from category where id =category_in INTO _category_for_destination;
   SELECT categorytype  from category where id =_category_for_destination INTO _is_income_for_destination;
  SELECT account_number from  transaction where account_number =destination_account_in  INTO _first_id_for_destination;
      SELECT currency from account where "number"  = destination_account_in INTO _currency_symbol_destination_account;
        SELECT client from account where "number"  = destination_account_in INTO _client_destination_account;      
               select m.descripcion from account a , moneda m
where a.currency  =  m.moneda  and a."number"  =  destination_account_in  into _currency_to;
_rate = 1;
IF EXISTS (select factor  from  currency_convertion where from_currency  =  _currency_from and to_currency  = _currency_to) THEN
select factor  from  currency_convertion where from_currency  =  _currency_from and to_currency  = _currency_to into _rate;
END IF;      
 if  _first_id_for_destination !='' then
     INSERT INTO transaction  (account_number, destination_account, amount, previus_balance, balance, client, transaction_date  , currency, category_id)
    select  destination_account_in,account_number_in ,amount_in *_rate, balance   , (case when _is_income_for_destination ='INCOME' THEN  balance + amount_in *_rate else balance - amount_in * _rate END), client, CURRENT_TIMESTAMP  , currency, _category_for_destination
    from transaction t where t.account_number= destination_account_in  ORDER BY t.id  DESC    LIMIT 1;
else
  INSERT INTO transaction  (account_number, destination_account, amount, previus_balance, balance, client, transaction_date  , currency, category_id)
   values(  destination_account_in,account_number_in ,amount_in *_rate, 0   , amount_in*_rate, _client_destination_account, CURRENT_TIMESTAMP  , _currency_symbol_destination_account, _category_for_destination);
end if;
 update account set balance  = (select balance  
 from transaction t where t.account_number= destination_account_in  ORDER BY t.id  DESC    LIMIT 1
 ) where "number" = destination_account_in;
   end if;
END
$procedure$
;
