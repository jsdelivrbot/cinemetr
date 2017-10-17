import Vue from 'vue'
import DataService from './data.service'

export default {
    contructCards (series) {
        return series.map((show) => {
            return {
                id: show.id,
                poster: Vue.config.IMAGE_PATH + show.poster_path,
                title: show.name,
                hasTooltip: true,
                tooltipText: show.overview,
                labels: show.genre_ids.map((id) => {
                    let genre = Vue.options.methods.getGenreFromId(id)
                    genre.type = 'genre'
                    return genre
                }),
                hasRatings: true,
                rating: {
                    value: show.vote_average,
                    count: show.vote_count
                },
                type: 'show'
            }
        })
    },
    getPopularSeries (callback) {
        DataService.getData(Vue.config.SEARCH_SERIES, Vue.config.SELECT_POPULAR, (series) => {
            callback(this.contructCards(series))
        })
    },
    getDetails (id, callback) {
        DataService.getDetails(
            id,
            Vue.config.OMDB_SHOW_DETAILS,
            Vue.config.TMDB_SHOW_DETAILS,
            'alternative_titles%2Cchanges%2Ccontent_ratings%2Ccredits%2Cexternal_ids%2Cimages%2Ckeywords%2Csimilar%2Ctranslations%2Cvideos',
            (data) => { callback(data) }
        )
    },
    search (searchText, callback) {
        DataService.search(Vue.config.SEARCH_SERIES, searchText, (shows) => {
            callback(shows)
        })
    }
}
