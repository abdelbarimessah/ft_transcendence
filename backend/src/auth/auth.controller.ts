import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Patch,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CurrentUser } from './current-user.decorator';
import { authenticator } from 'otplib';
import { JwtService } from '@nestjs/jwt';
import { qrCodeDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res) {
    const user = req.user.user;

    if (!req.user) {
      return res.redirect('http://localhost:8000');
    }

    const payload = {
      id: user.id,
      providerId: user.providerId,
      nickName: user.nickName,
      otp: false,
    };
    const token = await this.authService.generateJwtToken(payload);

    res.cookie('authorization', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });
    const isNew = req.user.isNew;
    if (user.otpIsEnabled) {
      return res.redirect(`http://localhost:8000/auth`);
    } else {
      if (isNew) {
        return res.redirect('http://localhost:8000/setting');
      } else {
        return res.redirect('http://localhost:8000/profile');
      }
    }
  }

  @Get('42')
  @UseGuards(AuthGuard('42'))
  intraAuth() {}

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async intraAuthCallback(@Req() req, @Res() res) {
    const user = req.user.user;
    if (!req.user) {
      return res.redirect('http://localhost:8000');
    }

    const isNew = req.user.isNew;
    const payload = {
      id: user.id,
      providerId: user.providerId,
      nickName: user.nickName,
      otp: false,
    };
    const token = await this.authService.generateJwtToken(payload);

    res.cookie('authorization', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });
    if (user.otpIsEnabled) {
      return res.redirect(`http://localhost:8000/auth`);
    } else {
      if (isNew) {
        return res.redirect('http://localhost:8000/setting');
      } else {
        return res.redirect('http://localhost:8000/profile');
      }
    }
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('authorization', {
      httpOnly: true,
    });
    // return res.redirect('http://localhost:8000');
    return res.json({ success: true, message: 'Logged out successfully' });
  }

  @Patch('generate/Otp')
  @UseGuards(AuthGuard('jwt'))
  async generateOtpSecrete(@CurrentUser() user: any) {
    const { secretOpt, qr_code } = await this.authService.generateOTP(user);

    if (!user.secretOpt)
      await this.authService.setOTPSecret(user.id, secretOpt);

    return { qr_code };
  }

  @Patch('enable/Otp')
  @UseGuards(AuthGuard('jwt'))
  async enableOtp(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
    @Body() body: qrCodeDto,
  ) {
    if (user.otpIsEnabled || !user.secretOpt)
      throw new Error('otp already enabled');

    const isValid = authenticator.verify({
      token: body.otp,
      secret: user.secretOpt,
    });
    if (!isValid) throw new UnprocessableEntityException();

    await this.authService.enableOtp(user.providerId);

    const payload = {
      id: user.id,
      providerId: user.providerId,
      nickName: user.nickName,
      otp: true,
    };
    const token = await this.jwtService.signAsync(payload);
    res.cookie('authorization', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });
    console.log('token ===>', token);
    return { otp: { enabled: true, verified: true } };
  }

  @Patch('disable/Otp')
  @UseGuards(AuthGuard('jwt'))
  async disableOtp(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.disableOtp(user.providerId);

    const payload = {
      id: user.id,
      providerId: user.providerId,
      nickName: user.nickName,
      otp: false,
    };
    const token = await this.jwtService.signAsync(payload);
    res.cookie('authorization', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });
    return { otp: { enabled: false, verified: false } };
  }

  @Patch('verify/Otp')
  @UseGuards(AuthGuard('jwt'))
  async verifyOtp(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
    @Body() body: qrCodeDto,
  ) {
    if (!user.otpIsEnabled) throw new ForbiddenException();

    const success = await this.authService.verifyOTP(user, body.otp);
    if (!success) {
      throw new UnprocessableEntityException();
    }

    const payload = {
      id: user.id,
      providerId: user.providerId,
      nickName: user.nickName,
      otp: true,
    };
    const token = await this.jwtService.signAsync(payload);
    res.cookie('authorization', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });

    return { otp: { enabled: true, verified: true } };
  }
}
