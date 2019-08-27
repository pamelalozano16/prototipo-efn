console.log("hola")

async function getLogin(){
  const resp = await fetch('http://170.128.120.91:8080/ibi_apps/rs/ibfs?IBIRS_action=signOn&IBIRS_userName=admin&IBIRS_password=admin', {
        method: 'GET',
        mode:'no-cors',
        redirect: 'follow',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    })
    console.log(resp)
}
getLogin()
