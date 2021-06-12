// create
document.querySelector('#btn-create').addEventListener('click', async () => {
  const order = document.querySelector('#create-order-list').value;
  const result = await fetch('http://localhost:8080/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order }),
  });
  const data = await result.json();
  document.querySelector(
    '#result-create'
  ).textContent = `Order created with id ${data.id}`;
});

// delete
document.querySelector('#btn-delete').addEventListener('click', async () => {
  const id = document.querySelector('#delete-ID').value;
  const result = await fetch(`http://localhost:8080/orders/${id}`, {
    method: 'DELETE',
  });

  const data = await result.json();

  if (result.status !== 200) {
    return alert(data.message);
  }
  document.querySelector('#delete-order').textContent = `Order was delete`;
});

// update
document.querySelector('#btn-update').addEventListener('click', async () => {
  const order = document.querySelector('#update-list-order').value;
  const id = document.querySelector('#update-id').value;

  const result = await fetch(`http://localhost:8080/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order }),
  });
  const data = await result.json();
  if (result.status !== 200) {
    return alert(data.message);
  }
  document.querySelector(
    '#update-order'
  ).textContent = `Order created with id ${id}`;
});

// show
document.querySelector('#btn-show').addEventListener('click', async () => {
  const id = document.querySelector('#show-id').value;
  const result = await fetch(`http://localhost:8080/orders/${id}`);
  const data = await result.json();
  document.querySelector('#show-order').textContent = JSON.stringify(data);
});
