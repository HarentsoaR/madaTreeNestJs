import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cors from 'cors';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const crypto = require('crypto');
  const secret = crypto.randomBytes(64).toString('hex');
  //console.log(secret);
  app.use(
    session({
      secret: secret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // Session duration: 1 hour
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  //DEBUGING
  app.enableShutdownHooks();
  app.useGlobalPipes(/* your pipes */);
  app.useGlobalInterceptors(/* your interceptors */);
  // Enable detailed logging
  app.useLogger(['error', 'warn', 'log', 'verbose', 'debug']);
  app.use(cors()); // Enable CORS globally
  await app.listen(3000);
}
bootstrap();