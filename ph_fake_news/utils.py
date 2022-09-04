import string
import nltk
import numpy as np
nltk.download('stopwords')
from nltk.corpus import stopwords
en_stopwords = stopwords.words('english')

def remove_punctuation(txt):
  all_list = [char for char in txt if char not in string.punctuation]
  return ''.join(all_list)

def remove_en_stopwords(txt):
  return ' '.join([word for word in txt.split() if word not in (en_stopwords)])

def remove_tl_stopwords(txt):
  tl_stopwords = []
  with open('stopwords-tl.txt') as topo_file:
      for line in topo_file:
          tl_stopwords.append(line.replace('\n', ''))
  tl_stopwords.extend(['ba', 'eh', 'kasi', 'lang', 'mo', 'naman', 'opo', 'po', 'si', 'talaga', 'yung'])
  return ' '.join([word for word in txt.split() if word not in (tl_stopwords)])


def preprocess_data(txt):
  txt = txt.lower()
  txt = remove_punctuation(txt)
  txt = remove_en_stopwords(txt)
  txt = remove_tl_stopwords(txt)
  return txt