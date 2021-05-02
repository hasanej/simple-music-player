import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from 'resources/colors';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorPrimary
  },
  containerSearch: {
    marginTop: '10rem',
    marginHorizontal: '10rem',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputSearch: {
    flex: 1,
    height: '40rem',
    backgroundColor: colors.colorPrimaryLight,
    borderTopLeftRadius: '5rem',
    borderBottomLeftRadius: '5rem',
    padding: '10rem'
  },
  buttonSearch: {
    backgroundColor: colors.colorRed,
    padding: '10rem',
    width: '40rem',
    height: '40rem',
    borderTopRightRadius: '5rem',
    borderBottomRightRadius: '5rem'
  },
  iconSearch: {
    width: '100%',
    height: '100%',
    tintColor: 'white'
  },
  captionMusicList: {
    fontSize: '16rem',
    color: colors.colorRed,
    fontWeight: 'bold',
    marginHorizontal: '10rem',
    marginVertical: '10rem'
  },
  itemMusic: {
    marginHorizontal: '10rem',
    flexDirection: 'row',
    marginBottom: '10rem'
  },
  imageMusic: {
    width: '60rem',
    height: '60rem',
    marginRight: '10rem',
    borderRadius: '5rem'
  },
  containerMusicInfo: {
    justifyContent: 'center',
    textAlign: 'justify',
    flex: 1
  },
  musicName: {
    fontWeight: 'bold',
    color: 'white'
  },
  musicArtist: {
    fontWeight: 'bold',
    color: colors.colorMusicInfo,
    fontSize: '12rem'
  },
  musicAlbum: {
    color: colors.colorMusicInfo,
    fontSize: '12rem'
  },
  lineSeparator: {
    marginTop: '5rem',
    height: '0.5rem',
    width: '100%',
    backgroundColor: colors.colorMusicInfo
  },
  containerMusicPlayer: {
    padding: '10rem',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.colorPrimaryDark
  },
  containerMusicControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPlay: {
    width: '30rem',
    height: '30rem',
    marginHorizontal: '50rem'
  },
  buttonNextPrevious: {
    width: '15rem',
    height: '15rem'
  },
  musicPlayed: {
    marginBottom: '70rem'
  },
  captionMusicInfo: {
    marginTop: '10rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});