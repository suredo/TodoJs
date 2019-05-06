(function(){
	let store = [
		{todo: "Criar um todo", status: "done", id:0},
		{todo: "criar API rest", status: "active", id:1}
	]
	let filter = "";
	const todoList = document.getElementById("todo-list");
	const form = document.getElementById("form");
	const input = document.getElementById("todo-input");
	const tags = document.getElementsByClassName("tag");
	
	const genId = () => {
		const biggerId = store.reduce((prev, current) => {
			return Math.max(prev, current.id);
		}, 0);
		return biggerId+1;
	}

	const update = () => {
		todoList.innerHTML = "";
		let todos = [];
		if(filter){
			todos = store.filter(item => item.status === filter);
		}else{
			todos = [...store]
		}
		todos.forEach(item => {
			todoList.insertAdjacentHTML('beforeend', `<li><span class="todo-item ${item.status}" id="${item.id}">${item.todo}</span> <span class="delete" id="${item.id}">X</span></li>`);
		});
		for(let i=0; i<todoList.children.length; i++){
			todoList.children[i].children[1].addEventListener("click", (e) => {
				const id = Number(e.target.attributes.id.value);
				const storex = store.filter(val => val.id!==id);
				store = [...storex]
				update();
			});
			todoList.children[i].children[0].addEventListener("click", (e) => {
				const id = Number(e.target.attributes.id.value);
				const storex = store.map(val => {
					if(val.id === id){
						const status = val.status === "done" ? "active" : "done";
						return {...val, status: status};
					}
					return val;
				});
				store = [...storex]
				
				update();
			});
		}
	}

	for(let i = 0; i<tags.length; i++){
		tags[i].addEventListener("click", (e) => {
			filter = e.target.attributes.id.value;
			update();
		});
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if(input.value !== ""){
			const storex = [...store, {todo: input.value, status: "active", id: Number(genId())}];
			store = [...storex]
			input.value = "";
			update();
		}
	});

	update();
})();