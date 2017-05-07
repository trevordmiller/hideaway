const enableWebsiteBlocking = (blockedWebsites) => {
  const blockedWebsitesWithSpaceDelimiter = blockedWebsites.replace('\n', ' ')
  return `
    BASHINPUT=\`cat <<END
    HOSTFILE="/etc/hosts"
    sed -i -e '/#hideaway$/d' $HOSTFILE
    WEBSITES=(${blockedWebsitesWithSpaceDelimiter})
    for WEBSITE in $WEBSITES; do
      echo -e "127.0.0.1\\t$WEBSITE\\t#hideaway" >> $HOSTFILE
      echo -e "127.0.0.1\\twww.$WEBSITE\\t#hideaway" >> $HOSTFILE
    done
    dscacheutil -flushcache
    \`;
    bash -c "$BASHINPUT"
  `
}

module.exports = enableWebsiteBlocking
