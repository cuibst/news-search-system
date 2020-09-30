import re

pattern = 'new[s]{0,1}.qq.com'
url = 'https://v.qq.com/'
print(re.search(pattern, url) != None)