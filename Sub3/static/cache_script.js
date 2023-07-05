const cacheScript = (function() {
	console.log(window.innerWidth)
	
	// Mobile screen alert message
	if (window.innerWidth < 500)
	{
		alert("This application is not designed for a screen of this size.")
	}

	let fontSizeChanger = function(element)
	{	
		if (element.innerText.length > 3)
		{
			element.style.font = "1.2rem Arial, sans-serif";
			element.style.top = "-1.2rem";

		}
		else {
			element.style.font = "3rem Arial, sans-serif";
			element.style.top = "-1.2rem";
		}
	}

	
	window.addEventListener('load', () => {
		let cellsElementsArr = Array.from(document.getElementsByClassName('table__cell'));
		cellsElementsArr.forEach((element, index) => {
			fontSizeChanger(element)
		})
	})
	
	return {

		// swaps interHTML values of table cells. Called when swapping the place of an already cached value
		swap: function(cells, cell4, cell0, position, cellsTextArr)
		{
			for (i = cells.length - 1; i >= 0; i--)
			{	
				if (position == 4)
				{
					
					if (!(i === 0 || i === 4))
					{	
						// change all cells text values to the cells text value before it, besides the first two cells of each 'row' in respects to the layout of the HTML
						cells[i].innerHTML = cellsTextArr[i - 1];
					}
				}
				else if (position === 3)
				{	
					// ignore 0 and 3 as well as they are empty
					if (!(i === 0 || i === 3 || i === 4 || i === 7))
					{
						cells[i].innerHTML = cellsTextArr[i - 1];
					}
				}
				else if (position === 2)
				{	
					// Change rows' 2nd position cells text values to the cells text value before it
					if (i === 1 || i === 5)
					{
						cells[i].innerHTML = cellsTextArr[i - 1];
					}
				}
				cells[i].style.left = "0rem";
			} 

			cells[0].innerHTML = cell0;
			cells[4].innerHTML = cell4;
			cells.forEach((element) =>{
				fontSizeChanger(element)
			})
		},
		// Swaps innerHTML values of table cells. Called when adding a new set of values
		swapNewValue: function(cells, cellsTextArr=null, condition)
		{	

			const entry = document.querySelector('.animate__entry')
			const fib = document.querySelector('.animate__fib')
			if (condition == 5)
			{
				cells[3].style.opacity = cells[7].style.opacity = "1";
				cells[3].style.rotate = cells[7].style.rotate = "0deg";
				cells[3].style.left = cells[7].style.left = "0rem";
		
			}
		
			if (cellsTextArr)
			{
				for (let i = 0; i < cells.length; i++)
				{
					cells[i].style.left = "0rem";
					cells[i].innerHTML = cellsTextArr[i - 1];
				}
			}

			cells[0].innerHTML = entry.innerHTML;
			cells[4].innerHTML = fib.innerHTML;
			
			cells.forEach((element) =>{
				fontSizeChanger(element)
			})
			entry.remove()
			fib.remove()
			return;
		},
		// Animation functinon. Moves cell values to the right or left, depending on direction
		cellSlide: async function(cell1, cell2, direction = "right", distance = 6, speed = 50)
		{	
			console.log(document.querySelector('.table').scrollHeight)
			let position = 0;
			return new Promise((resolve, reject) => {
				const interval = window.setInterval(() => {
					if (direction === "left")
					{
						position -= 1;
					}
					else {
						position += 1;
					}
					
					// IMPORTANT, slides are just changing postiton value
					cell1.style.left = cell2.style.left = position.toString() + "rem";
					if (position == distance || position == (-1 * distance))
					{	
						resolve()
						window.clearInterval(interval)
					}
				}, speed)
			})
		},

		// Builds an html element containing user entry as its textNode
		newEntry: async function(entry)
		{	
			return new Promise((resolve, reject) => {
				const main = document.querySelector('.main');
				const element = document.createElement('h3');
				const text = document.createTextNode(entry);
				element.appendChild(text);
				element.setAttribute('class', 'animate__entry');
				main.appendChild(element);
				resolve();
			})
		},

		// Animation function. Moves new html element, created by newEntry(), on y and x axis
		moveEntry: async function()
		{	
			let c = 0; 
			let marginTop = 33.9;
			let marginLeft = -21;
			let entry = document.querySelector('.animate__entry')
			
			return new Promise((resolve, reject) => {
				const interval = window.setInterval(() => {
					entry.style.marginTop = (marginTop -= 1.87).toString() + "rem";
					entry.style.marginLeft = (marginLeft += .188).toString() + "rem";
					c += 1;
					
					if (c >= 16)
					{	
						entry.style.font = "3rem Arial, sans-serif";
						entry.style.color = "red";
						resolve()
						window.clearInterval(interval)
					}
				}, 30)
			})
		},

		// Animation function. Creates the animated fib value, moves down on y axis from top left cell to bottom left table cell.
		 newFib: async function(entry, val)
		 {	
			const main = document.querySelector('.main');
			const text = document.createTextNode(val);
		 	let element = document.createElement('h3');
			let animationCycles = 10;

			element.appendChild(text);
			element.setAttribute('class', 'animate__fib');

			if(Number(entry) > 17)
			{
				element.style.font = "1.2rem Arial, sans-serif";
				animationCycles = 14;
			}
			else 
			{
				element.style.font = "3rem Arial, sans-serif"
			}
			// starting point
			element.style.marginTop = "6.8rem";
		 	
		 	return new Promise((resolve, reject) => {
		 		setTimeout(() => {
			 		main.appendChild(element);
			 		let marginTop = 6.8;
			 		let c = 0;
					const interval = window.setInterval(() => {
			 			element.style.marginTop = (marginTop += .3).toString() + "rem";
			 			c++;
			 			if (c >= animationCycles)
			 			{	
							resolve()
			 				window.clearInterval(interval)
			 			}
			 		}, 50)
				}, 200)
		 	})
		 },
		// Animation fuction. Drops LRU on the Y axis. Works simultaneously with LRUrotate() and LRUslide
		LRUfall: async function(cells)
		{
			let position = 2;
			let fallRate = 1;

			return new Promise((resolve, reject) => {
				const interval = window.setInterval(() => {
					cells[3].style.top = cells[7].style.top = position.toString() + "rem";
					fallRate += 1;
					position += 1;
					position += fallRate;
					if (position > 45)
					{	
						cells[3].style.opacity = cells[7].style.opacity = "0";			
						resolve()
						window.clearInterval(interval)
					}
				}, 50)
			})
		},
		// Animation fuction. Rotates LRU. Works simultaneously with LRUfall() and LRUslide
		LRUrotate: async function(cells)
		{
			let rotation = 0;
			let rotations = 1;
			const interval = window.setInterval(() => {
				cells[3].style.rotate = cells[7].style.rotate = (rotation += 25).toString() + "deg";
				rotations += 1;
				if (rotations > 12)
				{
					return window.clearInterval(interval)
				}
			}, 50)
		},
		// Animation fuction. Slides LRU to the right. Works simultaneously with LRUfall() and LRUrotate
		LRUslide: async function(cells)
		{
			let xPosition = 0;
			
			return new Promise((resolve, reject) => {
				window.setTimeout(() => {
					const interval = window.setInterval(() => {
						cells[3].style.left = cells[7].style.left = xPosition.toString() + "rem";
						xPosition += .75;
						if (xPosition >= 4)
						{	
							resolve() 
						}	
						if (xPosition > 7)
						{	
							window.clearInterval(interval)
						}
					}, 50)
				}, 200)
			})
		},
		// Animation function. Moves swapped value vertically "in" or "out" of table cells
		moveVertical: async function(keyCell, valCell, direction = "out")
		{	
			let c = 0;
			let keyPosition, valPosition;
			// if values are returning (position) to table cell
			if (direction === "in")
			{
				keyPosition = Number(keyCell.style.top.slice(0, -3));
				valPosition = Number(valCell.style.top.slice(0, -3));
			}
			// if values are leaving (position) from table cell
			else {
				keyPosition = 0;
				valPosition = 0;
			}
			return new Promise((resolve, reject) =>
			{	
				let interval = setInterval(() => {

					if (direction === "in")
					{
						keyPosition += .8;
						valPosition -= 1;
					}
					else {
						keyPosition -= 1;
						valPosition += 1;
					}
					keyCell.style.top = keyPosition.toString() + "rem";
					valCell.style.top = valPosition.toString() + "rem";
					c++
					
					if (c > 6)
					{	
						resolve()
						window.clearInterval(interval)
					}
				}, 50)
			})
		},

		btnFlag: false, 

		// Manages the table animation based on values returned from server
		animationManager: async function(condition, count=null, entry, val, time, exists)
		{	
			let cells = Array.from(document.getElementsByClassName('table__cell'));
			let cellsTextArr;
			terminalScript.terminalEntry(entry)
			// if c entered, clear all table cells innerHTML values
			if (entry == "e" ||
				entry == "E" ||
				!exists)
			{
				for (i = 0; i < cells.length; i++)
				{
					cells[i].innerHTML = "";
				}
				cellsTextArr = null;
		 	}

		 	else{
		 		cellsTextArr = Array.from(cells, (item) => item.innerHTML)
		 	}
		 	// Condition is 1 if table isn't full
			if (condition === 1)
			{
				cacheScript.newEntry(entry, val)
				//  count keeps track of the number of existing key/vals
				if (count === 3)
				{
					await cacheScript.cellSlide(cells[2], cells[6])
				}
				if (count === 2 || 
					count === 3)
				{
					await cacheScript.cellSlide(cells[1], cells[5])
				}
				if (count === 1 || 
					count === 2 || 
					count === 3)
				{
					await cacheScript.cellSlide(cells[0], cells[4])
				}
				await cacheScript.moveEntry()
				await cacheScript.newFib(entry, val, condition)
				cacheScript.swapNewValue(cells, cellsTextArr, condition)	
			}
			// Condition is 5 if new value and table is full
			else if (condition === 5)
			{
				cacheScript.newEntry(entry, val)
				let slide = await cacheScript.LRUslide(cells)
				await cacheScript.LRUrotate(cells)
				await cacheScript.LRUfall(cells)
				await cacheScript.cellSlide(cells[2], cells[6])
				await cacheScript.cellSlide(cells[1], cells[5])
				await cacheScript.cellSlide(cells[0], cells[4])
				await cacheScript.moveEntry()
				await cacheScript.newFib(entry, val)
				cacheScript.swapNewValue(cells, cellsTextArr, condition) 
			}
			// Condition is 4 if swapping last position from the left
			else if (condition === 4)
			{
				await cacheScript.moveVertical(cells[3], cells[7])
				await cacheScript.cellSlide(cells[3], cells[7], "left", 18, 40)
				await cacheScript.cellSlide(cells[2], cells[6])
				await cacheScript.cellSlide(cells[1], cells[5])
				await cacheScript.cellSlide(cells[0], cells[4])
				await cacheScript.moveVertical(cells[3], cells[7], "in")
				cacheScript.swap(cells, cellsTextArr[7], cellsTextArr[3], 4, cellsTextArr)
			}
			// Condition is 3 if swapping 3rd position from left
			else if (condition === 3)
			{
				await cacheScript.moveVertical(cells[2], cells[6])
				await cacheScript.cellSlide(cells[2], cells[6], "left", 12, 40)
				await cacheScript.cellSlide(cells[1], cells[5])
				await cacheScript.cellSlide(cells[0], cells[4])
				await cacheScript.moveVertical(cells[2], cells[6], "in")
				cacheScript.swap(cells, cellsTextArr[6], cellsTextArr[2], 3, cellsTextArr)
			}
			// Condition is 2 if swapping 2nd position from left
			else if (condition === 2)
			{
				await cacheScript.moveVertical(cells[1], cells[5])
				await cacheScript.cellSlide(cells[1], cells[5], "left", 6, 40)
				await cacheScript.cellSlide(cells[0], cells[4])
				await cacheScript.moveVertical(cells[1], cells[5], "in")
				cacheScript.swap(cells, cellsTextArr[5], cellsTextArr[1], 2, cellsTextArr)
			}
			// btnFlag manages multiple submits, stars as false
			this.btnFlag = false;
			await terminalScript.terminalManager(condition, entry, time);
			return		
		},

		// Add click listener for the enter button.
		// AJAX call's returned data is sent to cacheScript.animationManager function

		send: function() {
				// btnFlag variable is set to prevent a submit until the completion of this function and its corresponding functions' executions
			if (!this.btnFlag)
			{	
				let entry = document.querySelector('.user__terminal');
				entry['readOnly'] = true;
				if (!entry.value)

				{
					return;
				}
				// prevent numbers over 35 and repeating letter values
				if (Number(entry.value) > 35 || !(Number(entry.value)) && entry.value.length > 1)
				{
					terminalScript.terminalManager(condition=6, entry.value, time=null);
					entry.value = "";
					return;
				}

				if (entry.value === 'a' || entry.value === 'A' || 
				 	entry.value === 'c' || entry.value === 'C' || 
					entry.value === 'f' || entry.value === 'F' ||
					entry.value === 'k' || entry.value === 'K' ||
					entry.value === 'l' || entry.value === 'L' ||
					entry.value === 'p' || entry.value === 'P' ||
					entry.value === 'v' || entry.value === 'V' ||
					entry.value === 'x' || entry.value === 'X')
				{	
					terminalScript.terminalManager(condition=6, entry.value, time=null);
					entry.value = "";
					return;
				}
				this.btnFlag = true;
				let xhttp = new XMLHttpRequest();
				xhttp.open('post', '/check')
				xhttp.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8')

				xhttp.onload = async () => {
					if (xhttp.readyState === 4 && xhttp.status === 200)
					{	
						const response = JSON.parse(xhttp.responseText)
						if (response == null)
						{
							entry.addEventListener('keyup', (e) => true)
							return;
						}
						// Empty user terminal value
						entry.value = "";
						//  Define response
						let condition, count, key, value, time, exists;
						condition = response['condition'];
						count = response['count'];
						key = response['key'];
						value = response['value'];
						time = response['time'];
						exists = response['exists'];
						console.log(`time is  ${time}`)
						// console.log(document.cookie)
						await cacheScript.animationManager(condition, count, key, value, time, exists)
						this.btnFlag = false;
					}
				}
				xhttp.send(entry.value)
			}
			else {
				entry.addEventListener('keyup', (e) => true)
				event.preventDefault()
			}

		},
		listener: document.querySelector('.user__btn').addEventListener('click', (event) => {
			

			cacheScript.send()
		})
	}
})()



