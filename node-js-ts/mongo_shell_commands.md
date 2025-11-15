# Commands / Methods

[Official docs](https://www.mongodb.com/docs/manual/reference/method/)

- `mongosh -u <username> -p <password> --authenticationDatabase admin` - enter into a mongoDB shell
- `show collections`
- `show dbs`
- `use <databse name>`
- `db.<database name>.find().pretty()`
- `mongosh` or `mongo` - enter into mongodb shell
- `db.auth("<username>", "<password>")` - returns whether the username and password are correct or not
- `db.dropUser("<username>")` - delete user with `username`
- create user with permissions -

    ```mongodb
    db.createUser({
        user: "<username>",
        pwd: "<password>",
        roles: [{ role: "<rolename>", db: "<database name>" }]
    })
    ```

- localhost exception - simply restart mongodb container

## executed

- `mongosh -u user -p pass --authenticationDatabase admin`
- create admin

    ```mongodb
    db.createUser({
        user: "administrator",
        pwd: "lokeshwar777",
        roles: [{ role: "root", db: "admin" }]
    })
    ```

- create user

    ```mongodb
    db.createUser({
        user: "loki",
        pwd: "reddy",
        roles: [{ role: "dbOwner", db: "admin" }]
    })
    ```
