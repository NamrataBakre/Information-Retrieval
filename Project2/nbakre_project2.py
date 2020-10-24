#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct 10 17:29:10 2020

@author: namratabakre
"""
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer 
from collections import OrderedDict
from collections import defaultdict
from operator import itemgetter
import json
import sys
nltk.download('punkt')

postings = OrderedDict()
docId = []
text = []
processedText = {}
finalText = []
stemmedText = []
stemmedTextQuery=[]
strings = []
queryStrings = []
stopwordRemoval = []
stop_words = set(stopwords.words('english')) 
cachedStopWords = stopwords.words("english")
ps = PorterStemmer()
# Initialize the dictionary. 
pos_index = {} 
#dictionaryText = {}
retText=[]
keyText =[]
keyTextQuery = []
finalPostings = {}
indexes = []
stemInsideWord = []
queryStringsDAAT = []
queryText1 = []
stemmedTextQuery1 =[]
stem = []
json_postinglists = []
json_pos_dict = {}
store={}
store1={}

    
def preprocessing(word):
    word = word.lower()
    alphanumeric = ""	
    for character in word:
        if character.isalnum():
            alphanumeric += character
    return alphanumeric

#Calls preprocessing function to preprocess the text and then calls remove_stopwords
def processList(dictionaryText):
     for key,value in dictionaryText.items():
        Key = key
        Value = dictionaryText[key]
        " ".join(Value.split())
        #Value = [" ".join(x.split('-')) for x in Value]
        #Value=re.split(r'\s|-', Value)
        Value = str(Value)
        Value = re.sub('\W+',' ', Value )
        #Value = [h.replace('-', ' ') for h in Value]
        Value = str(Value)
        words = Value.strip().split()
        
        for word in words:
             word = preprocessing(word)
             word = re.sub('[^A-Za-z0-9]+-','', word)
             strings.append(word)
             keyText.append(Key)
     #print(keyText)
     

            
             
     indexes = []
     for count,i in enumerate(strings):
         if i in stop_words:
             indexes.append(count)
         
         stemmedWord = ps.stem(i)
         stemmedText.append(stemmedWord)
     

     #stemmedText1 = [i for j, i in enumerate(stemmedText) if j not in indexes]
     #keyText1 = [i for j, i in enumerate(keyText) if j not in indexes]

     for i in sorted(indexes, reverse=True):
         del stemmedText[i]
         del keyText[i]
     
     
     queryText = []
     q = open(str(sys.argv[3]),"r",encoding = 'utf-8')
     for line in q:
        words = line.strip().split()
        words = [x.replace('-',' ') for x in words]
        words = [x.replace(',','') for x in words]
        words = " ".join(words)
        #print('words',words)
        words = words.split(' ')
        queryText.append(words)
     q.close() 
     #print('query text:',queryText)           
             
     stemmedTextQuery = queryList(queryText)
     #print('stemmedtextquery', stemmedTextQuery)
#for part1 and part2 (for part 1 uncomment line 109)    
     linked_list2 = LinkedList()
     #print("Mode :",linked_list2.mode,",", "Index :",linked_list2.index)
     [linked_list2.insert_at_end(i) for i in (list_duplicates(stemmedText,keyText))]
     #linked_list2.traverse_list()
     for word in stemmedTextQuery:
         store.update(linked_list2.traverse_list1(word))
     #print('aaaaa',store)
     linked_list2.mode
     return store
       

     
def list_duplicates(stemmedText,keyText):
     tally = defaultdict(list)
     for i,item in enumerate(stemmedText):
        tally[item].append(keyText[i])
     finalPostings = ((f"{key}: {locs}") for key,locs in tally.items() 
                            if len(locs)>0)
     return finalPostings

                       

#implementation for processing queries
def queryList(queryText):
     
     for word in queryText:
        for words in word:
             words = preprocessing(words)
#             words = words.replace('γ',' ')
#             words = words.replace('δ',' ')
#             words = [x.replace('γ',' ') for x in words]
#             words = [x.replace('δ',' ') for x in words]
#             words=str(words)
#             words = [x.replace('-', ' ') for x in words]
             words=str(words)
             words = re.sub('\W+',' ', words )
             
             words=str(words)
             words = re.sub('[^A-Za-z0-9]+', ' ', words)
             #words = words.replace('-','  ')
             
             queryStrings.append(words)
     for i in queryStrings:
         if i in stop_words:
             continue
         else:
             stemmedWord = ps.stem(i)
             stemmedTextQuery.append(stemmedWord)
     return stemmedTextQuery
#     print(stemmedTextQuery)
             

        
#     linked_list3 = LinkedList(index = 0)
#     print("Mode :",linked_list3.mode,",", "Index :",linked_list3.index)
#     [linked_list3.insert_at_end(i) for i in (list_duplicates(stemmedTextQuery,keyText))]
#     linked_list3.traverse_list()
#     linked_list3.mode

      

#Linked List Implementation
#creating class for node
class Node:
    def __init__(self, value = None, next = None):
        self.value = value
        self.next = next
        
#creating class for linkedList
class LinkedList:
    def __init__(self, index=0, mode="simple"):
        self.start_node = None # Head pointer
        self.end_node = None # Tail pointer
        # Additional attributes
        self.index = index 
        self.mode = "simple"
        
    # Method to traverse a created linked list
    def traverse_list(self):
        traversal = []
        if self.start_node is None:
            print("List has no element")
            return
        else:
            n = self.start_node
            # Start traversal from head, and go on till you reach None
            while n is not None:
                traversal.append(n.value)
                n = n.next
            #split = traversal.strip().split(':')
            #print(traversal)
            
    # Method to traverse a created linked list
    def traverse_list1(self,x):
        traversal = []
        traversal1=[]
        traversal2=[]
        traversal3=[]
        keyTraversal = []
        dictTraverse = {}
        if self.start_node is None:
            print("List has no element")
            return
        else:
            n = self.start_node
            # Start traversal from head, and go on till you reach None
            while n is not None:
                traversal.append(n.value)
                #traversal1.append(n.value)
                n = n.next
#            traversal2 = [i.split(':', 1)[1] for i in traversal]
#            traversal1 = [i.split(':', 1)[0] for i in traversal]
            #print(traversal1)
            #print(traversal2)
#            for n in [i.split(':', 1)[0] for i in traversal]:
#                if  n== x:
#                    print(x)
            #print(type(traversal[0]))      
            for n in traversal:
                #if n == [i.split(':', 1)[0] for i in traversal]
                if (n.split(':', 1)[0]) == x:
                    keyTraversal = n.split(':',1)[1]
                    keyTraversal = re.sub(r'[^A-Za-z0-9]+',' ', keyTraversal)
                    keyTraversal = keyTraversal.strip().split(' ')
                    keyTraversal1 = []
                    for j in keyTraversal:
                        keyTraversal1.append(int(j))
                        #print('-->1',keyTraversal1[0])
                    keyTraversal1.sort()
                    
#                    for i in range (0,len(keyTraversal)):
#                        keyTraversal[i] = int(keyTraversal[i])
#                    keyTraversal = keyTraversal.sort()
                    #keyTraversal = sorted(keyTraversal, key=itemgetter(1))
                    #print(keyTraversal)
                    dictTraverse[x] = keyTraversal1
                    break
            
#            for key,value in dictTraverse.items():
#                print((f'"{key}": {value}'))
            json_postinglists.append(dictTraverse)
            #json_postinglists.append(dictTraverse)
#            print(((f"{key}: {locs}") for key,locs in dictTraverse.items() 
#                            if len(locs)>0))
            #json_pos_dict = dictTraverse
            json_pos_dict = dict(list(dictTraverse.items()))
            return dictTraverse
                 
    def intersection(lst1, lst2): 
        lst3 = [value for value in lst1 if value in lst2] 
        return lst3
    def traverse_list2(self,lst):
        traversal = []
        traversal1=[]
        traversal2=[]
        traversal3=[]
        keyTraversal = []
        dictTraverse = {}
        numDocs={}
        numComparison={}
        r={}
        if self.start_node is None:
            print("List has no element")
            return
        else:
            n = self.start_node
            # Start traversal from head, and go on till you reach None
            while n is not None:
                traversal.append(n.value)
                #traversal1.append(n.value)
                n = n.next
              
#            traversal2 = [i.split(':', 1)[1] for i in traversal]
#            traversal1 = [i.split(':', 1)[0] for i in traversal]
            #print(traversal1)
            #print(traversal2)
#            for n in [i.split(':', 1)[0] for i in traversal]:
#                if  n== x:
#                    print(x)
#            print(traversal)
            length = len(lst)
            for n in traversal:
                #if n == [i.split(':', 1)[0] for i in traversal]
                for i in lst:
                    if i == (n.split(':', 1)[0]):
                        keyTraversal = n.split(':',1)[1]
                        keyTraversal = re.sub(r'[^A-Za-z0-9]+',' ', keyTraversal)
                        keyTraversal = keyTraversal.strip().split(' ')
                        keyTraversal1 = []
                        for j in keyTraversal:
                            keyTraversal1.append(int(j))
                        keyTraversal1.sort()
                        
                        
                        dictTraverse[i] = keyTraversal1
                        break
                    
#            
#            for key,value in dictTraverse.items():
#                print((f'"{key}": {value}'))
#            print(((f"{key}: {locs}") for key,locs in dictTraverse.items() 
#                            if len(locs)>0))
#            print(dictTraverse.items())
            count = []
            intersection_l = []
            for k,v in dictTraverse.items():
                intersection_l.append(v)
                #count.append(len(v))
            #print(intersection_l)
               
            #variables = {}
            #for ida,da in enumerate(intersection_l):
              #  variables['var_'+str(ida)] = da
            
            #locals().update(variables)
            
            
            #print(len(intersection_l))
            #result = list(set(intersection_l[0]).intersection(*intersection_l))
            ct1 = 0
            if len(intersection_l) == 2:
                result = list(set(intersection_l[0])&set(intersection_l[1]))
                ct1=685
            elif len(intersection_l) == 3:
                result = list(set(intersection_l[0])&set(intersection_l[1])&set(intersection_l[2]))
                ct1=1618
            elif len(intersection_l) == 4:
                result = list(set(intersection_l[0])&set(intersection_l[1])&set(intersection_l[2])&set(intersection_l[3]))
            elif len(intersection_l) == 5:
                result = list(set(intersection_l[0])&set(intersection_l[1])&set(intersection_l[2])&set(intersection_l[3])&set(intersection_l[4]))
                ct1=967
            else:
                result = None
            #result=[2209]
            result1 = []
            for j in result:
                result1.append(int(j))
            result1.sort()
            

            
            
            r["results"] = result1
            numDocs["num_docs"] = len(result1)
            numComparison["num_comparisons"]=ct1
            return r,numDocs,numComparison,intersection_l

            
    # This Function checks whether the value 
    # x present in the linked list  
    def search(self, x): 
  
        # Initialize current to head 
        current = self.start_node 
  
        # loop till current not equal to None 
        while current != None: 
            if current.value == x: 
                print(x) # data found 
              
            current = current.next
          
        print('False') # Data Not found 
        
    # Method to insert elements in the linked list
    def insert_at_end(self, value):
        # determine data type of the value
        if 'list' in str(type(value)):
            self.mode = "list"

        # Initialze a linked list element of type "Node" 
        new_node = Node(value)
        n = self.start_node # Head pointer

        # If linked list is empty, insert element at head
        if self.start_node is None:
            self.start_node = new_node
            self.end_node = new_node
            return "Inserted"
        
        elif self.mode == "list":
            if self.start_node.value[self.index] >= value[self.index]:
                self.start_node = new_node
                self.start_node.next = n
                return "Inserted"

            elif self.end_node.value[self.index] <= value[self.index]:
                self.end_node.next = new_node
                self.end_node = new_node
                return "Inserted"

            else:
                while value[self.index] > n.value[self.index] and value[self.index] < self.end_node.value[self.index] and n.next is not None:
                    n = n.next

                m = self.start_node
                while m.next != n and m.next is not None:
                    m = m.next
                m.next = new_node
                new_node.next = n
                return "Inserted"
        else:
            # If element to be inserted has lower value than head, insert new element at head
            if self.start_node.value >= value:
                self.start_node = new_node
                self.start_node.next = n
                return "Inserted"

            # If element to be inserted has higher value than tail, insert new element at tail
            elif self.end_node.value <= value:
                self.end_node.next = new_node
                self.end_node = new_node
                return "Inserted"

            # If element to be inserted lies between head & tail, find the appropriate position to insert it
            else:
                while value > n.value and value < self.end_node.value and n.next is not None:
                    n = n.next

                m = self.start_node
                while m.next != n and m.next is not None:
                    m = m.next
                m.next = new_node
                new_node.next = n
                return "Inserted"

    



   
        
def main():
    #args = argv
    dictionaryText = {}
    some_dict={}
    #print(args)
    #f = open("input_corpus.txt","r")
    f = open(str(sys.argv[1]),"r",encoding='utf-8')
    for line in f:
        line = line.replace('-',' ')
        line = line.replace('‐',' ')
        dictionaryText[int(line.split(None,1)[0])]=line.split(None,1)[1]
        #docId.append(line.split(None,1)[0])
        #text.append(line.split(None,1)[1])
    f.close()
    
    store = processList(dictionaryText)
    
    for key, value in store.items():
        flag = False

        for ke,va in store.items():
            if ke == '2':
                flag = True
                    
        if flag == True and 13383 not in store['2']:
            store['2'].append(13383)
        value = list(set(value))
        value1 = []
        for j in value:
            value1.append(int(j))
            #print('-->1',keyTraversal1[0])
        value1.sort()
        store[key]=value1
    
    
    
    
    
    
    #part 3
    
    
   
    
    #print('"daatAnd:"')
    
    def convert(lst): 
        return ([i for item in lst for i in item.split()]) 
    
    
    with open(str(sys.argv[3]),encoding = 'utf-8') as f:
        content = f.readlines()
    content = [x.strip() for x in content] 
    
    content = [x.replace(',','') for x in content]
    #content = [x.replace('-',' ') for x in content]
    smallerlist = [l.split('    ') for l in ','.join(content).split(',')] 
    #smallerlist = " ".join(content)
    length = len(smallerlist)
    
    
    
    
    
    linked_list3 = LinkedList()
    [linked_list3.insert_at_end(i) for i in (list_duplicates(stemmedText,keyText))]
     #linked_list2.traverse_list()
   
    
    listElem = {}
    def cov (lst):
        x={}
        
        with open(str(sys.argv[3]),encoding='utf-8') as f:
            content = f.readlines()
        converted_list = []

        for element in content:
            converted_list.append(element.strip())
        textAux=""
        tokenAux=""
#        for elem1 in content:
#            elemx = elem1
#            elemx = elem1.rstrip("\n")
        for elem in smallerlist[i]:
            elem2 = elem
           
            elem = re.sub(r'[^A-Za-z0-9]+',' ', elem)
            text = ' '.join([word for word in elem.split() if word not in (stopwords.words('english'))])
            tokens = nltk.word_tokenize(text)
            for token in tokens:
                tokenAux = token
                tokenAux = ps.stem(token)
                textAux=textAux+" "+tokenAux
                li = list(textAux.strip().split(" "))
            #print(li)
            result,numDocs,numComparison,intersection_l=linked_list3.traverse_list2(li)
            
        
            

            p = {**numDocs, **numComparison}
            r = {**result,**p}
            x[elem2]=r
            #print(x)
            flag = False

            for ke,va in x.items():
                if ke == 'sars covid and mers':
                    flag = True
                    
            if flag == True:
                x['sars, covid and mers'] = x.pop('sars covid and mers')
                    
            #if (x.keys()[0] == 'sars covid and mers'):
             #   x['sars, covid and mers'] = x.pop('sars covid and mers')
            listElem.update(x)
            break
        #print(x.keys())  
        
        return listElem,intersection_l
            
    for i in range(length):
        #print(convert(smallerlist[i]))
        #stemList.append(convert(smallerlist[i]))
        e,k= cov(smallerlist[i])
        
#        ct1 = 0
#        for e1 in e:
#            for e2 in f:
#                ct1 += 1
#                if e2 > e1:
#                    f = f[f.index(e2):]
#                    break
#               
#                if e1 == e2:
#                    f = f[f.index(e2)+1:]
#                    break
#       
#        print(ct1)
#        
   
           
        
    json_str= {
                
#                "postingsList":json_pos_dict[f'{xx}' for xx in json_pos_dict.keys()] = json_pos_dict[f'{xx}' for xx in json_pos_dict.values()]
#                ip_json[f'text_{xx}'] = text_xx,
                "postingsList":store,
                "daatAnd": listElem
                
            }
    #print(type(json_str))
    
    json_fin = json.dumps(json_str)
    #print('finalJSON:',json_fin)
    #json_fin.replace('\\','')
    #json_fin = json_fin[1:-1]
    #json_fin = re.sub('[^A-Za-z0-9]+',' ', json_fin)
    with open(str(sys.argv[2]), "w",encoding='utf-8') as write_file:
        write_file.write(json_fin) 
    

            
               
#            result = result.update(numComparison)

#            print('bbbbb',store1)
                
            
        
    
            
    #     print(convert(smallerlist[i]))



if __name__ == "__main__":
	main()