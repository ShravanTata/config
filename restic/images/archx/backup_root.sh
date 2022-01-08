#!/bin/bash

echo "#####################"
echo "# Initiating Backup #"
echo $(date)
echo "#####################"

sudo -u tatarama /home/tatarama/.local/bin/restic-notify.sh "RESTIC" "Performing backup for root" --icon=dialog-information --expire-time=1

# export env variables
export RESTIC_REPOSITORY="sftp:synology-nas:/home/backups/archx/root"
export RESTIC_PASSWORD="LinuxBackup"

# check if restic repository is initialized well
sleep 1
/home/restic/bin/restic snapshots 2&> /dev/null
if [ $? -eq 0 ];
then
    echo " "
    echo "[INFO] Restic respository available, continuing with the backup ... ";
    echo " "
else
    echo "[ERROR] Restic respository unavailable, exiting backup ... ";
    sudo -u tatarama /home/tatarama/.local/bin/restic-notify.sh "RESTIC" "root backup failed. Check logs" --icon=dialog-error
    exit
fi

# check if restic bin has the permissions to backup the root
sleep 1
if [[ $(getcap ~restic/bin/restic) ]];
then
    echo " "
    echo "[INFO] restic-bin has the permissions, continuing with the backup ... ";
    echo " "
else
    echo "[ERROR] restic-bin does not have the permissions, exiting backup ... ";
    sudo -u tatarama /home/tatarama/.local/bin/restic-notify.sh "RESTIC" "root backup failed. Check logs" --icon=dialog-error
    exit
fi

/home/restic/bin/restic backup --tag archx --tag root / --exclude-file=/home/restic/config/restic/images/archx/excludes_root -vvv

/home/restic/bin/restic forget --prune --keep-hourly 6 --keep-daily 7 --keep-weekly 4 --keep-monthly 12

sudo -u tatarama /home/tatarama/.local/bin/restic-notify.sh "RESTIC" "root backup finished." --icon=dialog-information

echo "##################"
echo "# Exiting Backup #"
echo "##################"
