search_box=undefined
search_btn=undefined

document.addEventListener("DOMContentLoaded", ready)

function ready() {
	search_box = document.querySelector("input[type='text']")
	search_btn = document.querySelector("input[type='button']")
	
	document.addEventListener("keydown", keydown, false)
	search_btn.addEventListener("click", searchAndShowResults , false)
	
	buildSearchIndex()
}

function keydown(e) {
	// Hijack browser's ctrl+F
	if(e.key == "f" && e.ctrlKey) {
		e.preventDefault()
		
		search_box.focus()
		search_box.scrollIntoView()
	}
	
	if(e.key == "Enter" && e.target.tagName == "INPUT") {
		document.querySelector("input[type='button']").click()
	}
}

searchIndex=[]
function buildSearchIndex() {
	let DOMTable = document.querySelectorAll("tbody > tr")
	
	for(let tableRow of DOMTable) {
		searchIndex.push(tableRow.dataset.name.toLowerCase())
	}
} 

function searchAndShowResults(e) {
	var results = searchIndex.filter(a => a.includes(search_box.value.toLowerCase()))
	resultsIndexes = []
	
	for(result of results) {
		resultsIndexes.push(searchIndex.indexOf(result))
	}
	
	let DOMTable = document.querySelectorAll("tbody > tr")
	let i=0
	for(let tableRow of DOMTable) {
		if(resultsIndexes.indexOf(i) > -1) {
			tableRow.style.display=""
		} else {
			tableRow.style.display="none"
		}
		
		i++
	}
	DOMTable[resultsIndexes[0]].scrollIntoView()
}
