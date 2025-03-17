import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser(process.env["COOKIE_SECRET"]))
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true
  })
  await app.listen(5000)
}
bootstrap()
