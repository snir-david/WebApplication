const util = require('./Util')

let correlatedFeatures ;

function pointsToArray(csvMapElement, csvMapElement2) {
    let points = new Array(csvMapElement.size);
    for (let i = 0; i < csvMapElement.size; i++) {
        points.push({x: csvMapElement[i], y: csvMapElement2[i]});
    }
    return points;
}

function findThreshold(points, regLine) {
    let threshold = 0;
    for (let i = 0; i < points.length; i++) {
        let currPoint = util.dev(points[i], regLine);
        if (currPoint > threshold) {
            threshold = currPoint;
        }
    }
    return threshold;
}

function learnNormal(CSVMap) {
    for (let i = 0; i < CSVMap.size; i++) {
        for (let j = i + 1; j < CSVMap.size; j++) {
            let personResult = util.pearson(CSVMap[i], CSVMap[j], CSVMap[j].size);
            if (personResult >= 0.9) {
                let points = pointsToArray(CSVMap[i], CSVMap[j]);
                let regLine = util.linear_reg(points, points.length);
                let threshold = 1.1 * findThreshold(points, regLine);
                correlatedFeatures.push({
                    feature1: CSVMap[i].key,
                    feature2: CSVMap[j].keys,
                    pearson: personResult,
                    regression: regLine,
                    threshold: threshold
                });
            }
        }
    }
}
module.exports = learnNormal;
module.exports.correlatedFeatures = correlatedFeatures;
