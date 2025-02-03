const request = require("request");

const BASE_URL = "https://openlibrary.org/search.json?q=";


function getBookData(query, callback) {
    const url = BASE_URL + encodeURIComponent(query);

    request(url, function (error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            try {
                const bookData = JSON.parse(body);
                callback(null, bookData);
            } catch (parseError) {
                callback(parseError, null);
            }
        }
    });
}



getBookData("The Lord of the Rings", (error, data) => {
    if (error) {
        console.error("Error fetching data:", error);
    } else {
        console.log("Total Books :", data.numFound);
        console.log("Title:", data.docs[0].title);
        console.log("Author:", data.docs[0].author_name );
        console.log("Year:", data.docs[0].first_publish_year);
        console.log("Languages:", data.docs[0].language );
    }
});
