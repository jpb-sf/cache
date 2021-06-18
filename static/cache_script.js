// Animation / cache display script

let swap = function(cells, cell4, cell0, start, cellsArr)
{
	for (i = cellsArr.length - 1; i >= 0; i--)
	{	
		if (start == 4)
		{
			if (!(i === 0 ||
			 i === 4))
			{	
		
				cells[i].innerHTML = cellsArr[i - 1]
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

let swapNewValue = function(cells, cellsArr=null, condition)
{	
	const entry = document.querySelector('.animate__entry')
	const fib = document.querySelector('.animate__fib')
	if (condition == 5)
	{
		cells[3].style.opacity = cells[7].style.opacity = "1";
		cells[3].style.rotate = cells[7].style.rotate = "0deg";
		cells[3].style.left = cells[7].style.left = "0rem";
		cells[3].style.top = "-.05rem"
		cells[7].style.top = "0rem";
	}
	if (cellsArr)
	{
		for (let i = 0; i < cells.length; i++)
		{
			cells[i].style.left = "0rem"
			cells[i].innerHTML = cellsArr[i - 1]
		}
	}

	cells[0].innerHTML = entry.innerHTML;
	cells[4].innerHTML = fib.innerHTML;
	entry.remove()
	fib.remove()
}


let cellSlide = async function(cell1, cell2, direction = "forward", distance = 6, speed = 50)
{	
	let position = 0;
	console.log('cellSlide')
	return new Promise((resolve, reject) => {
		const interval = window.setInterval(() => {
			if (direction === "backward")
			{
				position -= 1
			}
			else {
				position += 1;
			}
			
			cell1.style.left = cell2.style.left = position.toString() + "rem";
			
			if (position === distance || position === (-1 * distance))
			{	
				resolve()
				clearInterval(interval)
			}
		}, speed)
	})
}

let newEntry = async function(entry)
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

let moveEntry = async function()
{	
	let c = 0; 
	let marginTop = 34.75;
	let marginLeft = -21;
	let entry = document.querySelector('.animate__entry')
	console.log('moveEntry')
	console.log(entry.innerHTML)
	
	return new Promise((resolve, reject) => {
		const interval = window.setInterval(() => {
			entry.style.marginTop = (marginTop -= 1.927).toString() + "rem";
			entry.style.marginLeft = (marginLeft += .188).toString() + "rem";
			c += 1;
			
			if (c >= 16)
			{	
				entry.style.font = "3rem Arial, sans-serif"
				entry.style.color = "red"
				resolve()
				clearInterval(interval)
			}
		}, 30)
	})
}

 let newFib = async function(val, condition)
 {	
 	const entry = document.querySelector('.animate__entry')
	const main = document.querySelector('.main');
	const text = document.createTextNode(val);
	let element = document.createElement('h3');
	element.appendChild(text);
	element.setAttribute('class', 'animate__fib');
	element.style.marginTop = "6.8rem"
 	
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
	 				clearInterval(interval)
	 			}
	 		}, 50)
		}, 200)
 	})
 }

let LRUfall = async function(cells)
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
				clearInterval(interval)
			}
		}, 50)
	})
}

let LRUrotate = async function(cells)
{
	let rotation = 0;
	let rotations = 1;
	const interval = window.setInterval(() => {
		cells[3].style.rotate = cells[7].style.rotate = (rotation += 25).toString() + "deg";
		rotations += 1;
		if (rotations > 12)
		{
			return clearInterval(interval)
		}
	}, 50)
}

let LRUslide = async function(cells)
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
					clearInterval(interval)
				}
			}, 50)
		}, 200)
	})
}


let moveVertical = async function(cell1, cell2, direction = "out")
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
				clearInterval(interval)
			}
		}, 50)
	})
}

//////////////

let btnFlag = false;

let displayManager = async function(condition, count=null, entry, val, exists)
{	
	let cells = document.getElementsByClassName('table__cell')
	console.log(cells)
	terminalEntry(entry)
	if (entry == "c" ||
		entry == "C" ||
		!exists)
	{
		for (i = 0; i < cells.length; i++)
		{
			cells[i].innerHTML = ""
		}
		cellsArr = null;
 	}
 	else{
 		cellsArr = Array.from(cells, (item) => item.innerHTML)
 	}

	if (condition === 1)
	{
		newEntry(entry, val)
		//  count keeps track of the number of existing key/vals
		if (count === 3)
		{
			await cellSlide(cells[2], cells[6])
		}
		if (count === 2 || 
			count === 3)
		{
			await cellSlide(cells[1],  cells[5])
		}
		if (count === 1 || 
			count === 2 || 
			count === 3)
		{
			await cellSlide(cells[0], cells[4])
		}
		await moveEntry()
		await newFib(val, condition)
		swapNewValue(cells, cellsArr, condition)	
	}

	else if (condition === 5)
	{
		newEntry(entry, val)
		let slide = await LRUslide(cells)
		await LRUrotate(cells)
		await LRUfall(cells)
		await cellSlide(cells[2], cells[6])
		await cellSlide(cells[1], cells[5])
		await cellSlide(cells[0], cells[4])
		await moveEntry()
		await newFib(val)
		swapNewValue(cells, cellsArr, condition) 
	}
	// Last position swap
	else if (condition === 4)
	{
		await moveVertical(cells[3], cells[7])
		await cellSlide(cells[3], cells[7], "backward", 18, 40)
		await cellSlide(cells[2], cells[6])
		await cellSlide(cells[1], cells[5])
		await cellSlide(cells[0], cells[4])
		await moveVertical(cells[3], cells[7], "in")
		swap(cells, cellsArr[7], cellsArr[3], 4, cellsArr)
	}
	// 3rd position swap
	else if (condition === 3)
	{
		await moveVertical(cells[2], cells[6])
		await cellSlide(cells[2], cells[6], "backward", 12, 40)
		await cellSlide(cells[1], cells[5])
		await cellSlide(cells[0], cells[4])
		await moveVertical(cells[2], cells[6], "in")
		swap(cells, cellsArr[6], cellsArr[2], 3, cellsArr)
	}
	// 2nd position swap
	else if (condition === 2)
	{
		await moveVertical(cells[1], cells[5])
		await cellSlide(cells[1], cells[5], "backward", 6, 40)
		await cellSlide(cells[0], cells[4])
		await moveVertical(cells[1], cells[5], "in")
		swap(cells, cellsArr[5], cellsArr[1], 2, cellsArr)
	}
	btnFlag = false
	terminalManager(condition, key)
	return		
}

document.querySelector('.user__btn').addEventListener('click', (event) => {

	if (!btnFlag)
	{	
		let entry = document.querySelector('.user__terminal')
		if (!entry.value)
		{
			console.log(entry.value)
			return
		}
		console.log(entry.value)
		btnFlag = true;
		let xhttp = new XMLHttpRequest();
		xhttp.open('post', '/check')
		xhttp.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8')

		xhttp.onload = () => {
			if (xhttp.readyState === 4 && xhttp.status === 200)
			{	
				console.log('xhttp.response')
				response = JSON.parse(xhttp.responseText)
				if (response == null)
				{
					return
				}
				// Empty user terminal value
				entry.value = ""
				//  Define response
				condition = response['condition']
				count = response['count']
				key = response['key']
				value = response['value']
				exists = response['exists']

				console.log(response)
				console.log('session')
				console.log(document.cookie)
				
				displayManager(condition, count, key, value, exists)
				btnFlag = false
			}
		}
		xhttp.send(entry.value)
	}
	else {
		event.preventDefault()
	}
})

// event.stopPropagation()



