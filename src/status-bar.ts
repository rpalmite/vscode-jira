import * as vscode from 'vscode';

import state, { ActiveIssue } from './state';

export class StatusBarManager {

  private item: vscode.StatusBarItem;

  constructor() {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    this.item.text = '$(issue-opened)';
    this.item.show();
    state.subscriber.push(() => {
      this.updateStatus();
    });
  }

  public updateStatus(): void {
    const activeIssue = this.getActiveIssue();
    if (activeIssue && activeIssue.key) {
      this.item.text = `$(issue-opened) ${activeIssue.key}`;
      this.item.command = undefined;
    } else {
      this.item.text = '$(issue-opened)';
      this.item.command = 'vscode-jira.activateIssues';
    }
  }

  private getActiveIssue(): ActiveIssue | undefined {
    if (state.workspaceState) {
      return state.workspaceState.get('vscode-jira:active-issue');
    }
  }

  public dispose(): void {
    this.item.dispose();
  }
}