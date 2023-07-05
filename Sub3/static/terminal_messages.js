let cuts = {
	tab:"&nbsp;&nbsp;&nbsp;&nbsp;",
}

let messages = {
	terminalIcon: "<img class=\"terminal__icon\" src=\"/static/images/terminal_icon_r.svg\" alt=\"user\">",
	notCache: "<code class=\"terminal__line\">The entry was not previously cached, but is now saved in memory</code>",
	alreadyCache: "<code class=\"terminal__line\">The entry and value was found and retreived from cache</code>",
	pleaseEnter: "<code class=\"terminal__line\">Please enter a number (0 to 35)</code>",
	lruRemoved: "<code class=\"terminal__line\">LRU data removed from cache</code>",
	cacheCleared: "<code class=\"terminal__line\">Cache has been emptied</code>",
	timeElapsed : "<code class=\"terminal__line\"><b>Runtime: </code>",
	seconds: " seconds</b></code>",
	appKey: "<code class=\"terminal__line\">Key: <br> " +
		cuts.tab + " k = key <br>" + 
		cuts.tab + " c = clear terminal <br>" +
		cuts.tab + " e = empty cache <br>" +
		cuts.tab + " t = terminal focus <br>" +
		cuts.tab + " a = about this application <br>" +
		cuts.tab + " &#x23CE; = enter </code>",
	aboutKey : "<code class=\"terminal__line\">About: <br> " +
		cuts.tab + " p = about the app <br>" +
		cuts.tab + " x = about cache <br>" +
		cuts.tab + " l = about 'LRU' <br>" +
		cuts.tab + " v = about the returned value <br>" +
		cuts.tab + " f = about the Fibonacci sequence</code>", 
	aboutCache: "<code class=\"terminal__line\"><b>What is cache? </b><br>" + 
		"Cache is memory. It is one way to store data. Cache usually is a much smaller " + 
		"memory space than a database. Retreiving data stored in cache memory may help with quicker runtime when used correctly. </code>",
	aboutApp: "<code class=\"terminal__line\"><b>About the app</b><br>" + 
		"The app displays a cache (memory space) that holds up to 4 key/value pairs in its memory. When the user enters a key, a value is computed and returned, and " +
		"both the key and value are saved in the cache. This LRU cache keeps track of the order in which its data is accessed. When the cache becomes full, " + 
		"it discards the 'least recently used' data. Notice how accessing values that are already in the cache can deliver faster runtimes, " +
		"especially as the entered values get larger. This is the primary benefit of using a cache.</code> ",
	aboutLru: "<code class=\"terminal__line\"><b>What is LRU? </b><br>" +
		"An LRU cache describes a 'Least Recently Used' cache. This designation describes the cache's method for discarding data, which is removing the least recent used " +
		 "data when the cache becomes full. LRU is the most used type of cache.</code>",  
	aboutValue: "<code class=\"terminal__line\"> <b>What is the returned value? </b><br>" +
		"The value is the Fibonacci number that is found in the position of the Fibonacci sequence represented by the entered key"+
		". Press 'f' for an explanation of the Fibonacci sequence. </code>",
	aboutFib: "<code class=\"terminal__line\"><b>What is the Fibonacci Seqence? </b><br>" +
		"The Fibonacci sequence is a series of numbers in which each number is " +
		"the sum of the two that precede it. <br> Sequence: 1, 1, 2, 3, 5, 8, 13, 21... <br>" +
		"This sequence is not entirely important to understanding this demo. " + 
		"It was selected as it\'s a classic algorithm where runtime exponentially increases as input values get larger. " + 
		"These type of algorithms can benefit greatly from the use of a cache to cut down runtimes.</code>"
}
		
	