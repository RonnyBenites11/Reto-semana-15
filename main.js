import './style.css'
const cardGrid = document.getElementById('card-grid');
const apiUrl = 'http://localhost:3000/cats';
const confirmModal = document.getElementById('confirm-modal');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');
let cardToDelete = null;  
function fetchCats() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(cats => {
      cardGrid.innerHTML = ''; 
      cats.forEach(cat => {
        createCatCard(cat);
      });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}
function createCatCard(cat) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `card-${cat.id}`; 
  card.innerHTML = `
    <div class="card-header">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
    <img src="${cat.img}" alt="Dog Image" class="dog-image">
    <h2>${cat.name}</h2>
    <p>${cat.telefono} | Correo</p>
    <p>${cat.pais}</p>
    <p class="about">${cat.descripcion}</p>
  `; 
  const deleteButton = card.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => showConfirmModal(card.id));

  cardGrid.appendChild(card);
}
function showConfirmModal(cardId) {
  cardToDelete = document.getElementById(cardId); 
  confirmModal.style.display = 'flex'; 
}
confirmBtn.addEventListener('click', () => {
  if (cardToDelete) {
    cardToDelete.style.display = 'none'; 
  }
  confirmModal.style.display = 'none'; 
  cardToDelete = null; 
});

cancelBtn.addEventListener('click', () => {
  confirmModal.style.display = 'none'; 
  cardToDelete = null; 
});

fetchCats();
