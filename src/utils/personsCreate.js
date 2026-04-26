// classes
import Person from "../classes/Person.js";

export default function personsCreate(characters) {
  const persons = [];

  for (let i = 0; i < characters.length; ++i) {
    persons.push(new Person(null, ...characters[i]));
  }

  return persons;
}

