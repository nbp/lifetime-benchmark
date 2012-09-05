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

var results = new Array();
var iterations = 1;

function computeIteration(iter) {
  return Math.round(Math.exp(Math.log(10) * (1 + iter / 4)));
}

(function(){

var time = 0;
var times = [];
times.length = tests.length;
var maxIter = 14;

for (var j = 0; j < tests.length; j++) {
  times[j] = new Array();
  for (var iter = 0; iter <= maxIter; iter++) {
    iterations = computeIteration(iter);

    var testBase = suitePath + "/" + tests[j];
    var testName = testBase + ".js";
    var testData = testBase + "-data.js";

    if (testName.indexOf('parse-only') >= 0) {
        times[j] = checkSyntax(testName);
    } else {
        // Tests may or may not have associated -data files whose loading
        // should not be timed.
        try {
            load(testData);
            // If a file does have test data, then we can't use the
            // higher-precision `run' timer, because `run' uses a fresh
            // global environment, so we fall back to `load'.
            var startTime = new Date;
            load(testName);
            times[j][iter] = new Date() - startTime;
        } catch (e) {
            // No test data, just use `run'.
            times[j][iter] = run(testName);
        }
    }
    gc();
  }
}

function recordResults(tests, times)
{
    var output = "{\n";

    for (j = 0; j < tests.length; j++) {
        output += '    "' + tests[j] + '": [';
        for (iter = 0; iter < maxIter; iter++)
          output += (iter ? ', ': '') + times[j][iter];
        output += '],\n';
    }
    output = output.substring(0, output.length - 2) + "\n";

    output += "}";
    print(output);
}

recordResults(tests, times);

})();

