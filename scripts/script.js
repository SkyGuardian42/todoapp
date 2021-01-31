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
			currDrag = draggable;
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
	//	  ➕ Add Todo
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


	//	-----------------------
	//	  ✅ Form validation
	//	-----------------------

  const validateElements = [
    {
      el: '#todo_title',
      notEmpty: true
    },
    {
      el: '#todo_body',
      notEmpty: true
    },
    {
      el: '#todo_category',
      notEmpty: true
    }
	]
	
	/**
   * Gibt eine Funktion zurück, die true zurückgibt, falls mindestens ein Fehler aufgetreten ist, und den Fehler unter dem Inputelement einfügt
   * @param {Object} e Objekt mit Informationen über das zu validierende Element
   */
  let validateField = e => {
    return () => {
      const targetField = document.querySelector(e.el);
      setErrorText(targetField, "Wert darf nicht leer sein");

      let error = false;

      if(e.notEmpty) {
        const val = targetField.value;
        if(val.trim() == '' || val.length == 0) {
          error = true;
          addErrorText(targetField, "Wert darf nicht leer sein");
        }
      }
			
			if(error) {
				targetField.classList.add('error');
			} else {
				targetField.classList.remove('error');
			}

      return error;
    }

    function addErrorText(el, text) {
      const errorContainer = getErrorContainer(el);
      errorContainer.innerHTML += text + "<br/>";
    }
    
    function setErrorText(el, text) {
      const errorContainer = getErrorContainer(el);
      errorContainer.innerHTML = "";
    }

    function getErrorContainer(el) {
      const nextSibling = el.nextElementSibling;
      let errorDiv;

      if(nextSibling !== null && nextSibling.classList.contains("errorMsg")) {
        errorDiv = nextSibling;
      } else {
        errorDiv = document.createElement("div");
        errorDiv.classList.add("errorMsg");
        el.insertAdjacentHTML('afterEnd', errorDiv.outerHTML);
      }

      return errorDiv;
    }
  }

	// listen to form submit
	form.addEventListener('submit', e => {
		e.preventDefault();
    const valid = !validateElements.some((el) => validateField(el)());
    if(valid) {
			addTodo(todoTitle.value, todoBody.value, todoCategory.value);
			form.reset()
    }
	})
}
