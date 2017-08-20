/**
 * Created by Gaplo917 on 20/8/2017.
 */
import Rx from 'rxjs/Rx'
import {HKEPCHtml} from "./hkepc-html";
import cheerio from 'cheerio-without-node-native'
import Mapper from "./mapper";

export default class APIService {
  topicList(){
    return Rx.Observable
      .from(
        fetch('https://www.hkepc.com/forum/index.php')
          .then(resp => resp.text())
      )
      .map((data) => {
        const html = new HKEPCHtml(cheerio.load(data))
          .removeIframe()
          .processImgUrl('https://www.hkepc.com/forum')
          .processImageToLazy()
          .processEpcUrl("")
          .processExternalUrl()

        return Mapper.topicListHtmlToTopicList(html)
      })
  }
}

APIService.instance = new APIService()