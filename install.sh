#!/bin/bash

APP=DownTube
set -e

function countdown {
  local num=$1
  while [ $num -gt 0 ]; do
    printf "\rAbout to install "$APP" in %s seconds..." $num
    sleep 1
    num=$((num - 1))
  done
  printf "\Building "$APP"...   \n"
}

if [ "$(basename "$PWD")" = ""$APP"" ]; then
  echo "Already inside '"$APP"' directory."
  else
  git clone https://github.com/rizitis/"$APP".git -b main --depth 1 && \
  cd ""$APP"" || exit 1
fi

echo "Build will start shortly."
countdown 5


set +x
# simple installation, easy to understand.
mkdir -p /opt/"$APP"
cp "$APP".mjs /opt/"$APP"/
chmod +x /opt/"$APP"/"$APP".mjs
mkdir -p /usr/local/bin
cp "$APP" UNINSTALL-DOWNTUBE /usr/local/bin/
chmod +x /usr/local/bin/{"$APP",UNINSTALL-DOWNTUBE}
mkdir -p /usr/share/applications
cp "$APP".desktop /usr/share/applications/
mkdir -p /usr/share/icons/hicolor/512x512/apps
cp "$APP".svg /usr/share/icons/hicolor/512x512/apps/

if [ -x /usr/bin/update-desktop-database ]; then
  /usr/bin/update-desktop-database -q usr/share/applications >/dev/null 2>&1
fi

if [ -x /usr/bin/update-mime-database ]; then
  /usr/bin/update-mime-database usr/share/mime >/dev/null 2>&1
fi

# If other icon themes are installed, then add to/modify this as needed
if [ -e usr/share/icons/hicolor/icon-theme.cache ]; then
  if [ -x /usr/bin/gtk-update-icon-cache ]; then
    /usr/bin/gtk-update-icon-cache -f usr/share/icons/hicolor >/dev/null 2>&1
  fi
fi

if [ -e usr/share/glib-2.0/schemas ]; then
  if [ -x /usr/bin/glib-compile-schemas ]; then
    /usr/bin/glib-compile-schemas usr/share/glib-2.0/schemas >/dev/null 2>&1
  fi
fi

echo "







 ______                  _____     _
 |  _  \                |_   _|   | |
 | | | |_____      ___ __ | |_   _| |__   ___
 | | | / _ \ \ /\ / / '_ \| | | | | '_ \ / _ \
 | |/ / (_) \ V  V /| | | | | |_| | |_) |  __/
 |___/ \___/ \_/\_/ |_| |_\_/\__,_|_.__/ \___|

"

