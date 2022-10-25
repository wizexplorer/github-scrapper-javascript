const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuesHtml(url, topic, repo) {
    request(url, callBack);
    function callBack(err, response, html) {
        if (err) { console.log(err); }
        else {
            // console.log(html);
            getIssues(html, topic, repo);
    }
    }
}
function getIssues (html, topic, repo) {
    let $ = cheerio.load(html);
    let issueElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let issuesArr = [];
    for (let i = 0; i<issueElemArr.length; i++) {
        let link = $(issueElemArr[i]).attr("href");
        // console.log(link);
        issuesArr.push(link);
    }
    // console.log(topic, "      ", issuesArr);
    let folderPath = path.join(__dirname, topic);
    dirCreator(folderPath);
    let filePath = path.join(folderPath, repo + ".pdf");
    let textData = JSON.stringify(issuesArr);
    let pdfDoc = new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(textData);
    pdfDoc.end();
    // to create json file instead of pdf :-
    // let filepath = path.join(folderPath, repo + ".json");
    // fs.writeFileSync(filePath, textData);
}

function dirCreator (folderPath) {
    if (!fs.existsSync(folderPath)) {fs.mkdirSync(folderPath);}
}


module.exports = getIssuesHtml;