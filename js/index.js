"use strict";

window.addEventListener("load", () => {
	const todoForm = document.querySelector("#todo-form form");
	const todoList = document.querySelector("#todo-list");
	const allTodosCount = document.querySelector("#all-todos-count");
	const finishedTodosCount = document.querySelector("#finished-todos-count");
	const removeAllCompletedTodosBtn = document.querySelector("#remove-all-commpleted");

	let i = 0;
	let data = [];

	todoForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const value = e.target.firstElementChild.value;

		if (value.trim() !== "") {
			data.push({
				id: i, text: value, isCompleted: false
			});
			i++;
			e.target.reset();
			renderNewItem(data[data.length - 1]);
		}
	});

	function renderNewItem(item) {
		const { text, isCompleted, id } = item;

		const todoItem = document.createElement("div");
		todoItem.classList.add("todo-list-item");
		todoItem.dataset.id = id;
		todoItem.innerHTML = `
			<label>
				<input
					type="checkbox"
					${isCompleted ? "checked" : ""}
					data-completed
				>
				<span>${text}</span>
			</label>
			<button data-rm=${id}>Remove</button>
		`;

		removeTodoListItem(todoItem.querySelector("[data-rm]"));
		changeTodoListItem(todoItem.querySelector("[data-completed]"));

		todoList.appendChild(todoItem);
		updateCounts();
	}

	function removeTodoListItem(rmBtn) {
		rmBtn.addEventListener("click", () => {
			const itemId = parseInt(rmBtn.dataset.rm);
			data = data.filter((item) => item.id !== itemId);
			const todoItem = todoList.querySelector(`[data-id="${itemId}"]`);
			todoList.removeChild(todoItem);
			updateCounts();
		});
	}

	function changeTodoListItem(checkboxBtn) {
		checkboxBtn.addEventListener("change", (e) => {
			const itemId = parseInt(checkboxBtn.closest('.todo-list-item').dataset.id);
			const item = data.find((item) => item.id === itemId);
			item.isCompleted = e.target.checked;
			updateCounts();
		});
	}

	removeAllCompletedTodosBtn.addEventListener("click", () => {
		data = data.filter((item) => !item.isCompleted);
		const completedItems = todoList.querySelectorAll("[data-completed]:checked");
		completedItems.forEach((item) => {
			const itemId = parseInt(item.closest('.todo-list-item').dataset.id);
			todoList.removeChild(item.closest('.todo-list-item'));
		});
		updateCounts();
	});

	function updateCounts() {
		allTodosCount.textContent = data.length;
		finishedTodosCount.textContent = data.filter(todo => todo.isCompleted).length;
	}

});
