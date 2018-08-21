const observableModule = require("data/observable");

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        messages: "Individual test results:\n",
        score: 'Octane tests are running...'
    });

    return viewModel;
}

module.exports = HomeViewModel;
