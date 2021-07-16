import React, { useState } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies'

export default function Login() {
  const [githubUser, setGithubUser] = useState("")

  const router = useRouter()

  function handleSubmit(event) {
    event.preventDefault()

    if (!githubUser ) {
      alert('Informe o nome do usuário')
      return
    } 
        
    fetch('https://alurakut.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ githubUser: githubUser })
    })
    .then(async (response) => {
      const data = await response.json()
      const token = data.token
      
      nookies.set(null, 'alurakut@user_token', token, {
        path: '/',  //qual rota vai ter acesso a esse cookie
        maxAge: 60 * 60 * 24  // expira em 24 horas 
      })

      router.push('/')    
    })
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box">
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input 
              type="text"
              placeholder="Usuário" 
              value={githubUser}              
              onChange={(ev) => setGithubUser(ev.target.value)}
            />
            <button type="submit" onClick={handleSubmit} >
              Login
          </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 