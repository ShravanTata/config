 #!/bin/bash

echo "#####################"
echo "# Initiating Backup #"
echo $(date)
echo "#####################"

notify "Performing backup for root"

# export env variables
export RESTIC_REPOSITORY="sftp:synology-nas:/home/backups/mac/pro2014"
export RESTIC_PASSWORD="MacOSBackup"

# check if restic repository is initialized well
sleep 1
restic snapshots 2&> /dev/null
if [ $? -eq 0 ];
then
    echo " "
    echo "[INFO] Restic respository available, continuing with the backup ... ";
    echo " "
else
    echo "[ERROR] Restic respository unavailable, exiting backup ... ";
    notify "root backup failed. Check logs"
    exit
fi

# run backup
restic backup --tag pro2014 --tag personal /Users/tatarama/projects/personal/config --verbose
# --exclude-file=/Users/tatarama/projects/personal/config/restic/mac/pro2014/excludes
# run pruning
restic forget --prune --keep-hourly 6 --keep-daily 7 --keep-weekly 4 --keep-monthly 12
# run checks
restic check

notify "root backup finished."

echo "##################"
echo "# Exiting Backup #"
echo "##################"
