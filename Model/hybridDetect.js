const util = require('./Util');
const minCircle = require('./minCircle');


function findAnomaly(feature1, feature2, corrFeature, anomalyReport) {
    for (let i = 1; i < feature1.length; i++) {
        let p = {x: feature1[i], y: feature2[i]};
        let distance = util.dev(p, corrFeature.regression);
        if (distance > corrFeature.threshold) {
            anomalyReport.push({
                TimeStamp: i,
                FeatureA: corrFeature.feature1,
                FeatureB: corrFeature.feature2
            });
        }
    }
}

function hybridDetect(anomalyMap, correlatedFeatures){
    let anomalyReport = [];
    for(let i = 1; i < correlatedFeatures.length; i++){
        if(correlatedFeatures[i].pearson >= 0.9){
            let feature1 = anomalyMap.get(correlatedFeatures[i].feature1);
            let feature2 = anomalyMap.get(correlatedFeatures[i].feature2);
            findAnomaly(feature1, feature2, correlatedFeatures[i], anomalyReport);
        }
        else{
            let feature1 = anomalyMap.get(correlatedFeatures[i].feature1);
            let feature2 = anomalyMap.get(correlatedFeatures[i].feature2);

            let circle  = ({center: correlatedFeatures[i].center , radius: correlatedFeatures[i].threshold});
            for (let j = 1; j < feature1.length; j++){
                let point  = ({x: feature1[j] , y: feature2[j]});
                if (!minCircle.pointIsInsideCircle(circle, point)){
                    anomalyReport.push({
                        TimeStamp: j,
                        FeatureA: correlatedFeatures[i].feature1,
                        FeatureB: correlatedFeatures[i].feature2
                    });
                }

            }

        }
    }
    let myJsonString = JSON.stringify(anomalyReport)
    return myJsonString;
}
module.exports = hybridDetect;

