<p align="center">
    <img src="https://ms0.org/ms0_logo.png" alt="ms0 logo" width="180">
</p>

# ms0

ms0 (301 Ping) is a URL shortener. Create short links from the web app or the authenticated API, then manage your links and track visits from your account.

## Features

- Create short links from the home page, with or without an account.
- Redirect short links to their destination and count visits.
- Register to manage your links and see link and visit totals on your dashboard.
- Create short links through the API using your account access token.
- Validate destination URLs before shortening.

## Requirements

- PHP 8.4+
- Composer
- Node.js and npm
- MySQL (or another database supported by Laravel)

## Local development

1. Install PHP and JavaScript dependencies:

   ```sh
   composer install
   npm ci
   ```

2. Create your environment file and application key:

   ```sh
   cp .env.example .env
   php artisan key:generate
   ```

3. Configure the `DB_*` values in `.env` for your local database. The example environment uses MySQL; make sure the database exists, then run migrations:

   ```sh
   php artisan migrate
   ```

4. Start the Laravel server and Vite development server in separate terminals:

   ```sh
   php artisan serve
   ```

   ```sh
   npm run dev
   ```

The app is available at the URL printed by `php artisan serve`. To build production assets, run `npm run build`.

## API

The API documentation is available at `/documentation/api`. To create a link, send a `POST` request to `/api/shorten` with a JSON `url` and your account access token:

```sh
curl --request POST \
  --url "https://your-domain.example/api/shorten" \
  --header "Authorization: Bearer <token>" \
  --header "Content-Type: application/json" \
  --data '{"url":"https://example.com/very/long/url"}'
```

A successful request returns the short URL:

```json
{
  "status": true,
  "message": "Shortened Url created successfully",
  "short_url": "https://your-domain.example/abc123"
}
```

The access token is available from your account dashboard. Requests without a valid token return `401`; missing, invalid, or unsafe URLs return `422`.

## Tests

Run the test suite with:

```sh
php artisan test
```
