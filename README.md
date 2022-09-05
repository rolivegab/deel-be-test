# HOW TO RUN

1) copy .model.env to .env and assign values to environments
2) run `docker-compose up -d` so the database can be UP.
3) run `npm run seed` to seed the database.
4) run `npm run dev` to get the server running.

There is a test example at `src/controllers/admin.controler.spec.ts`, you can run it by running command `npm run test`. No need for database as it is mocked on tests.