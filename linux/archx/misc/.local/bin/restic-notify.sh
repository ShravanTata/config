# For this work you need to do the following
# restic ALL=(tatarama) NOPASSWD: /home/tatarama/.local/bin/restic-notify.sh

# Wrapper for notify-send command to send notifications from restic user namespace
DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus notify-send "$@"
