import { spawnSync } from 'child_process'
import os from 'os'

import * as core from '@actions/core'

function getModifiedFiles() {
  const gitStatus = spawnSync('git', ['status'], {
    encoding: 'utf8',
  })
  const { stdout } = gitStatus
  let modifedFiles = stdout
    .split(os.EOL)
    .map((line) => line.trim())
    .filter((line) => Boolean(line))
    .filter((line) => line.startsWith('modified'))
    .map((line) => line.replace('modified:', '').trim())
  return modifedFiles
}

async function main() {
  const files = getModifiedFiles()
  console.log({ files })
  if (files.length > 0) {
    core.setOutput('didChange', 'true')
  } else {
    core.setOutput('didChange', 'false')
  }
}

main()
