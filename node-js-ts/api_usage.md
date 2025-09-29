# API Usage

1. Get all TODOs

    ```bash
    curl http://127.0.0.1:3000/api/v1/todos
    ```

2. Create a TODO

    example: create a todo with `title` = "tablet", `description` = "PAN tablet:everday morning at 6:00AM"

    syntax 1:

    ```bash
    curl --data "title=<title>&description=<description>" http://127.0.0.1:3000/api/v1/todos
    ```

    ```bash
    curl --data "title=tablet&description=PAN%20tablet:everday%20morning%20at%206:00AM" http://127.0.0.1:3000/api/v1/todos
    ```
  
    syntax 2:

    ```bash
    curl http://127.0.0.1:3000/api/v1/todos \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "title=<title>&description=<description>"
    ```

    ```bash
    curl http://127.0.0.1:3000/api/v1/todos \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "title=tablet&description=PAN%20tablet:everday%20morning%20at%206:00AM"
    ```

    syntax 3:

    ```bash
    curl http://127.0.0.1:3000/api/v1/todos \
    -H "Content-Type: application/json" \
    -d '{ "title" : "<title>" , "description" : "<description>" }'
    ```

    ```bash
    curl http://127.0.0.1:3000/api/v1/todos \
    -H "Content-Type: application/json" \
    -d '{ "title" : "tablet" , "description" : "PAN tablet:everday morning at 6:00PM" }'
    ```

3. Get a TODO

    syntax:

    ```bash
    curl http://127.0.0.1:3000/api/v1/todos/<id>
    ```

4. Delete a TODO

    syntax:

    ```bash
    curl -X DELETE http://127.0.0.1:3000/api/v1/todos/<id>
    ```

5. Edit a TODO

    ```bash
    curl -X PATCH http://127.0.0.1:3000/api/v1/todos/<id> \
    -H 'Content-Type: application/json' \
    -d '{ "title" : "<changed_title>", "description" : "<changed_description>" }'
    ```

## Additional

- use `curl <URL> | json_pp` for pretty printing in macOS
- `-d` is short for `--data` flag
- use `-D fileName.txt` to redirect output to a file or `-D -` to console
