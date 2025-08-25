import { useState, useRef } from 'react'
import { searchForImages } from '../../api'
import { Button } from '../../components'
import './styles.scss'

// todo: styling
export default function ImageSearch({ onSelect, searchPlaceholder = "Search for images...", quickSearchTerms = [] }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef()

  const selectImage = image => {
    setSelectedImage(image)
    onSelect(image)
  }

  const searchImages = async () => {
    const query = searchInputRef.current.value.trim()
    if (!query) return
    setSelectedImage(null)
    setIsSearching(true)
    try {
      const data = await searchForImages(query)
      setSearchResults(data.results)
    } catch (error) {
      console.error('Image search error:', error)
      alert('Search failed. Please try again.')
    }
    setIsSearching(false)
  }


  return (
    <div className='image-search-comp col'>
      {!selectedImage ? (
        <p>Search for an image via the Unsplash API</p>
      ) : (
        <>
          <div>
            <img
              src={selectedImage.urls.small}
              alt={selectedImage.alt_description || 'Selected image'}
            />
          </div>
          <p className="image-attribution">
            Photo by <a href={selectedImage.user.links.html} target="_blank" rel="noopener noreferrer">
              {selectedImage.user.name}
            </a> on Unsplash
          </p>
        </>
      )}
        <>
          <div className='row'>
            <input
              ref={searchInputRef}
              type='text'
              placeholder={searchPlaceholder}
              />
            <Button short text={isSearching ? 'Searching...' : 'Search'} onClick={searchImages} disabled={isSearching} />
          </div>
          {quickSearchTerms.length > 0 && (
            <div className='row'>
              {quickSearchTerms.map((term) => (
                <Button small short inverted
                  key={term}
                  text={term}
                  onClick={() => {
                    searchInputRef.current.value = term
                    searchImages()
                  }}
                />
              ))}
            </div>
          )}
          {!selectedImage && searchResults.length > 0 && (
            <>
              {searchResults.map(image => (
                <div key={image.id} onClick={() => selectImage(image)} className='image-result'>
                  <img src={image.urls.thumb} alt={image.alt_description || 'Search result'} />
                  {/* <p className="search-result-attribution">by {image.user.name}</p> */}
                </div>
              ))}
            </>
          )}
          {searchResults.length === 0 && !isSearching && searchInputRef.current?.value && (
            <p className="no-results">No images found. Try a different search term.</p>
          )}
        </>
    </div>
  )
}
