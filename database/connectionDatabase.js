var alasql = require('alasql');

var mybase = new alasql.Database();

const table_product = "CREATE TABLE product (id INT UNIQUE PRIMARY KEY NOT NULL ,name STRING)";
const table_product_shop = "CREATE TABLE product_shop (id INT PRIMARY KEY , shop_price_product STRING, product_id_fk INT, shops_id_fk INT )";
const table_shop = "CREATE TABLE shop (id INT PRIMARY KEY , shop_price_product STRING, product_id_fk INT, shops_id_fk INT )";
const table_review = "CREATE TABLE review (id INT PRIMARY KEY , shop_price_product STRING, product_id_fk INT, shops_id_fk INT )";
const table_review_comment = "CREATE TABLE review_comment (id INT PRIMARY KEY , shop_price_product STRING, product_id_fk INT, shops_id_fk INT )";
const table_user = "CREATE TABLE user (id INT PRIMARY KEY , shop_price_product STRING, product_id_fk INT, shops_id_fk INT )";
const table_questions = "CREATE TABLE questions (id INT PRIMARY KEY , shop_price_product STRING, product_id_fk INT, shops_id_fk INT )";
const table_questions_answers = "CREATE TABLE questions_answers (id INT PRIMARY KEY , shop_price_product STRING, product_id_fk INT, shops_id_fk INT )";
const table_product_information = "CREATE TABLE product_information (id INT PRIMARY KEY , shop_price_product STRING, product_id_fk INT, shops_id_fk INT )";

function createTables() {
    mybase.exec(table_product)
}