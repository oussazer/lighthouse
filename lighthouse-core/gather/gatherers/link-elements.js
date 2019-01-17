/**
 * @license Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Gatherer = require('./gatherer.js');
const getElementsInDocumentString = require('../../lib/page-functions.js').getElementsInDocumentString; // eslint-disable-line max-len

class LinkElements extends Gatherer {
  /**
   * @param {LH.Gatherer.PassContext} passContext
   * @return {Promise<LH.Artifacts['LinkElements']>}
   */
  async afterPass(passContext) {
    const driver = passContext.driver;

    // TODO: https://github.com/GoogleChrome/lighthouse/issues/6747

    // We'll use evaluateAsync because the `node.getAttribute` method doesn't actually normalize
    // the values like access from JavaScript does.
    return driver.evaluateAsync(`(() => {
      ${getElementsInDocumentString};

      return getElementsInDocument('link').map(link => {
        return {
          rel: link.rel,
          href: link.href,
          as: link.as,
          crossOrigin: link.crossOrigin,
        };
      });
    })()`, {useIsolation: true});
  }
}

module.exports = LinkElements;
