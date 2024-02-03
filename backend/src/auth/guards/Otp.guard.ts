
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OTPGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;

    const { user, jwtPayload } = request.user;

    return !user.otpIsEnabled || Boolean(jwtPayload?.otp_is_verified);
  }
}
