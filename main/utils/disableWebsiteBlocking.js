const disableWebsiteBlocking = `
  HOSTFILE="/etc/hosts"
  sed -i -e '/#hideaway$/d' $HOSTFILE
  dscacheutil -flushcache
`

module.exports = disableWebsiteBlocking
