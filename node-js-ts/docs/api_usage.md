# API Usage

1. Get all resources

    ```bash
    curl http://127.0.0.1:3000/api/v1/resources
    ```

2. Create a resource

    example: create a resource with `title` = "tablet", `description` = "PAN tablet:everday morning at 6:00AM"

    syntax 1:

    ```bash
    curl --data "title=<title>&description=<description>" http://127.0.0.1:3000/api/v1/resources
    ```

    ```bash
    curl --data "title=tablet&description=PAN%20tablet:everday%20morning%20at%206:00AM" http://127.0.0.1:3000/api/v1/resources
    ```
  
    syntax 2:

    ```bash
    curl http://127.0.0.1:3000/api/v1/resources \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "title=<title>&description=<description>"
    ```

    ```bash
    curl http://127.0.0.1:3000/api/v1/resources \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "title=tablet&description=PAN%20tablet:everday%20morning%20at%206:00AM"
    ```

    syntax 3:

    ```bash
    curl http://127.0.0.1:3000/api/v1/resources \
    -H "Content-Type: application/json" \
    -d '{ "title" : "<title>" , "description" : "<description>" }'
    ```

    ```bash
    curl http://127.0.0.1:3000/api/v1/resources \
    -H "Content-Type: application/json" \
    -d '{ "title" : "tablet" , "description" : "PAN tablet:everday morning at 6:00PM" }'
    ```

3. Get a resource

    syntax:

    ```bash
    curl http://127.0.0.1:3000/api/v1/resources/<id>
    ```

4. Delete a resource

    syntax:

    ```bash
    curl -X DELETE http://127.0.0.1:3000/api/v1/resources/<id>
    ```

5. Edit a resource

    ```bash
    curl -X PATCH http://127.0.0.1:3000/api/v1/resources/<id> \
    -H 'Content-Type: application/json' \
    -d '{ "title" : "<changed_title>", "description" : "<changed_description>" }'
    ```

## Additional

- use `curl <URL> | json_pp` for pretty printing in macOS
- `-d` is short for `--data` flag
- use `-D fileName.txt` to redirect output to a file or `-D -` to console
