'use strict';

import * as vscode from 'vscode';
import { TSSprintf } from './TSSprintf';

interface IInsertSettings {
  formatStr: string;
  start: number;
  step: number;
}

export class InsertSettings implements IInsertSettings {
  public formatStr: string = "%d";
  public start: number = 0;
  public step: number = 1;

  private _disposable: vscode.Disposable;

  constructor() {
    const subscriptions: vscode.Disposable[] = [];
    vscode.workspace.onDidChangeConfiguration(this.updateSettings, this, subscriptions);
    this._disposable = vscode.Disposable.from(...subscriptions);

    this.updateSettings();
  }

  private updateSettings() {
    const settings = vscode.workspace.getConfiguration("insertnum");
    if (!settings) return;

    this.formatStr = settings.get<string>("formatstr") || "%d";
    this.start = settings.get<number>("start") || 0;
    this.step = settings.get<number>("step") || 1;
  }

  public dispose() {
    this._disposable.dispose();
  }
}

export class NumInserter {
  private _settings: InsertSettings;

  constructor(settings: InsertSettings) {
    this._settings = settings;
  }

  private insertNumbers(settings: IInsertSettings) {
    const textEditor = vscode.window.activeTextEditor;
    if (!textEditor) return;

    let selections = textEditor.selections;

    // Sort selections by their start position in the document
    selections = selections.sort((a, b) => {
        if (a.start.line === b.start.line) {
            return a.start.character - b.start.character;
        }
        return a.start.line - b.start.line;
    });

    let currentNumber = settings.start;

    textEditor.edit(builder => {
      selections.forEach(selection => {
        const formattedNumber = TSSprintf.sprintf(settings.formatStr, currentNumber);
        currentNumber += settings.step;
        builder.replace(selection, formattedNumber);
      });
    });
  }

  private parseUserInput(input: string): IInsertSettings | null {
    if (!input) return null;

    const defaultSettings: IInsertSettings = {
      formatStr: this._settings.formatStr,
      start: this._settings.start,
      step: this._settings.step >= 1 ? this._settings.step : 1,
    };

    if (input.includes(":")) {
      const params = input.split(":");

      let start: string = params[0];
      let step: string = String(this._settings.step >= 1 ? this._settings.step : 1);
      let formatStr: string | number = String(this._settings.formatStr)
      
      if (params.length === 2) {
        [start, step] = params;
      } else if (params.length === 3) {
        if (params[0].includes("%")) {
          [formatStr, start, step] = params;
        } else {
          [start, step, formatStr] = params;
        }
      } else {
        vscode.window.showErrorMessage("Wrong input.");
        return null;
      }

      defaultSettings.formatStr = formatStr.includes("%") ? formatStr : `%0${parseInt(formatStr, 10)}d`;
      defaultSettings.start = start.includes(".") ? parseFloat(start) : parseInt(start, 10);
      defaultSettings.step = step.includes(".") ? parseFloat(step) : parseInt(step, 10);
    } else {
      if (input.includes('%')) {
        defaultSettings.formatStr = input;
      } else {
        defaultSettings.step = parseInt(input, 10);
      }
    }

    return defaultSettings;
  }

  public async processInsert() {
    const options: vscode.InputBoxOptions = {
      value: `${this._settings.start}:${this._settings.step}:${this._settings.formatStr}`,
      prompt: `Input format or start:step or start:step:format (default: ${this._settings.start}:${this._settings.step}:${this._settings.formatStr})`
    };

    const input = await vscode.window.showInputBox(options);
    if (!input) {
      return;
    }

    const newSettings = this.parseUserInput(input.trim());
    if (newSettings) {
      this.insertNumbers(newSettings);
    }
  }

  public dispose() {
    this._settings.dispose();
  }
}
