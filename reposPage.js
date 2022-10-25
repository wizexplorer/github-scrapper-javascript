const request = require("request");
const cheerio = require("cheerio");
const getIssuesHtml = require("./issues");
function getReposPageHtml(url, topic) {
    request(url, callBack);
    function callBack(err, response, html) {
        if (err) { console.log(err); }
        else {
            // console.log(html);
            getReposLink(html, topic);
    }
    }
}
function getReposLink (html, topic) {
    let $ = cheerio.load(html);
    let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");  //dont use space(" ") if all the classes are for same obj
    // console.log(topic)
    for (let i = 0; i < 8; i++) {
        let twoAnchors = $(headingsArr[i]).find("a");
        let link = $(twoAnchors[1]).attr("href");
        // console.log(link);
        let repo = link.split("/").pop()
        let issuesLink = `https://github.com/${link}/issues`;
        getIssuesHtml(issuesLink, topic, repo);
    }
}

module.exports = getReposPageHtml;
