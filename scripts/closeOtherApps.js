const closeOtherApps = `
foregroundAppsString=$(osascript -e 'tell application "System Events" to get name of (processes where background only is false)')

IFS=',' read -r -a foregroundApps <<< "$foregroundAppsString"

for foregroundApp in "\${foregroundApps[@]}"
do
  appName=$(echo "$foregroundApp" | sed 's/^ *//g')
  if [[ ! "$appName" == "Finder" && ! "$appName" == "Electron" && ! "$appName" == "Hideaway" && ! "$appName" == "Hyper" && ! "$appName" == "Spotify" ]]; then
    osascript -e 'quit app "'"$appName"'"'
  fi
done
`

module.exports = closeOtherApps
