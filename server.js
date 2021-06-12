const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = 80;

const app = express();

app.use(express.static('public'));
app.use(express.json());

const readDb = () => {
  const contentFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'db.json'))
  );
  return contentFile;
};

const writeToDb = data => {
  const contentFile = fs.writeFileSync(
    path.join(__dirname, 'db.json'),
    JSON.stringify(data)
  );
  return contentFile;
};

app.get('/orders/:id', (req, res) => {
  try {
    const order = readDb().find(item => item.id === req.params.id);

    if (order) {
      return res.send(order);
    }
    res.status(422);
    return res.json({ message: 'Invalid Data' });
  } catch (error) {
    console.log(error);
    res.status(422);
    return res.json({ message: 'Invalid Data' });
  }
});

app.post('/orders', (req, res) => {
  const id = uuidv4();
  try {
    const db = readDb();
    db.push({ id, order: req.body.order.split(' ') });
    writeToDb(db);
    return res.json({ id, order: req.body.order });
  } catch (error) {
    writeToDb([{ id, order: req.body.order }]);
    return res.json({ id, order: req.body.order });
  }
});

app.delete('/orders/:id', (req, res) => {
  try {
    let db = readDb();
    const oldSizeDb = db.length;
    db = db.filter(item => item.id !== req.params.id);
    if (oldSizeDb === db.length) {
      res.status(422);
      return res.json({ message: 'Invalid Data' });
    }
    writeToDb(db);
    return res.json({ message: 'Ok' });
  } catch (error) {
    res.status(422);
    return res.json({ message: 'Invalid Data' });
  }
});

app.put('/orders/:id', (req, res) => {
  try {
    let db = readDb();
    writeToDb(
      db.map(item => {
        if (item.id === req.params.id) {
          return { ...item, order: req.body.order.split(' ') };
        }
        return item;
      })
    );

    return res.json({ message: 'Ok' });
  } catch (error) {
    res.status(422);
    return res.json({ message: 'Invalid Data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server start on port:${PORT}`);
});
