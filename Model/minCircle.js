/*given a circle and point checking if the point is in the circle.
 * using distance between 2 points - sqrt((x1-x2)^2+(y1-y2)^2)
 * if the distance bigger than radius so point not in circle, return false. else, return true */
function pointIsInsideCircle(c, p) {
    let circleCenter = c.center;
    let x1MinusX2 = Math.pow((circleCenter.x - p.x), 2);
    let y1MinusY2 = Math.pow((circleCenter.y - p.y), 2);
    let pointFromCenter = Math.sqrt((x1MinusX2 + y1MinusY2));
    return (c.radius >= pointFromCenter);
};

/* given a circle and vector of points checking that all points are inside or on the boundary of circle*/
function isValidCircle(c, points) {
    //iterate all points in vector checking it is inside circle
    for (let p in points) {
        if (!pointIsInsideCircle(c, p)) {
            return false;
        }
    }
    return true;
}

/* return min circle given 2 points - using the following equation -
 * center (x,y) -
 * x= (x1+x2)/2
 * y= (y1+y2)/2
 * r = sqrt((x1-x2)^2+(y1-y2)^2)/2
 */
function twoPointsCircle(a, b) {
    let x = 0, y =0, radius=0;
    x = (Number(a.x) +Number (b.x))/2;
    y = (Number(a.y) + Number(b.y))/2;
    radius = Math.sqrt((Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2))) / 2;
    return {center: {x: x, y: y}, radius: radius};
}

/* return min circle given 3 points - using the following equation -
 * center (x,y) -
 * x= ((x1^2+y1^2)(y2-y3)+(x2^2+y2^2)(y3-y1)+(x3^2+y3^2)(y1-y2))/(2(x1(y2-y3)-y1(x2-x3)+x2y3-x3y2)
 * y= ((x1^2+y1^2)(x2-x3)+(x2^2+y2^2)(x1-x3)+(x3^2+y3^2)(x2-x1))/(2(x1(y2-y3)-y1(x2-x3)+x2y3-x3y2)
 * r = sqrt((x-x1)^2+(y-y1)^2)
 */
function threePointsCircle(a, b, c) {
    let points = [];
    points.push(a);
    points.push(b);
    points.push(c);
    //for all pairs trying to make circle without third point, if succeed return this circle,
    //else return circle with 3 points
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; ++j) {
            let circle = twoPointsCircle(points[i], points[j]);
            if (isValidCircle(circle, points)) {
                return circle;
            }
        }
    }
    //calculating 3 points circle
    let denominator = 2 * (a.x * (b.y - c.y) - a.y * (b.x - c.x) + b.x * c.y - c.x * b.y);
    let xNumerator = (Math.pow(a.x, 2) + Math.pow(a.y, 2)) * (b.y - c.y) + (Math.pow(b.x, 2) + Math.pow(b.y, 2)) * (c.y - a.y)
        + (Math.pow(c.x, 2) + Math.pow(c.y, 2)) * (a.y - b.y);
    let yNumerator = (Math.pow(a.x, 2) + Math.pow(a.y, 2)) * (c.x - b.x) + (Math.pow(b.x, 2) + Math.pow(b.y, 2)) * (a.x - c.x)
        + (Math.pow(c.x, 2) + Math.pow(c.y, 2)) * (b.x - a.x);
    let x = xNumerator / denominator;
    let y = yNumerator / denominator;
    let radius = Math.sqrt((Math.pow((x - a.x), 2) + Math.pow((y - a.y), 2)));
    return {center: {x: x, y: y}, radius: radius};
}

/* return min circle given 1 point - using the following equation -
 * center (x,y) -
 * x= x1
 * y= y1
 * r = 0
 */
function onePointCircle(a) {
    return {center: a, radius: 0};
}

/*given vector of points, and vector with points that sit on boundary of the min circle.
 * this function work recursively until getting min circle. */
function findMinWithBoundaryPoints(points, boundaryPoints, pointsSize) {
    let current = new Date();
    console.log("min Circle started at: " +current.toLocaleTimeString());
    let minCircle = {center: {x: 0, y: 0}, radius: Infinity};
    //checking minimum circle for all 2 points
    for (let i = 1; i < pointsSize; i++) {
        for (let j = i + 1; j < pointsSize; j++) {
            let tmpCircle = twoPointsCircle(points[i], points[j]);
            if (tmpCircle.radius < minCircle.radius && isValidCircle(tmpCircle, points)) {
                minCircle = tmpCircle;
            }
        }
    }

//checking minimum circle for all 3 points
    for (let i = 1; i < pointsSize; i++) {
        for (let j = i + 1; j < pointsSize; j++) {
            for (let k = j + 1; k <pointsSize ; k++) {
                let tmpCircle = threePointsCircle(points[i], points[j], points[k]);
                if (tmpCircle.radius < minCircle.radius && isValidCircle(tmpCircle, points)) {
                    minCircle = tmpCircle;
                }
            }
        }
    }
    console.log("min Circle finish at: " +current.toLocaleTimeString());
    return minCircle;
}

/*using welzl's algorithm returning minimum circle given array of points.
 * we will pick a random point p, remove it from circle and recursively find a min circle d,
 * if the point p is in that circle, return the circle we found.
 * else, p must be on min circle boundary, adding p to R array of points that is on the circle boundary.
 * base case - if Points array is empty, R size is 3 recursion stops.
 * if the base case is reached - if R size is 1, return circle with radius 0 and the point is in R.
 * R size 2 return min circle with 2 points, radius is half distance and also center is between 2 points.
 * R size 3 return min circle using equation to find circle using 3 points.
 */
function findMinCircle(points) {
    let boundaryPoints = [];
    //base cases - size == 0 || 1 || 2 || 3
    switch (points.length) {
        case 0:
            return {center: {x: 0, y: 0}, radius: 0};
            break;
        case 1:
            return onePointCircle(points[0]);
            break;
        case 2:
            return twoPointsCircle(points[0], points[1]);
        case 3:
            return threePointsCircle(points[0], points[1], points[2]);
            break;
        default:
            break;
    }
    return findMinWithBoundaryPoints(points, boundaryPoints, points.length - 1);
}

module.exports = findMinCircle;
module.exports.pointIsInsideCircle = pointIsInsideCircle;