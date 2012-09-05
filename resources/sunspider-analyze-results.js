/*
 * Copyright (C) 2007 Apple Inc.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE COMPUTER, INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE COMPUTER, INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

var output = JSON.parse(read(outputFile));
var count = output.length;

function computeIteration(iter) {
  return Math.round(Math.exp(Math.log(10) * (1 + iter / 4)));
}

function SampleStats(nbIter, l) {
  this.nbIter = nbIter;
  this.samples = l
    .filter(function (a) a.nbIter == nbIter)
    .map(function (e) e.time);
  // print(this.samples);
  this.num = this.samples.length;
  // print(this.num);
  var num = this.num;
  this.total = this.samples.reduce(function (a, b) a + b);
  // print(this.total);
  this.mean = this.total / num;
  // print(this.mean);
  var mean = this.mean;
  this.stddev = Math.sqrt(
    this.samples.reduce(function (a, b) {
      return a + ((b - mean) * (b - mean)) / num;
  }));
  this.stderr = this.stddev / Math.sqrt(num);
}

function foldResults(result) {
  var obj = {};
  // Convert a list of objects of arrays of float to an object of array of list of
  // floats.
  for (var i = 0; i < count; ++i) {
    for (var test in result[i]) {
      if (!(test in obj)) {
        obj[test] = {
          stats: new Array(),
          samples: new Array(),
          nbIters: new Array()
        }
      }
      obj[test].samples = obj[test].samples.concat(result[i][test]);
    }
  }

  // Convert the sample list to a sampleStats object.
  for (var test in obj) {
    var t = obj[test];
    for (var s = 0; s < t.samples.length; ++s) {
      var nbIter = t.samples[s].nbIter;
      if (t.stats[nbIter])
        continue;
      t.nbIters.push(nbIter);
      t.stats[nbIter] = new SampleStats(nbIter, t.samples);
    }
    t.nbIters = t.nbIters.sort(function (a, b) a > b);
  }
  return obj;
}

var tDistribution = [NaN, NaN, 12.71, 4.30, 3.18, 2.78, 2.57, 2.45, 2.36, 2.31, 2.26, 2.23, 2.20, 2.18, 2.16, 2.14, 2.13, 2.12, 2.11, 2.10, 2.09, 2.09, 2.08, 2.07, 2.07, 2.06, 2.06, 2.06, 2.05, 2.05, 2.05, 2.04, 2.04, 2.04, 2.03, 2.03, 2.03, 2.03, 2.03, 2.02, 2.02, 2.02, 2.02, 2.02, 2.02, 2.02, 2.01, 2.01, 2.01, 2.01, 2.01, 2.01, 2.01, 2.01, 2.01, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 2.00, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.99, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.98, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.97, 1.96];
var tMax = tDistribution.length;
var tLimit = 1.96;

function tDist(n)
{
    if (n > tMax)
        return tLimit;
    return tDistribution[n];
}


function formatResult(meanWidth, mean, stdErr, n)
{
    var meanString = mean.toFixed(1).toString();
    while (meanString.length < meanWidth) {
        meanString = " " + meanString;
    }

    if (n == 1)
        return meanString + "ms";

    return meanString + "ms +/- " + ((tDist(n) * stdErr / mean) * 100).toFixed(1) + "%";
}

function computeLabelWidth()
{
    var width = "Total".length;
    for (var category in categoryMeans) {
        if (category.length + 2 > width)
            width = category.length + 2;
    }
    for (var i = 0; i < tests.length; i++) {
        var shortName = tests[i].replace(/^[^-]*-/, "");
        if (shortName.length + 4 > width)
            width = shortName.length + 4;
    }

    return width;
}

function computeMeanWidth()
{
    var width = mean.toFixed(1).toString().length;
    for (var category in categoryMeans) {
        var candidate = categoryMeans[category].toFixed(2).toString().length;
        if (candidate > width)
            width = candidate;
        for (var test in testMeansByCategory[category]) {
            var candidate = testMeansByCategory[category][test].toFixed(2).toString().length;
            if (candidate > width)
                width = candidate;
        }
    }

    return width;
}

function resultLine(labelWidth, indent, label, meanWidth, mean, stdErr)
{
    var result = "";
    for (i = 0; i < indent; i++) {
        result += " ";
    }
    
    result += label + ": ";

    for (i = 0; i < (labelWidth - (label.length + indent)); i++) {
        result += " ";
    }
    
    return result + formatResult(meanWidth, mean, stdErr, count);
}

function printOutput()
{
    var labelWidth = computeLabelWidth();
    var meanWidth = computeMeanWidth();

    print("\n");
    print("============================================");
    if (count == 1)
        print("RESULTS");
    else
        print("RESULTS (means and 95% confidence intervals)");
    print("--------------------------------------------");
    print(resultLine(labelWidth, 0, "Total", meanWidth, mean, stdErr));
    print("--------------------------------------------");
    for (var category in categoryMeans) {
        print("");
        print(resultLine(labelWidth, 2, category, meanWidth, categoryMeans[category], categoryStdErrs[category]));
        for (var test in testMeansByCategory[category]) {
            var shortName = test.replace(/^[^-]*-/, "");
            print(resultLine(labelWidth, 4, shortName, meanWidth, testMeansByCategory[category][test], testStdErrsByCategory[category][test]));
        }
    }
}

function printResult(results) {
  var folded = foldResults(results);

  print("\n");
  print("============================================");
  for (var test in folded) {
    var t = folded[test];
    var str = "  " + test + ":\n";
    var lo = 0, hi = 0;
    var loMean = 0, hiMean = 0;
    for (var i = 0; i < t.nbIters.length; ++i) {
      hi = t.nbIters[i];
      hiMean = t.stats[hi].mean;
      uspi = Math.round(100 * 1000 * (hiMean - loMean) / (hi - lo)) / 100;
      str += "    " + lo + " - " + hi + ": " + uspi + " us/iter\n";
      lo = hi;
      loMean = hiMean;
    }
    str += "\n";
    print(str);
  }
}

printResult(output);

/*
initialize();
computeItemTotals();
computeTotals();
computeMeans();
computeStdDevs();
computeStdErrors();
printOutput();
*/

