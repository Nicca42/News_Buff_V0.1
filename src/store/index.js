import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/**
 * Schema taken from https://json-schema.org/learn/miscellaneous-examples.html
 * Additional info https://json-schema.org/learn/getting-started-step-by-step.html
 * 
 */

export default new Vuex.Store({
  state: {
    contentSchema: {
      "$id": "",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Content",
      "description": "All the information required for a content object",
      "required": [ "contentTitle", "contentDescription", "contentBody" ],
      "type": "object",
      "properties": {
        "contentTitle": {
          "type": "string",
          "description": "The title for the content"
        },
        "contentDescription": {
          "type": "string",
          "description": "A description for the content"
        },
        "contentBody": {
          "type": "string",
          "description": "The body of the content. Either mark down or HTML"
        }
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
