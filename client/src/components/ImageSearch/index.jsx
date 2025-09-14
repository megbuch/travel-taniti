import { useState, useRef, useEffect } from 'react'
import { searchForImages } from '../../api'
import { Button } from '../../components'
import './styles.scss'

export default function ImageSearch(props) {
  const { 
    onSelect, 
    selectedImageURL,
    searchPlaceholder = "Search for images...", 
    quickSearchTerms = [] 
  } = props
  const [selectedImage, setSelectedImage] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef()

  useEffect(() => {
    if (!selectedImageURL) {
      setSelectedImage(null)
      return
    }
    let imageObject
    if (typeof selectedImageURL === 'object' && selectedImageURL.urls) {
      imageObject = selectedImageURL
    } else {
      imageObject = { urls: { regular: selectedImageURL } }
    }
    setSelectedImage(imageObject)
    if (onSelect) onSelect(imageObject)
  }, [selectedImageURL, onSelect])

  const selectImage = image => {
    searchInputRef.current.value = ''
    setSelectedImage(image)
    onSelect(image)
  }

  const searchImages = async (term) => {
    if (term) searchInputRef.current.value = term
    const searchTerm = searchInputRef.current.value.trim()
    if (!searchTerm) return
    setSelectedImage(null)
    setIsSearching(true)
    try {
      const data = await searchForImages(searchTerm)
      setSearchResults(data.results)
    } catch (error) {
      console.log('Image search error: ', error)
    }
    setIsSearching(false)
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      searchImages()
    }
  }

  return (
    <div className='image-search-comp col'>
      {selectedImage ?
        <div className='col'>
            <Button small short inverted border text='Select a different image' onClick={()=>setSelectedImage(null)} type='button' />
          <div className='selected-image'>
            <div>
              <img
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description || 'Selected image'}
              />
            </div>
            {selectedImage.user && <Button short small inverted text={`Photo by ${selectedImage.user?.name}`} type='button' />}
          </div>
        </div>
      :
        <div className='col'>
          <p>Search for an image via the Unsplash API</p>
          <div className='row'>
            <input
              ref={searchInputRef}
              type='text'
              placeholder={searchPlaceholder}
              onKeyDown={handleKeyPress}
              />
            <Button short text={isSearching ? 'Searching...' : 'Search'} onClick={()=>searchImages()} disabled={isSearching} type='button' />
          </div>
          {quickSearchTerms.length > 0 && (
            <div className='row'>
              {quickSearchTerms.map((term) => (
                <Button small short inverted
                  key={term}
                  text={term}
                  onClick={()=>searchImages(term)}
                  type='button'
                />
              ))}
            </div>
          )}
          {searchResults.length > 0 && (
            <div className='image-list'>
              {searchResults.map(image => (
                <div key={image.id} onClick={()=>selectImage(image)} className='image-card'>
                  <img src={image.urls.regular} alt={image.alt_description || 'Search result'}/>
                  <p className='subtitle'>by {image.user.name}</p>
                </div>
              ))}
            </div>
          )}
          {searchResults.length === 0 && !isSearching && searchInputRef.current?.value && (
            <p>No images found. Try a different search term.</p>
          )}
        </div>
      }
    </div>
  )
}
