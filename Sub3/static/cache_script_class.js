console.log(window.innerWidth)

class CacheApp {
	constructor()
	{
		this.btnFlag = false;
	}

	widthCheck()
	{
		if (window.innerWidth < 500)
		{
			alert("This application is not designed for a screen of this size.")
		}
	}

	swap(cells, cell4, cell0, start, cellsArr)
	{
		for (let i = cellsArr.length - 1; i >= 0; i--)
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
	}

	swapNewValue(cells, cellsArr=null, condition)
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
	}

	async cellSlide(cell1, cell2, direction = "forward", distance = 6, speed = 50)
	{	
		console.log(document.querySelector('.table').scrollHeight)
		let position = 0;
		return new Promise((resolve, reject) => {
			const interval = window.setInterval(() => {
				if (direction === "backward")
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
	}

	// Builds an html element containing user entry as its textNode
	async newEntry(entry)
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
	}

	// Animates the html element created by newEntry()
	async moveEntry()
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
	}

	// Creates the animated fib value and animates it
	async newFib(val, condition)
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
	}

	async LRUfall(cells)
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
	}

	async LRUrotate(cells)
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
	}

	async LRUslide(cells)
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
	}

	async moveVertical(cell1, cell2, direction = "out")
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
	}

	
	// manages the display table animation based on values returned from server
	async displayManager(condition, count=null, entry, val, exists)
	{	
		let cells = document.getElementsByClassName('table__cell');
		let cellsArr;
		terminalScript.terminalEntry(entry)
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

		if (condition === 1)
		{
			this.newEntry(entry, val)
			//  count keeps track of the number of existing key/vals
			if (count === 3)
			{
				await this.cellSlide(cells[2], cells[6])
			}
			if (count === 2 || 
				count === 3)
			{
				await this.cellSlide(cells[1],  cells[5])
			}
			if (count === 1 || 
				count === 2 || 
				count === 3)
			{
				await this.cellSlide(cells[0], cells[4])
			}
			await this.moveEntry()
			await this.newFib(val, condition)
			this.swapNewValue(cells, cellsArr, condition)	
		}

		else if (condition === 5)
		{
			this.newEntry(entry, val)
			let slide = await this.LRUslide(cells)
			await this.LRUrotate(cells)
			await this.LRUfall(cells)
			await this.cellSlide(cells[2], cells[6])
			await this.cellSlide(cells[1], cells[5])
			await this.cellSlide(cells[0], cells[4])
			await this.moveEntry()
			await this.newFib(val)
			this.swapNewValue(cells, cellsArr, condition) 
		}
		// Last position swap
		else if (condition === 4)
		{
			await this.moveVertical(cells[3], cells[7])
			await this.cellSlide(cells[3], cells[7], "backward", 18, 40)
			await this.cellSlide(cells[2], cells[6])
			await this.cellSlide(cells[1], cells[5])
			await this.cellSlide(cells[0], cells[4])
			await this.moveVertical(cells[3], cells[7], "in")
			this.swap(cells, cellsArr[7], cellsArr[3], 4, cellsArr)
		}
		// 3rd position swap
		else if (condition === 3)
		{
			await this.moveVertical(cells[2], cells[6])
			await this.cellSlide(cells[2], cells[6], "backward", 12, 40)
			await this.cellSlide(cells[1], cells[5])
			await this.cellSlide(cells[0], cells[4])
			await this.moveVertical(cells[2], cells[6], "in")
			this.swap(cells, cellsArr[6], cellsArr[2], 3, cellsArr)
		}
		// 2nd position swap
		else if (condition === 2)
		{
			await this.moveVertical(cells[1], cells[5])
			await this.cellSlide(cells[1], cells[5], "backward", 6, 40)
			await this.cellSlide(cells[0], cells[4])
			await this.moveVertical(cells[1], cells[5], "in")
			this.swap(cells, cellsArr[5], cellsArr[1], 2, cellsArr)
		}
		this.btnFlag = false;
		terminalScript.terminalManager(condition, entry)
		return		
	}

	// Listener for user clicking enter sending value to server
	listener()
	{
		document.querySelector('.user__btn').addEventListener('click', (event) => {
			if (!this.btnFlag)
			{	
				let entry = document.querySelector('.user__terminal')
				if (!entry.value)
				{
					return
				}
				this.btnFlag = true;
				let xhttp = new XMLHttpRequest();
				xhttp.open('post', '/check')
				xhttp.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8')

				xhttp.onload = () => {
					if (xhttp.readyState === 4 && xhttp.status === 200)
					{	
						const response = JSON.parse(xhttp.responseText)
						if (response == null)
						{
							return
						}
						let condition, count, key, value, exists;
						// Empty user terminal value
						entry.value = "";
						//  Define response
						condition = response['condition'];
						count = response['count'];
						key = response['key'];
						value = response['value'];
						exists = response['exists'];

						console.log(document.cookie)
						console.log(this)
						this.displayManager(condition, count, key, value, exists)
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
}

let init = new CacheApp()
init.listener()


