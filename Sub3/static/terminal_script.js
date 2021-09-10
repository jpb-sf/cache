
// Terminal script
const terminalScript = (function()
{	
	console.log('terminal script')
	const cursor = document.querySelector('.user__cursor');
	// blinking cursor at 600/1000 of a second intervals
	let settingInterval = function()
	{
		let blink = true;
		
		const val = window.setInterval(() => {
			if (blink)
			{
				cursor.style.opacity = "1.0";
				blink = false;
			}
			else {
				cursor.style.opacity = "0";
				blink = true;
			}
		}, 600);
		return val
	}

	let interval1 = settingInterval();
	let cursorFlag = true;
	console.log(interval1)
	// mouseup event in window checks if textarea(terminal) is active and stops cursor from blinking
	window.addEventListener('mouseup', () => {
		const terminal = document.querySelector('.user__terminal');
		if (terminal === document.activeElement)
		{	
			console.log(interval1)
			cursor.style.opacity = "0"
			clearInterval(interval1);
			cursorFlag = false;
			return;
		}
		// cursor has been stoppped but terminal is no longer active restart cursor (settingInterval())
		if (cursorFlag === false)
		{
			interval1 = settingInterval();
			cursorFlag = true;
			return;
		}
	})

	// prevent the capability of certain key values to be entered inside textarea 
	document.querySelector('.user__terminal').addEventListener('keydown', (e) => {

		if ((e.which > 67 && e.which < 96) || 
			e.which > 105 ||
			e.which === 65 ||
			e.which === 66 ||
			e.code === "Enter" ||
			e.code === "Space")
		{
			e.preventDefault()
		}
	})

	return {

		terminal: document.querySelector('.terminal__box'),
		terminalEntry: function(key)
		{	
			const terminal = terminalScript.terminal;
			const userIcon = "<img class=\"terminal__user\" src=\"/static/images/user_icon_r.svg\" alt=\"user\">";
			const displayKey = "<code class=\"terminal__userline\">" + key + "</code>";
			terminal.innerHTML += userIcon + " " + displayKey + "<br>";
			// keeps scroll at bottom
			terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
		},

		terminalManager: function(condition, key)
		{	
			// terminal responses
			const terminal = terminalScript.terminal;
			const terminalIcon = "<img class=\"terminal__icon\" src=\"/static/images/terminal_icon_r.svg\" alt=\"user\">"
			const notCache = "<code class=\"terminal__line\">The entry was not previously cached, but is now saved in memory</code>"
			const alreadyCache = "<code class=\"terminal__line\">The entry and value was found and retreived from cache</code>"
			const pleaseEnter = "<code class=\"terminal__line\">Please enter fibonacci position (0 to 17)</code>"
			const lruRemoved = "<code class=\"terminal__line\">LRU data removed from cache</code>"
			const cacheCleared = "<code class=\"terminal__line\">Cache has been cleared</code>"
			
			// Different outcomes prompt different messages in the terminal 

			if (key === "c" ||
				key === "C")
			{
				terminal.innerHTML += (terminalIcon + " " + cacheCleared + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
				return
			}

			if (condition === 1 || 
				condition === 5)
			{	
				terminal.innerHTML += (terminalIcon + " " + notCache + "<br>")
				
				if (condition == 5)
				{
					terminal.innerHTML += (terminalIcon + " " + lruRemoved + "<br>")
				}
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}

			if (condition === null ||
				condition === 2 || 
				condition === 3 || 
				condition === 4)
			{	
				terminal.innerHTML += (terminalIcon + " " + alreadyCache + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;

			}
			window.setTimeout(() => {
				terminal.innerHTML += (terminalIcon + " " + pleaseEnter + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;

			}, 700)
		}
	}
})()

	