document.getElementById("login").onclick = async e=>{
    const email = document.getElementById("email").value
    const password = document.getElementById('password').value

    const body = {email, password}

  const result = await fetch  ('/jwt/login', {
        method:'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}

    })
    console.log(body)
    const response = await result.json()
    
}

document.getElementById("user").onclick = async e=>{
            
     
    const result = await fetch('/jwt/current', {
          method:'GET',
          headers: {
              
              'Content-Type': 'application/json'}

      })
  console.log(headers)    
  const response = await result.json()
  console.log(result)
       
  }
