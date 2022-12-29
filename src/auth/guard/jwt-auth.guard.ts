import { errorMessage } from '@/common/errorMessage';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err) throw new UnauthorizedException(err.message);
    if (!user) throw new UnauthorizedException(errorMessage.pleaseLogin);
    return user;
  }
}
