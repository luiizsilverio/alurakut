import { Main } from '../src/components/Main'
import { Box } from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons'
import { ProfileFriendsWrapper } from '../src/components/ProfileFriends'

function ProfileSidebar(props) {
  return (
    <Box>
      <img 
        src={`https://github.com/${props.user}.png`} 
        alt="Foto do perfil" 
        style={{borderRadius: '8px'}}
      />
    </Box>
  )
}

export default function Home() {
  const user = 'luiizsilverio'
  const fav = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'felipefialho']

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
        </div>

        <div className="communityArea" style={{ gridArea: 'communityArea'}}>
          <ProfileFriendsWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({fav.length})
            </h2>

            <ul>
            {
              fav.map(person => (
                <li>
                  <a href={'/users/${person}'} key={person}>
                    <img src={`https://github.com/${person}.png`} />
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
