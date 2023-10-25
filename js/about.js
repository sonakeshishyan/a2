function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var completed = 0
	var live = 0
	var achievement = 0
	var misc = 0

	var early = new Date()
	var latest = new Date(-1)

	for (let i of tweet_array) {
		if (i.source === 'completed_event') {
			completed += 1
		}
		if (i.source === 'live_event') {
			live += 1
		}
		if (i.source === 'achievement') {
			achievement += 1
		}
		if (i.source === 'miscellaneous'){
			misc += 1
		}
		if (i.time < early) {
			early = i.time
		}
		if (i.time > latest) {
			latest = i.time
		}
	};



	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	const format1 = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}

	document.getElementById('numberTweets').innerText =  tweet_array.length	
	document.getElementById('firstDate').innerText = early.toLocaleDateString('en-US',format1)
	document.getElementById('lastDate').innerText = latest.toLocaleDateString('en-US',format1)

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});