module.exports = {
  sanitizeId(id) {
    return encodeURIComponent(id.toLowerCase().replace(/\s/g, '-'));
  },
};
