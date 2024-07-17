// background.js
browser.runtime.onInstalled.addListener(() => {
  removeBookmarkNames();
});

async function removeBookmarkNames() {
  const bookmarks = await browser.bookmarks.getTree();

  // Recursive function to iterate through all bookmarks
  function processBookmarks(node) {
    if (node.children) {
      node.children.forEach(processBookmarks);
    }

    // Only modify the name if it's not already empty
    if (node.title) {
      browser.bookmarks.update(node.id, { title: "" });
    }
  }

  processBookmarks(bookmarks[0]);
}
