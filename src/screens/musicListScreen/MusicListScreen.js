import React from 'react';
import { 
  Text, 
  View,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';

// Third party library
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';

// Services
import { getMusicList } from './MusicListServices';

// Constants
import * as Constants from 'constants/constants';

// Screen styling
import styles from './styles';

// Resources
import { colors } from 'resources/colors';
import strings from 'resources/strings';
import { images } from 'resources/images';

class MusicListScreen extends React.Component {
  musicPlayer;

  constructor(props) {
    super(props);

    this.state = {
      musicList: [],
      searchParam: "",

      musicIndex: 0,
      artistName: "",
      musicName: "",
      isMusicPlayed: false,
      isMusicPaused: true,
      musicUrl: "",
      trackId: 0,
    };
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    this.getMusicList();
  }

  getMusicList() {
    // Set default search param, for initial data
    let searchParam = this.state.searchParam === ""
      ? Constants.DEFAULT_SEARCH_PARAM
      : this.state.searchParam;

    getMusicList(
      searchParam, // Search keyword
      Constants.DEFAULT_SEARCH_TYPE, // Search for Music type
      (response) => { this.setState({ musicList: response }) }, // Handle success response
      (error) => { alert(error) } // Handle failed response
    );
  }

  inputSearch(keyword) {
    this.setState({ searchParam: keyword });
  }

  playMusic(musicUrl, trackId, musicName, artistName) {
    this.setState({
      isMusicPlayed: true,
      isMusicPaused: false,
      musicUrl,
      trackId,
      musicName,
      artistName
    });
  }

  onPlayOrPause() {
    const { isMusicPaused } = this.state;
    this.setState({ isMusicPaused: !isMusicPaused });
  }

  onPrevious() {
    const { trackId } = this.state;
    const selectedIndex = this.state.musicList.findIndex(music => music.trackId === trackId);

    // Play previous track, if exist
    if (selectedIndex > 0) {
      this.setState({
        isMusicPlayed: true,
        isMusicPaused: false,
        trackId: this.state.musicList[selectedIndex - 1].trackId,
        musicUrl: this.state.musicList[selectedIndex - 1].previewUrl,
        musicName: this.state.musicList[selectedIndex - 1].trackName,
        artistName: this.state.musicList[selectedIndex - 1].artistName
      });
    }
  }

  onNext() {
    const { trackId } = this.state;
    const selectedIndex = this.state.musicList.findIndex(music => music.trackId === trackId);

    // Play next track, if exist
    if (selectedIndex < (this.state.musicList.length - 1)) {
      this.setState({
        isMusicPlayed: true,
        isMusicPaused: false,
        trackId: this.state.musicList[selectedIndex + 1].trackId,
        musicUrl: this.state.musicList[selectedIndex + 1].previewUrl,
        musicName: this.state.musicList[selectedIndex + 1].trackName,
        artistName: this.state.musicList[selectedIndex + 1].artistName
      });
    }
  }

	render() {
		return (
			<View style={styles.container}>
        <StatusBar 
          hidden={false} 
          backgroundColor={colors.colorPrimaryDark} 
          barStyle='light-content' 
        /> 

        {/* Search artist */}
        <View style={styles.containerSearch}>
          {/* Input search */}
          <TextInput
            style={styles.inputSearch}
            placeholder={strings.search_artist}
            selectionColor={colors.colorRed}
            value={this.state.searchParam}
            onChangeText={(keyword) => this.inputSearch(keyword)}
          />

          {/* Button search */}
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => this.getMusicList()}
          >
            <Image
              style={styles.iconSearch}
              source={images.ic_search}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>

        {/* Caption music list */}
				<Text style={styles.captionMusicList}>{strings.music_list}</Text>

        {/* Music list */}
        <FlatList
          style={this.state.isMusicPlayed ? styles.musicPlayed : null}
          showsVerticalScrollIndicator={false}
          data={this.state.musicList}
          renderItem={({item}) => this.renderItemMusic(item)}
          keyExtractor={(item, index) => index.toString()}
        />

        <Video
          paused={this.state.isMusicPaused}
          source={{ uri: this.state.musicUrl }}
          ref={ (ref) => this.musicPlayer = ref }
        />

        {/* Music player control */
          this.state.isMusicPlayed
          ?
            <View style={styles.containerMusicPlayer}>
              <View style={styles.containerMusicControl}>
                {/* Button previous */}
                <TouchableOpacity
                  style={styles.buttonNextPrevious}
                  onPress={() => this.onPrevious()}
                >
                  <Image
                    source={images.ic_previous}
                    style={styles.iconSearch}
                    resizeMode='contain'
                  />
                </TouchableOpacity>

                {/* Button play */}
                <TouchableOpacity
                  style={styles.buttonPlay}
                  onPress={() => this.onPlayOrPause()}
                >
                  <Image
                    source={this.state.isMusicPaused ? images.ic_play : images.ic_pause}
                    style={styles.iconSearch}
                    resizeMode='contain'
                  />
                </TouchableOpacity>

                {/* Button next */}
                <TouchableOpacity
                  style={styles.buttonNextPrevious}
                  onPress={() => this.onNext()}
                >
                  <Image
                    source={images.ic_next}
                    style={styles.iconSearch}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>

              {/* Artist name and music name */}
              <Text
                style={styles.captionMusicInfo}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {this.state.artistName} - {this.state.musicName}
              </Text>
            </View>
          :
            null
        }
      </View>
		);
  }
  
  renderItemMusic(item) {
    return (
      <TouchableOpacity
        style={styles.itemMusic}
        onPress={() => this.playMusic(item.previewUrl, item.trackId, item.trackName, item.artistName)}
      >
        {/* Image music */}
        <Image
          style={styles.imageMusic}
          resizeMode='contain'
          source={{ uri: item.artworkUrl100 }}
        />

        {/* Music information */}
        <View style={styles.containerMusicInfo}>
          {/* Music name */}
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.musicName}
          >
            {item.trackName}
          </Text>

          {/* Artist name */}
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.musicArtist}
          >
            {item.artistName}
          </Text>

          {/* Album name */}
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.musicAlbum}
          >
            {item.collectionName}
          </Text>

          {/* Line separator */}
          <View style={styles.lineSeparator}/>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MusicListScreen;