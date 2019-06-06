var app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http);

function* generator(id) {
  while (true) { yield id++; }
}
const idGenerator = generator(0);

let list = [
  { id: idGenerator.next().value, title: 'Item1' },
  {
    id: idGenerator.next().value, title: 'Item2', children: [
      { id: idGenerator.next().value, title: 'Children1' },
      {
        id: idGenerator.next().value, title: 'Children2', children: [
          { id: idGenerator.next().value, title: 'SubChildren1' },
          { id: idGenerator.next().value, title: 'SubChildren2' },
          { id: idGenerator.next().value, title: 'SubChildren3' }
        ]
      },
      { id: idGenerator.next().value, title: 'Children3' },
    ]
  },
  { id: idGenerator.next().value, title: 'Item3' },
];

io.on('connection', function(client){
  // First we send the data to the new client
  client.emit('updateList', list);

  // [ADD]
  client.on('addItem', function(title) {
    list.push({
      id: idGenerator.next().value,
      title
    });
    console.log('[CREATED] New item : ', title);
    io.emit('updateList', list);
  });

  // [UPDATE]
  client.on('updateList', function(newList) {
    list = newList;
    console.log('[UPDATED] List');
    io.emit('updateList', list);
  })
});

http.listen(3001, function () {
  console.log('listening on *:3001');
});