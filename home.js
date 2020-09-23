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
		const terms = Student.getTerms();
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