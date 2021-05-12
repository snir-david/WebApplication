const util = require('./Util')
const regression = require('./regression');
const minCircle = require('./minCircle');

function learnNormal(CSVMap) {
    let correlatedFeatures = [];
    let it = CSVMap.keys();
    let keys = [];
    for (let i = 0; i < CSVMap.size; i++) {
        keys.push(it.next().value);
    }
    for (let i = 0; i < CSVMap.size; i++) {
        for (let j = i + 1; j < CSVMap.size; j++) {
            let personResult = Math.abs(util.pearson(CSVMap.get(keys[i]), CSVMap.get(keys[j])));
            if (personResult >= 0.9) {
                let points = regression.pointsToArray(CSVMap.get(keys[i]), CSVMap.get(keys[j]));
                let regLine = util.linear_reg(points);
                let threshold = 1.1 * regression.findThreshold(points, regLine);
                correlatedFeatures.push({
                    feature1: keys[i],
                    feature2: keys[j],
                    pearson: personResult,
                    regression: regLine,
                    threshold: threshold
                })
            } else if (personResult >= 0.5) {
                let points = regression.pointsToArray(CSVMap.get(keys[i]), CSVMap.get(keys[j]));
                let circle = minCircle(points);
                correlatedFeatures.push({
                    feature1: keys[i],
                    feature2: keys[j],
                    pearson: personResult,
                    //regression: ,
                    center: circle.center,
                    threshold: circle.radius * 1.1
                })

            }
        }
    }
    return correlatedFeatures;
}

module.exports = learnNormal;

