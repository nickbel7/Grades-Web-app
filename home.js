// Subject class: Represents a subject (Name, Grade)
class Subject {
	constructor(name, grade) {
		this.name = name;
		this.grade = grade;
	}
}

// Term class: Represents a list of subjects
class Term {
	static getSubjects() {
		
	}
	
	static addSubject() {
		
	}
	
	static removeSubject() {
		
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
	
	static addTerm() {
		
	}
	
	static removeTerm() {
		
	}
	
}