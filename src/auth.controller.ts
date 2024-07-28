import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google authentication process
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    // Successful authentication, redirect or send user info
    // res.redirect('http://localhost:3000'); // Redirect to your desired location
    console.log("Successful")
  }

  //Pinterest OAUTH2 flows
  @Get('pinterest')
  @UseGuards(AuthGuard('pinterest'))
  async pinterestAuth(@Req() req) {
    // Initiates the Pinterest authentication process
  }

  @Get('pinterest/callback')
  @UseGuards(AuthGuard('pinterest'))
  async pinterestAuthCallback(@Req() req, @Res() res) {
    console.log('Pinterest Authentication Successful:', req.user);
    res.redirect('/'); // Redirect to your desired route
  }
}
