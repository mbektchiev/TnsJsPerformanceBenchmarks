/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const HomeViewModel = require("./home-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();

    launchTests(page.bindingContext);
}

function launchTests(viewModel) {
    // <!-- Octane benchmark code -->
    require("./octane/base.js");
    require("./octane/richards.js");
    require("./octane/deltablue.js");
    require("./octane/crypto.js");
    require("./octane/raytrace.js");
    require("./octane/earley-boyer.js");
    require("./octane/regexp.js");
    require("./octane/splay.js");
    require("./octane/navier-stokes.js");
    require("./octane/pdfjs.js");
    require("./octane/mandreel.js");
    require("./octane/gbemu-part1.js");
    require("./octane/gbemu-part2.js");
    require("./octane/code-load.js");
    require("./octane/box2d.js");
    require("./octane/zlib.js");
    require("./octane/zlib-data.js");
    // require("./octane/typescript.js");
    // require("./octane/typescript-input.js");
    // require("./octane/typescript-compiler.js");

    var completed = 0;
    var benchmarks = BenchmarkSuite.CountBenchmarks();
    var success = true;
    var latencyBenchmarks = ["Splay", "Mandreel"];
    var skipBenchmarks =
            typeof skipBenchmarks === "undefined" ? [] : skipBenchmarks;

    function log(msg) {
        console.log(msg);
        viewModel.set("messages", viewModel.messages + msg);
    }

    function ShowBox(name) {
      log(`Starting ${name}\n`);
    }
    function AddResult(name, result) {
      log(name + ': ' + result + "\n");
    }

    function AddError(name, error) {
      log(name + ": " + error.message + "\n");
      success = false;
    }

    function AddScore(score) {
      let scoreMsg = success
        ? `Octane Score: ${score}`
        : `Octane Score (incomplete): ${score}`;
      viewModel.set("score", scoreMsg);
      log(scoreMsg);
    }

    function Run() {
      BenchmarkSuite.RunSuites({
        NotifyStart : ShowBox,
        NotifyError : AddError,
        NotifyResult : AddResult,
        NotifyScore : AddScore
      },
      skipBenchmarks);
    }

    function CheckCompatibility() {
      // If no Typed Arrays support, show warning label.
      var hasTypedArrays = typeof Uint8Array != "undefined"
          && typeof Float64Array != "undefined"
          && typeof (new Uint8Array(0)).subarray != "undefined";

      if (!hasTypedArrays) {
        console.log("Typed Arrays not supported");
      }

      Run();
    }

    const timer = require('timer');
    timer.setTimeout(CheckCompatibility, 200);
  }

exports.onNavigatingTo = onNavigatingTo;
