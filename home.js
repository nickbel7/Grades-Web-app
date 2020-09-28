// Subject class: Represents a subject (Name, Grade)
class Subject {
	constructor(name, grade) {
		this.name = name;
		this.grade = grade;
	}
}

// Term class: Represents a list of subjects
class Term {
	constructor(){
		this.id = Student.getNextId();
		this.title = "";
		this.avg = null;
		this.subjects = [];
	}
	/*
	static getSubjects() {
		let terms = Student.getTerms();
		let currentTerm;
		if (terms == null)
			return;
		else {
			terms.forEach((term, index) => {
				if (term.id === id) {
					currentTerm = terms[index];
				}
			});
		}

		return currentTerm.subjects;
	}
	*/
	/* mallon axreiasto*/
	static getSubjects() {
		return this.subjects;
	}

	static addSubject(subject) {
		this.subjects.push[subject];
	}

	static removeSubject(index) {
		this.subjects.splice(index, 1);
	}
}

// Student class: Represents a list of terms
class Student {
	static getTerms() {
		let terms;
		if (localStorage.getItem('terms') === null){
			terms = [];
		} else {
			terms = JSON.parse(localStorage.getItem('terms'));
		}

		return terms;
	}

	static addTerm(term) {
		var terms = Student.getTerms();
		terms.push(term);
		localStorage.setItem('terms', JSON.stringify(terms));
	}

	static removeTerm(id) {
		const terms = Student.getTerms();
		/*
		terms.forEach((term, index) => {
			if (term.id === id) {
				terms.splice(index, 1);
			}
		});
		*/
		terms.pop();

		localStorage.setItem('terms', JSON.stringify(terms));
	}

	static getNextId() {
		return Student.getTerms().length;
	}

}

class UI {
	static displayTerms() {
		const terms = Student.getTerms();
		
		terms.forEach((term) => UI.addTermToList(term));
	}
	
	static addTermToStudent() {
		const termsDivList = document.querySelector('#grid-matrix');

		const termDiv = document.createElement('div');
		termDiv.classList.add("term");
		termDiv.classList.add("grid-item");
		termDiv.classList.add("col-3");

		termDiv.innerHTML = `
		<div class="item-header">
			<div class="item-header-title editable">
			</div>
			<div class="item-header-avg">
			</div>
		</div>

		<!-- TERM CONTEXT (parent container of the subjects) -->
		<div class="item-list">

			<div class="subject">
				<div class="remove-subject-btn"></div>
				<div id="test-field" class="subject-name editable col-9"></div>
				<div class="subject-grade editable col-3">8</div>
			</div>

		</div>

		<!-- ADD BUTTON (should only appear when in edit mode) -->
		<div class="add-subject btn btn-primary subject">ADD</div>
		`;

		termsDivList.appendChild(termDiv);
	}
    
	static removeTermFromStudent() {
		const termsDivList = document.querySelector('#grid-matrix');
		termsDivList.removeChild(termsDivList.lastElementChild);
	}
	
	static addSubjectToTerm(e) {
		const subjectDiv = document.createElement('div');
		subjectDiv.classList.add("subject");

		subjectDiv.innerHTML = `
			<div class="remove-subject-btn"></div> 
			<div id="test-field" class="subject-name editable col-9"></div>
			<div class="subject-grade editable col-3">8</div>
		`;

		e.appendChild(subjectDiv);
		console.log('subject append works');
	}
	
	static removeSubjectFromTerm(s) {
		var parent = s.parentElement;
		parent.removeChild(s);
		console.log('subject remove works');
//		console.log(parent);
	}

}


const data = localStorage.getItem('name-2');
document.querySelector("#test-field").innerHTML = data;

//load some data in local storage
localStorage.setItem('name','Nick');

// EDIT / Makes all appropriate fields Editable
var btnEdit = document.querySelector("#edit-btn");
btnEdit.addEventListener('click', editAll);
function editAll() {
	var editableFields = document.querySelectorAll(".editable");
	for (var i = 0 ; i < editableFields.length ; i++) {
		editableFields[i].setAttribute('contenteditable', true);
	}
	//set the display to "block" to all add-subject buttons
	var addButtons = document.querySelectorAll(".add-subject");
	for (var i = 0 ; i < addButtons.length ; i++) {
		addButtons[i].style.display = "block";
	}
	
	//set the display to "block" to all remove-subject buttons
	var rmvButtons = document.querySelectorAll(".remove-subject-btn");
	for (var i = 0 ; i < rmvButtons.length ; i++) {
		rmvButtons[i].style.display = "block";
	}
	
	console.log('hello');
}

// SAVE / Undos the ability to edit all editable fields / hide add buttons
var btnSave = document.querySelector("#save-btn");
btnSave.addEventListener('click', saveAll);
function saveAll() {
	var editableFields = document.querySelectorAll(".editable");
	for (var i = 0 ; i < editableFields.length ; i++) {
		editableFields[i].setAttribute('contenteditable', false);
	}
	// localStorage.setItem('name-2', field.innerHTML);

	//set the display to "none" to all add-subject buttons
	var addButtons = document.querySelectorAll(".add-subject");
	for (var i = 0 ; i < addButtons.length ; i++) {
		addButtons[i].style.display = "none";
	}
	
	//set the display to "none" to all remove-subject buttons
	var rmvButtons = document.querySelectorAll(".remove-subject-btn");
	for (var i = 0 ; i < rmvButtons.length ; i++) {
		rmvButtons[i].style.display = "none";
	}
	
	console.log('hello back');
//	console.log(field.innerHTML);
}

// adds a new term DIV
var btnAdd = document.querySelector("#add-btn");
btnAdd.addEventListener('click', addDiv);
function addDiv() {
	UI.addTermToStudent();
}

//removes a term DIV
var btnRemove = document.querySelector("#remove-btn");
btnRemove.addEventListener('click', rmvDiv);
function rmvDiv() {
	UI.removeTermFromStudent();
}

//gets the subject list element when an 'add-subject' btn is clicked
$(document).on("click", ".add-subject", function() {
	subjectsList = $(this)[0].parentElement.children[1];
	UI.addSubjectToTerm(subjectsList);
});

//gets the appropriate subject when a 'remove-subject-btn' is clicked
$(document).on("click", ".remove-subject-btn", function() {
	selectedSubject = $(this)[0].parentElement;
	UI.removeSubjectFromTerm(selectedSubject);
});

//Removes all Terms from localStorage
localStorage.removeItem('terms');
//
// var term1 = new Term();
// term1.title = 'Term #1';
// term1.avg = 8.2;
// term1.subjects.push(new Subject('subject1', 'grade1'));
// term1.subjects.push(new Subject('subject2', 'grade2'));
// Student.addTerm(term1);
//
// var term2 = new Term();
// Student.addTerm(term2);

var termsTemp = document.querySelectorAll(".term");
console.log(termsTemp);
for (var i = 0 ; i < termsTemp.length ; i++) {
	var term1 = new Term(); //create new term
	var title = termsTemp[i].firstElementChild.children[0];
	term1.title = title.innerText; //add term title
	var avg = termsTemp[i].firstElementChild.children[1];
	term1.avg = avg.innerText; //add term avg grade

	var subjectsTemp = termsTemp[i].lastElementChild.children;
	for (var index = 0 ; index < subjectsTemp.length - 1; index++) {
		var subjectTitle = subjectsTemp[index].children[0].innerText;
		var subjectGrade = subjectsTemp[index].children[1].innerText;
		term1.subjects.push(new Subject(subjectTitle, subjectGrade));
	}

	Student.addTerm(term1); //add term to Student (loaclStorage)
}
