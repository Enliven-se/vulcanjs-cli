const chalk = require('chalk');
const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  _registerArguments () {
    this._registerOptions(
      'appName',
      'packageManager'
    );
  }
  initializing () {
    this._assert('notVulcan');
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'appName',
      'packageManager'
    );
    return this.prompt(questions).then((answers) => {
      this.props = {
        appName: this._finalize('appName', answers),
        packageManager: this._finalize('raw', 'packageManager', answers),
      };
    });
  }

  writing () {
    if (!this._canWrite()) { return; }
    this.destinationRoot(
      this.destinationPath()
    );
    this._dispatch({
      type: 'SET_IS_VULCAN_TRUE',
    });
    this._dispatch({
      type: 'SET_APP_NAME',
      appName: this.props.appName,
    });
    this._dispatch({
      type: 'SET_PACKAGE_MANAGER',
      packageManager: this.props.packageManager,
    });
    this._commitStore();
  }

  end () {
    this._end();
  }
};
