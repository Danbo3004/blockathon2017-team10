You need run this command on mongodb for search-feature working
```
  db.getCollection('users').createIndex({
    firstName: "text", 
    lastName: "text",
    email: "text",
    phone: "text",
    clientGroup: 1,
  })
```