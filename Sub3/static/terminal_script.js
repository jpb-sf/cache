
// Terminal script

const cursor = document.querySelector('.user__cursor');
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
}, 600)
return val
}

let interval1 = settingInterval()
let cursorFlag = true
console.log(interval1)

window.addEventListener('mouseup', () => {
const terminal = document.querySelector('.user__terminal');
if (terminal == document.activeElement)
{	
	console.log(interval1)
	cursor.style.opacity = "0"
	clearInterval(interval1);
	cursorFlag = false;
	return;
}
if (cursorFlag === false)
{
	interval1 = settingInterval();
	cursorFlag = true;
	return;
}
})

// prevent certain key values inside textarea
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

////////////////

console.log('terminal_script')

const userIcon = "<img class=\"terminal__user\" src=\"/static/images/user_icon_r.svg\" alt=\"user\">"
const terminalIcon = "<img class=\"terminal__icon\" src=\"/static/images/terminal_icon_r.svg\" alt=\"user\">"
const terminal = document.querySelector('.terminal__box');
const lineBreak = "<br>"

let terminalEntry = function(key)
{	
	displayKey = "<code class=\"terminal__userline\">" + key + "</code>"
	terminal.innerHTML += userIcon + " " + displayKey + lineBreak;
	terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
}

let terminalManager = function(condition, key)
{	
	// responses
	const notCache = "<code class=\"terminal__line\">The entry was not previously cached, but is now saved in memory</code>"
	const alreadyCache = "<code class=\"terminal__line\">The entry and value was found and retreived from cache</code>"
	const pleaseEnter = "<code class=\"terminal__line\">Please enter fibonacci position (0 to 20)</code>"
	const lruRemoved = "<code class=\"terminal__line\">LRU data removed from cache</code>"
	const cacheCleared = "<code class=\"terminal__line\">Cache has been cleared</code>"

	if (key == "c" ||
		key == "C")
	{
		terminal.innerHTML += (terminalIcon + " " + cacheCleared + lineBreak)
		terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
		return
	}

	if (condition == 1 || 
		condition == 5)
	{	
		terminal.innerHTML += (terminalIcon + " " + notCache + lineBreak)
		
		if (condition == 5)
		{
			terminal.innerHTML += (terminalIcon + " " + lruRemoved + lineBreak)
		}
		terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
	}

	if (condition == null ||
		condition == 2 || 
		condition == 3 || 
		condition == 4)
	{	
		terminal.innerHTML += (terminalIcon + " " + alreadyCache + lineBreak)
		terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;

	}
	window.setTimeout(() => {
		terminal.innerHTML += (terminalIcon + " " + pleaseEnter + lineBreak)
		terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;

	}, 700)
}
	// terminal.innerHTML += (terminalIcon + " " + pleaseEnter + lineBreak)
	// Keep scroll to bottom
	