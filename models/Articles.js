//blue print for post table object
const db = require('../config/db');

class Articles{
    constructor(article_id,year_published, first_author, animal_model, doi_etc, link_verified){
        this.article_id = article_id;
        this.year_published = year_published;
        this.first_author = first_author;
        this.animal_model = animal_model;
        this.doi_etc = doi_etc;
        this.link_verified = link_verified;
    }
    //saves to the database
    async save(){
        let sql  = 
        'INSERT INTO articles(
        article_id,
        year_published,
        first_author,
        animal_model,
        doi_etc,
        link_verified
        )
        VALUES(
        '${this.article_id}',
        '${this.year_published}',
        '${first_author}',
        '${animal_model}',
        '${doi_etc}',
        '${link_verified}'
        )
        ';

        const [newPost, _] = await db.execute(sql);
        return newPost;
    }

    static findAll(){
        let sql = 'SELECT * FROM articles;';

        return db.execute(sql);
    }

    static findById(id){
        let sql = 'SELECT * FROM articles WHERE article_id = ${id};';

        return db.execute(sql);
    }
}

module.exports = Articles;