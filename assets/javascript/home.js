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
		terms.pop();

		localStorage.setItem('terms', JSON.stringify(terms));
	}

	static getNextId() {
		return Student.getTerms().length;
	}

}

class UI {

	static addTermToStudent() {
		const termsDivList = document.querySelector('#grid-matrix');

		const termDiv = document.createElement('div');
		termDiv.classList.add("term");
		termDiv.classList.add("grid-item");

		termDiv.innerHTML = `
		<div class="item-header">
			<div class="item-header-title editable">
			</div>
			<div class="item-header-avg">
			</div>
		</div>

		<!-- TERM CONTEXT (parent container of the subjects) -->
		<div class="item-list">
			<!--
			<div class="subject">
				<div class="remove-subject-btn"></div>
				<div id="test-field" class="subject-name editable col-9"></div>
				<div class="subject-grade editable col-3">8</div>
			</div>
			-->
		</div>

		<!-- ADD BUTTON (should only appear when in edit mode) -->
		<div class="add-subject-btn btn btn-dark">ADD</div>
		`;

		termsDivList.appendChild(termDiv);
		termDiv.firstElementChild.children[0].setAttribute('contenteditable', true);

		return termDiv;
	}

	static removeTermFromStudent() {
		const termsDivList = document.querySelector('#grid-matrix');
		termsDivList.removeChild(termsDivList.lastElementChild);
	}

	static addSubjectToTerm(e) {
		const subjectDiv = document.createElement('div');
		subjectDiv.classList.add("subject");

		subjectDiv.innerHTML = `
			<div class="remove-subject-div">
				<div class="remove-subject-btn"></div>
			</div>
			<div class="subject-name editable"></div>
			<div class="subject-grade editable"></div>
		`;

		e.appendChild(subjectDiv);
		subjectDiv.children[1].setAttribute('contenteditable', true);
		subjectDiv.children[2].setAttribute('contenteditable', true);

		return subjectDiv;
	}

	static removeSubjectFromTerm(s) {
		var parent = s.parentElement;
		parent.removeChild(s);
	}

}


// Load data from localStorage
var data = Student.getTerms();
if (data != null){
	var studentAvg = 0;
	var validTerms = 0;
	for (var i = 0 ; i < data.length ; i++) {
		currentTerm = UI.addTermToStudent();
		currentTerm.firstElementChild.children[0].innerText = data[i].title;
		currentTerm.firstElementChild.children[0].setAttribute('contenteditable', false);
		currentTerm.firstElementChild.children[1].innerText = Math.round(data[i].avg * 10) / 10;
		studentAvg += data[i].avg;
		validTerms += data[i].avg == 0 ? 0 : 1;
		currentTerm.lastElementChild.style.display = "none";
		for (var j = 0 ; j < data[i].subjects.length ; j++) {
			var currentSubject = UI.addSubjectToTerm(currentTerm.children[1]);
			currentSubject.children[0].firstElementChild.style.display = "none";
			currentSubject.children[1].innerText = data[i].subjects[j].name;
			currentSubject.children[1].setAttribute('contenteditable', false);
			currentSubject.children[2].innerText = data[i].subjects[j].grade;
			currentSubject.children[2].setAttribute('contenteditable', false);
			currentSubject.style.borderLeft = (Number(data[i].subjects[j].grade >= 5) || data[i].subjects[j].grade.toLowerCase() == 'p' ) ? "5px solid #62CC00" : "5px solid #E83030";
		}
	}
	document.querySelector("#student-avg").innerText = validTerms != 0 ? Math.round(studentAvg / validTerms * 100) / 100 : "";
}

// EDIT / Makes all appropriate fields Editable
var btnEdit = document.querySelector("#edit-btn");
btnEdit.addEventListener('click', editAll);
function editAll() {
	// display all buttons appropriate for edit
	document.querySelector("#save-btn").style.display = "block";
	document.querySelector("#add-btn").style.display = "block";
	document.querySelector("#remove-btn").style.display = "block";
	document.querySelector("#edit-btn").style.display = "none";

	var editableFields = document.querySelectorAll(".editable");
	for (var i = 0 ; i < editableFields.length ; i++) {
		editableFields[i].setAttribute('contenteditable', true);
	}
	//set the display to "block" to all add-subject buttons
	var addButtons = document.querySelectorAll(".add-subject-btn");
	for (var i = 0 ; i < addButtons.length ; i++) {
		addButtons[i].style.display = "block";
	}

	//set the display to "block" to all remove-subject buttons
	var rmvButtons = document.querySelectorAll(".remove-subject-btn");
	for (var i = 0 ; i < rmvButtons.length ; i++) {
		rmvButtons[i].style.display = "block";
	}

}

