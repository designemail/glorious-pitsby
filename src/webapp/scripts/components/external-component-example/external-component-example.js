import '@styles/external-component-example.styl';
import EXTERNAL_COMPONENT_QUERY_PARAMS from '@scripts/constants/external-component-query-params';
import template from './external-component-example.html';

function controller(){
  const $ctrl = this;

  $ctrl.$onInit = () => {
    setTabQueryParamGroupKey(EXTERNAL_COMPONENT_QUERY_PARAMS.EXAMPLE_TABS_GROUP);
    setTabQueryParamKey(buildTabsQueryParamKey($ctrl.exampleIndex));
    setTemplateTabVisibility(getTemplateTabVisibility($ctrl.engine));
  };

  function setTabQueryParamGroupKey(key){
    $ctrl.tabQueryParamGroupKey = key;
  }

  function buildTabsQueryParamKey(exampleIndex){
    return `externalComponentExample${exampleIndex}Tab`;
  }

  function setTabQueryParamKey(key){
    $ctrl.tabQueryParamKey = key;
  }

  function getTemplateTabVisibility(engine){
    return engine != 'react';
  }

  function setTemplateTabVisibility(shouldShow){
    $ctrl.shouldShowTemplateTab = shouldShow;
  }
}

export default {
  bindings: {
    engine: '<',
    example: '<',
    exampleIndex: '<'
  },
  controller,
  template
};
