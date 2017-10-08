/**
 * Created by Gaplo917 on 20/8/2017.
 */
import Rx from 'rxjs/Rx'
import {HKEPCHtml} from "./hkepc-html";
import cheerio from 'cheerio-without-node-native'
import Mapper from "./mapper";
import URLSearchParams from 'url-search-params'

const BASE_FORUM_URL = `https://www.hkepc.com/forum`

function api(endpoint, query){
  return `${BASE_FORUM_URL}${endpoint}?${query}`
}

export default class APIService {
  topicList(){
    return Rx.Observable
      .from(
        fetch(api('/index.php'))
          .then(resp => resp.text())
      )
      .map((data) => {
        const html = new HKEPCHtml(cheerio.load(data))
          .removeIframe()
          .processImgUrl(BASE_FORUM_URL)
          .processImageToLazy()
          .processEpcUrl("")
          .processExternalUrl()

        return Mapper.topicListHtmlToTopicList(html)
      })
  }

  postList(opt){
    const {topicId, pageNum, filter, order} = opt

    const query = new URLSearchParams()
    query.append('fid', topicId)
    query.append('page', pageNum)
    query.append('filter', filter >= 0 ? `type&typeid=${filter}` : '')
    query.append('orderby', order || '')

    return Rx.Observable
      .from(
        fetch(api('/forumdisplay.php', query)).then(resp => resp.text())
      )
      .map((data) => {
        const html = new HKEPCHtml(cheerio.load(data))
          .removeIframe()
          .processImgUrl(BASE_FORUM_URL)
          .processImageToLazy()
          .processEpcUrl("")
          .processExternalUrl()

        return Mapper.postListHtmlToPostListPage(html, pageNum)
      })
  }
}

APIService.instance = new APIService()