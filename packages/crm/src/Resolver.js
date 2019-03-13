import { Resolver } from 'found-relay';

class AuthResolver extends Resolver {
  resolveElements(match) {
    if (!authenticated && match.routes.some(route => route.private)) {
      throw new HttpError(401);
    }

    return super.resolveElements(match);
  }
}

const authResolver = new AuthResolver();

export default authResolver;
