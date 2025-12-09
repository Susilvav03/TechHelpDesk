import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TicketsModule } from './modules/tickets/tickets.module';
// import { CategoriesModule } from './modules/categories/categories.module';
// import { TechniciansModule } from './modules/technicians/technicians.module';
import { CommonModule } from './common/common.module'
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') ?? '5432', 10),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // para la prueba; en prod sería false + migrations
      }),
    }),
    CommonModule,
    UsersModule,
    AuthModule,
    ClientsModule,
    // TicketsModule,
    // CategoriesModule,
    // TechniciansModule,
  ],
})
export class AppModule {}
