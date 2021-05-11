const learn = require('./Learn');
const util = require('./Util');
let anomalyReport;

function findAnomaly(feature1, feature2, regLine, threshold) {
    for (let i = 0; i < feature1.size; i++) {
        let p = {x: feature1[i], y: feature2[i]};
        let distance = util.dev(p, regLine);
        if (distance > threshold) {
            anomalyReport.push({
                timeStamp: i,
                featureA: learn.correlatedFeatures[i].feature1,
                featureB: learn.correlatedFeatures[i].feature2
            });
        }
    }
}

function detect(anomalyMap) {
    for (let i = 0; i < learn.correlatedFeatures.size; i++) {
        let feature1 = anomalyMap.get(learn.correlatedFeatures[i].feature1);
        let feature2 = anomalyMap.get(learn.correlatedFeatures[i].feature2);
        findAnomaly(feature1, feature2, learn.correlatedFeatures[i].regression, learn.correlatedFeatures[i].threshold);
    }
}

module.exports = detect;