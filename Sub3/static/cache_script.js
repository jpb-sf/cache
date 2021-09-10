const cacheScript = (function() {
	console.log(window.innerWidth)
	
	// Mobile screen alert message
	if (window.innerWidth < 500)
	{
		alert("This application is not designed for a screen of this size.")
	}
	return {
		// swaps interHTML values of table cells. Called when swapping the place of an already cached value
		swap: function(cells, cell4, cell0, start, cellsArr)
		{
			for (i = cellsArr.length - 1; i >= 0; i--)
			{	
				if (start == 4)
				{
					if (!(i === 0 ||
					 i === 4))
					{	
						cells[i].innerHTML = cellsArr[i - 1];
					}
				}
				else if (start === 3)
				{	
					// ignore 0 and 4 as they relationally aren't replaced by i - 1
					if (!(i === 0 || i === 3 || i === 4 || i === 7))
					{
						cells[i].innerHTML = cellsArr[i - 1];
					}
				}
				else if (start === 2)
				{
					if (i === 1 || i === 5)
					{
						cells[i].innerHTML = cellsArr[i - 1];
					}
				}
				cells[i].style.left = "0rem";
			}
			cells[0].innerHTML = cell0;
			cells[4].innerHTML = cell4;
		},
		// Swaps innerHTML values of table cells. Called when adding a new set of values
		swapNewValue: function(cells, cellsArr=null, condition)
		{	
			const entry = document.querySelector('.animate__entry')
			const fib = document.querySelector('.animate__fib')
			if (condition == 5)
			{
				cells[3].style.opacity = cells[7].style.opacity = "1";
				cells[3].style.rotate = cells[7].style.rotate = "0deg";
				cells[3].style.left = cells[7].style.left = "0rem";
				cells[3].style.top = "-.05rem";
				cells[7].style.top = "0rem";
			}
			if (cellsArr)
			{
				for (let i = 0; i < cells.length; i++)
				{
					cells[i].style.left = "0rem";
					cells[i].innerHTML = cellsArr[i - 1];
				}
			}

			cells[0].innerHTML = entry.innerHTML;
			cells[4].innerHTML = fib.innerHTML;
			entry.remove()
			fib.remove()
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
				console.log('newEntry')
				console.log(entry)
				const main = document.querySelector('.main');
				const element = document.createElement('h3');
				const text = document.createTextNode(entry);
				element.appendChild(text);
				element.setAttribute('class', 'animate__entry');
				main.appendChild(element);

				resolve()
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
		 newFib: async function(val, condition)
		 {	
			const main = document.querySelector('.main');
		 	let element = document.createElement('h3');
			const text = document.createTextNode(val);

			element.appendChild(text);
			element.setAttribute('class', 'animate__fib');
			element.style.marginTop = "6.8rem";
		 	
		 	return new Promise((resolve, reject) => {
		 		setTimeout(() => {
			 		main.appendChild(element);
			 		let marginTop = 6.8;
			 		let c = 0;
					const interval = window.setInterval(() => {
			 			element.style.marginTop = (marginTop += .3).toString() + "rem";
			 			c++;
			 			if (c >= 10)
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
			let position = 0;
			
			return new Promise((resolve, reject) => {
				window.setTimeout(() => {
					const interval = window.setInterval(() => {
						cells[3].style.left = cells[7].style.left = position.toString() + "rem";
						position += .75;
						if (position >= 4)
						{	
							resolve() 
						}	
						if (position > 7)
						{	
							window.clearInterval(interval)
						}
					}, 50)
				}, 200)
			})
		},
		// Animation function. Moves new or swapped value verticallt "in" or "out" of table cells
		moveVertical: async function(cell1, cell2, direction = "out")
		{	
			let c = 0;
			let position1, position2;
			if (direction === "in")
			{
				position1 = Number(cell1.style.top.slice(0, -3));
				position2 = Number(cell2.style.top.slice(0, -3));
			}
			else {
				position1 = 0;
				position2 = 0;
			}
			return new Promise((resolve, reject) =>
			{	
				let interval = setInterval(() => {

					if (direction === "in")
					{
						position1 += 1;
						position2 -= 1;
					}
					else {
						position1 -= 1;
						position2 += 1;
					}
					cell1.style.top = position1.toString() + "rem";
					cell2.style.top = position2.toString() + "rem";
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
		animationManager: async function(condition, count=null, entry, val, exists)
		{	
			let cells = document.getElementsByClassName('table__cell');
			let cellsArr;
			terminalScript.terminalEntry(entry)
			// if c entered, clear all table cells innerHTML values
			if (entry == "c" ||
				entry == "C" ||
				!exists)
			{
				for (i = 0; i < cells.length; i++)
				{
					cells[i].innerHTML = "";
				}
				cellsArr = null;
		 	}
		 	else{
		 		cellsArr = Array.from(cells, (item) => item.innerHTML)
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
					await cacheScript.cellSlide(cells[1],  cells[5])
				}
				if (count === 1 || 
					count === 2 || 
					count === 3)
				{
					await cacheScript.cellSlide(cells[0], cells[4])
				}
				await cacheScript.moveEntry()
				await cacheScript.newFib(val, condition)
				cacheScript.swapNewValue(cells, cellsArr, condition)	
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
				await cacheScript.newFib(val)
				cacheScript.swapNewValue(cells, cellsArr, condition) 
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
				cacheScript.swap(cells, cellsArr[7], cellsArr[3], 4, cellsArr)
			}
			// Condition is 3 if swapping 3rd position from left
			else if (condition === 3)
			{
				await cacheScript.moveVertical(cells[2], cells[6])
				await cacheScript.cellSlide(cells[2], cells[6], "left", 12, 40)
				await cacheScript.cellSlide(cells[1], cells[5])
				await cacheScript.cellSlide(cells[0], cells[4])
				await cacheScript.moveVertical(cells[2], cells[6], "in")
				cacheScript.swap(cells, cellsArr[6], cellsArr[2], 3, cellsArr)
			}
			// Condition is 2 if swapping 2nd position from left
			else if (condition === 2)
			{
				await cacheScript.moveVertical(cells[1], cells[5])
				await cacheScript.cellSlide(cells[1], cells[5], "left", 6, 40)
				await cacheScript.cellSlide(cells[0], cells[4])
				await cacheScript.moveVertical(cells[1], cells[5], "in")
				cacheScript.swap(cells, cellsArr[5], cellsArr[1], 2, cellsArr)
			}
			// btnFlag manages multiple submits, stars as false
			this.btnFlag = false;
			await terminalScript.terminalManager(condition, entry);
			return		
		},

		// Add click listener for the enter button.
		// AJAX call's returned data is sent to cacheScript.animationManager function
		listener: document.querySelector('.user__btn').addEventListener('click', (event) => {
			
			// btnFlag variable is set to prevent a submit until the completion of this function and its corresponding functions' executions
			if (!this.btnFlag)
			{	
				let entry = document.querySelector('.user__terminal')

				if (!entry.value)
				{
					return
				}
				if (Number(entry.value) > 17)
				{
					entry.value = "";
					return
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
							return
						}
						// Empty user terminal value
						entry.value = "";
						//  Define response
						let condition, count, key, value, exists;
						condition = response['condition'];
						count = response['count'];
						key = response['key'];
						value = response['value'];
						exists = response['exists'];

						console.log(document.cookie)
						await cacheScript.animationManager(condition, count, key, value, exists)
						this.btnFlag = false;
					}
				}
				xhttp.send(entry.value)
			}
			else {
				event.preventDefault()
			}
		})
	}
})()



