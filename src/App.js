import { useState, useEffect } from 'react'
import './App.css'
import UsernameForm from './components/UsernameForm'

const authorizationHeader =
  'BQCjvyY3MVQJaDJP6NDNaQJuvCqgRCVkzmeFNTapeqKgd_9_LYmd9sexo4D1PNr65Avu3AIjDEVkwGt_utT2lFof1BGg0ozH3qXhm8RRYv73wNazYe8A'

function App() {
  const [playlists, setPlaylists] = useState([])
  const [search, setSearch] = useState('joniux03')
  const [playlistToCompare, setPlaylistToCompare] = useState([])
  const [tracksA, setTracksA] = useState([])
  const [tracksB, setTracksB] = useState([])
  const [comparisonA, setComparisonA] = useState([])
  const [comparisonB, setComparisonB] = useState([])

  const handleCompare = async () => {
    const tracksAIds = tracksA.map((track) => track.track.id)
    const tracksBIds = tracksB.map((track) => track.track.id)
    const filterA = tracksA.filter(
      (track) => !tracksBIds.includes(track.track.id)
    )
    const filterB = tracksB.filter(
      (track) => !tracksAIds.includes(track.track.id)
    )

    setComparisonA(filterA)
    setComparisonB(filterB)
  }

  return (
    <div className='App'>
      <h1>Ingresa tu ID de usuario</h1>
      <UsernameForm
        authorizationHeader={authorizationHeader}
        search={search}
        setSearch={setSearch}
        setPlaylists={setPlaylists}
      />
      {playlists && (
        <div className='playlists-results__container'>
          {playlists.map((playlist) => {
            return (
              <div className='track'>
                <div
                  onClick={async () => {
                    setPlaylistToCompare([...playlistToCompare, playlist]) //fill image and name to compare
                    const dataTracks = await fetch(playlist.tracks.href, {
                      headers: {
                        Authorization: `Bearer ${authorizationHeader}`
                      }
                    })
                    let tracksInitial = await dataTracks.json()
                    let tracks = [...tracksInitial.items]
                    console.log(tracksInitial)

                    while (tracksInitial.next) {
                      const nextData = await fetch(tracksInitial.next, {
                        headers: {
                          Authorization: `Bearer ${authorizationHeader}`
                        }
                      })
                      const nextTracks = await nextData.json()
                      tracks = [...tracks, ...nextTracks.items]
                      tracksInitial = nextTracks
                    }
                    if (tracksA.length === 0) {
                      setTracksA(tracks)
                    } else if (tracksB.length > 0) {
                      setTracksA(tracks)
                      setTracksB([])
                    } else {
                      setTracksB(tracks)
                    }
                  }}
                >
                  {playlist.images && (
                    <img
                      src={
                        playlist.images[0]?.url ||
                        'data:image/png;base64,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'
                      }
                      alt={playlist.name}
                    />
                  )}
                  <p className='playlist-name'>{playlist.name}</p>
                  <div className='front-album'>
                    <p>Comparar</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {/* {console.log('A2', tracksA)} */}
      {console.log('B2', tracksB)}
      <div>
        <h2>Comparar:</h2>
        <div className='playlists-to-comapare'>
          {playlistToCompare.map((playlist) => {
            return (
              <div onClick={() => setPlaylistToCompare(playlist)}>
                {playlist.images && (
                  <img
                    src={
                      playlist.images[0]?.url ||
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAABFFBMVEUe12D///8ZFRUe3mMe2mEZAA38/PwZABEe32MZAA/5+fnz8/MZAAv29vbw8PAA1VQZEhTk5OTOzs4ZEBTg4ODIyMjr6+vX19fU1NTd3d0ZCxMA1VIe0l7LxMkZBhIex1obbjYdrU8du1Uch0Abezsey1sbYzEaUiscnEgaSigcj0MdvlYZHRgdsVEco0saOyIZJhsaNSDp++9d4IfX9uEaWS0clEUbaTQZKhwaQSQaMB6Sy6Ps/PKP6Ko723G078Z55JrL8tfO5tWw0rtp1Ipb04E/1HF5z5NM03iDzpre+OZp4Y2A5Z+f67W28Mib6rLG6dDe7OOm37az4MHL2tC40MCMz6Gezayry7Vw0I6+x8F8zpUR4aYAAAARjElEQVR4nO2daVvbOBeGDZbjOBgUMARIHLLvC1AIEAopdIBu0M60pVD6///HK8kOCbFlS15i8159Psw1DSX47jk6OosUhIX/cwlRP0DY+gv42vUX8LXrL+Br11/AAJU4O3uDdHZ2NscfGj5g4vPl3fnFwUgAEOaIIIRAuPlye/f1MHzUUAE/fz0/0CEBAkCYEUDAMAduLu4uEyE+Q1iAictvByCHTeUmzDm6/fompAcJBfDz3QFkYZu2Zm50exnGswQPeHmu53jgpl32y7vAF2XAgIfnQg7ywz1DQnjwNdgnChLw7G7kh+6Z8eIwwIcKDvDwgmvZOTHmRu8Ce6ygAL/e5IKhMwTBeUCrMRjAdyPfrmlBhBeB7BxBAL4TAvLNlwKBIPoH/KoHbr0J4q1vR/ULeDkKdO3NCsJvkQKefcmFSGcgCv42Rl+Ad6GsvVnlDvwsRR+Ah8GHTnsBP37qHfA8dO+cCI4+zxvw87zMZwjAu/kC3s0VDwseeNsxPAEmwg+eVgFwOS/AQ2Hu9iPKnc8H8F00eAJ2U/7uDT/gbQTu+Uw44t4SuQEPIrMfEfdC5AQ8m+/uYKMcZy3MB/hGmEdu5kLIl9ZwAX6OHk/gDaY8gIdzya3dlbsNBzAufCiYXoQBeBh1eJkSZLchM+DnGPHxELICvrGOhyIVc6RhBDyLGsiiHGP9xAaYGMXLflg5tl4NG2DE+Zm9INMIgwnwNo58KKliKYFZAN9FWD84CdwEAxinDfClWDZ8d8BEDBJsmhhKC3fAg/jyIRu6thNdAeffP+PSyC9gvDI0q1yXoRvgKGoCN+UufQGex9yAWM6dNmfAw5jugNOCX3wAxt5BsZyd1BHw2ytwUJTQ6E5O6gT45lXwISd1qg2dAL/EeYufFnTodzsAXr6CCGMIHHgCfBURxpBDnKEDehoiASTREPJvfUrC+HUR2Bz/9St6xkYFTHCCiWJSBHqh3D+qVI8Hrd3Tk256R1YkLEWWs4vdk/1ho16stpv9ckEH6K+LwYFCav+CCsiaZBOL6Z1SuzrY7SqSKikIZyeraVo6nV4cC/0/eiWbRciIGf2l7m6jWOmXdSAGwgl0XkAWA2I2odOvDk5l9MjyjjYBclVayyLzqspeq9guFUDSLyWkVYY0QDcDIjbQaRaHOwiNi2xGhFNabFWbHYGsW48CtFVIAXQ0ILKcUG4PuqokZ72jvbBnVpZUrVXt1zw7LG0VUgAdQigQC836oqrsBMM2TYlseVrsFzxZkmZCCiC10QtAcyhJgcM9S5Mlab9a0vkhKXuhPSA1iREL+2o2LLgpSLlxxGtISjpjD0jLQkFZDh2PCLvrbqXDxZizzUhtAc9oK1BPa3PhI8oq6m6lwI5oX1TYAtLqQLGuzI8PS1PUVlNnZrSrC+0AE7r994OCNF8+rKwkH5dRQsFiwktGQFqIEdtzNqChtKzuNgUGMwK77owd4C3lvcT6ThSAi9iMWrXmjgiXmQBTtDdKDucTQu2UVqTjTtIF0S4htQG8pMXQZCs6QCRZrbsgApvTiFbAxAXtTcRjOUrAxUVFrRccww08sxBaABP0PBs0maJo2qz7FKPaNaWM60RfWZ6sFmsOiPArA6DDvFNXHJ4urRkFvLy4Nxygyr3SPmr2kUr4P82jo3alWqw3dvfSMsH1WmMpcoVeb4AvDIAO3V6xamvCNKnptP1Btd3v4W4EbkeMuy9jGa/gPgXpa1TruP73Ukumpb0e1YggNUs4C5hI3Dit49OZjYKUONqweNQrCEnSZWHIOgzcJNDL/Up9H5fMfGWlpraTlLeGh66A1DyUPFptb7LXYzh5WO13BK/9I9Kqwk2P1iJybY40V+1TbAi/uQJSNwnjkfSBSp4ElzStSk/33UwhmEnc/thXJIURMi3XKG92kEg4AiYSbhPBZPkYLR7lpFjCcD7ZXlLWStV9xmJaqVJMCJbdAB2XIHkLUawVPFTcDMKQpB3iakitS/nxlkU4C7jE1A4NcSoDkqBXPXFlVDv2zwDvZnx0FjAOp36Qj5Sre6rs5KtS3x4QXDgCJlLfYwAoGIzFrETPfWmAwijlDEgrleYvIAr9FtWMao+2CFdSjoCuMWaeAslOUbZdjWmF0nVAUcYJMLUcJz4Bm1FvdyUr4k6Dmsu8e+mjM4D/xWMJTksEzRMLItVDBXjuAJhI/Rsk4CTT9vc+otjck16sRaVOMyAqKBwB/d4NnAx4Bb1WKHSwCoVaTQeT8a6HtxXBkTbV8FKG9DcBo2UHwGXPJ2NI3gz0TumoUhy09ru4gFLHwvWfdjJsHJN6ShA9DD1FoSqZETWr1p0yDbCUcgCktitc2ECnXzkedlUy4EV1e9oS3XGdT4r856GnyJfuJQvHsop7A60S1T+x4H8vfPQFYGqZ9/Qryh6F8lFxqGAy1qrOHO6iKrLMU42gjbHXbJZqLr01+N4JkGcbRHB6qdqSVcXbRAZhqtJ+sVlgd1iWgAX/pQImUku07dOGDpQrQ4m3GLdaU5bUbr3pbehpD/hjmQ64wvovKZbqWVUJqE2q7Ugqqi8Ft74uI+B3OuByhi2IgtpQdWqweYGUJWXQ1ANghHfLKSogWyIDaukwhhRpZMiGf0Zw7h9wP7QhTFaSBn3gaz2C2yU64HsWQNBUw+LD2pGyVdcxS6iAYthDprSiDpEZvQJe+AXUHXsJwSgrLVbYR9cWwIQ9YIoJcE6DbE2RihwnENgAl5gsWJvXpF5W6wX+xQguVpb9AYKuY0sPZdXGocnpagJPz5Qs96CFIM4dUCzaz0GNHFqV9xv1aqXd7Jd6vTJRr9RvtivVemNXw7RcEyVZLep84QbcOgAy7YOgYNkmNJQ3q91G9ajUEcRkcnZ0ZpbB6AtCodes1PdlgsmIKFW4Iio49wsoiO1pwixi2yeVD8uQCRiVcaHUru+pKlOqnpa6fY6l6AjImIsmK+aJPE1RFWPGxBnvCKbeqzR2WM5lamrLeTY/LXjnBMj4mMlyC0cO9aTaE3zMmMjcrD1Q3KctO0qZ9afA706ArHclQLLWb3o8ujrzTiKetpy61V6aXGP8UfCHEyB7RR9AO3DyXmKy0B4621GuMzopfE8FTCxlrqPqbBPGfaeJksRoQvhzhZbJIMAoZy+IsVPVqBMlqckIuEoHXM5EfOcaVYJ4omQLqFTYfFRfXaFXE5kfkc8mQLJzLNn1QxgBwceMQ7m0wpSrhSyQ1KuyFZHRRcGVI+B6DAAF3KivZGcRGYMM/OQAmFpZZW6MhiyEKL84XywP2JYg/JFZcuiLrka2T1gk6kV10txi3ujh+wy1L7qQWsl8iIePEiULDdXc+1GqxrjPg3UnwCX/YdQ8aZc0pirm7U9ykCnJPR4Eyf6eqiioFmNOtsHN6godEO30Pz0DkgIhadwBLQ5auyddfA/JvAGa7Z7stlAd3Cx12Mqq5zctVevHlQ5zzgt+v9znZ+eDmXVvaEkRn408bnWN067G0d6pMIgvgGbJgVlVWcTjwRpgrEKAyDVHhN8zjgNQ3iiD2fB5yMYenhDKWZYq3Tg/u9iolGpBHuczAX++DKKzM/qV1V/MPmqeghzKeIjGfadpfFswYEh9JsbMHiNZyvzDCigWKq2sz0ugeJXuVsr+hhHTAlerboDbrHxVto6KO6Sidou9gBjh95kgOnuUC0UZtkUoHgc4gdFkdbHIeAPLBfDn6pLjWTUUZZjOG4JSwBOmtKyett3OF7hrtJ5xBkRRhmknFBvBT5g0RamX/SGCD7MxZvZALFqE60x9GetBmCCE52Z+PBX+M7sELSd+0SL8xGBCPaxbTFnp5MjzaFAQtmfyGBvAldV7lhmawwDGnL5Mn+Uih7lktumLJnW9IoIryxK0AKJFuM3waali3caE5vQlezIckA8d6ePhS6fTKfd6/Sb+kJLW/iLL8EWT9pqedg34j2UJWi6G4J2QwUdB50UU1bLkgzcaxXa/XBOsF5eeLy8J5DrPrqw6X3TR1N2eh3Cjb1o81HrzBS1Cljgqts1STdtBbHuDar+jM50iJKQCSvF2JaeLLll14HSPzv6tP2xbPNQKiH30I8M/ntjvolJNUrsDlDQD3vORGFMvVXcdLrrIrH3CZ8F7q4dar9dhH31g2gqFUqXSx6civW5d+A5NcyDTGNPqMRchuNm2bBJ29weXM6ubbK0nbrvZvofQr8uUdrba5CGEb7GHugNiH51rZwaIerNle/ZNO+X699uy8VCbS8o4mfHeuPAmkCxU0za3B9QCRy3/wbrL2wLivX5z7t1D5KpHp5ZPcqHfHrAK/rTzUDvA1NLqNks2E7REsTScQaTdMbMRuNq0CTG2HxSAt8JNlp0icAGMOOWo2iL798J7Ww+1BURhZpO5cxGsgNg/ndwBkWj3PG2+8XrTLsRQANFWuBWJCfGTTu6AKLvs3wbvbdI0CqARZiIyoWAMJZSdrKw2dPYVeL1lk6ZRASM1IZLYqTYaRfrHAVhFDGjnofYfeUSymSgC6Vic7WwUQrds9wgqIDHhVWwmaa4CTzQDUj52jJjw6dUAwj9UA9IAiQlZmjOx0GiNakDqhzfiQLoWw9/0Yif4QDcgFZCYMLqtgkfgOk83IP0DVJEJX0mcQRFmnWpAOiCumrbW4nLowkHw7ZZdJe8GaJqQqXkRqcDHPMlCuQEXUniryF/FnvAJRRjbLNQN0IgzcY+kKII6RBhHQNNJo8zY3AWv8k4RxgUQx5nNNfah/fwFbta27OtcFkDTSfPX8SUE92tOEdQN0HTS+C5D+LDm4qBugMiEKGN7ihqEIvgn7xxBXQHH2/1jLJ0UXucdt3gWQNNJ83EMNOBmAxURLg7qDmgSxumUpSEwenJfgO6A42UYw4zmaQ0vQBcHZfjlbuZuGLfNAm0QDAuQBRD3gQnhxzgRgkcjwLg5KAvgeDfciBGhwee+ABkBY0eI+FgCKCsgclKTMCbrkPAxBFBmQEyYwYSxiDRAuOfgYwM0NgtM+DtyQqA/ET6GAMoBOCGMulcKb542ePhYASeEDzDK2gJeb6yZfAEDTgjv2YdawfN9yK9tcfGxA04In6LaLgB44ObjAMSExm4RUeoNRyh84v0dVYDMfDyA5n64uYYWYgS/PhpebWysseYv3gAJIcpLo3BTAN7mvfDxAZKsLWO46afgf4mgg+BHtPutbaL8mpOPExARmqFmI39/MzcjAvALm4+EF04+XkAzmGI33cj/mpMR4fWT6Z484dMroLkQiRGfruew60P9gZjPWH68fB4ADUISTTfyj6OQ/RSADxtj9+Rdfl4ByUJcMd00/1YPERGY3rlJ3NMLnyfAl0bc+CSEhAjgx3uEh1bfOomeXvg8AprRFK9EjPgnDESE95jf8Gc+74BjI2I/JVbUAw43yDmn8Lyazw+gsRKxn6KliBDf3gSHCKDw+wnjEe/MLHk2ny9AYsSljIGIw83jFQiEEcCbXxsG3ua64Z3e+XwBYiMSPzUQ0b746wb6/SRyZLzH/BTeUsqH+fwCWhHz939G0LMdEd31g2k8E8+PdwYB+IxoOiph/PTRAyOAUP9N6Ijxtsd4Pvn8A44RyVocMz49/MaGZP58BuTY17/u84ZrBokXCKCBuGR6qsFIID98FKALJkBsYHT163Ejb9jOpAsKLyDAZ8QZRkz56epGRxSEdCLyAhRG1x/eYjYMZ9A9Gy8YvMAACaJhxjEjgSSU+Y37x4dfn35fXV0buvr959Pbh/sn8tWNMRyyXbDGIwoMcGFsRpPRgDQon0mnNf7CGoEjnmnSBYgXLCBGxIzEVxHkM+UU55SMr2C2sekCp1sIGnDBZCSGxJCEEmFujUmfRV7DaIblkOlCoFsIAXDBYBxDIkqDc5ugjkX+vI7QCBuGC4VuIRxALBMS+yvhNEgnIi8htGe2MOCwwgLEShBKA3OJkE6EX1jGaJgtLDisMAENJRIm6IyM10P/8eEDTpSYaH4/dJ6Akegv4GvXX8DXrr+Ar11/AV+7/gcOwCZVbB5XqQAAAABJRU5ErkJggg=='
                    }
                    alt={playlist.name}
                  />
                )}
                <p className='playlist-name'>{playlist.name}</p>
              </div>
            )
          })}
        </div>
        <button
          className='button'
          disabled={tracksA.length < 0 && tracksB.length < 0}
          onClick={handleCompare}
        >
          Comparar
        </button>
      </div>
      <div>
        <h2 className='compare-title'>Resultados:</h2>
        <div className='results-container'>
          <div className='container'>
            {comparisonA.map((track) => {
              return (
                <div className='card'>
                  <figure className='card-image-container'>
                    <img
                      src={track.track.album.images[0].url}
                      alt={track.track.name}
                    />
                  </figure>
                  <p className='card-name'>{track.track.name}</p>
                </div>
              )
            })}
          </div>
          <div className='container'>
            {comparisonB.map((track) => {
              return (
                <div className='card'>
                  <figure className='card-image-container'>
                    <img
                      src={track.track.album.images[0].url}
                      alt={track.track.name}
                    />
                  </figure>
                  <p className='card-name'>{track.track.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
