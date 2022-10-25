const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./reposPage");
let url = "https://github.com/topics"
request(url, callBack);
function callBack(err, response, html) {
    if (err) { console.log(err); }
    else {getTopicLinks(html)}
}

function getTopicLinks(html) {
    let $ = cheerio.load(html);
    let linkElemArr = $("ul>li>div>a");
    for (let i = 0; i < linkElemArr.length; i++) {
        let link = $(linkElemArr[i]).attr("href");
        link = `https://github.com${link}`;
        // console.log(link);
        let topic = link.split("/").pop()
        // let topic = link.split("/")[4]  // [-1] for last element doesn't work.
        // console.log(topic);
        getReposPageHtml(link, topic);
    }
}