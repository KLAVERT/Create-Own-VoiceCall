import fetch from 'node-fetch';
import { version as currentVersion } from '../../package.json';
import * as semver from 'semver';

const GITHUB_API_URL = 'https://api.github.com';
const OWNER = 'KLAVERT';
const REPO = 'Create-Own-VoiceCall';

export async function checkForUpdate(): Promise<void> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${OWNER}/${REPO}/releases/latest`);

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }

    const releaseData = (await response.json()) as { tag_name: string };
    const latestVersion = releaseData.tag_name.replace(/^v/, '');

    console.log(`Current Version: ${currentVersion}`);
    console.log(`Latest Version: ${latestVersion}`);

    if (semver.gt(latestVersion, currentVersion)) {
      console.log('Update available:', latestVersion);
    } else {
      console.log('No updates available. You are on the latest version.');
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
}
