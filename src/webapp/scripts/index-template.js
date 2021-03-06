import '@styles/_native.styl';
import angular from 'angular';
import uirouter from '@uirouter/angularjs/release/angular-ui-router';
import router from '@scripts/router';
import components from '@scripts/components';
import services from '@scripts/services';
import analyticsService from '@scripts/services/analytics';
import stylesheetsOrderService from '@scripts/services/stylesheets-order';

const _public = {};

const dependencies = [
  uirouter,
  components,
  services
  // inject:external-angular-module-name
];

_public.init = () => {
  const app = angular.module('pitsby-app', dependencies);
  stylesheetsOrderService.makeLestStylesheetAsFirst(document.head);
  analyticsService.init();
  app.config(router);
};

_public.init();

export default _public;
