#!/usr/bin/env bash

case $OSTYPE in
  linux*)
    ARCH="x86_64-linux-gnu"
    EXT=".tar.gz"
  ;;
  darwin*)
    ARCH="osx64"
    EXT=".tar.gz"
  ;;
  msys*|cygwin*|win32*)
    ARCH="win"
    EXT=".zip"
  ;;
  *)
    echo "Unsupported platform: $OSTYPE" >&2
    exit 1
  ;;
esac
