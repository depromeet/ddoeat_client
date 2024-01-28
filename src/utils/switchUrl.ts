const switchUrl = (newPath: URL | string) => {
  window.history.replaceState(null, '', newPath);
};

export default switchUrl;
