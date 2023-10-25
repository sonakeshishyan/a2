class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);
        //, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if (this.text.startsWith("Just completed") || this.text.startsWith("Just posted")){ // if contains completed or posted then it's completed event
            return "completed_event"
        }
        if (this.text.includes("PB") || this.text.startsWith("Achieved") || this.text.includes("personal record")){ // if contains personal record, or achieved then achievement
            return "achievement"
        }
        if (this.text.includes("right now") || (this.text.startsWith("Watch"))){ //if includes right now or Watch then live_event
            return "live_event"
        }
        return "miscellaneous"; // if doesnt apply to any of the if statements, then miscellaneous
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if (this.text.includes("-")) {
            return true
        }
        return false;
    }

    // written structure 'computer string' - 'written string' 'https://...' Need to get sentences after '-' and before 'https://' 
    // 25% of tweets contains written

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        
        var secondHalf = this.text.split('-', 1)

        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}