import React, { useEffect, useState } from 'react'
import { Main } from '../src/components/Main'
import { Box } from '../src/components/Box'
import { ProfileFriendsWrapper } from '../src/components/ProfileFriends'

import { 
  AlurakutMenu, 
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet 
} from '../src/lib/AluraCommons'


function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img 
        src={`https://github.com/${props.user}.png`} 
        alt="Foto do perfil" 
        style={{borderRadius: '8px'}}
      />

      <hr />
        <a href={`https://github.com/${props.user}`} className="boxLink">
          @{props.user}
        </a>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfilesBox(props) {
  
  return (
    <ProfileFriendsWrapper>
      <h2 className="smallTitle">
        { props.title } ({props.items.length})
      </h2>
      <ul>
      {
        props.items.map(item => (
          <li key={ item.id }>
            <a href={`/users/${ item.login }`} >
              <img src={ item.avatar_url 
                ? item.avatar_url 
                : `https://via.placeholder.com/300x300` } 
                width={300}
              />
              <span>{ item.login }</span>
            </a>
          </li>
        ))
      }
      </ul>
    </ProfileFriendsWrapper>  
  )
}

export default function Home() {
  const user = 'luiizsilverio'
  const fav = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'guilhermesilveira']
  const [communities, setCommunities] = useState([])
  const [seguidores, setSeguidores] = useState([])

  useEffect(() => {
    function fetchSeguidores() {
      fetch(`https://api.github.com/users/${user}/followers`)
        .then(data => data.json())
        .then(data => setSeguidores(data))
        .catch(err => alert(`Erro na requisição (${err.message})`))
    }

    fetchSeguidores()
  }, [])

  function handleCreateCommunity(event) {
    event.preventDefault()

    const community = {
      id: new Date().toISOString(),
      title: event.target.title.value,
      image: event.target.image.value
    }

    setCommunities(oldState => [...oldState, community])
  }

  return (
    <>
      <AlurakutMenu />
      <Main>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar user={user} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <input 
                name="title"
                type="text"
                placeholder="Qual vai ser o nome da sua comunidade?" 
                aria-label="Qual vai ser o nome da sua comunidade?"
              />
              <input 
                name="image"
                type="text"
                placeholder="Informe uma URL"
                aria-label="Informe uma URL"
              />
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="communityArea" style={{ gridArea: 'communityArea'}}>
     
          <ProfilesBox 
            title="Seguidores"
            items={ seguidores }
          />
     
          <ProfileFriendsWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({communities.length})
            </h2>
            <ul>
            {
              communities.map(item => (
                <li key={ item.id }>
                  <a href={`/users/${ item.title }`} >
                    <img src={ item.image 
                      ? item.image 
                      : `https://via.placeholder.com/300x300` } 
                      width={300}
                    />
                    <span>{ item.title }</span>
                  </a>
                </li>
              ))
            }
            </ul>
          </ProfileFriendsWrapper>  

          <ProfileFriendsWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({fav.length})
            </h2>
            <ul>
            {
              fav.map(person => (
                <li key={ person }>
                  <a href={`/users/${ person }`} >
                    <img src={`https://github.com/${ person }.png`} />
                    <span>{ person }</span>
                  </a>
                </li>
              ))
            }
            </ul>
          </ProfileFriendsWrapper>       
        </div>
      </Main>
    </>
  )
}
