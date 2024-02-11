import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/GoogleStrategy';
import { FortyTwoStrategy } from './strategy/Strategy42';
import { AuthContoller } from './auth.contoller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [UsersModule, PassportModule],
//   providers: [AuthService, LocalStrategy, JwtService],
// })

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get('JWT_EXPIRES_IN')
        },
      }),
      inject: [ConfigService],
    }),
    // JwtModule.registerAsync({
    //   useFactory: () => ({
    //     secret: "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
    //     signOptions: {
    //       expiresIn: '3d',
    //     },
    //     global: true,
    //   }),
    // }),
  ],
  providers: [AuthService, FortyTwoStrategy, GoogleStrategy,JwtStrategy, PrismaService],
  exports: [],
  controllers: [AuthContoller],
})

export class AuthModule {}
