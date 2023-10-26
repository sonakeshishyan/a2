function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	// New array of activities and the number of them
	var activ = [
		 { key: 'run', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'bike', value: 0, distance: 0, weekend: 0, weekday: 0},
		 { key: 'walk', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'Freestyle', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'elliptical', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'spinning', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'meditation', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'swim', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'row', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'yoga', value: 0, distance: 0, weekend: 0, weekday: 0 },
		 { key: 'Crossfit', value: 0, distance: 0, weekend: 0, weekday: 0 },
		];

	for (let i of tweet_array) { // If tweet matches an activity in activ, then add 1 to the activ array
		for (var key in activ) {
			if (i.activityType == activ[key].key) {
				activ[key].value += 1
				activ[key].distance += i.distance
				}
			//so it doesnt keep going once done already
			}
		}
	
	 activity_vis_spec = {
	   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": [ 
			{ "activity": activ[0].key, "amount": activ[0].value},
			{ "activity": activ[1].key, "amount": activ[1].value},
			{ "activity": activ[2].key, "amount": activ[2].value},
			{ "activity": activ[3].key, "amount": activ[3].value},
			{ "activity": activ[4].key, "amount": activ[4].value},
			{ "activity": activ[5].key, "amount": activ[5].value},
			{ "activity": activ[6].key, "amount": activ[6].value},
			{ "activity": activ[7].key, "amount": activ[7].value},
			{ "activity": activ[8].key, "amount": activ[8].value},
			{ "activity": activ[9].key, "amount": activ[9].value},
			{ "activity": activ[10].key, "amount": activ[10].value}
		]
	  },
	  "mark": 'point',
	  "encoding": {
		 "x": {
		 	field: "activity",
		 	type: "nominal",
			axis: {
				title: "Number of Tweets of Each Activity",
			}
		 },
		"y": {
			field: "amount",
			type: "quantitative"
		   }
		 }
	  }

	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

// Activity
	document.getElementById('numberActivities').innerText =  activ.length;
	var sortedActiv = activ.sort((a, b) => b.value - a.value)
	document.getElementById('firstMost').innerText =  sortedActiv[0].key
	document.getElementById('secondMost').innerText =  sortedActiv[1].key
	document.getElementById('thirdMost').innerText =  sortedActiv[2].key

// Distance
	// document.getElementById('longestActivityType').innerText =  sort2[0].distance
	// document.getElementById('shortestActivityType').innerText = sort2[2].distance

// Weekend/weekday (Average across all activities)
	// document.getElementById('weekdayOrWeekendLonger').innerText = "Weekdays"
	var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	
// Distance from all 3 activites on different days
	var threeDis = []; // Array of each top 3 activity with distance on their day
	
	for (let i of tweet_array) { // Adds distance across top three activites
		if ((i.activityType === sortedActiv[0].key) || (i.activityType === sortedActiv[1].key) || (i.activityType === sortedActiv[2].key)){
			var day = days[i.time.getDay()]
			var point = {key: day, distance: i.distance}
			threeDis.push(point)
		}
	}

	// const fs = require("fs");
	// const distance = JSON.stringify(threeDis)

	// fs.writeFileSync("data/distance.json", distance, (error) => {
	// 	if (error) {
	// 		console.error(error);
	// 		throw error;
	// 	}
	// }) 

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	   "description": "A graph of the distances by day of the week for all of the three most tweeted-about activities.",
	   "data": {},
	   "mark": 'point',
	   "encoding": {
		  "x": {
			  field: "time (day)",
			  type: "nominal",
			 axis: {
				 title: "Distances by Day of Week",
			 }
		  },
		 "y": {
			 field: "distance",
			 type: "quantitative"
			}
 
		  }
	   }

	   vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

}



//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});