import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/GoogleStrategy';
import { FortyTwoStrategy } from './strategy/Strategy42';
import { AuthContoller } from './auth.contoller';
import { AuthService } from './auth.services';

// @Module({
//   imports: [UsersModule, PassportModule],
//   providers: [AuthService, LocalStrategy, JwtService],
// })

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:
        'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
      signOptions: { expiresIn: '3d' },
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
  providers: [AuthService, FortyTwoStrategy, GoogleStrategy, JwtStrategy],
  exports: [],
  controllers: [AuthContoller],
})
export class AuthModule {}
