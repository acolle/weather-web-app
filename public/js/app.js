console.log('Client side javascript file is loaded!')

const $weatherForm = document.querySelector('form')
const $search = document.querySelector('input')
const $geolocationButton = document.querySelector('#my-location')
const $messageOne = document.querySelector('#message-1')
const $messageTwo = document.querySelector('#message-2')

$weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = $search.value

    $messageOne.textContent = 'Loading...'
    $messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                $messageOne.textContent = data.error
            } else {
                $messageOne.textContent = data.location
                $messageTwo.textContent = data.forecast
            }
        })
    })
})

$geolocationButton.addEventListener('click', (e) => {
    e.preventDefault()

    $messageOne.textContent = 'Loading...'
    $messageTwo.textContent = ''
    $geolocationButton.setAttribute('disabled', 'disabled')

    if (!navigator.geolocation) {
      $messageOne.textContent('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      var longitude = await position.coords.longitude
      var latitude = await position.coords.latitude

      fetch('/weather?reverse=' + true + '&longitude=' + longitude + '&latitude=' + latitude).then((response) => {
          response.json().then((data) => {
              if (data.error) {
                  $messageOne.textContent = data.error
              } else {
                  $messageOne.textContent = data.location
                  $messageTwo.textContent = data.forecast
              }
          })
      })
      $geolocationButton.removeAttribute('disabled')
    }, (error) => {
      console.log('This is an error')
    })
})
