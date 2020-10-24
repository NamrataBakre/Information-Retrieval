#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Sep 22 23:35:12 2020

@author: namratabakre
"""
import tweepy
import json
from datetime import datetime, timedelta
import re
import demoji
#import datetime,time
from dateutil.parser import parse
#from datetime import datetime, timedelta
#import pandas as pd
import glob

retweets = []
tweets_list = []
poi = []



def hour_rounder(t):
    # Rounds to nearest hour by adding a timedelta hour if minute >= 30
    return (t.replace(second=0, microsecond=0, minute=0, hour=t.hour)
            + timedelta(hours=t.minute // 30))


date = hour_rounder(datetime.now())  # i/p
output_date = date.strftime("%Y-%m-%dT%H:%M:%SZ")

# rx = re.compile(pattern = "(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])", flags = re.UNICODE)    
# regrex_pattern = re.compile(pattern = "["
#     u"\U0001F600-\U0001F64F"  # emoticons
#     u"\U0001F300-\U0001F5FF"  # symbols & pictographs
#     u"\U0001F680-\U0001F6FF"  # transport & map symbols
#     u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
#                        "]+", flags = re.UNICODE)

rx = re.compile("["
                u"\U0001F600-\U0001F64F"  # emoticons
                u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                u"\U0001F680-\U0001F6FF"  # transport & map symbols
                u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                u"\U00002500-\U00002BEF"  # chinese char
                u"\U00002702-\U000027B0"
                u"\U00002702-\U000027B0"
                u"\U000024C2-\U0001F251"
                u"\U0001f926-\U0001f937"
                u"\U00010000-\U0010ffff"
                u"\u2640-\u2642"
                u"\u2600-\u2B55"
                u"\u200d"
                u"\u23cf"
                u"\u23e9"
                u"\u231a"
                u"\ufe0f"  # dingbats
                u"\u3030"
                "]+", re.UNICODE)
    
def remove_emoji(text):
    #     tmp = regrex_pattern.findall(text)
    #     tmp.extend()
    #     return regrex_pattern.sub(r'', text), tmp
    return rx.sub(r'', text), rx.findall(text)
  
emojfilter = re.compile(
    pattern="(\:\w+\:|\<[\/\\]?3|[\(\)\\\D|\*\$][\-\^]?[\:\;\=]|[\:\;\=B8][\-\^]?[3DOPp\@\$\*\\\)\(\/\|])(?=\s|[\!\.\?]|$)")
urlfilter = re.compile(pattern="(?P<url>https?://[^\s]+)")

def remove_entities(obj, text):
    cleaned = text
    _id = str(obj['id'])
    urls = obj['entities']['urls']
    hashtags = obj['entities']['hashtags']
    mentions = obj['entities']['user_mentions']
    hashtags_res = []
    mentions_res = []
    urls_res = []

    if urls:
        for url in urls:
            cleaned = cleaned.replace(url['url'], '')
            urls_res.append(url['url'])
    else:
        urltmp = urlfilter.findall(cleaned)
        if urltmp:
            urls_res.extend(urltmp)
            cleaned = urlfilter.sub(r'', cleaned)

    if hashtags:
        for h in hashtags:
            ix = h['indices']
            cleaned = cleaned.replace(text[ix[0]:ix[1]], '')
            hashtags_res.append(h['text'])

    if mentions:
        for m in mentions:
            ix = m['indices']
            cleaned = cleaned.replace(text[ix[0]:ix[1]], '')
            mentions_res.append(m['screen_name'])

    cleaned, emoticons = remove_emoji(cleaned)

    tmp, emojis = emojfilter.sub(r'', cleaned), emojfilter.findall(cleaned)
    '''if not tmp:
        logger(f'ID {_id} text {text} cleaned {cleaned}, tmp {tmp}, emojis {"".join(emojis)}')'''
    emoticons = emoticons + emojis
    cleaned = tmp

    # Use solr stop word removeer

    return cleaned, emoticons, urls_res, mentions_res, hashtags_res

ke = ['profile_background_color', 'profile_link_color', 'profile_sidebar_border_color', 'profile_sidebar_fill_color',
      'profile_text_color']


def clean_color(j):
    for k in ke:
        j['user'][k] = '#' + str(j['user'][k])
        if(j.get('retweeted_status') != None):
            temp = j.get('retweeted_status')
            j['retweeted_status']['user'][k] = '#' + str(j['retweeted_status']['user'][k])
            if(temp.get('quoted_status')!= None):
                j['retweeted_status']['quoted_status']['user'][k] = '#' + str(j['retweeted_status']['quoted_status']['user'][k])
            
            #print(j['retweeted_status']['user'][k])
            #break
        if(j.get('quoted_status') != None):
            j['quoted_status']['user'][k] = '#' + str(j['quoted_status']['user'][k])
        
        '''if(j.get('retweeted_status') != None):
            temp = j.get('retweeted_status')
            if(temp.get('quoted_status') != None):
                temp1 = temp.get('quoted_status')
                if(temp1.get(k) != None):
                    j['user']['retweeted_status']['quoted_status'][k] = '#' + str(j['user']['retweeted_status']['quoted_status'][k])'''
    return j

def json_creator1(ip_files,outputfilename,country):
    #text_xx, tweet_emoticons, tweet_urls, tweet_mentions, tweet_hashtags = remove_entities(j, j['tweet_text'])
    with open(outputfilename, "w") as write_file:
        for ip_json in ip_files:
            
            #ip_json = json.loads(ip_json)
            
            #print(ip_json)
            #break
            xx = 'en' if ip_json['lang'] not in ['en', 'hi', 'it'] else ip_json['lang']
            text_xx, tweet_emoticons, tweet_urls, tweet_mentions, tweet_hashtags = remove_entities(ip_json, ip_json['text'])
            
            ip_json['poi_name'] = None
            ip_json['poi_id'] = None
            ip_json['country'] = country
            ip_json['tweet_text'] = ip_json['text']
            ip_json['tweet_lang'] = ip_json['lang']
            ip_json[f'text_{xx}'] = text_xx,
            ip_json['hashtags'] = tweet_hashtags,
            ip_json['mentions'] = tweet_mentions
            ip_json['tweet_urls'] = tweet_urls
            ip_json['tweet_emoticons'] = tweet_emoticons
            ip_json['tweet_date'] = datetime.strftime(datetime.strptime(ip_json['created_at'],'%a %b %d %H:%M:%S +0000 %Y'), '%Y-%m-%d %H:%M:%S')
            ip_json = clean_color(ip_json)
            #print(ip_json)
            
            '''data = {
                	"poi_name":None,
                	"poi_id":None,
                	"country": country,
                	"tweet_text":ip_json['text'],
                	"tweet_lang":ip_json['lang'],
                    f'text_{xx}':text_xx,
                	#"text_xx":text_xx,
                	"hashtags":tweet_hashtags,
                	"mentions":tweet_mentions,
                	"tweet_urls":tweet_urls,
                	"tweet_emoticons":tweet_emoticons,
                "tweet_date": datetime.strftime(datetime.strptime(ip_json['created_at'],'%a %b %d %H:%M:%S +0000 %Y'), '%Y-%m-%d %H:%M:%S')
                }'''
            json.dump(ip_json, write_file)
            #print(ip_json)
    write_file.close()
    

def read_data(filenames):
    json_data=[]
    for i in filenames:
        print(i)
        file = open(i,'rb')
        print('success')
        for line in file:
            json_line=json.loads(line)
            #print('Type of json line',type(json_line))
            #break
            json_data.append(json_line)
           
         
        print('success1')
    return json_data
        
        
    


def getRetweets():
    
    #json_creator1('C:\Users\ashis\Desktop\mytest.json','USAReady.json','USA')
    #f=open ('/Users/namratabakre/Documents/Fall_Semester2020/IR/IR_Project1/FinalTest/In.json', 'r')
    filenames_India = glob.glob("/Users/namratabakre/Documents/Fall_Semester2020/IR/IR_Project1/IndiaData/IndiaData*.json")
    print(len(filenames_India))
    India_Data = read_data(filenames_India)
    print(len(India_Data))
    #json_object = json.dumps(India_Data)
    #print(type(json_object))
    
    
    
    #Consolidate data into one file
    #with open("/Users/namratabakre/Documents/Fall_Semester2020/IR/IR_Project1/IndiaData/IndiaFinal.json", "w",encoding="utf-8") as outfile: 
        #outfile.write(json_object) 
    
    #f=open('IndiaFinal.json', "r")
    input_ = []
    #tweets = f.readlines()
    for i in India_Data:
        if i not in input_: # for removing duplicate tweets
            input_.append(i)
    print(len(input_))
    print(type(input_[0]))
    
    json_creator1(input_,'IndiaReady.json','India')
    #print (len(response))
    
    '''#print(i)
    #break
    a_1 = remove_hashtags(i)
    print(a_1)
    break
    a_2 = remove_emoji(a_1)
    a_3 = remove_url(a_2)
    #print(a_3)
    #break
    #a_4 = get_emoji_list(a_3)
    #print(type(a_4))
    a_4 = remove_user_mentions1(a_3)
    print(a_4)
    break
    tweets_json = json.loads(i)
    #cleaned, emoticons, urls_res, mentions_res, hashtags_res = remove_entities(tweets_json,tweets_json['text'])
    print(cleaned)
    break
    
    #print(tweets_json.keys())
    txt = tweets_json['text']
    if(txt.startswith('RT')):
        retweets.append(tweets_json)
    else:
        tweets_list.append(tweets_json)
        

demoji.download_codes()
getRetweets()
print(len(retweets))
print(len(tweets_list))'''
getRetweets()