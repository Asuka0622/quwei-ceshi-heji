"""从 Noto Serif SC（SIL OFL 授权）截取网站标题和名言用到的字，生成自带的标题字体。在 dist 目录运行。"""
import re,json,os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset
src='C:/Windows/Fonts/NotoSerifSC-VF.ttf'
text=set('0123456789%·，。、：；？！「」“”《》（）—…')
s=open('people.js',encoding='utf-8').read();people=json.loads(s[s.index('['):s.rindex(']')+1])
for p in people:text|=set(p['name']+p['title'])
text|=set(''.join(re.findall(r"text:'([^']*)'",open('quotes.js',encoding='utf-8').read())))
text|=set(''.join(re.findall(r"src:'([^']*)'",open('quotes.js',encoding='utf-8').read())))
text|=set(''.join(re.findall(r"(?:role|item):'([^']*)'",open('ancient.js',encoding='utf-8').read())))
text|=set(''.join(re.findall(r"name:'([^']*)'",open('talent.js',encoding='utf-8').read())))
text|=set(''.join(re.findall(r"\['([^']{2,6}型)'",open('boundary.js',encoding='utf-8').read())))
text|=set("我的册页也像最不像相近星图长按保存图片发给朋友分享正在装裱启程前夜行囊只装得下三样收好出发通关文牒持牒人身份随携准予通行城门客栈断桥末夜宜探索新鲜偏向熟悉分析问题关注感受外向交流安静独处计划有序灵活应变想象创造务实落地专注深耕广泛涉猎进取抱负淡泊随性坚守原则圆融变通这趟个现场做次选择其中有样你了关键穿越时最留过话些看")
text|=set('星笺你与最相近的人物身份天赋边界相处风格持牒靠一位好友邀请测默契也有几分相似倾向画像为什么是八个维度差异大还其他更多文前三项想走多远聊久行囊只装样带上路朋友越了界会怎么办二选十次偏爱古今谁像历史穿代图鉴开始试作答可以留意从发给看把出去随身之批语宜同明天早得下件收好轻点')
print('chars',len(text))
f=TTFont(src)
f=instancer.instantiateVariableFont(f,{'wght':600})
o=subset.Options();o.flavor='woff2';o.layout_features=['*'];o.notdef_outline=True;o.name_IDs=['*']
sb=subset.Subsetter(o);sb.populate(text=''.join(text));sb.subset(f)
os.makedirs('assets/fonts',exist_ok=True)
f.flavor='woff2';f.save('assets/fonts/xingjian-serif.woff2')
print(os.path.getsize('assets/fonts/xingjian-serif.woff2'))
