const Articles = require('../models/Articles');

exports.getAllPosts = async (req,res,next) => {
    try{
        const posts = await Articles.findAll();

        res.status(200).json({posts});
    } catch(error){
        console.log(error);
        next(error);
    }
    
    res.send("Get all posts route");
};

exports.createNewPost = async (req,res,next) => {
    try{
        let {article_id, year_published} = req.body;
        let article = new Articles(01,"first post","year of first post", "first author", "animal model", "doi link test", TRUE);
        
        article = await article.save();

        console.log(article);
        
        res.status(201).json({message: "Created Post"});
        //res.send("Create new post route");
    } catch(error){
        console.log(error);
        next(error);
    }
    
};
exports.getPostByID = async (req,res,next) => {
    res.send("Get post by ID Route");
    try{
        let articleId = req.params.id;

        //gets only the row data not the field data from posts
        let [article,_] = await Articles.findById(articleId);

        res.status(200).json({article});
    }
    catch(error){
        console.log(error);
        next(error);
    }
};