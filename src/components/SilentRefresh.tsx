import React from 'react';
import { UserManager } from 'oidc-client';
import { Constants } from '../helpers/Constants';

const settings = {
  authority: Constants.stsAuthority,
  //require_https_metadata: false,
  client_id: Constants.clientId,
  //client_name: Constants.clientName,
  client_secret: Constants.clientSecret,
  redirect_uri: `${Constants.clientRoot}login`,
  silent_redirect_uri: `${Constants.clientRoot}silent-renew.html`,
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

const SilentRefresh = () => (
<div>
  Token Refreshed
</div>
);

export default SilentRefresh;