import Vue from 'vue'
import DataService from './data.service'

export default {
    getNowPlayingMovies (callback) {
        DataService.getData(Vue.config.SEARCH_MOVIE, Vue.config.SELECT_NOW_PLAYING, (movies) => { callback(movies) })
    },
    getUpcomingMovies (callback) {
        DataService.getData(Vue.config.SEARCH_MOVIE, Vue.config.SELECT_UPCOMING, (movies) => { callback(movies) })
    }
}
