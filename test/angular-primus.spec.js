describe('angular-primus', function() {
  "use strict";

  beforeEach(angular.mock.module(function($primusProvider) {
    browser.get('http://localhost:8001');
    $primusProvider.setSocket(new Primus({
      host: 'locahost',
      port: 8001
    }));
  }));

  it('Should have a valid socket', function($primus) {
    expect($primus.getSocket()).isNotNull();
  });

});
