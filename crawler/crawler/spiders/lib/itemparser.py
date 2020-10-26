'''
process field in news item
'''


def cat_gen(cat, cat_dic):
    '''
    generalize category
    '''
    found = False
    for key in cat_dic:
        if cat in cat_dic[key]:
            cat = key
            found = True
            break
    if not found:
        cat = 'other'
    return cat
