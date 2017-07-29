module.exports = {
  exportPathMap() {
    // Let Next.js know where to find the entry page on export
    return {
      '/start': { page: '/start' }
    }
  }
}
