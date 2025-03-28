
// This will handle stock portfolios, user info, and interactivity

document.addEventListener('DOMContentLoaded', () => {
  const allStocks = JSON.parse(stockContent); // from stocks-complete.js
  const allUsers = JSON.parse(userContent);   // from users.js

  const saveBtn = document.querySelector('#saveButton');
  const removeBtn = document.querySelector('#deleteButton');

  displayUserList(allUsers, allStocks);

  // 💾 Update and save user info
  saveBtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent page reload
  
     const saveBtn = document.querySelector('#btnSave'); // ✅ correct ID from HTML

  
    const userToUpdate = allUsers.find(u => u.id == targetId);
  
    if (userToUpdate) {
      userToUpdate.user.firstname = document.querySelector('#firstname').value;
      userToUpdate.user.lastname = document.querySelector('#lastname').value;
      userToUpdate.user.address = document.querySelector('#address').value;
      userToUpdate.user.city = document.querySelector('#city').value;
      userToUpdate.user.email = document.querySelector('#email').value;
  
      displayUserList(allUsers, allStocks); // refresh the sidebar list
  
      // Optional: repopulate the form to reflect updates
      populateForm(userToUpdate);
    }
  });

  // ❌ Remove user
  removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const removeBtn = document.querySelector('#btnDelete'); // ✅ matches HTML
    const idx = allUsers.findIndex(u => u.id == deleteId);

    if (idx !== -1) {
      allUsers.splice(idx, 1);
      displayUserList(allUsers, allStocks);
    }
  });
});


// 📜 Show all users on sidebar
function displayUserList(userArr, stockArr) {
  const list = document.querySelector('.user-list');
  list.innerHTML = ''; // clear previous users

  userArr.forEach((entry) => {
    const li = document.createElement('li');
    li.innerText = `${entry.user.lastname}, ${entry.user.firstname}`;
    li.id = entry.id;
    list.appendChild(li);
  });

  list.addEventListener('click', (event) => {
    const userId = event.target.id;
    const selected = userArr.find(p => p.id == userId);
    if (selected) {
      fillUserForm(selected);
      showPortfolio(selected, stockArr);
    }
  });
}


// 🧾 Fill form with selected user's info
function fillUserForm(data) {
  const { user, id } = data;

  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}


// 💼 Show portfolio stocks with view buttons
function showPortfolio(user, stocks) {
  const { portfolio } = user;
  const section = document.querySelector('.portfolio-list');
  section.innerHTML = ''; // clean before adding

  portfolio.forEach(({ symbol, owned }) => {
    const s = document.createElement('p');
    const q = document.createElement('p');
    const btn = document.createElement('button');

    s.textContent = symbol;
    q.textContent = owned;
    btn.textContent = 'View';
    btn.id = symbol;

    section.appendChild(s);
    section.appendChild(q);
    section.appendChild(btn);
  });

  section.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      revealStockInfo(event.target.id, stocks);
    }
  });
}


// 📊 Show stock info when 'View' is clicked
function revealStockInfo(symbol, allStocks) {
  const card = document.querySelector('.stock-form');
  const found = allStocks.find(item => item.symbol == symbol);

  if (found) {
    document.querySelector('#stockName').textContent = found.name;
    document.querySelector('#stockSector').textContent = found.sector;
    document.querySelector('#stockIndustry').textContent = found.subIndustry;
    document.querySelector('#stockAddress').textContent = found.address;
    document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}

