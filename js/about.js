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
 
	var written = 0

	for (let i of tweet_array) {
		if (i.written === true){
			written += 1
		}
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
	
	document.getElementsByClassName('completedEvents')[0].textContent = completed
	document.getElementsByClassName('completedEvents')[1].textContent = completed
	document.getElementsByClassName('completedEventsPct')[0].textContent = math.format(completed/tweet_array.length * 100, {notation: 'fixed', precision: 2}) + '%'

	document.getElementsByClassName('liveEvents')[0].textContent = live
	document.getElementsByClassName('liveEventsPct')[0].textContent =  math.format(live/tweet_array.length * 100, {notation: 'fixed', precision: 2}) + '%'

	document.getElementsByClassName('achievements')[0].textContent = achievement
	document.getElementsByClassName('achievementsPct')[0].textContent = math.format(achievement/tweet_array.length * 100, {notation: 'fixed', precision: 2}) + '%'

	document.getElementsByClassName('miscellaneous')[0].textContent = misc
	document.getElementsByClassName('miscellaneousPct')[0].textContent = math.format(misc/tweet_array.length * 100, {notation: 'fixed', precision: 2}) + '%'
	
	document.getElementsByClassName('written')[0].textContent = written
	document.getElementsByClassName('writtenPct')[0].textContent = math.format(written/tweet_array.length * 100, {notation: 'fixed', precision: 2}) + '%'


}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});