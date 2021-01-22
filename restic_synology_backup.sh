#!/bin/sh

export RESTIC_REPOSITORY="sftp:tatarama@172.22.22.92:/backups/linux_pc"
export RESTIC_PASSWORD="LinuxBackup"

echo $(date) "************************* Initiating backup ************************* "

restic backup --files-from /home/tatarama/.config/restic/includes --exclude-file=/home/tatarama/.config/restic/excludes

restic forget --prune --keep-hourly 6 --keep-daily 7 --keep-weekly 4 --keep-monthly 12

echo $(date) "************************* Backup complete ************************* "
