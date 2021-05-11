
function avg(valueX, arraySize){
    let avg = 0, sum = 0;
    for (let i = 0; i < arraySize; ++i) {
        sum += valueX[i];
    }
    if (arraySize > 0) {
        avg = (1.00 / arraySize) * sum;
    }
    return avg;
}

// returns the variance of X and Y
function variance(valueX, arraySize){
    //initialize variables for the function
    let variance,  mean, varianceSum = 0;
    //calculating the mean
    mean = avg(valueX, arraySize);
    //calculating the sum arraySize the variance
    for (let i = 0; i < arraySize; ++i) {
        varianceSum += Math.pow((valueX[i] - mean), 2);
    }
    //calculating the variance using the equation - Var(X)= (1/N) * SUM- from i=0 to N of (x_i-u)
    variance = (1.00 / arraySize) * varianceSum;
    return variance;
}

// returns the covariance of X and Y
function cov(valueX, valueY,  arraySize){
    //initialize variables for the function
    let eX, eY, eXY, covXY;
    //initialize array for the E[XY]
    let xy = new Array(arraySize);
    for (let i = 0; i < arraySize; ++i) {
        xy[i] = valueX[i] * valueY[i];
    }
    //calculating the variables E[XY], E[X], E[Y]
    eXY = avg(xy, arraySize);
    eX = avg(valueX, arraySize);
    eY = avg(valueY, arraySize);
    //calculating the covariance using the equation - cov(X,Y) = E(XY)-E(X)E(Y)
    covXY = eXY - eX * eY;
    return covXY;
}


// returns the Pearson correlation coefficient of X and Y
function pearson(valueX, valueY, arraySize){
    //initialize variables for the function
    let pears, covXY, sigmaX, sigmaY;
    //calculating sigma x,y using square of the variance
    sigmaX = Math.sqrt(variance(x, arraySize));
    sigmaY = Math.sqrt(variance(y, arraySize));
    //calculating covariance using cov function
    covXY = cov(valueX, valueY, arraySize);
    //calculating pearson using the equation - pearson(X,Y) = cov(X,Y)/(sqrt(var(X) * sqrt(var(Y)))
    pears = covXY/(sigmaX * sigmaY);
    return pears;
}

// performs a linear regression and returns the line equation
function linear_reg(points, arrySize){
    //initialize variables for the function
    let a, b;
    //initialize arrays for the x and y
    let x=new Array(arrySize-1), y= new Array(arrySize - 1);
    for (let i = 0; i < arrySize; ++i) {
        x[i] = points[i].x;
        y[i] = points[i].y;
    }
    //calculating the linear regression a and b for the equation - Y = a*X + b
    a = cov(x, y, arrySize) / variance(x, arrySize);
    b = avg(y, arrySize) - (a * avg(x, arrySize));
    return Line(a, b);
}

// returns the deviation between point p and the line equation of the points
float dev(Point p,Point** points, int size){
    Line l = linear_reg(points, size);
    float dev = l.f(p.x) - p.y;
    if(dev < 0 ) {
        return -dev;
    }
    return dev;
}

// returns the deviation between point p and the line
float dev(Point p,Line l){
    float dev = l.f(p.x) - p.y;
    if(dev < 0 ) {
        return -dev;
    }
    return dev;}