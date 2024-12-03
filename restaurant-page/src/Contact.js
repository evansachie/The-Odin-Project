const contact = document.getElementById('contact');
const contact1 = document.createElement('h3');
contact1.textContent = 'Contact Us';
const contact2 = document.createElement('p');
contact2.textContent = 'Phone: 123-456-7890';
const contact3 = document.createElement('p');
contact3.textContent = 'tastyyrest@gmail.com';

contact.appendChild(contact1);
contact.appendChild(contact2);
contact.appendChild(contact3);

export default contact;