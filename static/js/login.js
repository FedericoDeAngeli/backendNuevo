const formLogin = document.querySelector('form')

formLogin?.addEventListener('submit', async event => {
   event.preventDefault()

   const response = await fetch('/api/sesiones/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
    
     body: new URLSearchParams(new FormData(formLogin))
   })

  if (response.status === 201) {
     window.location.href = '/index'
   } else {
     const error = await response.json()
     alert(error.message)
   }
 })