import { Log, User, UserManager } from 'oidc-client';

import { Constants } from '../helpers/Constants';


export class AuthService {
  public userManager: UserManager;
  public user: any;

  constructor() {
    const settings = {
      authority: Constants.stsAuthority,
      //require_https_metadata: false,
      client_id: Constants.clientId,
      //client_name: Constants.clientName,
      client_secret: Constants.clientSecret,
      redirect_uri: `${Constants.clientRoot}login`,
      silent_redirect_uri: `${Constants.clientRoot}silent-refresh`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${Constants.clientRoot}`,
      response_type: 'code',
      response_mode: 'query',
      //grant_type: 'password',
      //username: 'bob',
      //password: 'bob',
      scope: Constants.clientScope,
      filterProtocolClaims: true,
      loadUserInfo: true,
      state: 'abc',
      nonce: 'xyz'
      //userStore: new WebStorageStateStore(webSettings)
    };

    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  // public async getUser(): Promise<User | null> {
  //   const user = await this.userManager.getUser();
  //   return user;
  // }

  public async getUser() {
    const user = await this.userManager.getUser();
    // if (!user) {
    //   return await this.userManager.signinRedirectCallback();
    // }

    return user;
}

setUser(user: any) {
  this.userManager.storeUser(user);
}

  public async login(): Promise<any> {
    return await this.userManager.signinRedirect()
      .then((user) => this.onRedirectSuccess(user))
      .catch((error) => this.onRedirectError(error));
  }

  onRedirectSuccess = (user: any) => {
    //this.userManager.signinRedirectCallback(user);
    console.log(user, 'success');
    //this.setUser(user);
  };

  onRedirectError = (error: any) => {
    console.log(error);
  };

  public async completeLogin(): Promise<any> {
    return await this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
    })
  }

  // public async login(): Promise<any> {
  //   return await this.userManager.signinRedirect().then(user => {
  //     console.log(user, 'user')
  //     this.userManager.storeUser(user);
  //   }, error => {
  //     console.error(error);
  //   });
  // }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilentCallback();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect({post_logout_redirect_uri: "http://react-demoapp.azurewebsites.net"});
  }
}
