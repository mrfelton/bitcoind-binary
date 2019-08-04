#!/usr/bin/env node

const { execSync } = require('child_process')
const { promisify } = require('util')
const { readFileSync, renameSync, mkdirSync } = require('fs')
const { join } = require('path')
const log = require('npmlog')
const hasha = require('hasha')
const { cachedPrebuild } = require('prebuild-install/util')
const { platform } = require('os')

const getPlatformSpecificVars = () => {
  let ARCH, EXT
  switch (platform()) {
    case 'darwin':
      ARCH = 'osx64'
      EXT = '.tar.gz'
      break
    case 'linux':
      ARCH = 'x86_64-linux-gnu'
      EXT = '.tar.gz'
      break
    case 'win32':
      ARCH = 'win64'
      EXT = '.zip'
      break
  }
  return { ARCH, EXT }
}

;(async () => {
  const VERSION = '0.18.0'
  const { ARCH, EXT } = getPlatformSpecificVars()
  const FILENAME = `bitcoin-core-${VERSION}/bitcoin-${VERSION}-${ARCH}${EXT}`
  const DOWNLOAD = `https://bitcoincore.org/bin/${FILENAME}`

  // Download and extract the archive.
  execSync(`prebuild-install --verbose --force --download ${DOWNLOAD}`)
  log.info(`Downloaded bitcoind from ${DOWNLOAD}`)

  // Verify the checksum.
  const cache = cachedPrebuild(DOWNLOAD)
  const actualHash = await hasha.fromFile(cache, { algorithm: 'sha256' })
  const shasumPath = join(__dirname, `../manifest/bitcoin-${VERSION}.asc`)
  const shasums = readFileSync(shasumPath).toString()
  let expectedHash
  for (let line of shasums.split('\n').slice(3)) {
    let [shasum, filename] = line.split(/\s+/)
    if (shasum.length !== 64) continue
    if (FILENAME.endsWith(filename)) {
      expectedHash = shasum
      break
    }
  }
  if (actualHash !== expectedHash) {
    log.error(`Incorrect Checksum: Expected ${actualHash} but got ${actualHash}`)
    process.exit(1)
  } else {
    log.info(`Verified checksum of ${FILENAME} as ${actualHash}`)
  }

  // Move to vendor dir.
  mkdirSync(join(__dirname, `../vendor`), { recursive: true })
  renameSync(join(__dirname, `../bitcoin-${VERSION}`), join(__dirname, `../vendor/bitcoin`))
})()
