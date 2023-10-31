// Only written text allowed
var writtenTweets = []

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	// Make it Tweet class to find written boolean and written Text
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});


	for (let i of tweet_array) { // Makes sure text is written then pushes to array
		if (i.written === true) {
			writtenTweets.push(i)
			}
		}
}

//Checks when something is being typed in the box and adds to array 
function addEventHandlerForSearch() {
	const textFilt = document.querySelector('#textFilter');
	textFilt.addEventListener("input", function() {
		document.getElementById("searchText").innerText = this.value;
		var searchArray = [];
		for (let i of writtenTweets){
			if (i.text.includes(this.value)){
				searchArray.push(i)
			} 
		document.getElementById("searchCount").innerText = searchArray.length
		}
	//	var tableArray = []
		for (let j = 0; j < searchArray.length; j++){
			var tweet = searchArray[j]
			
		}
	//	getHTMLTableRow(searchArray.length)
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});