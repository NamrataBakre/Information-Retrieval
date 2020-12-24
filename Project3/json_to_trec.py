# -*- coding: utf-8 -*-


import json
# if you are using python 3, you should 
#import urllib.request 
import urllib.request as urllib2


# change the url according to your own corename and query
inurl = 'http://3.133.123.238:8983/solr/IRF20P3_BM25/select?fl=id%2C%20score&q=text_ru%3A%D0%91%D0%B8%D0%BB%D1%8C%D0%B4.%20%D0%92%D0%BD%D1%83%D1%82%D1%80%D0%B5%D0%BD%D0%BD%D0%B8%D0%B9%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%20%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8%D1%82%2C%20%D1%87%D1%82%D0%BE%20%D0%93%D0%B5%D1%80%D0%BC%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%82%201%2C5%20%D0%BC%D0%BB%D0%BD%20%D0%B1%D0%B5%D0%B6%D0%B5%D0%BD%D1%86%D0%B5%D0%B2%20%D0%B2%20%D1%8D%D1%82%D0%BE%D0%BC%20%D0%B3%D0%BE%D0%B4%D1%83&rows=20&wt=json'
outfn = '5.txt'


# change query id and IRModel name accordingly
qid = '005'
IRModel='bm25' #either bm25 or vsm
outf = open(outfn, 'a+')
data = urllib2.urlopen(inurl)
# if you're using python 3, you should use
# data = urllib.request.urlopen(inurl)

docs = json.load(data)['response']['docs']
# the ranking should start from 1 and increase
rank = 1
for doc in docs:
    outf.write(qid + ' ' + 'Q0' + ' ' + str(doc['id']) + ' ' + str(rank) + ' ' + str(doc['score']) + ' ' + IRModel + '\n')
    rank += 1
outf.close()
