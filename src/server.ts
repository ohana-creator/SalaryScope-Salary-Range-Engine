import Fastify from 'fastify';
import { salaryRoutes } from './api/salary.routes';

const app = Fastify({ logger: true });
const PORT = process.env.PORT || 3000;

app.register(salaryRoutes);

app.listen({ port: Number(PORT), host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
