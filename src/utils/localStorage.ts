// Sets an item with a Key to local storage
const saveStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// Looks for a local storage item and returns if present
const getStorage = (key: string) => {
  if (localStorage.getItem(key)) {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }
}

// Clear a single item or the whole local storage
const clearStorage = (key = 'false') => {
  if (key) {
    localStorage.removeItem(key)
  } else {
    localStorage.clear()
  }
}
// Exports all avaliable functions on the script
export { getStorage, saveStorage, clearStorage }
