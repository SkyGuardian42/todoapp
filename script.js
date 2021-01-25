{
	"use strict";


	//	------------------
	//	  ✋ Drag-Code
	//	------------------

	let currDrag;

	/**
	 * Adds requiered Event Listeners to make Element draggable
	 * @param draggable DOM-Element
	 */
	const addDraggable = (draggable) => {
		draggable.addEventListener('dragstart', (e) => {
			draggable.classList.add("is-dragged");
			currDrag = e.target;
		}, false);
		
		draggable.addEventListener('dragend', () => {
			draggable.classList.remove("is-dragged");
		}, false);
	}

	// Make exisiting entries draggable
	let draggables = document.querySelectorAll('.entry');
	draggables.forEach(draggable => {
		addDraggable(draggable);
	})

	// Mark boards as drag targets
	let boards = document.querySelectorAll('.board');
	boards.forEach(board => {
		board.addEventListener('dragover', (e) => {
			e.preventDefault();
		}, false)
		
		board.addEventListener('dragenter', (e) => {
			e.dataTransfer.dropEffect = 'move';
			
			console.log('dragenter')
			boards.forEach(b => b.classList.remove('is-over'))
			
			board.classList.add("is-over");
		}, false)
		
		board.addEventListener('dragend', (e) => {
			board.classList.remove("is-over");
		}, false)
		
		
		board.addEventListener("drop", e => {
			e.stopPropagation();

			const target = e.target;
			if (target) {
				board.appendChild(currDrag);
				currDrag = null;
			}
		})
	})


	//	------------------
	//	  ➕ Form-Code
	//	------------------

	const form = document.getElementById('add_toto');
	const todoTitle = document.getElementById('todo_title');
	const todoBody = document.getElementById('todo_body');
	const todoCategory = document.getElementById('todo_category');


	const addTodo = (title, body, category) => {
		const mainEl = document.createElement('div');
		const titleEl = document.createElement('h2');
		const categoryEl = document.createElement('span');
		const bodyEl = document.createElement('p');


		titleEl.innerText = title;
		categoryEl.innerText = category;
		categoryEl.setAttribute('data-category-name', category.toLowerCase());
		categoryEl.classList.add("category")
		bodyEl.innerText = body;
		titleEl.appendChild(categoryEl);

		mainEl.classList.add('entry');
		mainEl.setAttribute('draggable', 'true');
		mainEl.appendChild(titleEl);
		mainEl.appendChild(bodyEl);

		addDraggable(mainEl);

		document.querySelector('main > .board').appendChild(mainEl);
	}

	form.addEventListener('submit', e => {
		e.preventDefault();
		addTodo(todoTitle.value, todoBody.value, todoCategory.value);
		form.reset()
	})
}
