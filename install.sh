#!/bin/bash

APP="DownTube"
set -e


echo "Build will start shortly."

# Simple installation process
mkdir -p /opt/"$APP"
cp "$APP".mjs /opt/"$APP"/
chmod +x /opt/"$APP"/"$APP".mjs

mkdir -p /usr/local/bin
cp "$APP" UNINSTALL-DOWNTUBE /usr/local/bin/
chmod +x /usr/local/bin/"$APP"
chmod +x /usr/local/bin/UNINSTALL-DOWNTUBE

mkdir -p /usr/share/applications
cp "$APP".desktop /usr/share/applications/

mkdir -p /usr/share/icons/hicolor/512x512/apps
cp "$APP".svg /usr/share/icons/hicolor/512x512/apps/

# Update desktop database if applicable
if [ -x /usr/bin/update-desktop-database ]; then
  /usr/bin/update-desktop-database /usr/share/applications >/dev/null 2>&1
fi

# Update MIME database if applicable
if [ -x /usr/bin/update-mime-database ]; then
  /usr/bin/update-mime-database /usr/share/mime >/dev/null 2>&1
fi

# Update icon cache if applicable
if [ -e /usr/share/icons/hicolor/icon-theme.cache ]; then
  if [ -x /usr/bin/gtk-update-icon-cache ]; then
    /usr/bin/gtk-update-icon-cache -f /usr/share/icons/hicolor >/dev/null 2>&1
  fi
fi



echo -e "



 ______                  _____     _
 |  _  \\                |_   _|   | |
 | | | |_____      ___ __ | |_   _| |__   ___
 | | | / _ \\ \\ /\\ / / '_ \\| | | | | '_ \\ / _ \\
 | |/ / (_) \\ V  V /| | | | | |_| | |_) |  __/
 |___/ \\___/ \\_/\\_/ |_| |_|\\_/\\__,_|_.__/ \\___|

"

echo "Installation complete!"


