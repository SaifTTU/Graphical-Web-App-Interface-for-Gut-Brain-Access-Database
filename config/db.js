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
var article_details_list= [];
var edges_calculations_list= [];
var edges_reference_list= [];
var loads_measured_list= [];

// 1A
/// EXECUTE ARTICLES
pool.execute(sql1, function (err, result) {
    if(err) throw err;
    setValue(result);
    //console.log(result);
});
// 1B
/// APPEND ARTICLES
function setValue(result) {
    for(var i = 0; i < result.length; i++){
        temp.push(result[i]);
    }
    //console.log(temp+ "TABLE1");
}
/////////////////////////////////
// 2A
/// EXECUTE ARTICLES_DETAILS_LIST
pool.execute(sql2, function (err, result2) {
    if(err) throw err;
    setValue2(result2);
    console.log(result2);
    //article_details_list=result2;
});
// 2B
/// APPEND ARTICLE_DETAILS_LIST
function setValue2(result2) {
    for(var i = 0; i < result2.length; i++){
        article_details_list.push(result2[i]);
    }
}

///////////////////////////////////
// 3A
/// EXECUTE EDGES_CALCULATIONS_LIST
pool.execute(sql3, function (err, result3) {
    if(err) throw err;
    setValue3(result3);
    console.log(result3);
    //temp3=result3;
});
// 3B
/// APPEND EDGES_CALCULATIONS_LIST
function setValue3(result3) {
    for(var i = 0; i < result3.length; i++){
        edges_calculations_list.push(result3[i]);
    }
}


///////////////////////////////////
// 4A
/// EXECUTE EDGES_REFERENCE_LIST
pool.execute(sql4, function (err, result4) {
    if(err) throw err;
    setValue4(result4);
    console.log(result4);
    //temp3=result3;
});
// 4B
/// APPEND EDGES_REFERENCE_LIST
function setValue4(result4) {
    for(var i = 0; i < result4.length; i++){
        edges_reference_list.push(result4[i]);
    }
}


///////////////////////////////////
// 5A
/// EXECUTE LOADS_MEASURED_LIST
pool.execute(sql5, function (err, result5) {
    if(err) throw err;
    setValue5(result5);
    console.log(result5);
    //temp3=result3;
});
// 5B
/// APPEND LOADS_MEASURED_LIST
function setValue5(result5) {
    for(var i = 0; i < result5.length; i++){
        loads_measured_list.push(result5[i]);
    }
}


console.log(article_details_list.length + "ALL of table2'S LENGTH");


/////////////////////////////////////////////////////////////////////////////
//MY OWN ADDITION: Making multiple executes to see what happens
/////////////////////////////////////////////////////////////////////////////






module.exports = pool.promise();

/////////////////////////////////////////////////////////////////////////////
//MY OWN ADDITION: Trying to get html to change
/////////////////////////////////////////////////////////////////////////////

