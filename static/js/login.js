const formLogin = document.querySelector('form')

formLogin?.addEventListener('submit', async event => {
   event.preventDefault()

   const body= new URLSearchParams(new FormData(formLogin))

   const response = await fetch('/api/sesiones/', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
    
     body
   })

  if (response.status === 201) {
     window.location.href = '/'
   } else {
     const error = await response.json()
     alert(error.message)
   }
 })