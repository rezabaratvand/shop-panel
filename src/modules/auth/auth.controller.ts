import {
  Body,
  Query,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { AuthSignInDto } from './dto/auth-signIn.dto';
import { AuthSignUpDto } from './dto/auth-signUp.dto';
import { RolesGuard } from './guards/roles.guard';
import { RefreshAccessTokenDto } from './dto/refreshAccessToken.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { PasswordResetDto } from './dto/passwordReset.dto';
import { VerifyPhoneNumberDto } from './dto/verifyPhoneNumber.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { ChangeMyPasswordDto } from './dto/changeMyPassword.dto';
import { ChangeMyInfoDto } from './dto/changeMyInfo.dto';
import { VerifyForgotPasswordDto } from './dto/verifyForgotPassword.dto';
import { FilterQueryDto } from '../../common/dto/filterQuery.dto';
import { AuthHistoryDocument } from './schemas/authHistory.schema';
import { prefix } from 'src/constants/prefix-panel.constant';
@ApiTags('auth')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'signUp new user' })
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() authSingUpDto: AuthSignUpDto,
  ): Promise<string | { verificationCode: number }> {
    return await this.authService.signUp(authSingUpDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'signIn the user' })
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(authSignInDto);
  }

  // change my password
  @Post('change-my-password')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse()
  @ApiOperation({ summary: 'change my password' })
  async changeMyPassword(
    @Body()
    changeMyPassword: ChangeMyPasswordDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.changeMyPassword(changeMyPassword);
  }

  // change my password
  @Post('change-my-info')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse()
  @ApiOperation({ summary: 'change my information' })
  async changeMyInfo(
    @Body()
    changeMyInfo: ChangeMyInfoDto,
  ): Promise<string> {
    return await this.authService.changeMyInfo(changeMyInfo);
  }

  // verify email
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'verify the email' })
  async verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.verifyEmail(verifyEmailDto);
  }

  // verify phone number
  @Post('verify-phone-number')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'verify the phone number' })
  async verifyPhoneNumber(
    @Body() verifyPhoneNumberDto: VerifyPhoneNumberDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.verifyPhoneNumber(verifyPhoneNumberDto);
  }

  // refresh access token
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiOperation({ summary: 'Refresh Access Token with refresh token' })
  async refreshAccessToken(
    @Body() refreshAccessToke: RefreshAccessTokenDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.refreshAccessToken(refreshAccessToke);
  }

  // forgot password
  @Post('forgot-password')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({})
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ forgotPasswordToken: number }> {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  // verify forgot password
  @Post('verify-forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify forget password code' })
  @ApiOkResponse({})
  async verifyForgotPassword(
    @Body() verifyForgotPassword: VerifyForgotPasswordDto,
  ): Promise<string> {
    return await this.authService.verifyForgotPassword(verifyForgotPassword);
  }

  // reset password
  @Post('reset-password')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Reset password after verify reset password' })
  @ApiOkResponse({})
  async resetPassword(
    @Body() passwordResetDto: PasswordResetDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.resetPassword(passwordResetDto);
  }

  // verify phone number
  @Post('does-token-expires')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse()
  @ApiOperation({ summary: 'verify access token' })
  async doesTokenExpires(): Promise<boolean> {
    return true;
  }

  // auth histories
  @Get(`${prefix}/auth-histories`)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all authHistories' })
  @ApiOkResponse()
  async getAuthHistories(
    @Query() filterQueryDto: FilterQueryDto,
  ): Promise<AuthHistoryDocument[]> {
    return await this.authService.getAuthHistories(filterQueryDto);
  }
}
