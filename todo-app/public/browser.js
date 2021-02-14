let createField = document.getElementById("create-field")
let itemList = document.getElementById("item-list")

function itemTemplate(item){
	return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
		<span class="item-text">${item.text}</span>
		<div>
			<button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
			<button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
		</div>
	</li>`
}
// 최초 Page Load Render
let ourHTML = items.map(function(item){
	return itemTemplate(item)
}).join('')
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)


//create
document.getElementById("create-form").addEventListener("submit",function(e){
	e.preventDefault()
	axios.post('/create-item', {text: createField.value}).then(function(response){
		//console.log(response)
		itemList.insertAdjacentHTML("beforeend", itemTemplate(response.data))
		createField.value = ""
		createField.focus()
	}).catch(function(){
		console.log("나중에 다시 해주세요.")
	})
})


document.addEventListener('click', function(e){
	//delete
	if(e.target.classList.contains("delete-me")) {
		if(confirm("정말로 삭제합니까?")) {
			axios.post('/delete-item', {id:e.target.getAttribute("data-id")}).then(function(){
				e.target.parentElement.parentElement.remove()
			}).catch(function(){
				console.log("나중에 다시 해주세요.")
			})
		}
	}

	//update
	if(e.target.classList.contains("edit-me")){
		var todo = e.target.parentElement.parentElement.querySelector(".item-text")
		let userInput = prompt("다시 할일을 적어주세요.", todo.textContent)
		if(userInput && userInput != todo.textContent) {
			axios.post('/update-item', {text: userInput, id:e.target.getAttribute("data-id")}).then(function(){
				todo.textContent = userInput
			}).catch(function(){
				console.log("나중에 다시 해주세요.")
			})
		}
	}
})
