import os
import json
from pathlib import Path

current_dir = Path(__file__).parent
qq_news_info_dir = current_dir.parent / Path('data/qq/news_info/')
xinhua_news_info_dir = current_dir.parent / Path('data/xinhua/news_info/')
for news_info_dir in [qq_news_info_dir, xinhua_news_info_dir]:
    cat_count = dict()
    for root, dirs, files in os.walk(news_info_dir):
        for file in files:
            f = open(news_info_dir / Path(file), mode='r', encoding='utf-8')
            try:
                dic = json.loads(f.read())
            except json.decoder.JSONDecodeError as error:
                print("ERROR: ", error)
                continue
            f.close()
            if dic['category'] not in cat_count:
                cat_count[dic['category']] = 1
            else:
                cat_count[dic['category']] += 1
    print('##### ', news_info_dir, ' #####')
    cat_list = sorted(cat_count.items(), key=lambda item: item[1], reverse=True)
    total = 0
    for tuple in cat_list:
        total += tuple[1]
        print(tuple[0] + ':', tuple[1])
    print('total: ', total)