// SAVE / Undos the ability to edit all editable fields / hide add buttons
var btnSave = document.querySelector("#save-btn");
btnSave.addEventListener('click', saveAll);
function saveAll() {
	// display all buttons appropriate for view
	document.querySelector("#save-btn").style.display = "none";
	document.querySelector("#add-btn").style.display = "none";
	document.querySelector("#remove-btn").style.display = "none";
	document.querySelector("#edit-btn").style.display = "block";

	//Undos the ability to edit all editable fields
	var editableFields = document.querySelectorAll(".editable");
	for (var i = 0 ; i < editableFields.length ; i++) {
		editableFields[i].setAttribute('contenteditable', false);
	}

	//set the display to "none" to all add-subject buttons
	var addButtons = document.querySelectorAll(".add-subject-btn");
	for (var i = 0 ; i < addButtons.length ; i++) {
		addButtons[i].style.display = "none";
	}

	//set the display to "none" to all remove-subject buttons
	var rmvButtons = document.querySelectorAll(".remove-subject-btn");
	for (var i = 0 ; i < rmvButtons.length ; i++) {
		rmvButtons[i].style.display = "none";
	}

	//Removes all Terms from localStorage
	localStorage.removeItem('terms');

	//Saves all field details to localStorage (persistence)
	var termsTemp = document.querySelectorAll(".term");
	var studentAvg = 0;
	var validTerms = 0;
	for (var i = 0 ; i < termsTemp.length ; i++) {
		var term1 = new Term(); //create new term
		var title = termsTemp[i].firstElementChild.children[0];
		term1.title = title.innerText; //add term title
		var avg = 0;
		var validSubjects = 0;
		var subjectsTemp = termsTemp[i].children[1].children;
		for (var index = 0 ; index < subjectsTemp.length ; index++) {
			var subjectTitle = subjectsTemp[index].children[1].innerText;
			var subjectGrade = subjectsTemp[index].children[2].innerText;
			if (!isNaN(parseFloat(subjectGrade)) && Number(subjectGrade)>=5) {
				avg += parseFloat(subjectGrade);
				validSubjects++;
			}
			subjectsTemp[index].style.borderLeft = (Number(subjectGrade >= 5) || subjectGrade.toLowerCase() == 'p') ? "5px solid #62CC00" : "5px solid #E83030";
			term1.subjects.push(new Subject(subjectTitle, subjectGrade));
		}
		term1.avg = validSubjects != 0 ? avg / validSubjects : 0 ;
		termsTemp[i].firstElementChild.children[1].innerText = Math.round(term1.avg * 10) / 10;
		studentAvg += term1.avg;
		validTerms += term1.avg == 0 ? 0 : 1;

		Student.addTerm(term1); //add term to Student (localStorage)
	}

	document.querySelector("#student-avg").innerText = validTerms != 0 ? Math.round(studentAvg / validTerms * 100) / 100 : "";

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
$(document).on("click", ".add-subject-btn", function() {
	subjectsList = $(this)[0].parentElement.children[1];
	UI.addSubjectToTerm(subjectsList);
});

//gets the appropriate subject when a 'remove-subject-btn' is clicked
$(document).on("click", ".remove-subject-btn", function() {
	selectedSubject = $(this)[0].parentElement.parentElement;
	UI.removeSubjectFromTerm(selectedSubject);
});

// Sidebar toggle button
$('#sidebar-icon').on('click', function() {
	$('#menu').toggleClass('col-5');
	$('#menu').toggleClass('d-block');
	$('#grid').toggleClass('col-10');
});

// View mode controls
var chartsScript;
var viewMode = 'home';
$('#home-btn').on('click', function() {
	viewMode = 'home';
	updateViewMode();
	$('#menu').toggleClass('col-5');
	$('#menu').toggleClass('d-block');
	$('#grid').toggleClass('col-10');
});

$('#charts-btn').on('click', function() {
	viewMode = 'charts';
	updateViewMode();
	$('#menu').toggleClass('col-5');
	$('#menu').toggleClass('d-block');
	$('#grid').toggleClass('col-10');

	if (document.body.contains(chartsScript)) {
		document.body.removeChild(chartsScript);
	}

	chartsScript = document.createElement('script');
	chartsScript.src = 'assets/javascript/chartjs.js';
	document.body.appendChild(chartsScript);
});

function updateViewMode() {
	document.querySelector("#grid-matrix").style.display = (viewMode == 'home' ? 'flex' : 'none');
	document.querySelector("#buttons-container").style.display = (viewMode == 'home' ? 'flex' : 'none');
	document.querySelector("#charts-container").style.display = (viewMode == 'charts' ? 'flex' : 'none');
}
updateViewMode();

// Dark Mode Toggle switch
darkMode = false;
darkMode = JSON.parse(localStorage.getItem('darkMode'));
updateDarkMode();
$('#darkMode-switch').on('click', function() {
	darkMode = (darkMode == false ? true : false );
	localStorage.setItem('darkMode', JSON.stringify(darkMode));
	updateDarkMode();
});

function updateDarkMode() {
	document.querySelector("body").style.background = (darkMode == true ? "#3B444B" : "none") ;
	$("#darkMode-switch").prop("checked", (darkMode == true ? true : false));
	$(".item-header-avg, #grid-header, #chart3").css({"color" : (darkMode == true ? "#fbf4ec" : "black")});
	$("#grid-header, #menu-logo, #menu").css({"border-color" : (darkMode == true ? "#E6bE93" : "#A6713C")});
	$(".fa").css({"color" : (darkMode == true ? "#fbf4ec" : "black")});
}
