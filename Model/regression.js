const util = require('./Util')
module.exports = {
    pointsToArray: function (csvMapElement, csvMapElement2) {
        let points = new Array(csvMapElement.length);
        for (let i = 1; i < csvMapElement.length; i++) {
            points[i] = ({x: csvMapElement[i], y: csvMapElement2[i]});
        }
        return points;
    },

    findThreshold: function (points, regLine) {
        let threshold = 0;
        for (let i = 1; i < points.length; i++) {
            let currPoint = util.dev(points[i], regLine);
            if (currPoint > threshold) {
                threshold = currPoint;
            }
        }
        return threshold;
    },

    learnNormal: function (CSVMap) {
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
                    let points = pointsToArray(CSVMap.get(keys[i]), CSVMap.get(keys[j]));
                    let regLine = util.linear_reg(points);
                    let threshold = 1.1 * findThreshold(points, regLine);
                    correlatedFeatures.push({
                        feature1: keys[i],
                        feature2: keys[j],
                        pearson: personResult,
                        regression: regLine,
                        threshold: threshold
                    });
                }
            }
        }
        return correlatedFeatures;
    }
}