var path = './html/index.html';
var http = require('http');
const { load } = require('dotenv');


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
  var header = '<h1>Researchers View</h1>';
  var body = 'Select An Option From The Following Drop Down Menu';

  // concatenate header string
  // concatenate body string

    var fullhtml = '<!DOCTYPE html>';
    fullhtml += '<html><head>' + header; + '</head><body>';
    fullhtml += body + '</body>';
    
    
    // // // BEGIN ARTICLES ////////////// /////
    //////////////////////////////////////////
    fullhtml += '<table border="1" id="t1">';
    fullhtml += '     <tr align="center">';
    fullhtml += '     <td class="lbl">Article_ID</td>';
    fullhtml += '     <td class="lbl">Year_Published</td>';
    fullhtml += '     <td class="lbl">LastName_FirstAuthor</td>';
    fullhtml += '     <td class="lbl">Animal_Model</td>';
    fullhtml += '     <td class="lbl">DOI_Link</td>';
    fullhtml += '     <td class="lbl">Link_Verified</td>';
    fullhtml += '</tr>';
    

    var sizeOfTable = temp.length;

    for(i=0; i<sizeOfTable;i++){
        var temp1= temp[i]['ARTICLE_ID'];
        var temp2= temp[i]['YEAR_PUBLISHED'];
        var temp3= temp[i]['FIRST_AUTHOR'];
        var temp4= temp[i]['ANIMAL_MODEL'];
        var temp5= temp[i]['DOI_ETC'];
        var temp6= temp[i]['LINK_VERIFIED'];
        fullhtml+='<td align="center">'
        fullhtml+=temp1;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp2;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp3;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp4;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp5;
        fullhtml+='<td align="center">';
        fullhtml+=temp6;
        fullhtml+='</td></tr>';
    }
    
    fullhtml +='</table>';
    //////// END ARTICLES ///////// 
    ///////////////////////////////    

    
    ///// / / BEGIN ARTICLES_STUDY_DETAILS / / /////
    ////////////////////////////////////////////////  
    fullhtml +='<table border="1" id="t2">';
    //fullhtml += '<table border="1" id="t3">';
    fullhtml += '     <tr align="center">';
    fullhtml += '     <td class="lbl">Article_ID</td>';
    fullhtml += '     <td class="lbl">ARTICLE_SUB_ID</td>';
    fullhtml += '     <td class="lbl">ANIMAL_STATE</td>';
    fullhtml += '     <td class="lbl">ANIMAL_SEX</td>';
    fullhtml += '     <td class="lbl">ANIMAL_DISTINCTION</td>';
    fullhtml += '     <td class="lbl">EXPERIMENT_CONDITION/td>';
    fullhtml += '</tr>';
    
    // GET LENGTH--NUM ROWS OF TABLE
    var sizeOfTable2 = article_details_list.length;
    console.log(article_details_list.length);

    // LOOPS BASED ON LENGTH (num rows)
    for(i2=0; i2<sizeOfTable2;i2++){
        var temp2_1= article_details_list[i2]['ARTICLE_ID'];
        var temp2_2= article_details_list[i2]['ARTICLE_SUB_ID'];
        var temp2_3= article_details_list[i2]['ANIMAL_DISTINCTION'];
        var temp2_4= article_details_list[i2]['ANIMAL_SEX'];
        var temp2_5= article_details_list[i2]['ANIMAL_STATE'];
        var temp2_6= article_details_list[i2]['EXPERIMENT_CONDITIONS'];
        fullhtml+='<td align="center">'
        //console.log(temp1);
        fullhtml+=temp2_1;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp2_2;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp2_3;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp2_4;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp2_5;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp2_6;
        fullhtml+='</td></tr>';
    }
    
    fullhtml +='</table>';
    ///// / / END ARTICLES_STUDY_DETAILS / / /////
    ////////////////////////////////////////////////

        ///// / / BEGIN EDGES_CALCULATIONS/ / /////
    ////////////////////////////////////////////////  
    fullhtml +='<table border="1" id="t3">';
    //fullhtml += '<table border="1" id="t3">';
    fullhtml += '     <tr align="center">';
    fullhtml += '     <td class="lbl">EDGES_NUM_ID</td>';
    fullhtml += '     <td class="lbl">EDGE_CHAR_ID</td>';
    fullhtml += '     <td class="lbl">SOURCE_ABBREV</td>';
    fullhtml += '     <td class="lbl">SINK_ABBREV</td>';
    fullhtml += '     <td class="lbl">LOAD_ABBREVIATION</td>';
    fullhtml += '     <td class="lbl">AMOUNT</td>';
    fullhtml += '     <td class="lbl">UNITS</td>';
    fullhtml += '     <td class="lbl">VALID_LOAD</td>';
    fullhtml += '</tr>';
    
    // GET LENGTH--NUM ROWS OF TABLE
    var sizeOfTable2 = edges_calculations_list.length;
    console.log(edges_calculations_list.length);

    // LOOPS BASED ON LENGTH (num rows)
    for(i2=0; i2<sizeOfTable2;i2++){
        var temp3_1= edges_calculations_list[i2]['EDGE_NUM_ID'];
        var temp3_2= edges_calculations_list[i2]['EDGE_CHAR_ID'];
        var temp3_3= edges_calculations_list[i2]['SOURCE_ABBREV'];
        var temp3_4= edges_calculations_list[i2]['SINK_ABBREV'];
        var temp3_5= edges_calculations_list[i2]['LOAD_ABBREV'];
        var temp3_6= edges_calculations_list[i2]['AMOUNT'];
        var temp3_7= edges_calculations_list[i2]['UNITS'];
        var temp3_8= edges_calculations_list[i2]['VALID_LOAD'];
        fullhtml+='<td align="center">'
        //console.log(temp1);
        fullhtml+=temp3_1;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp3_2;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp3_3;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp3_4;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp3_5;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp3_6;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp3_7;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp3_8;
        fullhtml+='</td></tr>';
    }
    
    fullhtml +='</table>';
    ///// / / END EDGES_CALCULATIONS / / /////
    ////////////////////////////////////////////////




    ///// / / BEGIN EDGES_REFERENCES/ / /////
    ////////////////////////////////////////////////  
    fullhtml +='<table border="1" id="t4">';
    //fullhtml += '<table border="1" id="t4">';
    fullhtml += '     <tr align="center">';
    fullhtml += '     <td class="lbl">EDGE_NUM_ID</td>';
    fullhtml += '     <td class="lbl">EDGE_CHAR_ID</td>';
    fullhtml += '     <td class="lbl">EDGE_SOURCE</td>';
    fullhtml += '     <td class="lbl">SINK</td>';
    fullhtml += '     <td class="lbl">EDGE_LOAD</td>';
    fullhtml += '     <td class="lbl">ARTICLE_ID</td>';
    fullhtml += '</tr>';
    
    // GET LENGTH--NUM ROWS OF TABLE
    var sizeOfTable2 = edges_reference_list.length;
    console.log(edges_reference_list.length);

    // LOOPS BASED ON LENGTH (num rows)
    for(i2=0; i2<sizeOfTable2;i2++){
        var temp4_1= edges_reference_list[i2]['EDGE_NUM_ID'];
        var temp4_2= edges_reference_list[i2]['EDGE_CHAR_ID'];
        var temp4_3= edges_reference_list[i2]['EDGE_SOURCE'];
        var temp4_4= edges_reference_list[i2]['SINK'];
        var temp4_5= edges_reference_list[i2]['EDGE_LOAD'];
        var temp4_6= edges_reference_list[i2]['ARTICLE_ID'];
        fullhtml+='<td align="center">'
        //console.log(temp1);
        fullhtml+=temp4_1;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp4_2;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp4_3;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp4_4;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp4_5;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp4_6;
        fullhtml+='</td></tr>';
    }
    
    fullhtml +='</table>';
    ///// / / END EDGE_REFERENCE / / /////
    ////////////////////////////////////////////////




    ///// / / BEGIN LOADS_MEASURED/ / /////
    ////////////////////////////////////////////////  
    fullhtml +='<table border="1" id="t5">';
    //fullhtml += '<table border="1" id="t4">';
    fullhtml += '     <tr align="center">';
    fullhtml += '     <td class="lbl">ARTICLE_ID</td>';
    fullhtml += '     <td class="lbl">ARTICLE_SUB_ID</td>';
    fullhtml += '     <td class="lbl">TYPE_LOAD</td>';
    fullhtml += '     <td class="lbl">NAME_LOAD</td>';
    fullhtml += '     <td class="lbl">LOCATION</td>';
    fullhtml += '     <td class="lbl">AMOUNT</td>';
    fullhtml += '     <td class="lbl">UNITS</td>';
    fullhtml += '     <td class="lbl">HOW_MEASURED</td>';
    fullhtml += '</tr>';
    
    // GET LENGTH--NUM ROWS OF TABLE
    var sizeOfTable2 = loads_measured_list.length;
    console.log(loads_measured_list.length);

    // LOOPS BASED ON LENGTH (num rows)
    for(i2=0; i2<sizeOfTable2;i2++){
        var temp5_1= loads_measured_list[i2]['ARTICLE_ID'];
        var temp5_2= loads_measured_list[i2]['ARTICLE_SUB_ID'];
        var temp5_3= loads_measured_list[i2]['TYPE_LOAD'];
        var temp5_4= loads_measured_list[i2]['NAME_LOAD'];
        var temp5_5= loads_measured_list[i2]['LOCATION'];
        var temp5_6= loads_measured_list[i2]['AMOUNT'];
        var temp5_7= loads_measured_list[i2]['UNITS'];
        var temp5_8= loads_measured_list[i2]['HOW_MEASURED'];
        fullhtml+='<td align="center">'
        //console.log(temp1);
        fullhtml+=temp5_1;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp5_2;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp5_3;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp5_4;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp5_5;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp5_6;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp5_7;
        fullhtml+='</td><td align="center">';
        fullhtml+=temp5_8;
        fullhtml+='</td></tr>';
    }
    
    fullhtml +='</table>';
    ///// / / END LOADS_MEASURED / / /////
    ////////////////////////////////////////////////






    fullhtml +='</html>';
    

  return fullhtml;
};