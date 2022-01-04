// Selecting elements
const form = document.querySelector('form')
const inputText = document.querySelector('#input-username')
const message = document.querySelector('#message')

const userDetailsGrid = document.querySelector('.user-details-grid')
const userImage = document.querySelector('#user-image')
const profileName = document.querySelector('#name')
const username = document.querySelector('#username')
const description = document.querySelector('#description')
const userLocation = document.querySelector('#location')
const website = document.querySelector('#website')
const followers = document.querySelector('#followers')
const repos = document.querySelector('#repos')
const twitter = document.querySelector('#twitter')
const gitlink = document.querySelector('#gitlink')

// async function to get and update the github user data
const getUserData = async inputText => {
  const endpoint = `https://api.github.com/users/${inputText}`
  const response = await fetch(endpoint)
  const data = await response.json()

  // if user is not found we have to the show the 'USER NOT FOUND' message
  // and hide the details of the user
  if (data.message === 'Not Found') {
    message.classList.remove('hide')
    userDetailsGrid.classList.add('hide')
    message.textContent = 'User Not Found'
    return
  }

  // if user is found then we have to the show the user details
  // and hide the 'USER NOT FOUND' message
  message.classList.add('hide')
  userDetailsGrid.classList.remove('hide')

  userImage.src = data.avatar_url
  profileName.textContent = data.name || 'No profile name'
  username.textContent = `@${data.login}`
  description.textContent = data.bio || 'This profile has no bio'
  userLocation.textContent = data.location || 'Not available'
  website.textContent = data.blog || 'Not available'
  followers.textContent = data.followers
  repos.textContent = data.public_repos
  twitter.textContent = data.twitter_username
    ? `@${data.twitter_username}`
    : 'Not available'

  gitlink.href = data.html_url
  console.log(gitlink.href)
}

form.addEventListener('submit', e => {
  e.preventDefault()
  if (inputText.value === '') return

  // get and update the user data
  getUserData(inputText.value)

  // clear the input field
  inputText.value = ''
})
