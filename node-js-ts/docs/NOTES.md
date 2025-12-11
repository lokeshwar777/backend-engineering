# Notes

## API Endpoints

- Resources
  - POST `/api/v1/resources/` - create a resource
  - GET `/api/v1/resources/` - get all resources
  - GET `/api/v1/resources/{resource_id}` - get resource by id
  - PUT `/api/v1/resources/{resource_id}` - full replace resource by id
  - PATCH `/api/v1/resources/{resource_id}` - update resource by id
  - DELTE `/api/v1/resources/{resource_id}` - remove resource by id

- Users
  - POST `/api/v1/users/` - create a user
  - GET `/api/v1/users/` - get all users
  - GET `/api/v1/users/{user_id}` - get user by id
  - DELTE `/api/v1/users/{user_id}` - remove user by id

- Authentication
  - POST `/api/v1/auth/register` - register/sign up
  - POST `/api/v1/auth/login` - login/sign in
  - POST `/api/v1/auth/me` - get current user info
  - POST `/api/v1/auth/logout` - logout/sign out
  - POST `/api/v1/auth/refresh` - refresh expired access token

## Flows

- Register
  1. validation of fields
  2. uniqueness check
  3. existing user check
  4. verified user check (mail/phone-link/otp)
  5. (optional) auto-login/redirect to login

- Login
  1. validation of fields
  2. user account check
  3. credentials check (hashed passwords match?)
  4. verified user check (mail/phone-link/otp)
  5. load existing session data from DB (if present) or create a new session and store the record in DB, store session id in cookie
  6. issue new access token, store it in cookie
  7. issue new refresh token, store it in cookie & hashed version in DB

- Logout
  1. delete session from DB
  2. reset cookie expiry to now
  3. invalidate hashed refresh token in DB
  4. (optional) add access token to revoked tokens list

- Token Rotation/Refresh (if the acccess token is expired when the client makes a request)
  1. if refresh token is also expired -> ask client to login again
  2. check refresh token in the cookie with hashed refresh token in DB -> if not match then token theft detected
  3. issue new access token and store it in cookie
  4. issue new refresh token and replace it with existing refresh token in cookie
  5. replace the existing hashed refresh token with new hashed refresh token in DB

## Considerations

- cookie settings
- token rotation - atomic, race condition, multiple sessions
- slow hashing
