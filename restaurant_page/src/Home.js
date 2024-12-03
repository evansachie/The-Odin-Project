import imageSrc from '../assets/rest-img.jpg';

const header = document.getElementById('content');

const h3 = document.createElement('h1');
h3.textContent = 'Welcome to the Tastyy Restaurant';

const p = document.createElement('p');
p.textContent =
  "Here at Tastyy, we serve the best food in town. Our chefs are highly trained and have years of experience in the culinary arts. We use only the freshest ingredients in our dishes, and we take great pride in the quality of our food. Whether you're in the mood for a hearty meal or a light snack, we have something for everyone. So come on down to Tastyy and experience the difference for yourself!";

const img = document.createElement('img');
img.src = imageSrc;
img.alt = 'Restaurant Page';

header.appendChild(h3);
header.appendChild(img);
header.appendChild(p);

export default header;
