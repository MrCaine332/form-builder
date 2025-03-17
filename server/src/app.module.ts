import { Module } from "@nestjs/common"
import { AuthModule } from "./modules/auth/auth.module"
import { ConfigModule } from "@nestjs/config"
import {PrismaModule} from "../prisma/prisma.module";
import {APP_GUARD} from "@nestjs/core";
import {AtGuard} from "@/modules/auth/guards/at.guard";
import {FormsModule} from "@/modules/forms/forms.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    FormsModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AtGuard }
  ]
})
export class AppModule {}
