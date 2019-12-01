var alasql = require('alasql');
var database = new alasql.Database();

const table_product = "CREATE TABLE product (id INT UNIQUE PRIMARY KEY NOT NULL, name varchar(40))";
const table_product_shop = "CREATE TABLE product_shop (id INT PRIMARY KEY, shop_price_product varchar(20), product_id_fk INT, shops_id_fk INT )";
const table_shop = "CREATE TABLE shop (id INT PRIMARY KEY, shop_price_product varchar(20))";
const table_review = "CREATE TABLE review (id INT PRIMARY KEY, review_stars varchar(20), review_opinion INT, upvotes INT, downvotes INT, date_creation DATE, product_id_fk INT,created_by_user_id INT) ";
const table_review_comment = "CREATE TABLE review_comment (id INT PRIMARY KEY, review_stars varchar(20), date_creation DATE, review_id INT, created_by_user_id INT)";
const table_user = "CREATE TABLE user (id INT PRIMARY KEY, user_name varchar(20))";
const table_questions = "CREATE TABLE questions (id INT PRIMARY KEY , question_string STRING, date_creation DATE, upvotes INT, downvotes INT, created_by_user_id INT )";
const table_questions_answers = "CREATE TABLE questions_answers (id INT PRIMARY KEY , date_creation date, upvotes INT, downvotes INT, created_by_user_id INT, question_id INT)";
const table_product_information = "CREATE TABLE product_information (id INT PRIMARY KEY , product_description varchar(700), product_producent varchar(100), product_id_fk int)";

async function alterTableWithRelations() {

}

async function createTables() {
    // database.exec(table_product);
    database.exec(table_product + ";"
        + table_product_shop + ";"
        + table_shop + ";"
        + table_review + ";"
        + table_review_comment + ";"
        + table_user + ";"
        + table_questions + ";"
        + table_questions_answers + ";"
        + table_product_information + ";"
    );
}

(async () => {
    await createTables();
    await alterTableWithRelations();

    // database.exec("INSERT INTO product VALUES (1, 'Product1')");
    // console.log("Database created");
    // database.exec('SELECT * FROM product', [], function(res){
    //     console.log(res);
    // });

    // database.exec("INSERT INTO product_shop VALUES (1, 'Product1',20,25)");
    // console.log("Database created");
    // database.exec('SELECT * FROM product_shop', [], function(res){
    //     console.log(res);
    // });
})();


// ALTER TABLE `product_shop` ADD FOREIGN KEY (`product_id_fk`) REFERENCES `product` (`id`);
//
// ALTER TABLE `product_shop` ADD FOREIGN KEY (`shops_id_fk`) REFERENCES `shop` (`id`);
//
// ALTER TABLE `review` ADD FOREIGN KEY (`product_id_fk`) REFERENCES `product` (`id`);
//
// ALTER TABLE `review` ADD FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`);
//
// ALTER TABLE `review_comment` ADD FOREIGN KEY (`review_id`) REFERENCES `review` (`id`);
//
// ALTER TABLE `review_comment` ADD FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`);
//
// ALTER TABLE `question` ADD FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`);
//
// ALTER TABLE `question_answer` ADD FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`id`);
//
// ALTER TABLE `question_answer` ADD FOREIGN KEY (`question_id`) REFERENCES `question` (`id`);
//
// ALTER TABLE `product_information` ADD FOREIGN KEY (`product_id_fk`) REFERENCES `product` (`id`);