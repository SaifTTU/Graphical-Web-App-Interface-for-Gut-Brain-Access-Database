require('dotenv').config();
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

module.exports = pool.promise();

/////////////////////////////////////////////////////////////////////////////
//MY OWN ADDITION: The different queries
/////////////////////////////////////////////////////////////////////////////

let sql1 = "SELECT * FROM ARTICLES;";
let sql2 = "SELECT * FROM ARTICLES_STUDY_DETAILS;";
let sql3 = "SELECT * FROM EDGES_CALCULATION;";
let sql4 = "SELECT * FROM EDGES_REFERENCE;";
let sql5 = "SELECT * FROM LOADS_MEASURED;";


var temp = [];

pool.execute(sql1, function (err, result) {
    if(err) throw err;
    setValue(result);
    console.log(result);
});


function setValue(result) {
    for(var i = 0; i < result.length; i++){
        temp.push(result[i]);
    }
    console.log(temp);
}

/////////////////////////////////////////////////////////////////////////////
//MY OWN ADDITION: Making multiple executes to see what happens
/////////////////////////////////////////////////////////////////////////////



pool.execute(sql2, function (err, result) {
    if(err) throw err;
    console.log(result);
    console.log(result[0]);
});


module.exports = pool.promise();

/////////////////////////////////////////////////////////////////////////////
//MY OWN ADDITION: Trying to get html to change
/////////////////////////////////////////////////////////////////////////////

var path = './html/index.html';
var http = require('http');


http.createServer(function (req, res) {
  var html = buildHtml(req);

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  });
  res.end(html);
}).listen(8000);

//console.log(temp[0,0]);

function buildHtml(req) {
  var header = 'Researchers View';
  var body = 'Select An Option From The Following Drop Down Menu';

  // concatenate header string
  // concatenate body string

    var fullstring = '<!DOCTYPE html>';
    fullstring += '<html><head>' + header; + '</head><body>';
    fullstring += body + '</body>';
    fullstring += '<table border="1" id="t3"><tr align="center"><td class="lbl">Article_ID</td><td class="lbl">Year_Published</td><td class="lbl">LastName_FirstAuthor</td><td class="lbl">Animal_Model</td><td class="lbl">DOI_Link</td><td class="lbl">Link_Verified</td></tr><tr>';
    

    var sizeOfTable = temp.length;
    for(i=0; i<sizeOfTable;i++){
        var temp1= temp[i]['ARTICLE_ID'];
        var temp2= temp[i]['YEAR_PUBLISHED'];
        var temp3= temp[i]['FIRST_AUTHOR'];
        var temp4= temp[i]['ANIMAL_MODEL'];
        var temp5= temp[i]['DOI_ETC'];
        fullstring+='<td align="center">'
        fullstring+=i;
        fullstring+='</td><td align="center">';
        console.log(temp1);
        fullstring+=temp1;
        fullstring+='</td><td align="center">';
        fullstring+=temp2;
        fullstring+='</td><td align="center">';
        fullstring+=temp3;
        fullstring+='</td><td align="center">';
        fullstring+=temp4;
        fullstring+='<td align="center">';
        fullstring+=temp5;
        fullstring+='</td></tr>';
    }
    
    
    fullstring +='</table>';
    fullstring +='</html>';
    

  return fullstring;
};