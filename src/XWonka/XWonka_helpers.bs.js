'use strict';


function getEffectCleanup(subscription) {
  return subscription.unsubscribe;
}

exports.getEffectCleanup = getEffectCleanup;
/* No side effect */
