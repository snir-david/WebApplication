module.exports = {
    avg: function (valueX) {
        let avg = 0, sum =0, arraySize = valueX.length;
        for (let i = 1; i < arraySize; ++i) {
            sum += Number(valueX[i]);
        }
        if (arraySize > 0) {
            avg = (1.00 / arraySize) * sum;
        }
        return avg;
    },

// returns the variance of X and Y
    variance: function (valueX) {
        //initialize variables for the function
        let variance, mean, varianceSum = 0;
        //calculating the mean
        mean = this.avg(valueX);
        //calculating the sum arraySize the variance
        for (let i = 1; i < valueX.length; ++i) {
            varianceSum += Math.pow((valueX[i] - mean), 2);
        }
        //calculating the variance using the equation - Var(X)= (1/N) * SUM- from i=0 to N of (x_i-u)
        variance = (1.00 / valueX.length) * varianceSum;
        return variance;
    },

// returns the covariance of X and Y
    cov: function (valueX, valueY) {
        //initialize variables for the function
        let eX, eY, eXY, covXY, arraySize = valueX.length;
        //initialize array for the E[XY]
        let xy = new Array(arraySize);
        for (let i = 1; i < arraySize; ++i) {
            xy[i] = valueX[i] * valueY[i];
        }
        //calculating the variables E[XY], E[X], E[Y]
        eXY = this.avg(xy);
        eX = this.avg(valueX);
        eY = this.avg(valueY);
        //calculating the covariance using the equation - cov(X,Y) = E(XY)-E(X)E(Y)
        covXY = eXY - eX * eY;
        return covXY;
    },


// returns the Pearson correlation coefficient of X and Y
    pearson: function (valueX, valueY) {
        //initialize variables for the function
        let pears, covXY, sigmaX, sigmaY, arraySize = valueX.length;
        //calculating sigma x,y using square of the variance
        sigmaX = Math.sqrt(this.variance(valueX, arraySize));
        sigmaY = Math.sqrt(this.variance(valueY, arraySize));
        //calculating covariance using cov function
        covXY = this.cov(valueX, valueY, arraySize);
        //calculating pearson using the equation - pearson(X,Y) = cov(X,Y)/(sqrt(var(X) * sqrt(var(Y)))
        pears = covXY / (sigmaX * sigmaY);
        return pears;
    },

// performs a linear regression and returns the line equation
    linear_reg: function (points) {
        //initialize variables for the function
        let a, b, arraySize = points.length;
        //initialize arrays for the x and y
        let x = new Array(arraySize - 1), y = new Array(arraySize - 1);
        for (let i = 1; i < arraySize; ++i) {
            x[i] = points[i].x;
            y[i] = points[i].y;
        }
        //calculating the linear regression a and b for the equation - Y = a*X + b
        a = this.cov(x, y, arraySize) / this.variance(x, arraySize);
        b = this.avg(y, arraySize) - (a * this.avg(x, arraySize));
        return {
            a: a, b: b, f: (x) => {
                return a * x + b;
            }
        };
    },

// returns the deviation between point p and the line equation of the points
// function dev(p, points, size) {
//     let l = linear_reg(points, size);
//     let dev = l.f(p.x) - p.y;
//     return Math.abs(dev);
// }

// returns the deviation between point p and the line
    dev: function (p, l) {
        let dev = l.f(p.x) - p.y;
        return Math.abs(dev);
    },

    findMinCircle: function (){

    }
}

