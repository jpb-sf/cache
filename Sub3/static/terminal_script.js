
// Terminal script
const terminalScript = (function()
{	
	const cursor = document.querySelector('.user__cursor');
	// blinking cursor at 600/1000 of a second intervals
	let blinkingCursor = function()
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
		return val;
	}

	let interval1 = blinkingCursor();
	let cursorFlag = true;
	// mouseup event in window checks if textarea(terminal) is active and stops cursor from blinking

	let activateBlinkingCursor = function() 
	{
		const terminal = document.querySelector('.user__terminal');
		const terminalBtn= document.querySelector('.user__btntext');
		
		if (terminal !== document.activeElement &&			
			terminalBtn !== document.activeElement)
		{	
			cursor.style.opacity = "0";
			clearInterval(interval1);
			cursorFlag = false;
			return;
		}
		// cursor has been stoppped but terminal is no longer active restart cursor (blinkingCursor())
		if (cursorFlag === false)
		{
			interval1 = blinkingCursor();
			cursorFlag = true;
			return;
		}
	}
	window.addEventListener('mouseup', () => {
		activateBlinkingCursor();
	})

	document.querySelector('.body').addEventListener('keydown', (e) => {
		if (e.which === 84 || e.which === 116) // t or T
		{	
			e.preventDefault();
			terminalScript.terminalFocus();
			activateBlinkingCursor();
		} 
	})

	// prevent the capability of certain key values to be entered inside textarea 
	document.querySelector('.user__terminal').addEventListener('keydown', (e) => {

		if (!(e.which <= 31) && !(e.which >= 122) &&
			e.which !== 65 && e.which !== 97 && // a or a
		 	e.which !== 67 && e.which !== 99 && // c or C
			e.which !== 69 && e.which !== 101 &&	// e or E
			e.which !== 70 && e.which !== 102 &&	// f or F
			e.which !== 75 && e.which !== 107 && // k or K
			e.which !== 76 && e.which !== 108 && // l or L
			e.which !== 80 && e.which !== 112 && // p or p
			e.which !== 86 && e.which !== 118 && // v or V
			e.which !== 88 && e.which !== 120 && // x or X
			!(e.which >= 48 && e.which <= 57)) // 1 thru 9
		{
			e.preventDefault();
		}

		if (e.which === 13)
		{	
			e.preventDefault()
			cacheScript.send();
		}
	})

	window.addEventListener('load', (e) => {
		terminalScript.terminalFocus();
	})

	return {

		terminalFocus: function()
		{
			document.querySelector('.user__terminal').focus();
		},

		terminalEntry: function(key)
		{	
			const terminal = document.querySelector('.terminal__box');
			const userIcon = "<img class=\"terminal__user\" src=\"/static/images/user_icon_r.svg\" alt=\"user\">";
			const displayKey = "<code class=\"terminal__userline\">" + key + "</code>";
			terminal.innerHTML += userIcon + " " + displayKey + "<br>";
			// keeps scroll at bottom
			terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
		},

		// manages responses of program messages in terminal
		terminalManager: function(condition, key, time)
		{	
			const terminalTextArea = document.querySelector('.user__terminal');
			const terminal = document.querySelector('.terminal__box');
			
			// Different outcomes prompt different messages in the terminal 				
			if (key === "c" ||
				key === "C")
			{
				terminal.innerHTML = "";
			}
			
			if (key === "e" ||
				key === "E")
			{
				terminal.innerHTML += (messages.terminalIcon + " " + messages.cacheCleared + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}
			if (key === "a" ||
				key === "A")
			{
				terminal.innerHTML += (messages.terminalIcon + " " + messages.aboutKey + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}
			if (key === "f" ||
				key === "F")
			{
				terminal.innerHTML += (messages.terminalIcon + " " + messages.aboutFib + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}
			if (key === "k" ||
				key === "K")
			{
				terminal.innerHTML += (messages.terminalIcon + " " + messages.appKey + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}
			if (key === "l" ||
				key === "L")
			{
				terminal.innerHTML += (messages.terminalIcon + " " + messages.aboutLru + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}
			if (key === "p" ||
				key === "P")
			{
				terminal.innerHTML += (messages.terminalIcon + " " + messages.aboutApp + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}

			if (key === "v" ||
				key === "V")
			{
				terminal.innerHTML += (messages.terminalIcon + " " + messages.aboutValue + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}
			if (key === "x" ||
				key === "X")
			{
				terminal.innerHTML += (messages.terminalIcon + " " + messages.aboutCache + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}	
			if (condition === 1 || 
				condition === 5)
			{	
				terminal.innerHTML += (messages.terminalIcon + " " + messages.notCache + "<br>");
				terminal.innerHTML += (messages.terminalIcon + " " + messages.timeElapsed + time + messages.seconds + "<br>");
				
				if (condition == 5)
				{
					terminal.innerHTML += (messages.terminalIcon + " " + messages.lruRemoved + "<br>")
				}
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			}

			if (condition === 2 || 
				condition === 3 || 
				condition === 4)
			{	
				terminal.innerHTML += (messages.terminalIcon + " " + messages.alreadyCache + "<br>");
				terminal.innerHTML += (messages.terminalIcon + " " + messages.timeElapsed + time + messages.seconds + "<br>");
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;

			}
			window.setTimeout(() => {
				terminal.innerHTML += (messages.terminalIcon + " " + messages.pleaseEnter + "<br>")
				terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;

			}, 700)
			terminalTextArea['readOnly'] = false;
			this.terminalFocus();
		}
	}
})()

	