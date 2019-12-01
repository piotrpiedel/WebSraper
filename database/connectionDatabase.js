const alaSQL = require('alasql');
const database = new alaSQL.Database();

// important alaSql does not handle alter table with foreign key so it must be created at table creation
// order is important in this case
// tables creation - it is really painful to create tables so try to cheer up;

const table_product = "CREATE TABLE product " +
    "(id INT UNIQUE PRIMARY KEY NOT NULL," +
    " name varchar(40));";

const table_product_shop = "CREATE TABLE product_shop (" +
    "id INT PRIMARY KEY," +
    " shop_price_product varchar(20), " +
    "product_id_fk INT REFERENCES product(id)," +
    " shops_id_fk INT REFERENCES shop(id));";

const table_shop = "CREATE TABLE shop " +
    "(id INT PRIMARY KEY, " +
    "shop_price_product varchar(20));";

const table_user = "CREATE TABLE user " +
    "(id INT PRIMARY KEY, " +
    "user_name varchar(20));";

const table_review = "CREATE TABLE review" +
    " (id INT PRIMARY KEY, " +
    "review_stars varchar(20), " +
    "review_opinion INT," +
    " upvotes INT," +
    " downvotes INT, " +
    "date_creation DATE," +
    " product_id_fk INT REFERENCES  product (id)," +
    "created_by_user_id INT REFERENCES  user  (id)); ";

const table_review_comment = "CREATE TABLE review_comment " +
    "(id INT PRIMARY KEY, " +
    "review_stars varchar(20), " +
    "date_creation DATE," +
    " review_id INT REFERENCES review (id), " +
    "created_by_user_id INT REFERENCES user (id));";


const table_questions = "CREATE TABLE question " +
    "(id INT PRIMARY KEY , " +
    "question_string STRING," +
    " date_creation DATE," +
    " upvotes INT," +
    " downvotes INT, " +
    "created_by_user_id INT REFERENCES user (id));";

const table_questions_answers = "CREATE TABLE questions_answers " +
    "(id INT PRIMARY KEY," +
    " date_creation date," +
    " upvotes INT," +
    " downvotes INT," +
    " created_by_user_id INT REFERENCES user (id)," +
    " question_id INT REFERENCES  question (id));";

const table_product_information = "CREATE TABLE product_information " +
    "(id INT PRIMARY KEY," +
    " product_description varchar(700)," +
    " product_producent varchar(100)," +
    " product_id_fk int REFERENCES product(id));";

async function createTables() {
    database.exec(table_user);
    database.exec(table_product);
    database.exec(table_shop);
    database.exec(table_product_shop);
    database.exec(table_review);
    database.exec(table_review_comment);
    database.exec(table_questions);
    database.exec(table_questions_answers);
    database.exec(table_product_information);
}

(async () => {
    await createTables().catch(console.error);

    database.exec("INSERT INTO product VALUES (1, 'Product1')");
    console.log("Database created");
    database.exec('SELECT * FROM product', [], function (res) {
        console.log(res);
    });

    // database.exec("INSERT INTO product_shop VALUES (1, 'Product1',20,25)");
    // console.log("Database created");
    // database.exec('SELECT * FROM product_shop', [], function (res) {
    //     console.log(res);
    // });
})();