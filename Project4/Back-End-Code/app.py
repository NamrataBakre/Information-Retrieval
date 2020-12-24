from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from flask import jsonify
import pysolr
import ast
from collections import Counter
from textblob import TextBlob
import re

from newspaper import Article
import requests
import feedparser

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
# solr_url = 'http://3.85.190.84:8984/solr/project2/'
solr_url = 'http://localhost:8984/solr/project2/'
daterange = ' after:2020-07-01 before:2020-08-30'
s = pysolr.Solr(solr_url, timeout=10)

ALL_NEWS_FEED_URL = "https://news.google.com/news/rss/?ned=us&gl=US&hl=en"


def call_url(url):
    response = None
    user_agent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 " \
                 "(KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
    try:
        response = requests.get(
            url, headers={"User-Agent": user_agent})
    except requests.HTTPError as e:
        print("\nError accessing {}".format(url), "\n")
    except Exception as e:
        print("\nError accessing '{}'\n".format(url), e, "\n")

    if response and response.status_code == 200:
        return response.text


def parse_article_from_url(url):
    article = Article("")
    source_html = call_url(url)

    if source_html:
        article.set_html(source_html)
        article.parse()
        if article.text:
            if len(article.text) > 200:
                article.text = article.text[:197].replace('\n', ' ') + '...'
            article_dict = dict(title=article.title, content=article.text, link=url)
            return article_dict


def parse_news(keyword=None):
    if keyword is not None and keyword.strip() != "":
        keyword = keyword.strip()
        print("\n Please wait... Fetching news article links"
              " about '{}' on Google News...\n".format(keyword))
    else:
        print("\n Please wait... Fetching recent news articles links...\n")
    keyword = keyword + daterange
    keyword_url = "https://news.google.com/news/rss/search/section/" \
                  "q/{0}/{0}?hl=en&gl=US&ned=us".format(keyword)
    url = keyword_url if keyword else ALL_NEWS_FEED_URL

    xml_news_feed = call_url(url)
    parsed_feed = feedparser.parse(xml_news_feed)
    news_links = [news_item["link"] for news_item in parsed_feed["entries"]][:5]

    print("\nArticle Links acquired:\n\n", news_links,
          "\n\nTotal no. of links:", len(news_links), "\n")

    print("\n...Fetching and parsing articles from acquired links.\n")
    formatted_response = [parse_article_from_url(link)
                          for link in news_links
                          if not link.endswith((".mp4", ".mp3"))]

    articles = [article for article in formatted_response if article is not None]

    print("\nDone!\n\n")

    return articles


stpw = {'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd",
        'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers',
        'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
        'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been',
        'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if',
        'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
        'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off',
        'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
        'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
        'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've",
        'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't",
        'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn',
        "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't",
        'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"}


def clean_tweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) | (\w+:\ / \ / \S+)", " ", tweet).split())


def get_tweet_sentiment(tweet):
    # create TextBlob object of passed tweet text
    analysis = TextBlob(clean_tweet(tweet))
    # set sentiment
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity == 0:
        return 'neutral'
    else:
        return 'negative'


def top_words(all_tweets):
    all_tweets = [w.lower() for w in " ".join(all_tweets).split() if
                  w not in stpw and len(w) > 2 and w not in {'.', '/', '\\', ':', ',', '(', ')', '+'}]

    return Counter(all_tweets).most_common(5)


def add_data(r):
    ret = r.raw_response
    all_tweets = []
    for ix, i in enumerate(r.raw_response['response']['docs']):
        tweet = i['tweet_text'][0]
        all_tweets.append(tweet)
        ret['response']['docs'][ix]['sentiment'] = get_tweet_sentiment(tweet)
    ret['response']['top_words'] = top_words(all_tweets)
    return ret


def clean_json(data):
    facet = data['facet_counts']['facet_fields']
    numfound = data['response']['numFound']
    top_words = data['response']['top_words']

    cont = []
    for each in data['response']['docs']:
        ts = each['created_at'][0].split()
        date = " ".join([ts[1], ts[2], ts[-1]])
        lang = each['lang'][0]
        tweet_text = each['tweet_text'][0]
        user_name = each['user.name'][0]
        user_handle = "@" + each['user.screen_name'][0]
        sentiment = each['sentiment']
        inf_score = each.get('inf_score', [-1])[0]
        cont.append(
            {'date': date, 'lang': lang, 'tweet_text': tweet_text, 'user_name': user_name, 'user_handle': user_handle,
             'sentiment': sentiment, 'inf_score': inf_score})

    return {'facet': facet, 'numfound': numfound, 'top_words': top_words, 'tweets': cont}


def get_filters(data):
    if isinstance(data, str):
        data = ast.literal_eval(data)
    poi = data.get('poi')
    c = data.get('country')
    l = data.get('lang')
    poi_s, c_s, l_s = '', '', ''
    ret = []
    if poi and poi != ['null']:
        for ix, v in enumerate(poi):
            if ix == 0:
                poi_s = 'poi_name:' + v
                continue
            poi_s += ' OR ' + 'poi_name:' + v

    if c and c != ['null']:
        for ix, v in enumerate(c):
            if ix == 0:
                c_s = 'country:' + v
                continue
            c_s += ' OR ' + 'country:' + v

    if l and l != ['null']:
        for ix, v in enumerate(l):
            if ix == 0:
                l_s = 'lang:' + v
                continue
            l_s += ' OR ' + 'lang:' + v

    if poi_s:
        ret.append(poi_s)
    if c_s:
        ret.append(c_s)
    if l_s:
        ret.append(l_s)
    return ret


@app.route('/get_results')
@cross_origin()
def get_results():
    q = request.values['q']
    fcountry = request.values.getlist('filter_country')
    fpoi = request.values.getlist('filter_poi')
    flang = request.values.getlist('filter_lang')
    flist = get_filters({'poi': fpoi, 'country': fcountry, 'lang': flang})
    sort_inf = request.values.get('sort_inf')

    sqparams = {'defType': 'edismax', 'qf': 'text_en text_it text_hi',
                'fl': 'lang, user.name, user.screen_name, created_at, tweet_text, inf_score', 'rows': '10',
                'stopwords': 'true',
                'mm': str(max(1, len(q.split()) - 2)), 'facet': 'true', 'facet.field': ['poi_name', 'country', 'lang']}
    if sort_inf == 'yes':
        sqparams['sort'] = 'inf_score desc'
    if flist:
        sqparams['fq'] = flist
    print(sqparams)
    r = s.search(q, **sqparams)
    augmented_data = add_data(r)
    news_articles = parse_news(q)
    response = {'all_tweets': clean_json(augmented_data), 'news': news_articles}
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
    # app.run()
