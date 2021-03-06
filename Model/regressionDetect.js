const util = require('./Util');

function findAnomaly(feature1, feature2, corrFeature, anomalyReport) {
    for (let i = 1; i < feature1.length; i++) {
        let p = {x: feature1[i], y: feature2[i]};
        let distance = util.dev(p, corrFeature.regression);
        if (distance > corrFeature.threshold) {
            anomalyReport.push({
                Timestamp: i,
                FeatureA: corrFeature.feature1,
                FeatureB: corrFeature.feature2
            });
        }
    }
}

function regressionDetect(anomalyMap, correlatedFeatures) {
    let anomalyReport = [];
    for (let i = 1; i < correlatedFeatures.length; i++) {
        let feature1 = anomalyMap.get(correlatedFeatures[i].feature1);
        let feature2 = anomalyMap.get(correlatedFeatures[i].feature2);
        findAnomaly(feature1, feature2, correlatedFeatures[i], anomalyReport);
    }
    let myJsonString = JSON.stringify(anomalyReport)
    return myJsonString;
}

module.exports = regressionDetect;