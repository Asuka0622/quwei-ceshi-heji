import json
from pathlib import Path

# 这是候选库，不是经过验证的人格量表，也不直接用于线上匹配。
rows = [
('苏轼','中国·北宋','文学、书画','诗词、散文与书画作品','https://www.dpm.org.cn/lemmas/242068.html'),
('李白','中国·唐','诗歌','留下大量诗歌，曾多次远游','https://pedia.cloud.edu.tw/Entry/WikiContent?search=%E6%9D%8E%E7%99%BD&title=%E6%9D%8E%E7%99%BD'),
('司马迁','中国·西汉','史学','著有纪传体通史《史记》','https://www.dpm.org.cn/lemmas/240631.html'),
('诸葛亮','中国·三国','政治、军事','蜀汉政治人物，参与谋划和治理','https://mainuat.chiculture.org.hk/sc/china-five-thousand-years/1905'),
('爱因斯坦','德国、瑞士、美国·近现代','物理','以相对论等物理研究闻名','https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/'),
('郑和','中国·明','航海、外交','明代航海人物，曾率船队多次远航',None),
('李清照','中国·宋','词、文学','以词作闻名',None),
('杜甫','中国·唐','诗歌','唐代诗人',None),
('白居易','中国·唐','诗歌','唐代诗人',None),
('王维','中国·唐','诗歌、绘画','唐代诗人与画家',None),
('辛弃疾','中国·南宋','词、军事','南宋词人与官员',None),
('陶渊明','中国·东晋','诗歌','东晋诗人',None),
('屈原','中国·战国','诗歌','战国时期楚国诗人',None),
('孔子','中国·春秋','思想、教育','先秦思想家和教育家',None),
('孟子','中国·战国','思想','战国时期思想家',None),
('庄子','中国·战国','思想、文学','战国时期思想家',None),
('秦始皇','中国·秦','政治','秦朝皇帝',None),
('汉武帝','中国·西汉','政治','西汉皇帝',None),
('武则天','中国·唐、周','政治','武周皇帝',None),
('曹操','中国·东汉末年','政治、军事、文学','东汉末年政治人物与诗人',None),
('岳飞','中国·南宋','军事','南宋将领',None),
('王阳明','中国·明','思想、政治','明代思想家',None),
('徐霞客','中国·明','旅行、地理','以旅行与地理考察闻名',None),
('李时珍','中国·明','医药、博物','著有《本草纲目》',None),
('曹雪芹','中国·清','文学','小说《红楼梦》的作者',None),
('华佗','中国·东汉','医药','东汉时期的医者',None),
('鲁迅','中国·近现代','文学','中国现代作家',None),
('林徽因','中国·近现代','建筑、文学','建筑师与作家',None),
('居里夫人','波兰、法国·近现代','物理、化学','研究放射性并两次获得诺贝尔奖',None),
('达·芬奇','意大利·文艺复兴','艺术、科学','画家与研究者',None),
('牛顿','英国·近代','物理、数学','物理学家与数学家',None),
('达尔文','英国·近代','自然科学','提出以自然选择为核心的演化理论',None),
('伽利略','意大利·近代','物理、天文','从事天文观测和物理研究',None),
('贝多芬','德国、奥地利·近代','音乐','作曲家',None),
('莫扎特','奥地利·近代','音乐','作曲家',None),
('梵高','荷兰、法国·近代','绘画','画家',None),
('莎士比亚','英国·近代','戏剧、文学','剧作家与诗人',None),
('简·奥斯汀','英国·近代','小说','小说家',None),
('南丁格尔','英国·近代','护理、公共卫生','护理事业和公共卫生改革人物',None),
('海伦·凯勒','美国·近现代','写作、社会倡议','作家和社会活动家',None),
]
assert len(rows)==40 and len({r[0] for r in rows})==40
records=[]
for i,(name,era,field,fact,url) in enumerate(rows,1):
    records.append({
        'id':f'history-{i:03}', 'name':name, 'era_region':era,
        'field':field.split('、'), 'candidate_fact':fact,
        'source_review_status':'初步核对' if url else '待查证',
        'sources': [{'title':'人物生平资料','url':url,'supports':fact}] if url else [],
        'personality_profile':None,
        'profile_review_status':'待研究：不能从职业直接推断性格',
        'matching_enabled':False,
        'notes':'初步核对不代表已取得商业内容或图片使用许可。' if url else '候选人物；生平事实、来源与呈现方式均待核对。'
    })
output={'version':'0.1','created':'2026-10-27','purpose':'历史人物匹配测试的候选知识库',
        'status':'研究草稿，不直接上线','people':records}
Path(__file__).with_name('people.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
